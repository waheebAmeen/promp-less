import { Workflow } from '../storage/store';

// ─── Cohere Configuration 
const COHERE_API_KEY = process.env.EXPO_PUBLIC_COHERE_API_KEY || '';
const COHERE_API_URL = 'https://api.cohere.com/v2/chat';

// ─── Groq Configuration 
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

/* Controls how many questions to ask and how deep to go */
export type ComplexityMode = 'simple' | 'complex';

/**
 * Primary model — Cohere Command A Plus.
 */
const PRIMARY_MODEL = 'command-a-plus-05-2026';

// ─── Public types ─────────────────────────────────────────────────────────────

export type QuestionType = 'single_choice' | 'multiple_choice' | 'text_only';

export interface AiQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
}

export interface AiDraft {
  questions: AiQuestion[];
}

/** One entry in the conversational Q&A history */
export interface QAEntry {
  question: string;
  answer: string;
}

/** Returned by getNextQuestion */
export type NextQuestionResult =
  | { done: false; question: AiQuestion }
  | { done: true };

// ─── Core fetch with fallback ─────────────────────────────────────────────────

async function callGroqJson(
  messages: { role: string; content: string }[],
  maxTokens = 3000,  // thinking model needs extra budget for internal reasoning
): Promise<any> {
  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature: 0.4,
        response_format: { type: 'json_object' },
      }),
    });

    if (response.ok) {
      const body = await response.json();
      console.log(`[AI] Success with model: ${PRIMARY_MODEL}`);
      return body;
    }

    const status = response.status;
    const errorText = await response.text().catch(() => '');
    console.warn(`[AI][${PRIMARY_MODEL}] HTTP ${status}: ${errorText.slice(0, 120)}`);

    if (status === 401 || status === 403) throw new Error('401');
    if (status === 503) throw new Error('loading');
    throw new Error(`http_${status}`);
  } catch (err: any) {
    if (['401', 'loading'].some((k) => err.message?.startsWith(k))) throw err;
    if (err.message?.startsWith('http_')) throw err;
    throw new Error(`network_error: ${err.message}`);
  }
}

/** Safely extract text from Cohere v2 chat response */
function extractContent(body: any): string {
  // Cohere v2: body.message.content is an array of content blocks
  const content = body?.message?.content;
  if (Array.isArray(content)) {
    return content.find((c: any) => c.type === 'text')?.text ?? '';
  }
  // Fallback for plain string content
  return typeof content === 'string' ? content : '';
}

/** Strip markdown fences and parse JSON */
function safeParseJson(raw: string): any {
  try {
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    // Fallback: extract the first JSON object using Regex
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw e;
  }
}

// ─── 1. getNextQuestion ───────────────────────────────────────────────────────
/**
 * Conversational Requirements Elicitation.
 *
 * Given the user's original idea and the Q&A history so far, the AI decides:
 * - Whether more information is needed → returns the single most valuable next question
 * - Whether enough info is available → returns { done: true }
 *
 * Max questions is enforced by the caller (dynamic-screen.tsx, MAX_QUESTIONS=5).
 */
