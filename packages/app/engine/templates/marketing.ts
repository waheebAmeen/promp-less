export const marketingPrompts = {
  seoSpecialist: {
    id: 'seo_specialist',
    title: 'خبير تحسين محركات البحث (SEO Specialist)',
    description: 'يساعدك في استراتيجيات تحسين محركات البحث (SEO) والكلمات المفتاحية لموقعك.',
    template: `I want you to act as an SEO specialist. I will provide you with search engine optimization-related queries or scenarios, and you will respond with relevant SEO advice or recommendations. Your responses should focus solely on SEO strategies, techniques, and insights. Do not provide general marketing advice or explanations in your replies. Help me optimize \${topic} for \${targetAudience}. Our main goal is \${goal}. Focus on these areas: \${focusAreas}.`,
    questions: [
      {
        id: 'topic',
        label: 'ما هو الموضوع أو الموقع الذي تريد تحسينه؟',
        type: 'text',
        placeholder: 'مثال: موقع تجارة إلكترونية، مقال عن الصحة',
        allowCustom: true
      },
      {
        id: 'targetAudience',
        label: 'من هو الجمهور المستهدف؟',
        type: 'text',
        placeholder: 'مثال: الشباب في السعودية، المهتمين بالتقنية',
        allowCustom: true
      },
      {
        id: 'goal',
        label: 'ما هو الهدف الرئيسي من الـ SEO؟',
        type: 'single_choice',
        options: [
          'زيادة الزيارات العضوية (Organic Traffic)',
          'تحسين تصنيف كلمات مفتاحية معينة',
          'زيادة المبيعات والتحويلات (Conversions)',
          'بناء روابط خلفية (Backlinks)'
        ],
        allowCustom: true
      },
      {
        id: 'focusAreas',
        label: 'ما هي الجوانب التي تريد التركيز عليها؟',
        type: 'multiple_choice',
        options: [
          'SEO داخلي (On-page SEO)',
          'SEO تقني (Technical SEO)',
          'SEO خارجي (Off-page SEO)',
          'بحث الكلمات المفتاحية (Keyword Research)',
          'تحسين المحتوى'
        ],
        allowCustom: true
      }
    ]
  },
  
  brandingStrategist: {
    id: 'branding_strategist',
    title: 'خبير بناء العلامة التجارية (Branding Strategist)',
    description: 'يساعدك في بناء هوية بصرية واستراتيجية لعلامتك التجارية.',
    template: `You are a creative branding strategist, specializing in helping small businesses establish a strong and memorable brand identity. When given information about a business's values, target audience, and industry, you generate branding ideas that include logo concepts, color palettes, tone of voice, and marketing strategies. You also suggest ways to differentiate the brand from competitors and build a loyal customer base through consistent and innovative branding efforts. My business is in the \${industry} industry. Our values are: \${values}. Our target audience is \${audience}. Can you help us with: \${requirements}?`,
    questions: [
      {
        id: 'industry',
        label: 'ما هو مجال عملك (الصناعة)؟',
        type: 'text',
        placeholder: 'مثال: مقهى مختص، شركة برمجيات، متجر أزياء',
        allowCustom: true
      },
      {
        id: 'values',
        label: 'ما هي القيم الأساسية لعلامتك التجارية؟',
        type: 'multiple_choice',
        options: [
          'الابتكار والتطور',
          'الجودة العالية والفخامة',
          'البساطة وسهولة الاستخدام',
          'الاستدامة وصديقة للبيئة',
          'السرعة والكفاءة'
        ],
        allowCustom: true
      },
      {
        id: 'audience',
        label: 'من هو جمهورك المستهدف؟',
        type: 'text',
        placeholder: 'مثال: المحترفين، الأمهات الجدد، الطلاب',
        allowCustom: true
      },
      {
        id: 'requirements',
        label: 'ما هي العناصر التي تحتاج المساعدة فيها؟',
        type: 'multiple_choice',
        options: [
          'أفكار للشعار (Logo Concepts)',
          'لوحة الألوان (Color Palette)',
          'نبرة الصوت (Tone of Voice)',
          'استراتيجية التسويق (Marketing Strategy)',
          'أفكار للتميز عن المنافسين'
        ],
        allowCustom: true
      }
    ]
  },

  emailMarketing: {
    id: 'email_marketing',
    title: 'متخصص التسويق عبر الإيميل (Email Marketing)',
    description: 'يساعدك في كتابة وتجهيز حملات التسويق عبر البريد الإلكتروني.',
    template: `Act as an email marketing specialist who is advising a company on their email marketing flow. Develop a step-by-step guide and write the email copy for creating an effective email marketing campaign for \${product}. The goal of the campaign is \${goal}. The target audience is \${audience}. Make the tone of the emails \${tone}. Include \${emailCount} emails in the sequence.`,
    questions: [
      {
        id: 'product',
        label: 'ما هو المنتج أو الخدمة التي تسوق لها؟',
        type: 'text',
        placeholder: 'مثال: دورة تدريبية عبر الإنترنت، منتج تجميل',
        allowCustom: true
      },
      {
        id: 'goal',
        label: 'ما هو الهدف من حملة الإيميل؟',
        type: 'single_choice',
        options: [
          'الترحيب بالمشتركين الجدد (Welcome Series)',
          'استعادة السلات المتروكة (Abandoned Cart)',
          'إطلاق منتج جديد (Product Launch)',
          'تثقيف العملاء وزيادة الولاء (Nurturing)',
          'زيادة المبيعات المباشرة'
        ],
        allowCustom: true
      },
      {
        id: 'audience',
        label: 'من هو الجمهور المستهدف؟',
        type: 'text',
        placeholder: 'مثال: المشتركين السابقين، عملاء محتملين',
        allowCustom: true
      },
      {
        id: 'tone',
        label: 'ما هي نبرة الصوت المطلوبة؟',
        type: 'single_choice',
        options: [
          'احترافية ورسمية',
          'ودية وغير رسمية',
          'متحمسة ومقنعة',
          'قصصية (Storytelling)'
        ],
        allowCustom: true
      },
      {
        id: 'emailCount',
        label: 'كم عدد الإيميلات في هذه السلسلة؟',
        type: 'single_choice',
        options: [
          'إيميل واحد فقط',
          'سلسلة من 3 إيميلات',
          'سلسلة من 5 إيميلات',
          'سلسلة من 7 إيميلات'
        ],
        allowCustom: true
      }
    ]
  },

  digitalMarketing: {
    id: 'digital_marketing',
    title: 'مخطط حملات تسويقية (Digital Campaign Strategist)',
    description: 'يصمم لك خطة تسويق رقمية شاملة لحملتك الإعلانية.',
    template: `Act as a Digital Marketing Strategist. Your role is to create a comprehensive online marketing strategy for \${business}. The strategy should target \${audience}. The main objective of this campaign is \${objective}. The strategy should include the following platforms: \${platforms}. Please outline the campaign phases, key messaging, recommended budget allocation, and the key performance indicators (KPIs) to track success.`,
    questions: [
      {
        id: 'business',
        label: 'ما هو اسم وطبيعة عملك؟',
        type: 'text',
        placeholder: 'مثال: متجر لبيع الملابس الرياضية',
        allowCustom: true
      },
      {
        id: 'audience',
        label: 'من هو الجمهور المستهدف؟',
        type: 'text',
        placeholder: 'مثال: الرياضيين والمهتمين باللياقة البدنية',
        allowCustom: true
      },
      {
        id: 'objective',
        label: 'ما هو الهدف الرئيسي من الحملة؟',
        type: 'single_choice',
        options: [
          'زيادة الوعي بالعلامة التجارية (Brand Awareness)',
          'جلب عملاء محتملين (Lead Generation)',
          'زيادة المبيعات (Sales/Conversions)',
          'زيادة التفاعل والمتابعين',
          'تحميل تطبيق الجوال'
        ],
        allowCustom: true
      },
      {
        id: 'platforms',
        label: 'ما هي المنصات التي ترغب في التركيز عليها؟',
        type: 'multiple_choice',
        options: [
          'إنستغرام (Instagram)',
          'تيك توك (TikTok)',
          'إعلانات جوجل (Google Ads)',
          'إعلانات سناب شات (Snapchat Ads)',
          'تويتر / إكس (X / Twitter)',
          'لينكد إن (LinkedIn)'
        ],
        allowCustom: true
      }
    ]
  }
};
