import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        models: "النماذج الجديدة",
        exclusive: "مقالات حصرية",
        about: "من نحن",
        admin: "لوحة الإدارة"
      },
      header: {
        login: "تسجيل الدخول",
        logo: "منطق",
        language: "English" // Text to show for switching to English
      },
      home: {
        searchNews: "ابحث في قاعدة البيانات...",
        latestNews: "أحدث الأخبار",
        allCategories: "الكل",
        systemActive: "نظام التحديث اللحظي مفعل",
        heroTitle1: "اكتشف أبعاد",
        heroTitle2: "الذكاء الاصطناعي",
        heroSubtitle: "المصدر الرقمي الأول والموثوق للمطورين والباحثين. تتبع نبض الخوارزميات، النماذج اللغوية، والثورات التقنية لحظة بلحظة.",
        analyze: "تحليل",
        recentDataFlow: "تدفق البيانات الأخير",
        dataLabel: "بيانات:",
        records: "سجل",
        noResults: "لا توجد نتائج مطابقة",
        noResultsDesc: "تم مسح قاعدة البيانات ولم نجد تطابقاً. لتوسيع نطاق البحث حاول إزالة الفلاتر.",
        resetMatrix: "إعادة ضبط المصفوفة",
        newsletterTitle: "الوصول المبكر للبيانات",
        newsletterSubtitle: "انضم لشبكة المطورين والخبراء. احصل على التحليلات العميقة وحصاد الذكاء الاصطناعي الأسبوعي مباشرة.",
        subscribe: "تفعيل الاشتراك",
        emailPlaceholder: "أدخل عنوان الرابط (Email)",
        secureSystem: "نظام آمن - لا نشارك بياناتك"
      },
      footer: {
        description: "واجهتك الرقمية لتجاوز حدود المعرفة. نغوص في أعماق الخوارزميات لنقدم لك الحقيقة وراء كل سطر برمجي.",
        protocols: "البروتوكولات",
        platformCenter: "مركز المنصة",
        terms: "شروط الاتصال",
        privacy: "تشفير الخصوصية",
        categories: "التصنيفات",
        generativeModels: "نماذج اللغات التوليدية",
        medicalComputing: "الحوسبة الطبية",
        roboticsEvolution: "تطور الروبوتات",
        rights: "بنية النظام الإصدار 3.0 - © {year} AI News Portal. جميع الحقوق محفوظة.",
        generatedBy: "توليد واجهة المستخدم بواسطة الخوارزميات"
      },
      categories: {
        "نماذج اللغات": "نماذج اللغات",
        "رعاية صحية": "رعاية صحية",
        "روبوتات": "روبوتات",
        "تشريعات وقوانين": "تشريعات وقوانين",
        "فنون وإبداع": "فنون وإبداع"
      },
      card: {
        readMore: "اقرأ التفاصيل",
        researcher: "باحث متخصص"
      },
      article: {
        notFoundTitle: "مقال غير موجود | منطق",
        notFoundCode: "404",
        notFoundDesc: "عذراً، لم نتمكن من العثور على المقال المطلوب في قاعدة البيانات.",
        backToHome: "العودة للمنصة الرئيسية",
        goBack: "عودة للخلف",
        today: "اليوم",
        authorSystem: "نظام الرصد الآلي",
        authorTeam: "فريق التحرير الذكي"
      },
      models: {
        title: "النماذج الجديدة",
        metaDesc: "تعرف على أحدث النماذج اللغوية وهندسة الذكاء الاصطناعي التي تم إطلاقها مؤخراً.",
        h1: "مكتبة النماذج الذكية",
        p: "قاعدة بيانات حية لأحدث ما توصلت إليه مختبرات الذكاء الاصطناعي حول العالم. نقوم بتحديث هذه القائمة فور الإعلان عن تقنيات ونماذج لغوية جديدة (LLMs).",
        evaluating: "جاري التقييم",
        modelName: "نموذج لغوي {item}.0",
        modelDesc: "نسخة مطورة من النماذج مفتوحة المصدر تتميز بقدرة عالية على الاستنتاج المنطقي وتوليد الأكواد البرمجية بسرعة مضاعفة.",
        params: "مٌعلمات: 70B"
      },
      exclusive: {
        title: "مقالات حصرية",
        metaDesc: "تحليلات عميقة ومقالات حصرية معدة خصيصاً للمشتركين.",
        h1: "محتوى للمحترفين",
        p: "تحليلات هندسية ووثائقيات حصرية خلف الكواليس لأبرز المختبرات لتطوير الذكاء الاصطناعي.",
        locked: "المحتوى متاح للأعضاء النشطين"
      },
      about: {
        title: "من نحن",
        metaDesc: "تعرف على رؤيتنا وأهدافنا للارتقاء بالمحتوى التقني العربي.",
        h1: "مهمتنا في عصر الخوارزميات",
        p: "نحن منصة مستقلة أسست بواسطة مهندسين وشغوفين بالتقنية. نؤمن بأن المعرفة قوة، وأن تقنيات الذكاء الاصطناعي يجب أن تكون متاحة ومفهومة للجميع.",
        f1Title: "رؤية مستقبلية",
        f1Desc: "نسعى دائمًا لنكون حلقة الوصل بين الباحثين والمطورين وعشاق التكنولوجيا لبناء مجتمع عربي ملم بتقنيات الذكاء الاصطناعي.",
        f2Title: "موثوقية المحتوى",
        f2Desc: "فريقنا يجمع البيانات من المصادر الأصلية للمكتبات البرمجية وأوراق البحث المعتمدة (Papers) لضمان أعلى جودة.",
        f3Title: "مجتمع نشط",
        f3Desc: "منصة مفتوحة لمشاركة الآراء وطرح التساؤلات وإيجاد الحلول المتعلقة بهندسة البيانات الخوارزمية."
      },
      notFound: {
        title: "الصفحة غير موجودة",
        code: "404",
        desc: "عذراً، المسار المطلوب غير متوفر في شبكتنا.",
        back: "العودة للمنطقة الآمنة (الرئيسية)",
        h2: "المسار غير متوفر في قاعدة البيانات",
        p: "عذراً، الدليل الذي تحاول الوصول إليه غير موجود أو تم نقله في التحديث الأخير لخوارزمياتنا.",
        btn: "العودة للمركز الرئيسي"
      },
      admin: {
        dashboard: "لوحة التحكم",
        posts: "إدارة المقالات",
        users: "الأعضاء",
        settings: "الإعدادات",
        panel: "لوحة الإدارة | النظام المركزي",
        backToSite: "العودة للموقع",
        logout: "تسجيل الخروج",
        centralSystem: "النظام المركزي للبيانات",
        manager: "المدير العام",
        overview: "نظرة عامة",
        totalArticles: "إجمالي المقالات",
        dailyVisits: "الزيارات اليومية",
        engagementRate: "معدل التفاعل",
        recentActivity: "النشاط الأخير",
        activity1: "تم نشر مقال جديد: \"نموذج GPT-5 ومستقبل البرمجة\"",
        activity2: "تم تعديل قسم: \"النماذج اللغوية\"",
        activity3: "انضمام عضو جديد للنظام الأساسي",
        managePages: "إدارة المقالات والصفحات",
        createPage: "إنشاء صفحة جديدة",
        searchPlaceholder: "ابحث عن مقال أو صفحة...",
        title: "العنوان",
        category: "التصنيف",
        publishDate: "تاريخ النشر",
        status: "الحالة",
        actions: "إجراءات",
        published: "منشور",
        confirmDelete: "تأكيد الحذف؟",
        deleteSuccess: "تم حذف الصفحة/المقال بنجاح",
        noPages: "لا توجد صفحات مطابقة لبحثك.",
        enterTitleFirst: "أدخل العنوان أولاً",
        updateSuccess: "تم تحديث المحتوى بنجاح",
        simulatedExcerpt: "محتوى تجريبي مقطع..",
        simulatedContent: "محتوى تجريبي كامل..",
        systemAdmin: "مدير النظام",
        addSuccess: "تمت إضافة المحتوى بنجاح",
        editArticle: "تعديل المقال",
        createArticle: "إنشاء مقال جديد",
        systemDesc: "نظام تحرير وإدارة المحتوى المتقدم",
        preview: "معاينة",
        saveDraft: "حفظ كمسودة",
        publishUpdate: "نشر التحديث",
        titlePlaceholder: "عنوان المقال الرئيسي (يفضل أن يكون جذاباً وضع فيه الكلمات المفتاحية)...",
        insertMedia: "إدراج وسائط",
        contentPlaceholder: "ابدأ بكتابة المحتوى هنا، يمكنك استخدام لغة Markdown للتنسيق...",
        seoSettings: "إعدادات محركات البحث (SEO)",
        metaDesc: "الوصف التعريفي (Meta Description)",
        keywords: "الكلمات الدلالية المفتاحية (Keywords)",
        keywordsPlaceholder: "الذكاء الاصطناعي, نماذج اللغة, تقنيات...",
        publishInfo: "معلومات النشر",
        articleStatus: "حالة المقال",
        draft: "مسودة",
        customUrl: "الرابط المخصص (Slug)",
        coverImage: "صورة الغلاف",
        dragImage: "اسحب الصورة أو انقر للرفع",
        tags: "الوسوم",
        addTag: "أضف وسماً واضغط Enter..."
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        models: "New Models",
        exclusive: "Exclusive",
        about: "About Us",
        admin: "Admin Board"
      },
      header: {
        login: "Login",
        logo: "Mantiq",
        language: "العربية" // Text to show for switching to Arabic
      },
      home: {
        searchNews: "Search the database...",
        latestNews: "Latest News",
        allCategories: "All",
        systemActive: "Real-time system active",
        heroTitle1: "Discover dimensions of",
        heroTitle2: "Artificial Intelligence",
        heroSubtitle: "The premier digital source for developers and researchers. Track the pulse of algorithms, language models, and tech revolutions moment by moment.",
        analyze: "Analyze",
        recentDataFlow: "Recent Data Flow",
        dataLabel: "Data:",
        records: "Records",
        noResults: "No matching results",
        noResultsDesc: "The database has been scanned and no matches were found. Try removing filters to broaden your search.",
        resetMatrix: "Reset Matrix",
        newsletterTitle: "Early Data Access",
        newsletterSubtitle: "Join our network of developers and experts. Get deep analysis and weekly AI digest directly.",
        subscribe: "Activate Subscription",
        emailPlaceholder: "Enter Link Address (Email)",
        secureSystem: "Secure system - we don't share your data"
      },
      footer: {
        description: "Your digital interface to overcome knowledge boundaries. We dive deep into algorithms to bring you the truth behind every line of code.",
        protocols: "Protocols",
        platformCenter: "Platform Center",
        terms: "Terms of Connection",
        privacy: "Privacy Encryption",
        categories: "Categories",
        generativeModels: "Generative Language Models",
        medicalComputing: "Medical Computing",
        roboticsEvolution: "Robotics Evolution",
        rights: "System Architecture v3.0 - © {year} AI News Portal. All rights reserved.",
        generatedBy: "UI generated by algorithms"
      },
      categories: {
        "نماذج اللغات": "Language Models",
        "رعاية صحية": "Healthcare",
        "روبوتات": "Robotics",
        "تشريعات وقوانين": "Laws & Regulations",
        "فنون وإبداع": "Arts & Creativity"
      },
      card: {
        readMore: "Read More",
        researcher: "Specialized Researcher"
      },
      article: {
        notFoundTitle: "Article Not Found | Mantiq",
        notFoundCode: "404",
        notFoundDesc: "Sorry, we couldn't find the requested article in the database.",
        backToHome: "Back to Home",
        goBack: "Go Back",
        today: "Today",
        authorSystem: "Auto-Monitoring System",
        authorTeam: "Smart Editing Team"
      },
      models: {
        title: "New Models",
        metaDesc: "Discover the latest language models and AI architecture launched recently.",
        h1: "Smart Models Library",
        p: "A live database of the latest advancements from AI labs worldwide. We update this list as soon as new technologies and Large Language Models (LLMs) are announced.",
        evaluating: "Under Evaluation",
        modelName: "Language Model {item}.0",
        modelDesc: "An upgraded version of open-source models featuring high logical reasoning capabilities and double-speed code generation.",
        params: "Parameters: 70B"
      },
      exclusive: {
        title: "Exclusive Articles",
        metaDesc: "Deep analysis and exclusive articles tailored for subscribers.",
        h1: "Content for Professionals",
        p: "Engineering analysis and exclusive behind-the-scenes documentaries of leading AI development labs.",
        locked: "Content available for active members"
      },
      about: {
        title: "About Us",
        metaDesc: "Learn about our vision and goals to elevate tech content.",
        h1: "Our Mission in the Era of Algorithms",
        p: "We are an independent platform founded by tech engineers and enthusiasts. We believe knowledge is power, and AI technologies should be accessible and understandable to everyone.",
        f1Title: "Future Vision",
        f1Desc: "We always strive to be the bridge between researchers, developers, and tech enthusiasts to build a community well-versed in AI technologies.",
        f2Title: "Content Reliability",
        f2Desc: "Our team gathers data from original sources of software libraries and certified research papers to ensure the highest quality.",
        f3Title: "Active Community",
        f3Desc: "An open platform to share opinions, ask questions, and find solutions related to algorithmic data engineering."
      },
      notFound: {
        title: "Page Not Found",
        code: "404",
        desc: "Sorry, the requested path is not available in our network.",
        back: "Return to safe zone (Home)",
        h2: "Path not available in the database",
        p: "Sorry, the directory you are trying to reach does not exist or has been moved in our latest algorithm update.",
        btn: "Return to Main Center"
      },
      admin: {
        dashboard: "Dashboard",
        posts: "Manage Articles",
        users: "Members",
        settings: "Settings",
        panel: "Admin Panel | Central System",
        backToSite: "Back to Site",
        logout: "Logout",
        centralSystem: "Central Data System",
        manager: "General Manager",
        overview: "Overview",
        totalArticles: "Total Articles",
        dailyVisits: "Daily Visits",
        engagementRate: "Engagement Rate",
        recentActivity: "Recent Activity",
        activity1: "New article published: \"GPT-5 Model and the Future of Programming\"",
        activity2: "Section modified: \"Language Models\"",
        activity3: "New member joined the core system",
        managePages: "Manage Articles and Pages",
        createPage: "Create New Page",
        searchPlaceholder: "Search for an article or page...",
        title: "Title",
        category: "Category",
        publishDate: "Publish Date",
        status: "Status",
        actions: "Actions",
        published: "Published",
        confirmDelete: "Confirm deletion?",
        deleteSuccess: "Page/Article deleted successfully",
        noPages: "No pages matching your search.",
        enterTitleFirst: "Enter title first",
        updateSuccess: "Content updated successfully",
        simulatedExcerpt: "Simulated excerpt content..",
        simulatedContent: "Simulated full content..",
        systemAdmin: "System Administrator",
        addSuccess: "Content added successfully",
        editArticle: "Edit Article",
        createArticle: "Create New Article",
        systemDesc: "Advanced Content Editing and Management System",
        preview: "Preview",
        saveDraft: "Save as Draft",
        publishUpdate: "Publish Update",
        titlePlaceholder: "Main article title (preferably attractive and containing keywords)...",
        insertMedia: "Insert Media",
        contentPlaceholder: "Start writing content here, you can use Markdown for formatting...",
        seoSettings: "SEO Settings",
        metaDesc: "Meta Description",
        keywords: "Keywords",
        keywordsPlaceholder: "Artificial Intelligence, Language Models, Technologies...",
        publishInfo: "Publishing Info",
        articleStatus: "Article Status",
        draft: "Draft",
        customUrl: "Custom URL (Slug)",
        coverImage: "Cover Image",
        dragImage: "Drag image or click to upload",
        tags: "Tags",
        addTag: "Add a tag and press Enter..."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;