export async function getNextQuestion(
  idea: string,
  history: QAEntry[],
  mode: ComplexityMode = 'simple',
): Promise<NextQuestionResult> {
  // maxQ is advisory for the AI — actual count adapts to idea complexity
  const maxQ = mode === 'simple' ? 10 : 25;
  const historyText =
    history.length === 0
      ? 'لا توجد أسئلة سابقة.'
      : history
          .map((h, i) => `السؤال ${i + 1}: ${h.question}\nالإجابة: ${h.answer}`)
          .join('\n\n');
const modeInstruction = mode === 'simple'
  ? `وضع مبسط — تجربة سريعة وسهلة:
- افهم فكرة المستخدم وحدد المعلومات الأساسية فقط.
- استخدم أقل عدد ممكن من الأسئلة للوصول إلى Prompt جيد.
- غالباً يكفي 3-7 أسئلة حسب الحاجة.
- لا تطلب تفاصيل غير مؤثرة.
- أعطِ الأولوية للأسئلة ذات الخيارات الجاهزة لتقليل جهد المستخدم.
- أنهِ الحوار بمجرد توفر المعلومات الضرورية لإنشاء Prompt جيد.`
  : `وضع مفصل — جودة عالية ونتيجة احترافية:
- حلل الفكرة بعمق وحدد المعلومات التي تؤثر فعلاً على جودة الـ Prompt.
- استخدم عدداً مناسباً من الأسئلة حسب تعقيد الفكرة، وليس حسب رقم ثابت.
- يمكن أن تكون الأسئلة أكثر من الوضع المبسط عند الحاجة فقط.
- لا تسأل عن تفاصيل غير مهمة أو يمكن استنتاجها.
- الهدف هو بناء Prompt احترافي بأقل مجهود ممكن من المستخدم.
- أنهِ الحوار عندما تصبح لديك معلومات كافية لإنتاج نتيجة ممتازة.`;

const systemPrompt = `أنت خبير في هندسة البرومبتات داخل تطبيق PromptLess (Requirements Elicitation Agent).

مهمتك: مساعدة المستخدم على الوصول إلى Prompt احترافي من خلال حوار ذكي وتفاعلي يعتمد على فهم فكرته واحتياجاته.

تعامل مع العملية كمحادثة مستمرة وليست مجموعة أسئلة منفصلة.

في كل مرة تنشئ سؤالاً جديداً، يجب أن تفهم:
- فكرة المستخدم الأصلية.
- جميع الأسئلة السابقة.
- جميع إجابات المستخدم السابقة.
- الاختيارات التي قام المستخدم بتحديدها.
- أي معلومات إضافية قدمها المستخدم.

يجب أن يكون كل سؤال جديد مبنياً على السياق السابق، وليس سؤالاً عشوائياً أو عاماً.

${modeInstruction}

قواعد إنشاء الأسئلة:

1. قبل إنشاء أي سؤال، حلل:
- ما الذي فهمته من المستخدم؟
- ما المعلومات المهمة التي ما زالت ناقصة؟
- ما السؤال الأكثر فائدة لتحسين الـ Prompt النهائي؟

2. لا تسأل عن:
- معلومات تم توفيرها مسبقاً.
- معلومات يمكن استنتاجها بوضوح.
- تفاصيل لا تؤثر على جودة النتيجة.

🚫 تحذير هام جداً: ممنوع منعاً باتاً تكرار نفس السؤال بصيغة مختلفة. راجع "سجل المحادثة" بدقة، وإذا وجدت أن الفكرة أو الهدف من السؤال قد تمت الإجابة عليه في سؤال سابق، فتجاوزه تماماً.

3. الهدف ليس جمع أكبر عدد من الإجابات.
الهدف هو فهم المستخدم بأقل عدد ممكن من الأسئلة مع الحصول على أفضل نتيجة.

⚠️ قاعدة إلزامية: يجب عليك طرح ما لا يقل عن 3 أسئلة قبل أن تستطيع قول "done": true.
لا يجوز إنهاء الحوار قبل السؤال الثالث مطلقاً، حتى لو بدت الفكرة واضحة.
لديك حالياً ${history.length} سؤال في السجل — ${history.length < 3 ? `يجب طرح ${3 - history.length} سؤال/أسئلة إضافية على الأقل.` : 'يمكنك الإنهاء إذا رأيت ذلك مناسباً.'}

4. اجعل تجربة المستخدم سهلة:
- استخدم الخيارات الجاهزة دائماً عندما يكون ذلك ممكناً.
- لا تجعل المستخدم يكتب إجابات طويلة إلا عند الحاجة.
- ملاحظة هامة للمنطق: انتبه جيداً لنوع الخيارات. إذا كانت الخيارات متناقضة أو لا يمكن جمعها (مثل: كم ساعة يستغرق الاجتماع؟ ساعة، ساعتان، ثلاث)، فيجب ويتحتم عليك استخدام "single_choice" فقط.
- إذا كانت الخيارات يمكن جمعها (مثل: ما هي المواضيع التي سنناقشها؟ المبيعات، التسويق، الدعم الفني)، استخدم "multiple_choice".
- ملاحظة للواجهة: واجهة التطبيق توفر دائماً حقلاً نصياً في كل الأسئلة ليتمكن المستخدم من الإضافة، لذلك لا تقلق بشأن توفير خيار "أخرى".

5. إذا أصبحت المعلومات كافية لإنشاء Prompt احترافي:
قم بإنهاء الأسئلة باستخدام:
{
  "done": true
}

6. عدد الخيارات يجب أن يكون ديناميكياً حسب طبيعة السؤال:
- قد يكون خيارين فقط.
- قد يكون عدة خيارات.
- قد يكون عدداً أكبر إذا كان ذلك ضرورياً.
لا تستخدم عدداً ثابتاً.

الخيارات يجب أن تكون:
- واضحة.
- قصيرة.
- مختلفة عن بعضها.
- تساعد المستخدم على الاختيار بسهولة.

أنواع الأسئلة المتاحة (يجب تحديد النوع في حقل "type"):

- "single_choice":
سؤال باختيار إجابة واحدة فقط.
⚠️ إجباري استخدامه للخيارات التي لا يصح اختيار أكثر من واحد منها (مثل: الوقت، العدد، النوع الأساسي).

- "multiple_choice":
سؤال باختيار عدة إجابات.
استخدمه للأشياء القابلة للتعدد (مثل: الأهداف، الميزات، المواضيع).

- "text_only":
إجابة كتابية فقط.
استخدمه في أضيق الحدود إذا استحال وضع خيارات.

أخرج JSON فقط — بأحد الشكلين:

إذا تحتاج سؤالاً إضافياً:
{
  "done": false,
  "question": {
    "id": "uniqueId",
    "type": "single_choice | multiple_choice | text_only",
    "question": "نص السؤال هنا؟",
    "options": ["خيار 1", "خيار 2"]
  }
}

إذا لديك معلومات كافية:
{
  "done": true
}`;
  const userMessage = `فكرة المستخدم: "${idea}"

سجل المحادثة حتى الآن:
${historyText}

هل تحتاج سؤالاً إضافياً؟ إذا نعم، ما هو السؤال الأكثر قيمة الآن؟`;

  const body = await callGroqJson([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ], 3000);

  const raw = extractContent(body);
  console.log('[AI:getNextQuestion] raw:', raw);

  let parsed: any;
  try {
    parsed = safeParseJson(raw);
  } catch {
    throw new Error('invalid_json');
  }

  if (parsed.done === true) return { done: true };

  const q = parsed.question;
  if (!q || typeof q.question !== 'string' || !q.type) {
    throw new Error('invalid_structure');
  }

  return {
    done: false,
    question: {
      id: typeof q.id === 'string' && q.id.trim() ? q.id : `q_${Date.now()}`,
      type: ['single_choice', 'multiple_choice', 'text_only'].includes(q.type) ? q.type : 'single_choice',
      question: q.question.trim(),
      options: Array.isArray(q.options) ? q.options.map((o: any) => String(o).trim()).filter(Boolean) : [],
    },
  };
}

