export const writingPrompts = {
  storyteller: {
    id: 'storyteller',
    title: 'كاتب قصص (Storyteller)',
    description: 'يكتب قصصاً مشوقة وممتعة تناسب جمهورك المستهدف بأسلوب ساحر.',
    template: 'I want you to act as an expert storyteller. You will come up with entertaining stories that are engaging, imaginative, and captivating for the audience. Write a story about "${topic}" targeting a "${audience}" audience. The genre is "${genre}", the tone should be "${tone}", and the length should be approximately "${length}". Include the following specific characters if provided: "${characters}". Ensure the story delivers the following moral or message: "${moral}".',
    questions: [
      { id: 'topic', label: 'ما هو موضوع أو فكرة القصة؟', type: 'text', placeholder: 'مثال: مغامرة في الفضاء، قصة حب، بطل خارق', allowCustom: true },
      { id: 'audience', label: 'من هو الجمهور المستهدف؟', type: 'single_choice', options: ['أطفال (3-8 سنوات)', 'مراهقون (13-18 سنة)', 'بالغون', 'عائلي (لجميع الأعمار)', 'مهتمون بالتاريخ', 'محبو الخيال العلمي'], allowCustom: true },
      { id: 'genre', label: 'ما هو نوع القصة؟', type: 'single_choice', options: ['خيال علمي', 'فانتازيا وسحر', 'واقعية', 'تاريخية', 'مغامرات', 'رعب', 'كوميديا'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة القصة المطلوبة؟', type: 'single_choice', options: ['مضحكة وخفيفة', 'مشوقة ودرامية', 'رومانسية وعاطفية', 'مخيفة وغامضة', 'ملهمة وتحفيزية', 'تعليمية وتوعوية'], allowCustom: true },
      { id: 'length', label: 'ما هو الطول المطلوب للقصة؟', type: 'single_choice', options: ['قصيرة جداً (100-300 كلمة)', 'قصيرة (500-1000 كلمة)', 'متوسطة (1500-3000 كلمة)', 'طويلة (5000+ كلمة)'], allowCustom: true },
      { id: 'characters', label: 'هل لديك شخصيات محددة تريد إدراجها؟', type: 'text', placeholder: 'مثال: بطل شجاع، تنين ذكي، أميرة حكيمة', allowCustom: true },
      { id: 'moral', label: 'هل تريد أن تحمل القصة درساً أخلاقياً أو رسالة؟', type: 'text', placeholder: 'مثال: الأمانة طريق النجاح، الصبر مفتاح الفرج', allowCustom: true }
    ]
  },

  screenwriter: {
    id: 'screenwriter',
    title: 'كاتب سيناريو (Screenwriter)',
    description: 'يكتب سيناريو احترافي للأفلام أو المسلسلات مع حوار وتعليمات مشهدية.',
    template: 'I want you to act as a professional screenwriter. You will develop an engaging and creative script for a ${format}. The title is "${title}", the genre is ${genre}, and the setting takes place in ${setting}. The target audience is ${audience}. Write ${scenes} key scenes, incorporating the following characters: ${characters}. Maintain a ${style} style throughout the dialogues and stage directions.',
    questions: [
      { id: 'title', label: 'ما هو عنوان العمل؟', type: 'text', placeholder: 'مثال: الرحلة الأخيرة، سرّ الغابة', allowCustom: true },
      { id: 'format', label: 'ما هو نوع السيناريو؟', type: 'single_choice', options: ['فيلم روائي طويل', 'مسلسل ويب (Web Series)', 'فيلم قصير', 'مسرحية', 'إعلان تجاري'], allowCustom: true },
      { id: 'genre', label: 'ما هو نوع العمل؟', type: 'single_choice', options: ['دراما', 'كوميديا', 'إثارة وتشويق', 'خيال علمي', 'رومانسي', 'أكشن ومغامرات', 'رعب', 'وثائقي'], allowCustom: true },
      { id: 'setting', label: 'ما هو مكان وزمن الأحداث؟', type: 'text', placeholder: 'مثال: باريس في العشرينيات، المستقبل البعيد', allowCustom: true },
      { id: 'audience', label: 'من هو الجمهور المستهدف؟', type: 'single_choice', options: ['عائلي', 'بالغون', 'مراهقون', 'أطفال', 'جميع الأعمار'], allowCustom: true },
      { id: 'scenes', label: 'كم عدد المشاهد الرئيسية؟', type: 'single_choice', options: ['3 مشاهد', '5 مشاهد', '10 مشاهد', 'مشهد واحد مفصل'], allowCustom: true },
      { id: 'characters', label: 'صف الشخصيات الرئيسية:', type: 'text', placeholder: 'مثال: بطل شجاع، صديقه المخلص، الشرير الذكي', allowCustom: true },
      { id: 'style', label: 'ما هو الأسلوب المفضل؟', type: 'single_choice', options: ['حوار غني ومفصل', 'وصفي مع تعليمات مشهدية', 'سريع الإيقاع', 'عميق وفلسفي'], allowCustom: true }
    ]
  },

  novelist: {
    id: 'novelist',
    title: 'روائي (Novelist)',
    description: 'يكتب فصولاً روائية معقدة بأحداث مثيرة وشخصيات عميقة.',
    template: 'I want you to act as a master novelist. Write a ${genre} novel chapter about "${topic}". The main protagonist is ${mainCharacter}, set in ${setting}. The narrative style/POV is ${pov} with a ${tone} tone. The chapter length should be approximately ${length}. Focus on rich descriptions, deep character development, and an unexpected climax.',
    questions: [
      { id: 'topic', label: 'ما هو الموضوع أو الفكرة الرئيسية للفصل؟', type: 'text', placeholder: 'مثال: اكتشاف سر غامض، مواجهة حاسمة بين البطل والشرير', allowCustom: true },
      { id: 'genre', label: 'ما هو نوع الرواية؟', type: 'single_choice', options: ['فانتازيا', 'رومانسية', 'خيال علمي', 'تاريخية', 'غموض وإثارة', 'واقعية', 'رعب', 'مغامرات'], allowCustom: true },
      { id: 'mainCharacter', label: 'صف الشخصية الرئيسية:', type: 'text', placeholder: 'مثال: فتاة شجاعة تملك قوى خارقة', allowCustom: true },
      { id: 'setting', label: 'ما هو مكان وزمن الأحداث؟', type: 'text', placeholder: 'مثال: مملكة سحرية، مدينة مستقبلية', allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة السرد؟', type: 'single_choice', options: ['درامية وعاطفية', 'مشوقة وسريعة', 'وصفية وجميلة', 'فلسفية وعميقة', 'مضحكة وخفيفة'], allowCustom: true },
      { id: 'length', label: 'ما هو الطول المطلوب للفصل؟', type: 'single_choice', options: ['قصير (1000-2000 كلمة)', 'متوسط (3000-5000 كلمة)', 'طويل (7000+ كلمة)'], allowCustom: true },
      { id: 'pov', label: 'من وجهة نظر من تُروى القصة؟', type: 'single_choice', options: ['الشخصية الرئيسية (ضمير المتكلم)', 'راوٍ ثالث محايد', 'راوٍ ثالث يعرف كل شيء', 'شخصية ثانوية'], allowCustom: true }
    ]
  },

  professionalWriter: {
    id: 'professional_writer',
    title: 'كاتب محتوى إبداعي وإعلاني (Copywriter)',
    description: 'يكتب نصوصاً تسويقية وإعلانية جذابة ومؤثرة لزيادة المبيعات والوعي بالعلامة التجارية.',
    template: 'I want you to act as an elite Copywriter. Write a high-converting ${contentType} for ${targetAudience}. The core product or message is "${coreMessage}". The primary goal is to ${goal}. Use the ${framework} copywriting framework. The tone must be ${tone} and include a strong Call to Action (CTA).',
    questions: [
      { id: 'contentType', label: 'ما نوع النص المطلوب؟', type: 'single_choice', options: ['إعلان ممولة (Social Ad)', 'صفحة هبوط (Landing Page)', 'منشور مدونة تسويقي', 'سلسلة تغريدات/منشورات'], allowCustom: true },
      { id: 'targetAudience', label: 'من هو الجمهور المستهدف؟', type: 'text', placeholder: 'مثال: أصحاب المشاريع الصغيرة، المهتمون بالتكنولوجيا', allowCustom: true },
      { id: 'coreMessage', label: 'ما هي الرسالة الأساسية أو المنتج؟', type: 'text', placeholder: 'مثال: إطلاق تطبيق جديد لإدارة المهام', allowCustom: true },
      { id: 'goal', label: 'ما هو الهدف من النص؟', type: 'single_choice', options: ['زيادة المبيعات', 'التسجيل في خدمة', 'التوعية بالعلامة التجارية', 'تحفيز التفاعل والنقاش'], allowCustom: true },
      { id: 'framework', label: 'ما هي هيكلية الكتابة (Framework)؟', type: 'single_choice', options: ['AIDA (انتباه، اهتمام، رغبة، فعل)', 'PAS (مشكلة، تضخيم، حل)', 'FAB (ميزات، مزايا، فوائد)'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة الصوت؟', type: 'single_choice', options: ['حماسية ومحفزة', 'احترافية ومباشرة', 'ودودة وقريبة للقلب', 'فاخرة وحصرية'], allowCustom: true }
    ]
  }
  ,
  professionalEmail: {
    id: 'professional_email',
    title: 'كاتب الإيميلات المهنية (Professional Email Writer)',
    description: 'يساعدك في صياغة رسائل بريد إلكتروني رسمية ومؤثرة لبيئة العمل والعملاء.',
    template: 'I want you to act as an expert Business Communication Specialist. Write a professional email regarding "${emailTopic}". The recipient is ${recipientType}. The tone of voice should be ${tone}. The key points that must be included are: "${keyPoints}". Provide a clear subject line, a professional greeting, well-structured body paragraphs, and a proper professional sign-off.',
    questions: [
      { id: 'emailTopic', label: 'ما هو موضوع الإيميل الرئيسي؟', type: 'text', placeholder: 'مثال: طلب زيادة راتب، اعتذار عن اجتماع، تقديم عرض سعر', allowCustom: true },
      { id: 'recipientType', label: 'من هو المستلم؟', type: 'single_choice', options: ['مدير مباشر (Manager)', 'عميل أو شريك تجاري (Client)', 'زميل في العمل (Colleague)', 'جهة توظيف (HR)'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة الصوت المطلوبة؟', type: 'single_choice', options: ['رسمية جداً (Formal)', 'ودودة ولكن مهنية (Friendly & Professional)', 'حازمة ومباشرة (Direct & Firm)'], allowCustom: true },
      { id: 'keyPoints', label: 'ما هي النقاط الأساسية الواجب ذكرها؟', type: 'text', placeholder: 'اكتب النقاط باختصار...', allowCustom: true }
    ]
  },

  socialCaptionWriter: {
    id: 'social_caption_writer',
    title: 'كاتب منشورات وسائل التواصل (Social Caption Writer)',
    description: 'يساعدك في كتابة كابشن جذاب ومنشورات تفاعلية لمنصات مثل إنستغرام، إكس، ولينكد إن.',
    template: 'I want you to act as a social media copywriter. Write an engaging caption for ${platform}. The topic of the post is "${topic}". The goal is to ${goal}. The tone should be ${tone}. Include an attention-grabbing hook at the beginning, relevant formatting/emojis, and strategic hashtags at the end.',
    questions: [
      { id: 'platform', label: 'ما هي المنصة المستهدفة؟', type: 'single_choice', options: ['إنستغرام (Instagram)', 'تويتر / إكس (X)', 'لينكد إن (LinkedIn)', 'تيك توك (TikTok)'], allowCustom: true },
      { id: 'topic', label: 'ما هو موضوع المنشور؟', type: 'text', placeholder: 'مثال: إطلاق منتج جديد، مشاركة إنجاز مهني، نصيحة سريعة', allowCustom: true },
      { id: 'goal', label: 'ما هو الهدف التفاعلي (CTA)؟', type: 'single_choice', options: ['زيادة التعليقات والنقاش', 'زيادة النقرات على الرابط', 'مشاركة المنشور وحفظه', 'التوعية والاعجاب فقط'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة النص؟', type: 'single_choice', options: ['حماسية وتفاعلية', 'مهنية وتعليمية', 'شخصية وعفوية', 'ساخرة وخفيفة الظل'], allowCustom: true }
    ]
  }
};