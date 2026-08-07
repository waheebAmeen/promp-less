export const marketingPrompts = {
  // 1. قالب استراتيجية منصات التواصل الاجتماعي
  social_media_strategy: {
    id: 'marketing_social_strategy',
    title: 'مخطط استراتيجية السوشيال ميديا',
    description: 'خطة محتوى احترافية ومجدولة لمنصات التواصل الاجتماعي',
    template: `Act as an elite Digital Marketing Strategist. Create a highly engaging social media content strategy for a \${businessType}. The primary objective of this campaign is \${campaignGoal}. The target audience is \${targetAudience}. The tone of voice should be \${toneOfVoice}. Please focus on \${platformFocus}. Provide a structured 7-day content calendar, including content pillars, post formats (e.g., reels, carousels), and specific hooks to grab attention.`,
    questions: [
      {
        id: "businessType",
        title_ar: "نوع النشاط التجاري",
        title_en: "Business Type",
        type: "select",
        options: [
          { label_ar: "متجر إلكتروني (منتجات ملموسة)", label_en: "E-commerce Store", value: "modern e-commerce brand selling physical products" },
          { label_ar: "خدمات رقمية أو تطبيق", label_en: "Tech/SaaS Startup", value: "tech startup offering innovative digital services" },
          { label_ar: "علامة تجارية شخصية (صناع المحتوى)", label_en: "Personal Brand", value: "personal brand for a thought leader and content creator" },
          { label_ar: "خدمات محلية (مطعم، مقهى، صالون)", label_en: "Local Business", value: "local business focusing on community foot traffic" }
        ]
      },
      {
        id: "campaignGoal",
        title_ar: "الهدف من الخطة",
        title_en: "Campaign Goal",
        type: "select",
        options: [
          { label_ar: "زيادة الوعي والانتشار", label_en: "Brand Awareness", value: "maximizing brand awareness, virality, and organic reach" },
          { label_ar: "زيادة المبيعات والعملاء", label_en: "Sales & Leads", value: "driving direct sales, generating leads, and high conversion rates" },
          { label_ar: "تثقيف الجمهور وبناء الثقة", label_en: "Education & Trust", value: "educating the audience and establishing industry authority" }
        ]
      },
      {
        id: "targetAudience",
        title_ar: "الجمهور المستهدف",
        title_en: "Target Audience",
        type: "select",
        options: [
          { label_ar: "الشباب وجيل Z (18-24)", label_en: "Gen Z & Youth", value: "Gen Z and young adults who are highly engaged with fast-paced trends" },
          { label_ar: "المحترفون والموظفون (B2B)", label_en: "Professionals (B2B)", value: "B2B professionals, decision-makers, and corporate employees" },
          { label_ar: "الآباء والأمهات", label_en: "Parents & Families", value: "parents looking for reliable, safe, and family-oriented solutions" }
        ]
      },
      {
        id: "toneOfVoice",
        title_ar: "نبرة الصوت (Tone of Voice)",
        title_en: "Tone of Voice",
        type: "select",
        options: [
          { label_ar: "عفوية، مرحة وتريند", label_en: "Casual & Trendy", value: "witty, casual, relatable, and highly engaging with internet culture" },
          { label_ar: "احترافية ورسمية", label_en: "Professional", value: "professional, authoritative, clear, and trustworthy" },
          { label_ar: "عاطفية وملهمة", label_en: "Emotional & Inspiring", value: "inspirational, empathetic, story-driven, and emotionally engaging" }
        ]
      },
      {
        id: "platformFocus",
        title_ar: "المنصات المستهدفة",
        title_en: "Target Platforms",
        type: "select",
        options: [
          { label_ar: "تيك توك وإنستغرام ريلز (فيديو قصير)", label_en: "TikTok & Reels", value: "TikTok and Instagram Reels, prioritizing short-form viral videos" },
          { label_ar: "إنستغرام (بوستات، كاروسيل، ستوري)", label_en: "Instagram Full", value: "Instagram grid, carousels, and stories for visual storytelling" },
          { label_ar: "لينكد إن وإكس (تويتر)", label_en: "LinkedIn & X", value: "LinkedIn and X (Twitter), focusing on text-based thought leadership" }
        ]
      }
    ]
  },

  // 2. قالب كاتب مقالات متوافقة مع الـ SEO
  seo_article_writer: {
    id: 'marketing_seo_writer',
    title: 'كاتب مقالات SEO محترف',
    description: 'توليد مقال متوافق مع محركات البحث يتصدر النتائج',
    template: `Act as an expert SEO Copywriter and Content Marketer. Write a comprehensive, SEO-optimized blog post about "\${articleTopic}". The primary target keyword is "\${primaryKeyword}". The article length should be \${articleLength}. The tone should be \${writingStyle}. Format the article properly using H1, H2, and H3 tags. Ensure the content is structured for readability with short paragraphs and bullet points. Include an engaging introduction that hooks the reader, and a compelling conclusion with a call-to-action.`,
    questions: [
      {
        id: "articleTopic",
        title_ar: "موضوع المقال العام",
        title_en: "Article Topic",
        type: "select",
        options: [
          { label_ar: "دليل شامل (كيف تقوم بـ...)", label_en: "How-To Guide", value: "a comprehensive step-by-step how-to guide" },
          { label_ar: "مقارنة ومراجعة منتجات", label_en: "Product Review", value: "an in-depth comparison and review of products/services" },
          { label_ar: "نصائح وأفضل الممارسات", label_en: "Tips & Best Practices", value: "actionable tips, tricks, and industry best practices" }
        ]
      },
      {
        id: "primaryKeyword",
        title_ar: "كثافة الكلمة المفتاحية",
        title_en: "Keyword Strategy",
        type: "select",
        options: [
          { label_ar: "كلمة مفتاحية رئيسية (بحث عالي)", label_en: "Broad Keyword", value: "a high-volume broad industry keyword" },
          { label_ar: "كلمة مفتاحية طويلة (Long-tail)", label_en: "Long-tail Keyword", value: "a highly specific long-tail keyword with high purchase intent" }
        ]
      },
      {
        id: "articleLength",
        title_ar: "طول المقال",
        title_en: "Article Length",
        type: "select",
        options: [
          { label_ar: "مقال قصير (500-800 كلمة)", label_en: "Short (500-800 words)", value: "around 500 to 800 words, concise and to the point" },
          { label_ar: "مقال متوسط (1000-1500 كلمة)", label_en: "Medium (1000-1500 words)", value: "around 1000 to 1500 words, covering the topic thoroughly" },
          { label_ar: "مقال طويل/دليل شامل (+2000 كلمة)", label_en: "Long-form (2000+ words)", value: "a long-form pillar post of 2000+ words, highly detailed" }
        ]
      },
      {
        id: "writingStyle",
        title_ar: "أسلوب الكتابة",
        title_en: "Writing Style",
        type: "select",
        options: [
          { label_ar: "معلوماتي وموثوق", label_en: "Informative & Authoritative", value: "authoritative, data-driven, and highly informative" },
          { label_ar: "محادثة وودي", label_en: "Conversational & Friendly", value: "conversational, friendly, and easy to understand for beginners" }
        ]
      }
    ]
  },

  // 3. قالب كاتب الإعلانات الممولة
  ad_copywriter: {
    id: 'marketing_ad_copy',
    title: 'خبير الإعلانات الممولة (Ad Copy)',
    description: 'كتابة نصوص إعلانية ذات معدل تحويل عالي (Conversion)',
    template: `Act as a world-class Direct Response Copywriter. Write high-converting ad copy for \${adPlatform}. The product/service is a \${productType}. The ad needs to address the audience's main pain point: \${painPoint}, and present our offer as the ultimate solution. Use the \${copywritingFramework} framework. Include a strong headline, engaging primary text, and a clear Call-To-Action (CTA) focused on \${callToAction}. Add appropriate emojis to increase engagement.`,
    questions: [
      {
        id: "adPlatform",
        title_ar: "منصة الإعلان",
        title_en: "Ad Platform",
        type: "select",
        options: [
          { label_ar: "إعلانات فيسبوك وإنستغرام", label_en: "Facebook/Instagram Ads", value: "Facebook and Instagram Ads" },
          { label_ar: "إعلانات جوجل (بحث)", label_en: "Google Search Ads", value: "Google Search Ads (strictly text-based with character limits in mind)" },
          { label_ar: "إعلانات تيك توك", label_en: "TikTok Ads", value: "TikTok Ads (fast-paced, high energy script format)" }
        ]
      },
      {
        id: "productType",
        title_ar: "نوع المنتج المعروض",
        title_en: "Product Type",
        type: "select",
        options: [
          { label_ar: "منتج مادي (أزياء، إلكترونيات...)", label_en: "Physical Product", value: "trending physical consumer product" },
          { label_ar: "خدمة أو استشارة", label_en: "Service/Consultation", value: "premium professional service or consultation" },
          { label_ar: "كورس أو منتج رقمي", label_en: "Digital Product/Course", value: "digital course, ebook, or software product" }
        ]
      },
      {
        id: "painPoint",
        title_ar: "المشكلة التي يحلها المنتج (Pain Point)",
        title_en: "Audience Pain Point",
        type: "select",
        options: [
          { label_ar: "توفير الوقت والجهد", label_en: "Saves Time/Effort", value: "wasting too much time and needing a faster, easier solution" },
          { label_ar: "توفير المال / زيادة الدخل", label_en: "Money Focused", value: "losing money or wanting to increase their income/savings" },
          { label_ar: "الراحة النفسية والثقة", label_en: "Peace of Mind", value: "feeling stressed, insecure, and needing peace of mind or confidence" }
        ]
      },
      {
        id: "copywritingFramework",
        title_ar: "هيكلية الإعلان (Framework)",
        title_en: "Copywriting Framework",
        type: "select",
        options: [
          { label_ar: "AIDA (انتباه، اهتمام، رغبة، فعل)", label_en: "AIDA", value: "AIDA (Attention, Interest, Desire, Action)" },
          { label_ar: "PAS (مشكلة، تضخيم، حل)", label_en: "PAS", value: "PAS (Problem, Agitation, Solution)" },
          { label_ar: "قصة ونجاح (Storytelling)", label_en: "Storytelling", value: "Storytelling (Before and After transformation)" }
        ]
      },
      {
        id: "callToAction",
        title_ar: "الإجراء المطلوب (CTA)",
        title_en: "Call To Action",
        type: "select",
        options: [
          { label_ar: "الشراء الآن (مع خصم)", label_en: "Buy Now (Discount)", value: "immediate purchase with a limited-time discount code" },
          { label_ar: "تسجيل / اشتراك مجاني", label_en: "Sign Up / Free Trial", value: "signing up for a free trial or lead magnet" },
          { label_ar: "معرفة المزيد / تواصل معنا", label_en: "Learn More", value: "clicking to learn more details on the landing page" }
        ]
      }
    ]
  },
  emailMarketingCampaign: {
    id: 'email_campaign_builder',
    title: 'خبير التسويق عبر البريد الإلكتروني (Email Marketing Expert)',
    description: 'إنشاء سلسلة رسائل بريد إلكتروني تفاعلية لتحويل العملاء المحتملين إلى مشترين.',
    template: 'Act as an expert Email Marketer and Copywriter. I need a ${sequenceType} email sequence for my ${businessType}. The main goal is to ${goal}. The target audience is ${audience}. Write ${emailCount} emails in a ${tone} tone. For each email, provide an attention-grabbing subject line, preview text, body content, and a clear Call To Action (CTA).',
    questions: [
      { id: 'sequenceType', label: 'ما هو نوع سلسلة الإيميلات؟', type: 'single_choice', options: ['سلسلة ترحيبية (Welcome)', 'عربة متروكة (Abandoned Cart)', 'إطلاق منتج', 'نشرة أسبوعية (Newsletter)'], allowCustom: true },
      { id: 'businessType', label: 'ما هو نوع نشاطك التجاري؟', type: 'text', placeholder: 'مثال: متجر إلكتروني، منصة دورات', allowCustom: true },
      { id: 'goal', label: 'ما هو الهدف الرئيسي من السلسلة؟', type: 'text', placeholder: 'مثال: زيادة المبيعات، بناء الثقة، دعوة لحدث', allowCustom: true },
      { id: 'audience', label: 'من هو الجمهور المستهدف؟', type: 'text', placeholder: 'مثال: العملاء الجدد، المشتركون الحاليون', allowCustom: true },
      { id: 'emailCount', label: 'كم عدد الإيميلات المطلوبة؟', type: 'single_choice', options: ['3 رسائل', '5 رسائل', '7 رسائل'], allowCustom: true },
      { id: 'tone', label: 'ما هي نبرة الصوت للإيميلات؟', type: 'single_choice', options: ['ودود وشخصي (Friendly)', 'احترافي ورسمي (Professional)', 'مستعجل ومحفز (Urgency/FOMO)'], allowCustom: true }
    ]
  },

  productLaunchExpert: {
    id: 'product_launch_expert',
    title: 'مخطط إطلاق المنتجات (Product Launch Strategist)',
    description: 'وضع خطة تسويقية متكاملة لإطلاق منتج أو خدمة جديدة في السوق بنجاح.',
    template: 'Act as a Product Marketing Manager. I am launching a new ${productType} targeted at ${audience}. Our primary unique selling proposition (USP) is ${usp}. The launch timeline is ${timeline}. Please create a comprehensive launch strategy including pre-launch teaser ideas, launch day activities, and post-launch follow-up. Suggest marketing channels focusing on ${channels}.',
    questions: [
      { id: 'productType', label: 'ما هو المنتج أو الخدمة الجديدة؟', type: 'text', placeholder: 'مثال: تطبيق توصيل جديد، عطر فاخر', allowCustom: true },
      { id: 'audience', label: 'من هي الفئة المستهدفة للمنتج؟', type: 'text', placeholder: 'مثال: رواد الأعمال، طلاب الجامعات', allowCustom: true },
      { id: 'usp', label: 'ما هي الميزة التنافسية (USP) للمنتج؟', type: 'text', placeholder: 'مثال: الأسرع في السوق، سعر منافس، جودة عالية', allowCustom: true },
      { id: 'timeline', label: 'ما هي المدة الزمنية لخطة الإطلاق؟', type: 'single_choice', options: ['أسبوعين', 'شهر واحد', '3 أشهر'], allowCustom: true },
      { id: 'channels', label: 'ما هي القنوات التسويقية المفضلة؟', type: 'multiple_choice', options: ['السوشيال ميديا', 'الإعلانات الممولة', 'التسويق بالعمولة / المؤثرين', 'العلاقات العامة (PR)'], allowCustom: true }
    ]
  },

  brandStrategist: {
    id: 'brand_strategist',
    title: 'خبير بناء العلامة التجارية (Brand Strategist)',
    description: 'يساعدك في تحديد شخصية علامتك التجارية، قيمها الأساسية، وميزتها التنافسية (Brand Positioning).',
    template: 'Act as a Brand Strategist. I need help defining the brand identity and positioning for my ${businessType} in the ${industry} industry. Our core values are ${coreValues}. Our main competitors are ${competitors}. Please provide a comprehensive Brand Positioning Statement, a Brand Persona description, Tone of Voice guidelines, and 3 content pillars that reflect our identity. The overall vibe should be ${vibe}.',
    questions: [
      { id: 'businessType', label: 'ما هو اسم وطبيعة المشروع؟', type: 'text', placeholder: 'مثال: مقهى مختص، شركة برمجيات', allowCustom: true },
      { id: 'industry', label: 'ما هو القطاع أو الصناعة؟', type: 'text', placeholder: 'مثال: الأغذية والمشروبات، التكنولوجيا', allowCustom: true },
      { id: 'coreValues', label: 'ما هي القيم الأساسية للعلامة؟', type: 'text', placeholder: 'مثال: الابتكار، الاستدامة، الشفافية', allowCustom: true },
      { id: 'competitors', label: 'من هم أبرز المنافسين؟', type: 'text', placeholder: 'اذكر أسماء أو أنواع المنافسين', allowCustom: true },
      { id: 'vibe', label: 'ما هو الانطباع العام (Vibe) المطلوب؟', type: 'single_choice', options: ['فخم وحصري (Luxury/Exclusive)', 'شعبي واقتصادي (Mass Market)', 'شبابي ومبتكر (Trendy/Innovative)', 'كلاسيكي وموثوق (Classic/Trusted)'], allowCustom: true }
    ]
  }
};