// ─── 2. synthesizeProfessionalPrompt ─────────────────────────────────────────
/**
 * The core intelligence: takes the user's idea + full Q&A history and
 * synthesizes a rich, professional prompt — NOT just concatenating answers.
 *
 * The AI acts as a senior prompt engineer who:
 * - Infers the true intent behind the answers
 * - Fills in missing details using best practices
 * - Structures the output with role, goal, context, constraints, steps, quality criteria
 */
import { TargetModel } from '../engine/types';

export async function synthesizeProfessionalPrompt(
  idea: string,
  history: QAEntry[],
  language: 'ar' | 'en' = 'ar',
  targetModel: TargetModel = 'midjourney'
): Promise<string> {
  const historyText = history
    .map((h, i) => `Q${i + 1}: ${h.question}\nA${i + 1}: ${h.answer}`)
    .join('\n');

  const systemPrompt = language === 'ar'
    ? `أنت خبير متخصص في هندسة البرومبتات (Prompt Engineering Expert) وتعمل داخل نظام PromptLess.

مهمتك: تحليل هدف المستخدم، فهم السياق الكامل للفكرة، مراجعة جميع الإجابات السابقة، واستخراج المتطلبات المهمة لإنشاء Prompt احترافي.

القاعدة الذهبية: لا تقم أبداً بتحويل الإجابات إلى نص بشكل حرفي. يجب إعادة صياغة الطلب وتحسينه ليكون Prompt احترافي قادر على إنتاج أفضل النتائج.

يجب عليك:
1. تحليل هدف المستخدم الحقيقي واكتشاف أي نقص أو تعارض في المعلومات ومعالجته بذكاء.
2. إعادة تنظيم المعلومات بطريقة احترافية.
3. إضافة السياق الضروري وإزالة أي غموض.
4. جعل التعليمات أكثر دقة ووضوحاً واستخدام أفضل ممارسات كتابة الـ Prompts.


- قم بتجهيز وبناء الـ Prompt ليكون متوافقاً تماماً مع نموذج (Target Model): ${targetModel}. تأكد من استخدام أفضل الممارسات لهذا النموذج تحديداً.

يجب أن يحتوي الـ prompt النهائي المُحسّن تلقائياً على:
- وضوح الهدف (تعريف الدور السياقي للذكاء الاصطناعي).
- تنظيم التعليمات والقيود والمتطلبات.
- الافتراضات المُستنتجة لملء الفراغات.
- شكل المخرجات المتوقعة بدقة.

يجب أن تكون النتيجة مشابهة لبرومبت مكتوب بواسطة خبير، وليس مجرد نص عادي.

أخرج JSON فقط:
{
  "prompt": "النص الكامل للـ prompt الاحترافي المُحسّن هنا"
}`
    : `You are a specialized Prompt Engineering Expert working inside the PromptLess system.

Your task: analyze the user's true goal, understand the full context of the idea, review all previous answers, and extract critical requirements to create a professional prompt.

Golden Rule: NEVER just convert answers into text verbatim. You must rephrase and enhance the request into a professional prompt capable of producing the best results.

You must:
1. Analyze the true intent, discover any missing or conflicting info, and intelligently resolve it.
2. Reorganize the information professionally.
3. Add necessary context and remove ambiguity.
4. Make instructions highly precise, using prompt engineering best practices.


- Format and optimize the prompt specifically for the target model: ${targetModel}. Make sure to use best practices for this model.

The automatically enhanced final prompt must include:
- Clear objective (contextual AI role definition).
- Organized instructions, constraints, and requirements.
- Inferred assumptions to fill gaps.
- Exact output formatting expectations.

The result should look like a prompt written by an expert, not just normal text.

Return JSON only:
{
  "prompt": "Full professional enhanced prompt text here"
}`;

  const userMessage = `User's original idea: "${idea}"

Collected Q&A:
${historyText || '(No questions were asked — infer from the idea alone)'}

Synthesize a professional prompt now.`;

  const body = await callGroqJson(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    3000,
  );

  const raw = extractContent(body);
  console.log('[AI:synthesize] raw length:', raw.length);

  let parsed: any;
  try {
    parsed = safeParseJson(raw);
  } catch {
    // Fallback: use raw text if it's non-empty and not JSON
    if (raw.trim().length > 50 && !raw.trim().startsWith('{')) return raw.trim();
    throw new Error('invalid_json');
  }

  const prompt = parsed?.prompt || parsed?.enhanced || parsed?.result || parsed?.text;
  if (typeof prompt !== 'string' || prompt.trim().length < 20) {
    if (parsed && typeof parsed === 'object') {
      const firstStr = Object.values(parsed).find(v => typeof v === 'string');
      if (firstStr && (firstStr as string).trim().length > 20) {
        return (firstStr as string).trim();
      }
    }
    throw new Error('invalid_structure');
  }

  return prompt.trim();
}

