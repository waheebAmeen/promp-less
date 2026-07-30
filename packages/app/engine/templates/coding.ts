export const codingPrompts = {
  fullstackDeveloper: {
    id: 'fullstack_developer',
    title: 'مطور Full Stack (Fullstack Software Developer)',
    description: 'يساعدك في بناء تطبيقات ويب كاملة من الواجهة الأمامية إلى الخلفية.',
    template: 'I want you to act as a fullstack software developer. I will provide some details about the requirements of a web application, and it will be your job to come up with an architecture and code for developing secure app with ${techStack}. The app should include ${features}. Please provide the project structure, database schema, API endpoints, and frontend components.',
    questions: [
      { id: 'techStack', label: 'ما هي التقنيات المفضلة؟', type: 'text', placeholder: 'مثال: React, Node.js, PostgreSQL', allowCustom: true },
      { id: 'features', label: 'ما هي الميزات المطلوبة؟', type: 'text', placeholder: 'مثال: تسجيل دخول، لوحة تحكم، إشعارات', allowCustom: true },
      { id: 'experience', label: 'ما هو مستوى الخبرة؟', type: 'single_choice', options: ['مبتدئ','متوسط','متقدم'], allowCustom: true },
      { id: 'focus', label: 'ما هو التركيز الرئيسي؟', type: 'single_choice', options: ['الأداء','الأمان','قابلية التوسع','سهولة الصيانة'], allowCustom: true }
    ]
  },

  codeReviewer: {
    id: 'code_reviewer',
    title: 'مراجع كود (Code Reviewer)',
    description: 'يقوم بمراجعة الكود الخاص بك واقتراح تحسينات وإصلاح الأخطاء.',
    template: 'I want you to act as a code reviewer. I will provide you with code snippets and you will review them for quality, security, and best practices. Please analyze the following ${language} code: ${code}. Focus on ${focusAreas} and suggest improvements.',
    questions: [
      { id: 'language', label: 'ما هي لغة البرمجة؟', type: 'text', placeholder: 'مثال: JavaScript, Python, Java', allowCustom: true },
      { id: 'code', label: 'الكود المراد مراجعته:', type: 'text', placeholder: 'ألصق الكود هنا...', allowCustom: true },
      { id: 'focusAreas', label: 'ما هي مجالات التركيز؟', type: 'multiple_choice', options: ['جودة الكود','الأمان','الأداء','قابلية القراءة','الاختبارات'], allowCustom: true }
    ]
  },

  bugFixer: {
    id: 'bug_fixer',
    title: 'مصحح أخطاء (Bug Fixer)',
    description: 'يساعدك في العثور على الأخطاء وإصلاحها في الكود الخاص بك.',
    template: 'I want you to act as a bug fixer. I will provide you with code that has bugs and you will help me identify and fix them. Here is the ${language} code: ${code}. The expected behavior is ${expectedBehavior} but the actual behavior is ${actualBehavior}.',
    questions: [
      { id: 'language', label: 'ما هي لغة البرمجة؟', type: 'text', placeholder: 'مثال: Python, JavaScript', allowCustom: true },
      { id: 'code', label: 'الكود الذي يحتوي على خطأ:', type: 'text', placeholder: 'ألصق الكود هنا...', allowCustom: true },
      { id: 'expectedBehavior', label: 'ما هو السلوك المتوقع؟', type: 'text', placeholder: 'مثال: يجب أن يعرض قائمة المستخدمين', allowCustom: true },
      { id: 'actualBehavior', label: 'ما هو السلوك الفعلي؟', type: 'text', placeholder: 'مثال: يظهر خطأ في السطر 15', allowCustom: true }
    ]
  },

  algorithmExpert: {
    id: 'algorithm_expert',
    title: 'خبير خوارزميات (Algorithm Expert)',
    description: 'يساعدك في تصميم وتحليل الخوارزميات وهياكل البيانات.',
    template: 'I want you to act as an algorithm expert. I need help with ${problem}. Please provide an efficient algorithm in ${language}, explain the time and space complexity, and provide a step-by-step explanation.',
    questions: [
      { id: 'problem', label: 'ما هي المشكلة التي تريد حلها؟', type: 'text', placeholder: 'مثال: فرز مصفوفة، البحث في شجرة', allowCustom: true },
      { id: 'language', label: 'ما هي لغة البرمجة المفضلة؟', type: 'text', placeholder: 'مثال: Python, Java, C++', allowCustom: true },
      { id: 'constraints', label: 'ما هي القيود؟', type: 'text', placeholder: 'مثال: O(n) time complexity', allowCustom: true }
    ]
  },

  devopsEngineer: {
    id: 'devops_engineer',
    title: 'مهندس DevOps (Devops Engineer)',
    description: 'يساعدك في إعداد CI/CD، Docker، Kubernetes، وإدارة البنية التحتية.',
    template: 'I want you to act as a DevOps engineer. I need help setting up ${infrastructure} for ${project}. Please provide configuration files, deployment scripts, and best practices for ${focus}.',
    questions: [
      { id: 'infrastructure', label: 'ما هي البنية التحتية؟', type: 'single_choice', options: ['Docker','Kubernetes','CI/CD Pipeline','Cloud Infrastructure','Monitoring'], allowCustom: true },
      { id: 'project', label: 'وصف المشروع:', type: 'text', placeholder: 'مثال: تطبيق ويب باستخدام Node.js', allowCustom: true },
      { id: 'focus', label: 'ما هو التركيز؟', type: 'single_choice', options: ['الأتمتة','المراقبة','الأمان','التوسع','الاستقرار'], allowCustom: true }
    ]
  }
};
