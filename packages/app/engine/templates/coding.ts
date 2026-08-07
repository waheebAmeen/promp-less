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
  ,securitySpecialist: {
    id: 'security_specialist',
    title: 'خبير أمن سيبراني (Cybersecurity Specialist)',
    description: 'يساعدك في تأمين التطبيقات، فحص الثغرات، وتطبيق أفضل ممارسات الحماية (Ethical Hacking).',
    template: 'I want you to act as a Cybersecurity Specialist and Ethical Hacker. I need to secure a ${techStack} application. I want you to perform a security review focusing on ${threatModel}. The app handles ${dataSensitivity} data. Please provide a list of potential vulnerabilities, secure coding practices, and specific mitigation strategies for this stack.',
    questions: [
      { id: 'techStack', label: 'ما هي التقنيات المستخدمة في التطبيق؟', type: 'text', placeholder: 'مثال: Laravel, PHP, Node.js, React', allowCustom: true },
      { id: 'threatModel', label: 'ما هو نموذج التهديد أو التركيز الأمني؟', type: 'single_choice', options: ['OWASP Top 10', 'حقن البيانات (SQL Injection/XSS)', 'أمان المصادقة (Authentication)', 'أمان واجهات برمجة التطبيقات (API Security)'], allowCustom: true },
      { id: 'dataSensitivity', label: 'ما هي حساسية البيانات التي يعالجها التطبيق؟', type: 'single_choice', options: ['بيانات عامة (Public)', 'بيانات شخصية (PII)', 'بيانات مالية/صحية حرجة'], allowCustom: true }
    ]
  },

  mobileAppDeveloper: {
    id: 'mobile_app_developer',
    title: 'مطور تطبيقات جوال (Mobile App Developer)',
    description: 'يساعدك في بناء وتطوير تطبيقات الهواتف الذكية مع التركيز على الأداء وتجربة المستخدم.',
    template: 'Act as an expert Mobile App Developer using ${framework}. I need to build a feature for ${featureDescription}. Please provide the component structure, state management using ${stateManagement}, and navigation flow. Ensure the code follows best practices for mobile performance and responsive UI.',
    questions: [
      { id: 'framework', label: 'ما هي بيئة التطوير أو الإطار المستخدم؟', type: 'single_choice', options: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)'], allowCustom: true },
      { id: 'featureDescription', label: 'ما هي الميزة التي تريد بناءها؟', type: 'text', placeholder: 'مثال: شاشة تسجيل الدخول مع التحقق بالبصمة', allowCustom: true },
      { id: 'stateManagement', label: 'ما هي أداة إدارة الحالة (State Management)؟', type: 'text', placeholder: 'مثال: Redux, Context API, Zustand', allowCustom: true }
    ]
  },

  databaseArchitect: {
    id: 'database_architect',
    title: 'مهندس قواعد بيانات (Database Architect)',
    description: 'يساعدك في تصميم مخططات قواعد البيانات، تحسين الاستعلامات، وإدارة العلاقات.',
    template: 'I want you to act as a Database Architect. I am building an application and need a database schema for ${dbType}. The main entities are: ${entities}. Please provide the schema design (tables/collections), relationships, and optimize the structure for ${optimizationFocus}. Provide the SQL/NoSQL code for creation.',
    questions: [
      { id: 'dbType', label: 'ما هو نوع قاعدة البيانات؟', type: 'single_choice', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'], allowCustom: true },
      { id: 'entities', label: 'ما هي الكيانات (Entities) الأساسية؟', type: 'text', placeholder: 'مثال: Users, Products, Orders', allowCustom: true },
      { id: 'optimizationFocus', label: 'ما هو التركيز الرئيسي في التحسين؟', type: 'single_choice', options: ['سرعة القراءة (Read Speed)', 'سرعة الكتابة (Write Speed)', 'توفير المساحة (Storage)', 'تكامل البيانات (Data Integrity)'], allowCustom: true }
    ]
  },

  apiDesigner: {
    id: 'api_designer',
    title: 'مصمم واجهات برمجة التطبيقات (API Designer)',
    description: 'يساعدك في تصميم وبناء واجهات API قوية، موثقة جيداً، وآمنة.',
    template: 'Act as a Senior API Designer. I need to design a ${apiType} API for my application. The API needs to support the following operations: ${operations}. Please provide the endpoint structure, request/response payloads in JSON format, HTTP methods, status codes, and authentication method using ${authMethod}.',
    questions: [
      { id: 'apiType', label: 'ما هو نوع الـ API؟', type: 'single_choice', options: ['RESTful', 'GraphQL', 'gRPC', 'WebSockets'], allowCustom: true },
      { id: 'operations', label: 'ما هي العمليات المطلوبة من الـ API؟', type: 'text', placeholder: 'مثال: إنشاء مستخدم، جلب قائمة المنتجات', allowCustom: true },
      { id: 'authMethod', label: 'ما هي طريقة المصادقة (Authentication)؟', type: 'single_choice', options: ['JWT (JSON Web Tokens)', 'OAuth 2.0', 'API Keys', 'Session-based'], allowCustom: true }
    ]
  },

  refactoringMaster: {
    id: 'refactoring_master',
    title: 'خبير تحسين الكود (Refactoring Master)',
    description: 'يساعدك في إعادة كتابة الكود القديم ليصبح أنظف، أسرع، وأسهل في الصيانة والتطوير.',
    template: 'Act as a Clean Code and Refactoring Master. Here is my current ${language} code: ${code}. It currently suffers from ${currentIssues}. Please refactor this code applying ${principles} principles. Explain the exact changes you made and why they improve the maintainability and performance of the code.',
    questions: [
      { id: 'language', label: 'ما هي لغة البرمجة؟', type: 'text', placeholder: 'مثال: JavaScript, PHP, Python', allowCustom: true },
      { id: 'code', label: 'ألصق الكود المراد تحسينه:', type: 'text', placeholder: 'ألصق الكود هنا...', allowCustom: true },
      { id: 'currentIssues', label: 'ما هي المشاكل الحالية في الكود؟', type: 'text', placeholder: 'مثال: بطيء جداً، الكود متداخل ومعقد', allowCustom: true },
      { id: 'principles', label: 'ما هي مبادئ البرمجة المراد تطبيقها؟', type: 'single_choice', options: ['مبادئ SOLID', 'Clean Code', 'DRY (Don\'t Repeat Yourself)', 'KISS (Keep It Simple)'], allowCustom: true }
    ]
  },

  uiUxImplementer: {
    id: 'ui_ux_implementer',
    title: 'مطور واجهات ومصمم (UI/UX Implementer)',
    description: 'يساعدك في تحويل التصاميم إلى أكواد واجهات مستخدم متجاوبة وجذابة بصرياً.',
    template: 'Act as a Frontend UI/UX expert. I need to implement a ${componentName} component using ${frontendTech} and ${stylingTool}. The main design requirements are: ${designRequirements}. Please provide clean, accessible (a11y), responsive, and visually appealing code. Include modern animations if applicable.',
    questions: [
      { id: 'componentName', label: 'ما هو المكون المراد بناؤه؟', type: 'text', placeholder: 'مثال: شريط تنقل (Navbar)، بطاقة منتج، نافذة منبثقة', allowCustom: true },
      { id: 'frontendTech', label: 'ما هي تقنية الواجهة الأمامية؟', type: 'text', placeholder: 'مثال: React, Vue, HTML/JS', allowCustom: true },
      { id: 'stylingTool', label: 'ما هي أداة التنسيق (Styling)؟', type: 'single_choice', options: ['Tailwind CSS', 'Sass / SCSS', 'CSS Modules', 'Styled Components'], allowCustom: true },
      { id: 'designRequirements', label: 'ما هي المتطلبات التصميمية؟', type: 'text', placeholder: 'مثال: الوضع الليلي (Dark Mode)، تصميم زجاجي (Glassmorphism)', allowCustom: true }
    ]
  },

  qaEngineer: {
    id: 'qa_engineer',
    title: 'مهندس اختبارات البرمجيات (QA & Tester)',
    description: 'يساعدك في كتابة اختبارات الوحدة (Unit Tests) واختبارات التكامل لضمان خلو تطبيقك من الأخطاء.',
    template: 'Act as a Senior QA Automation Engineer. I need to write reliable tests for my ${language} code: ${code}. Please use the ${testingFramework} testing framework. Focus on testing ${testCoverage} scenarios, including edge cases, boundary values, and error handling.',
    questions: [
      { id: 'language', label: 'ما هي لغة البرمجة؟', type: 'text', placeholder: 'مثال: TypeScript, PHP', allowCustom: true },
      { id: 'code', label: 'ألصق الكود المراد اختباره:', type: 'text', placeholder: 'ألصق الكود هنا...', allowCustom: true },
      { id: 'testingFramework', label: 'ما هي مكتبة الاختبارات المستخدمة؟', type: 'single_choice', options: ['Jest', 'PHPUnit', 'Mocha / Chai', 'Cypress (E2E)'], allowCustom: true },
      { id: 'testCoverage', label: 'ما هي سيناريوهات الاختبار المطلوبة؟', type: 'single_choice', options: ['اختبارات الوحدة (Unit Tests)', 'اختبارات التكامل (Integration)', 'الحالات الطرفية (Edge Cases)'], allowCustom: true }
    ]
  }
};
