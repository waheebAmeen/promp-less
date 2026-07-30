export const studyPrompts = {
  spokenEnglishTeacher: {
    id: 'spoken_english_teacher',
    title: 'مدرس ومصحح لغة إنجليزية (Spoken English Teacher)',
    description: 'يمارس معك المحادثة باللغة الإنجليزية ويصحح أخطاءك النحوية والإملائية بصرامة.',
    template: `I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first about \${topic}. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.`,
    questions: [
  {
    id: 'englishLevel',
    label: 'ما هو مستواك الحالي في اللغة الإنجليزية؟',
    type: 'single_choice',
    options: [
      'مبتدئ (أعرف الأساسيات فقط)',
      'متوسط (أستطيع إجراء محادثات بسيطة)',
      'متقدم (أريد تحسين الطلاقة والدقة)',
      'غير متأكد من مستواي'
    ],
    allowCustom: true
  },
  {
    id: 'learningGoal',
    label: 'ما الهدف الرئيسي من ممارسة المحادثة؟',
    type: 'multiple_choice',
    options: [
      'التحدث بطلاقة وثقة',
      'تحسين النطق واللهجة',
      'التحضير لمقابلة عمل',
      'السفر والتواصل اليومي',
      'الدراسة أو الاختبارات',
      'تطوير اللغة بشكل عام'
    ],
    allowCustom: true
  },
  {
    id: 'conversationTopic',
    label: 'ما المواضيع التي تريد التدريب عليها؟',
    type: 'multiple_choice',
    options: [
      'الحياة اليومية',
      'العمل والمهنة',
      'الدراسة والتعليم',
      'التكنولوجيا',
      'السفر',
      'الأخبار والمناقشات العامة'
    ],
    allowCustom: true
  },
  {
    id: 'correctionStyle',
    label: 'كيف تريد تصحيح أخطائك أثناء المحادثة؟',
    type: 'single_choice',
    options: [
      'تصحيح مباشر بعد كل جملة',
      'جمع الأخطاء ثم تصحيحها بعد انتهاء الرد',
      'تصحيح الأخطاء المهمة فقط'
    ],
    allowCustom: true
  },
  {
    id: 'explanationLanguage',
    label: 'بأي لغة تريد شرح التصحيحات؟',
    type: 'single_choice',
    options: [
      'بالإنجليزية فقط',
      'بالعربية',
      'بالإنجليزية مع شرح عربي مختصر'
    ],
    allowCustom: true
  },
  {
    id: 'practiceStyle',
    label: 'كيف تريد أن تكون طريقة التدريب؟',
    type: 'single_choice',
    options: [
      'المعلم يسأل وأنا أجيب',
      'محادثة طبيعية بين شخصين',
      'تمارين وأسئلة مع تصحيح'
    ],
    allowCustom: true
  },
  {
    id: 'specificTopic',
    label: 'هل لديك موضوع معين تريد بدء المحادثة عنه؟',
    type: 'text',
    placeholder: 'مثال: العمل، السفر، الهوايات، التكنولوجيا',
    allowCustom: true
  }
]
  },
  
  philosophyTeacher: {
    id: 'philosophy_teacher',
    title: 'مدرس فلسفة (Philosophy Teacher)',
    description: 'يبسط المفاهيم الفلسفية المعقدة بأسلوب يسهل فهمه مع أمثلة.',
    template: `I want you to act as a philosophy teacher. I will provide some topics related to the study of philosophy, and it will be your job to explain these concepts in an easy-to-understand manner. This could include providing examples, posing questions or breaking down complex ideas into smaller pieces that are easier to comprehend. My first request is "I need help understanding \${topic}."`,
   questions: [
  {
    id: 'philosophyTopic',
    label: 'ما الموضوع أو المفهوم الفلسفي الذي تريد فهمه؟',
    type: 'text',
    placeholder: 'مثال: الوجودية، الأخلاق، فلسفة العقل',
    allowCustom: true
  },
  {
    id: 'knowledgeLevel',
    label: 'ما مستوى معرفتك بالفلسفة؟',
    type: 'single_choice',
    options: [
      'مبتدئ ولا أملك معرفة سابقة',
      'لدي معرفة بسيطة وأريد التوسع',
      'لدي خلفية وأريد تحليلاً أعمق',
      'أدرس الفلسفة بشكل أكاديمي'
    ],
    allowCustom: true
  },
  {
    id: 'learningGoal',
    label: 'ما الهدف من فهم هذا الموضوع؟',
    type: 'multiple_choice',
    options: [
      'فهم الفكرة بشكل مبسط',
      'الدراسة والاستعداد للاختبار',
      'تحليل الأفكار والنظريات',
      'إجراء نقاش فلسفي',
      'ربط الفكرة بالحياة اليومية'
    ],
    allowCustom: true
  },
  {
    id: 'explanationStyle',
    label: 'كيف تفضل طريقة الشرح؟',
    type: 'multiple_choice',
    options: [
      'شرح مبسط خطوة بخطوة',
      'أمثلة من الحياة الواقعية',
      'مقارنة بين آراء الفلاسفة',
      'تحليل نقدي عميق',
      'أسئلة ونقاش تفاعلي'
    ],
    allowCustom: true
  },
  {
    id: 'philosopherFocus',
    label: 'هل تريد التركيز على فيلسوف أو مدرسة فلسفية معينة؟',
    type: 'choice_with_custom',
    options: [
      'فيلسوف محدد',
      'مدرسة فلسفية محددة',
      'مقارنة بين عدة فلاسفة',
      'لا يوجد تفضيل'
    ],
    allowCustom: true
  },
  {
    id: 'depthLevel',
    label: 'ما مستوى العمق الذي تريده في الشرح؟',
    type: 'single_choice',
    options: [
      'مختصر وسهل',
      'متوسط مع أمثلة',
      'تفصيلي وعميق'
    ],
    allowCustom: true
  }
]
  },
  
  mathTeacher: {
    id: 'math_teacher',
    title: 'مدرس رياضيات (Math Teacher)',
    description: 'يشرح المعادلات والمفاهيم الرياضية خطوة بخطوة مع تقنيات بصرية.',
    template: `I want you to act as a math teacher. I will provide some mathematical equations or concepts, and it will be your job to explain them in easy-to-understand terms. This could include providing step-by-step instructions for solving a problem, demonstrating various techniques with visuals or suggesting online resources for further study. My first request is "I need help understanding \${topic}."`,
    questions: [
  {
    id: 'mathTopic',
    label: 'ما الموضوع أو المفهوم الرياضي الذي تريد تعلمه؟',
    type: 'text',
    placeholder: 'مثال: التفاضل، التكامل، الاحتمالات',
    allowCustom: true
  },
  {
    id: 'educationLevel',
    label: 'ما مستواك الدراسي؟',
    type: 'single_choice',
    options: [
      'ابتدائي',
      'متوسط',
      'ثانوي',
      'جامعي',
      'أتعلم بشكل مستقل'
    ],
    allowCustom: true
  },
  {
    id: 'learningGoal',
    label: 'ما الذي تحتاج إليه؟',
    type: 'multiple_choice',
    options: [
      'فهم المفهوم',
      'حل المسائل',
      'الاستعداد لاختبار',
      'مراجعة سريعة',
      'تصحيح أخطائي'
    ],
    allowCustom: true
  },
  {
    id: 'difficulty',
    label: 'كيف تقيّم مستواك في هذا الموضوع؟',
    type: 'single_choice',
    options: [
      'لا أعرف عنه شيئاً',
      'أعرف الأساسيات',
      'متوسط',
      'متقدم'
    ],
    allowCustom: true
  },
  {
    id: 'explanationStyle',
    label: 'كيف تفضل أن يتم الشرح؟',
    type: 'multiple_choice',
    options: [
      'شرح خطوة بخطوة',
      'أمثلة محلولة',
      'رسوم أو توضيحات',
      'تبسيط الفكرة أولاً ثم التطبيق',
      'تمارين بعد كل جزء'
    ],
    allowCustom: true
  },
  {
    id: 'exerciseSupport',
    label: 'هل لديك مسألة معينة تريد حلها؟',
    type: 'choice_with_custom',
    options: [
      'نعم',
      'لا، أريد شرحاً عاماً'
    ],
    allowCustom: true
  },
  {
    id: 'responseLength',
    label: 'ما مستوى التفاصيل الذي تفضله؟',
    type: 'single_choice',
    options: [
      'مختصر',
      'متوسط',
      'تفصيلي'
    ],
    allowCustom: true
  }
]
  },

  bookSummarizer: {
    id: 'book_summarizer',
    title: 'ملخص كتب (Book Summarizer)',
    description: 'يقدم لك ملخصاً تفصيلياً لأي كتاب مع الأمثلة والتطبيقات الأساسية.',
    template: `I want you to act as a book summarizer. Provide a detailed summary of \${bookname}. Include all major topics discussed in the book and for each major concept discussed include - Topic Overview, Examples, Application and the Key Takeaways. Structure the response with headings for each topic and subheadings for the examples, and keep the summary to around 800 words.`,
    questions: [
  {
    id: 'bookName',
    label: 'ما اسم الكتاب الذي تريد تلخيصه؟',
    type: 'text',
    placeholder: 'مثال: Atomic Habits',
    allowCustom: true
  },
  {
    id: 'summaryPurpose',
    label: 'لماذا تريد تلخيص هذا الكتاب؟',
    type: 'multiple_choice',
    options: [
      'فهم الكتاب بسرعة',
      'الاستعداد لاختبار',
      'استخراج أهم الأفكار',
      'تطبيق الأفكار عملياً',
      'مراجعة قبل القراءة مرة أخرى'
    ],
    allowCustom: true
  },
  {
    id: 'summaryDepth',
    label: 'ما مستوى التفاصيل الذي تريده؟',
    type: 'single_choice',
    options: [
      'مختصر جداً',
      'ملخص متوسط',
      'ملخص تفصيلي'
    ],
    allowCustom: true
  },
  {
    id: 'focusAreas',
    label: 'على ماذا تريد أن يركز الملخص؟',
    type: 'multiple_choice',
    options: [
      'الأفكار الرئيسية',
      'الأمثلة',
      'الدروس المستفادة',
      'النصائح العملية',
      'الاقتباسات المهمة',
      'النقد والتحليل'
    ],
    allowCustom: true
  },
  {
    id: 'outputStyle',
    label: 'كيف تفضل عرض الملخص؟',
    type: 'single_choice',
    options: [
      'عناوين ونقاط',
      'شرح متسلسل',
      'ملخص منظم حسب الفصول'
    ],
    allowCustom: true
  },
  {
    id: 'readingStatus',
    label: 'هل قرأت الكتاب من قبل؟',
    type: 'single_choice',
    options: [
      'لم أقرأه',
      'قرأت جزءاً منه',
      'قرأته كاملاً'
    ],
    allowCustom: true
  },
  {
    id: 'extraNeeds',
    label: 'هل هناك شيء معين تريد إضافته في الملخص؟',
    type: 'choice_with_custom',
    options: [
      'أسئلة للمراجعة',
      'تطبيقات عملية',
      'أمثلة إضافية',
      'لا شيء'
    ],
    allowCustom: true
  }
]
  },

  studyPlanner: {
    id: 'study_planner',
    title: 'مخطط دراسي (Study Planner)',
    description: 'يصمم لك خطة دراسية مخصصة تناسب وقتك ومسؤولياتك.',
    template: `I want you to act as an advanced study plan generator. Imagine you are an expert in education and mental health, tasked with developing personalized study plans for students to help improve their academic performance and overall well-being. Take into account the students' courses: \${courses}, available time: \${time}, responsibilities: \${responsibilities}, and deadlines: \${deadlines} to generate a study plan.`,
   questions: [
  {
    id: 'courses',
    label: 'ما المواد أو الدورات التي تريد الدراسة لها؟',
    type: 'text',
    placeholder: 'مثال: رياضيات، برمجة، قواعد بيانات',
    allowCustom: true
  },
  {
    id: 'studyGoal',
    label: 'ما الهدف من هذه الخطة؟',
    type: 'multiple_choice',
    options: [
      'النجاح في الاختبارات',
      'الحصول على درجات عالية',
      'فهم المواد بعمق',
      'إكمال المنهج',
      'الاستعداد لمشروع أو اختبار مهم'
    ],
    allowCustom: true
  },
  {
    id: 'availableTime',
    label: 'كم الوقت الذي تستطيع تخصيصه للدراسة؟',
    type: 'single_choice',
    options: [
      'أقل من ساعة يومياً',
      '1 - 2 ساعة',
      '2 - 4 ساعات',
      'أكثر من 4 ساعات',
      'يختلف من يوم لآخر'
    ],
    allowCustom: true
  },
  {
    id: 'studyDays',
    label: 'في أي الأيام تستطيع الدراسة؟',
    type: 'multiple_choice',
    options: [
      'السبت',
      'الأحد',
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة'
    ],
    allowCustom: true
  },
  {
    id: 'learningStyle',
    label: 'ما الطريقة التي تساعدك على التعلم أكثر؟',
    type: 'multiple_choice',
    options: [
      'حل التمارين',
      'مشاهدة الشروحات',
      'القراءة',
      'التلخيص',
      'التطبيق العملي',
      'المراجعة المتكررة'
    ],
    allowCustom: true
  },
  {
    id: 'responsibilities',
    label: 'هل لديك التزامات أخرى تؤثر على وقت الدراسة؟',
    type: 'choice_with_custom',
    options: [
      'عمل',
      'جامعة أو مدرسة',
      'مسؤوليات عائلية',
      'لا توجد التزامات مؤثرة'
    ],
    allowCustom: true
  },
  {
    id: 'deadlines',
    label: 'هل لديك مواعيد نهائية أو اختبارات قريبة؟',
    type: 'choice_with_custom',
    options: [
      'خلال أسبوع',
      'خلال شهر',
      'أكثر من شهر',
      'لا يوجد موعد محدد'
    ],
    allowCustom: true
  },
  {
    id: 'studyIntensity',
    label: 'كيف تريد أن تكون الخطة الدراسية؟',
    type: 'single_choice',
    options: [
      'خفيفة وسهلة',
      'متوازنة',
      'مكثفة'
    ],
    allowCustom: true
  }
]
  },

  articleSummarizer: {
    id: 'article_summarizer',
    title: 'ملخص مقالات (Article Summary and Comprehension)',
    description: 'يستخرج النقاط الرئيسية ويلخص المقالات الطويلة مع التركيز على الأمثلة الهامة.',
    template: `Act as an Article Summarizer and Comprehension Expert. You are skilled in extracting key information from written content and providing insightful summaries.

Your task is to summarize the article titled '\${articleTitle}' and provide a comprehensive understanding of its content. 

Here is the content of the article:
\${articleContent}

You will:
- Identify and list key points and arguments presented in the article
- Provide a summary in your own words to capture the essence of the article
- Highlight any significant examples or case studies`,
   questions: [
  {
    id: 'articleSource',
    label: 'كيف تريد إدخال المقال؟',
    type: 'single_choice',
    options: [
      'لدي رابط للمقال',
      'سألصق نص المقال',
      'سأرفع الملف لاحقاً'
    ],
    allowCustom: true
  },
  {
    id: 'summaryGoal',
    label: 'ما الهدف من التلخيص؟',
    type: 'multiple_choice',
    options: [
      'فهم الفكرة العامة',
      'الدراسة والمراجعة',
      'استخراج أهم النقاط',
      'تحليل المقال',
      'توفير الوقت'
    ],
    allowCustom: true
  },
  {
    id: 'summaryDepth',
    label: 'ما مستوى التفاصيل الذي تريده؟',
    type: 'single_choice',
    options: [
      'مختصر جداً',
      'ملخص متوسط',
      'تفصيلي'
    ],
    allowCustom: true
  },
  {
    id: 'focusAreas',
    label: 'على ماذا تريد أن يركز الملخص؟',
    type: 'multiple_choice',
    options: [
      'الأفكار الرئيسية',
      'الأمثلة',
      'النتائج',
      'البيانات والإحصائيات',
      'الاستنتاجات',
      'التوصيات'
    ],
    allowCustom: true
  },
  {
    id: 'outputStyle',
    label: 'كيف تفضل عرض الملخص؟',
    type: 'single_choice',
    options: [
      'نقاط مختصرة',
      'شرح متسلسل',
      'عناوين رئيسية وفرعية',
      'جدول منظم'
    ],
    allowCustom: true
  },
  {
    id: 'extraNeeds',
    label: 'هل تريد إضافة شيء إلى الملخص؟',
    type: 'multiple_choice',
    options: [
      'شرح المصطلحات',
      'أسئلة للمراجعة',
      'أمثلة إضافية',
      'تقييم نقدي للمقال',
      'لا شيء'
    ],
    allowCustom: true
  },
  {
    id: 'articleContent',
    label: 'ألصق نص المقال أو رابطه',
    type: 'text',
    placeholder: 'ألصق النص أو الرابط هنا',
    allowCustom: true
  }
]
  }
};
