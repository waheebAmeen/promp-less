export const writingPrompts = {
  storyteller: {
    id: 'storyteller',
    title: 'كاتب قصص (Storyteller)',
    description: 'يكتب قصصاً مشوقة وممتعة تناسب جمهورك المستهدف بأسلوب ساحر.',
    template: 'I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can be fairy tales, educational stories or any other type of stories which has the potential to capture people attention and imagination. Depending on the target audience, you may choose specific themes or topics for your storytelling session e.g., if it is children then you can talk about animals; If it is adults then history-based tales might engage them better etc. Write a story about ${topic} for a ${audience} audience. The tone should be ${tone} and the length should be approximately ${length}.',
    questions: [
      { id: 'topic', label: 'ما هو موضوع أو فكرة القصة؟', type: 'text', placeholder: 'مثال: مغامرة في الفضاء، قصة حب، بطل خارق', allowCustom: true },
      { id: 'audience', label: 'من هو الجمهور المستهدف؟', type: 'single_choice', options: ['أطفال (3-8 سنوات)','مراهقون (13-18 سنة)','بالغون','عائلي (لجميع الأعمار)','مهتمون بالتاريخ','محبو الخيال العلمي'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة القصة المطلوبة؟', type: 'single_choice', options: ['مضحكة وخفيفة','مشوقة ودرامية','رومانسية وعاطفية','مخيفة وغامضة','ملهمة وتحفيزية','تعليمية وتوعوية'], allowCustom: true },
      { id: 'genre', label: 'ما هو نوع القصة؟', type: 'single_choice', options: ['خيال علمي','فانتازيا وسحر','واقعية','تاريخية','مغامرات','رعب','كوميديا'], allowCustom: true },
      { id: 'length', label: 'ما هو الطول المطلوب للقصة؟', type: 'single_choice', options: ['قصيرة جداً (100-300 كلمة)','قصيرة (500-1000 كلمة)','متوسطة (1500-3000 كلمة)','طويلة (5000+ كلمة)'], allowCustom: true },
      { id: 'characters', label: 'هل لديك شخصيات محددة تريد إدراجها؟', type: 'text', placeholder: 'مثال: بطل شجاع، تنين ذكي، أميرة حكيمة', allowCustom: true },
      { id: 'moral', label: 'هل تريد أن تحمل القصة درساً أخلاقياً؟', type: 'choice_with_custom', options: ['نعم، درس أخلاقي','نعم، رسالة توعوية','لا، مجرد ترفيه'], allowCustom: true }
    ]
  },

  screenwriter: {
    id: 'screenwriter',
    title: 'كاتب سيناريو (Screenwriter)',
    description: 'يكتب سيناريو احترافي للأفلام أو المسلسلات مع حوار وتعليمات مشهدية.',
    template: 'I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. Write a ${format} script for ${genre} titled "${title}". The setting is ${setting} and the target audience is ${audience}. Include ${scenes} key scenes.',
    questions: [
      { id: 'title', label: 'ما هو عنوان العمل؟', type: 'text', placeholder: 'مثال: الرحلة الأخيرة، سرّ الغابة', allowCustom: true },
      { id: 'format', label: 'ما هو نوع السيناريو؟', type: 'single_choice', options: ['فيلم روائي طويل','مسلسل ويب (Web Series)','فيلم قصير','مسرحية','إعلان تجاري'], allowCustom: true },
      { id: 'genre', label: 'ما هو نوع العمل؟', type: 'single_choice', options: ['دراما','كوميديا','إثارة وتشويق','خيال علمي','رومانسي','أكشن ومغامرات','رعب','وثائقي'], allowCustom: true },
      { id: 'setting', label: 'ما هو مكان وزمن الأحداث؟', type: 'text', placeholder: 'مثال: باريس في العشرينيات، المستقبل البعيد', allowCustom: true },
      { id: 'audience', label: 'من هو الجمهور المستهدف؟', type: 'single_choice', options: ['عائلي','بالغون','مراهقون','أطفال','جميع الأعمار'], allowCustom: true },
      { id: 'scenes', label: 'كم عدد المشاهد الرئيسية؟', type: 'single_choice', options: ['3 مشاهد','5 مشاهد','10 مشاهد','مشهد واحد مفصل'], allowCustom: true },
      { id: 'characters', label: 'صف الشخصيات الرئيسية:', type: 'text', placeholder: 'مثال: بطل شجاع، صديقه المخلص، الشرير الذكي', allowCustom: true },
      { id: 'style', label: 'ما هو الأسلوب المفضل؟', type: 'single_choice', options: ['حوار غني ومفصل','وصفي مع تعليمات مشهدية','سريع الإيقاع','عميق وفلسفي'], allowCustom: true }
    ]
  },

  novelist: {
    id: 'novelist',
    title: 'روائي (Novelist)',
    description: 'يكتب فصولاً روائية معقدة بأحداث مثيرة وشخصيات عميقة.',
    template: 'I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. Write a ${genre} novel chapter about ${topic}. The main character is ${mainCharacter}. The setting is ${setting}. The tone should be ${tone} and the chapter length should be approximately ${length}.',
    questions: [
      { id: 'topic', label: 'ما هو الموضوع أو الفكرة الرئيسية للرواية؟', type: 'text', placeholder: 'مثال: رحلة البحث عن كنز مفقود، صراع بين عالمين', allowCustom: true },
      { id: 'genre', label: 'ما هو نوع الرواية؟', type: 'single_choice', options: ['فانتازيا','رومانسية','خيال علمي','تاريخية','غموض وإثارة','واقعية','رعب','مغامرات'], allowCustom: true },
      { id: 'mainCharacter', label: 'صف الشخصية الرئيسية:', type: 'text', placeholder: 'مثال: فتاة شجاعة تملك قوى خارقة', allowCustom: true },
      { id: 'setting', label: 'ما هو مكان وزمن الأحداث؟', type: 'text', placeholder: 'مثال: مملكة سحرية، مدينة مستقبلية', allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة السرد؟', type: 'single_choice', options: ['درامية وعاطفية','مشوقة وسريعة','وصفية وجميلة','فلسفية وعميقة','مضحكة وخفيفة'], allowCustom: true },
      { id: 'length', label: 'ما هو الطول المطلوب للفصل؟', type: 'single_choice', options: ['قصير (1000-2000 كلمة)','متوسط (3000-5000 كلمة)','طويل (7000+ كلمة)'], allowCustom: true },
      { id: 'pov', label: 'من وجهة نظر من تُروى القصة؟', type: 'single_choice', options: ['الشخصية الرئيسية (أنا)','راوٍ ثالث محايد','راوٍ ثالث يعرف كل شيء','شخصية ثانوية'], allowCustom: true }
    ]
  },
}