// ─── 3. generateAiDraft (legacy — kept for backward compat) ──────────────────
/**
 * @deprecated Use getNextQuestion + synthesizeProfessionalPrompt instead.
 * Still used by any legacy callers.
 */
export async function generateAiDraft(
  userIdea: string,
  _workflows?: Workflow[],
): Promise<AiDraft> {
  const systemMessage = `You are an AI creative director assistant. Generate 5-7 targeted questions to refine the user's idea.

Output ONLY a JSON object: { "questions": [ { "id": "camelCase", "question": "...", "options": ["...", "..."], "allowCustom": true } ] }`;

  const body = await callGroqJson([
    { role: 'system', content: systemMessage },
    { role: 'user', content: `Generate questions for: "${userIdea}"` },
  ], 3000);

  const raw = extractContent(body);
  if (!raw.trim()) throw new Error('no_json');

  let parsed: any;
  try { parsed = safeParseJson(raw); } catch { throw new Error('invalid_json'); }

  const arr: any[] = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.questions) ? parsed.questions : null;
  if (!arr || arr.length === 0) throw new Error('invalid_structure');

  const questions: AiQuestion[] = arr
    .filter((q) => q?.question && Array.isArray(q.options) && q.options.length > 0)
    .map((q, i) => ({
      id: q.id || `q_${i}`,
      type: 'single_choice',
      question: String(q.question).trim(),
      options: q.options.map((o: any) => String(o).trim()).filter(Boolean).slice(0, 6),
    }));

  if (questions.length === 0) throw new Error('invalid_question_structure');
  return { questions };
}

