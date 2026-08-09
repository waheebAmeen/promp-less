import fetch from 'node-fetch';

const COHERE_API_KEY = process.env.COHERE_API_KEY || 'jWoApVlvyJh3WJ0s03pLqvzX7SZgetvbEfszcWeM';
const COHERE_API_URL = 'https://api.cohere.com/v2/chat';
const PRIMARY_MODEL = 'command-a-plus-05-2026';

const targetLanguage = 'en';
const systemPrompt = targetLanguage === 'ar'
  ? `أنت مترجم محترف. مهمتك هي ترجمة الـ Prompt التالي إلى اللغة العربية بدقة عالية مع الحفاظ على المصطلحات التقنية.\n\nأخرج JSON فقط:\n{\n  "translated": "النص المترجم هنا"\n}`
  : `You are a professional translator. Translate the following Prompt into English accurately while preserving technical terms.\n\nReturn JSON only:\n{\n  "translated": "Translated text here"\n}`;

const prompt = "صورة سينمائية لقطة جميلة لغروب الشمس في الصحراء، جودة 8k";

async function test() {
  const response = await fetch(COHERE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: PRIMARY_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    }),
  });
  console.log(response.status);
  console.log(await response.text());
}
test();