// ─── 4. enhancePrompt ─────────────────────────────────────────────────────────
/**
 * Takes any existing prompt (from AI flow or legacy templates) and returns
 * an enhanced, more professional version while preserving the original intent.
 */
export async function enhancePrompt(
  currentPrompt: string,
  language: 'ar' | 'en' = 'ar',
): Promise<string> {
const systemPrompt = language === 'ar'
  ? `أنت خبير متقدم في هندسة البرومبتات (Advanced Prompt Engineering Expert) وتعمل داخل نظام PromptLess.

مهمتك: تحسين وإعادة هندسة الـ Prompt المُقدم من المستخدم ليصبح Prompt احترافي عالي الجودة، جاهز للحصول على أفضل النتائج من نماذج الذكاء الاصطناعي.

لا تكتفِ بإعادة صياغة النص فقط، بل قم بتحليل البرومبت وفهم الهدف الحقيقي منه ثم قم بتحسينه بشكل شامل.

يجب أن يتضمن التحسين:

1. فهم الهدف:
- تحديد الهدف الأساسي من البرومبت.
- التأكد من أن المطلوب واضح وغير قابل للتفسير الخاطئ.

2. إعادة بناء الهيكل:
- تنظيم البرومبت بطريقة منطقية.
- ترتيب المعلومات والتعليمات حسب الأولوية.
- فصل الهدف، السياق، المتطلبات، والنتيجة المطلوبة عند الحاجة.

3. تحسين التعليمات:
- جعل التعليمات أكثر دقة ووضوحاً.
- إزالة العبارات العامة أو الغامضة.
- إضافة تفاصيل مهمة تساعد النموذج على تقديم نتيجة أفضل.

4. تحسين السياق:
- إضافة أي سياق ضروري موجود ضمن البرومبت أو يمكن استنتاج أهميته.
- توضيح دور الذكاء الاصطناعي المطلوب منه.
- تحديد طريقة التعامل مع المهمة إذا كان ذلك سيحسن النتيجة.

5. تحسين جودة المخرجات:
- توضيح شكل النتيجة المطلوبة.
- إضافة قيود أو معايير جودة مناسبة عند الحاجة.
- جعل البرومبت موجهاً للحصول على أفضل إجابة ممكنة.

6. الحفاظ على نية المستخدم:
- لا تغير هدف المستخدم.
- لا تضف أفكاراً جديدة تغير المطلوب.
- التحسين يجب أن يجعل البرومبت أقوى وليس مختلفاً.

تعامل مع كل Prompt حسب طبيعته، ولا تستخدم قالباً ثابتاً لجميع الحالات.

قبل إرجاع النتيجة تأكد أن الـ Prompt النهائي:
- واضح.
- احترافي.
- منظم.
- قابل للاستخدام مباشرة.
- مكتوب بأسلوب خبير Prompt Engineering.

أخرج JSON فقط:
{
  "enhanced": "نص الـ prompt المحسن النهائي هنا"
}`
  : `You are an Advanced Prompt Engineering Expert working inside the PromptLess system.

Your task: improve and re-engineer the provided user prompt into a high-quality professional prompt that is ready to achieve the best possible results from AI models.

Do not simply rewrite the text. Analyze the prompt, understand the user's real objective, and enhance it comprehensively.

The enhancement should include:

1. Understanding the objective:
- Identify the main goal of the prompt.
- Make the requested outcome clear and unambiguous.

2. Rebuilding the structure:
- Organize the prompt logically.
- Prioritize information and instructions.
- Separate goals, context, requirements, and expected output when useful.

3. Improving instructions:
- Make instructions more precise and actionable.
- Remove vague or unclear wording.
- Add important details that improve AI performance.

4. Improving context:
- Add necessary context available from the prompt.
- Clarify the expected AI role when beneficial.
- Improve task understanding.

5. Improving output quality:
- Clarify the desired output format.
- Add suitable quality criteria or constraints when needed.
- Guide the AI toward producing a better result.

6. Preserving user intent:
- Do not change the user's original goal.
- Do not introduce unrelated ideas.
- The enhancement should strengthen the prompt, not replace its purpose.

Adapt the enhancement based on the nature of each prompt. Do not apply one fixed template to every case.

Before returning, ensure the final prompt is:
- Clear.
- Professional.
- Well-structured.
- Ready to use.
- Written with expert Prompt Engineering practices.

Return JSON only:
{
  "enhanced": "The final enhanced prompt text here"
}`;
  const body = await callGroqJson(
    [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `${language === 'ar' ? 'قم بتحسين هذا الـ prompt' : 'Improve this prompt'}:\n\n"${currentPrompt}"`,
      },
    ],
    4000,
  );

  const raw = extractContent(body);
  console.log('[AI:enhance] raw length:', raw.length);

  let parsed: any;
  try {
    parsed = safeParseJson(raw);
  } catch {
    if (raw.trim().length > 20 && !raw.trim().startsWith('{')) return raw.trim();
    throw new Error('invalid_json');
  }

  let enhanced = parsed?.enhanced || parsed?.prompt || parsed?.result || parsed?.text;
  
  if (typeof enhanced !== 'string' || enhanced.trim().length < 10) {
    // If it's a valid JSON but missing the expected key, try to find any string value
    if (parsed && typeof parsed === 'object') {
       const firstStringVal = Object.values(parsed).find(v => typeof v === 'string');
       if (firstStringVal && (firstStringVal as string).trim().length >= 10) {
         return (firstStringVal as string).trim();
       }
    }
    
    // If we still don't have it, don't return raw JSON string to the UI!
    if (raw.trim().startsWith('{')) {
       throw new Error('invalid_structure');
    }
    
    // If it was just text
    if (raw.trim().length > 20) return raw.trim();
    throw new Error('invalid_structure');
  }

  return enhanced.trim();
}


// ─── 5. translatePrompt ───────────────────────────────────────────────────────
export async function translatePrompt(
  prompt: string,
  targetLanguage: 'ar' | 'en'
): Promise<string> {
  const systemPrompt = targetLanguage === 'ar'
    ? `أنت مترجم محترف. مهمتك هي ترجمة الـ Prompt التالي إلى اللغة العربية بدقة عالية مع الحفاظ على المصطلحات التقنية.

أخرج JSON فقط:
{
  "translated": "النص المترجم هنا"
}`
    : `You are a professional translator. Translate the following Prompt into English accurately while preserving technical terms.

Return JSON only:
{
  "translated": "Translated text here"
}`;

  const body = await callGroqJson([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ], 2000);

  const raw = extractContent(body);
  let parsed: any;
  try {
    parsed = safeParseJson(raw);
  } catch {
    if (raw.trim().length > 2 && !raw.trim().startsWith('{')) return raw.trim();
    throw new Error('invalid_json');
  }

  const translated = parsed?.translated || parsed?.prompt || parsed?.result || parsed?.text;
  if (typeof translated !== 'string' || translated.trim().length < 2) {
    if (parsed && typeof parsed === 'object') {
       const firstStringVal = Object.values(parsed).find(v => typeof v === 'string');
       if (firstStringVal && (firstStringVal as string).trim().length >= 2) {
         return (firstStringVal as string).trim();
       }
    }
    if (raw.trim().startsWith('{')) throw new Error('invalid_structure');
    if (raw.trim().length > 2) return raw.trim();
    throw new Error('invalid_structure');
  }

  return translated.trim();
}