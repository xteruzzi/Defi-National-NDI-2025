// Configuration
const API_URL = 'api.php';
let currentLanguage = 'fr';
let isOnline = navigator.onLine;
let offlineCache = [];

// Base de connaissances offline - Questions/Réponses fréquentes
const offlineKnowledge = {
    fr: {
        documents: [
            {
                keywords: ['carte identité', 'cni', 'identité', 'carte nationale'],
                response: "📄 **Carte d'identité (CNI)**\n\n**Documents nécessaires :**\n- Photo d'identité récente\n- Justificatif de domicile de moins de 3 mois\n- Acte de naissance de moins de 3 mois\n\n**Démarche :**\n1. Prenez rendez-vous en mairie\n2. Déposez votre dossier\n3. Récupérez votre carte (délai : 2-3 semaines)\n\n**Gratuit pour la première demande**\n\n🌐 Plus d'infos : service-public.fr"
            },
            {
                keywords: ['passeport', 'voyage', 'passport'],
                response: "🛂 **Passeport**\n\n**Documents nécessaires :**\n- Photo d'identité récente\n- Justificatif de domicile\n- Timbre fiscal (86€)\n- Ancienne carte d'identité\n\n**Démarche :**\n1. Pré-demande en ligne sur ANTS.gouv.fr\n2. Rendez-vous en mairie avec dossier\n3. Récupération (délai : 2-4 semaines)\n\n🌐 Site : ants.gouv.fr"
            },
            {
                keywords: ['acte naissance', 'extrait naissance', 'né', 'naissance'],
                response: "📋 **Acte de naissance**\n\n**Demande gratuite en ligne :**\n- service-public.fr\n- mairie du lieu de naissance\n\n**Démarche :**\n1. Demande en ligne (gratuit)\n2. Réception par courrier (5-10 jours)\n\n**Alternative :** Demande par courrier à la mairie de naissance\n\n🌐 service-public.fr"
            }
        ],
        demarches: [
            {
                keywords: ['impôts', 'déclaration', 'taxes', 'fiscale'],
                response: "💰 **Déclaration d'impôts**\n\n**Étapes :**\n1. Créez votre compte sur impots.gouv.fr\n2. Déclarez vos revenus (avril-juin)\n3. Vérifiez votre avis d'imposition (juillet-août)\n\n**Documents nécessaires :**\n- Numéro fiscal\n- Revenus de l'année précédente\n- Justificatifs de charges déductibles\n\n🌐 impots.gouv.fr\n📞 0809 401 401"
            },
            {
                keywords: ['caf', 'allocation', 'aide', 'familiales', 'rsa', 'apl'],
                response: "🏠 **CAF - Allocations**\n\n**Types d'aides :**\n- RSA (Revenu de Solidarité Active)\n- APL (Aide Personnalisée au Logement)\n- Allocations familiales\n- Prime d'activité\n\n**Démarche :**\n1. Créez votre compte sur caf.fr\n2. Faites votre demande en ligne\n3. Fournissez les justificatifs\n4. Déclaration trimestrielle de ressources\n\n🌐 caf.fr\n📞 3230"
            },
            {
                keywords: ['sécurité sociale', 'ameli', 'santé', 'remboursement', 'carte vitale'],
                response: "🏥 **Sécurité Sociale - Ameli**\n\n**Services :**\n- Carte Vitale\n- Remboursements de soins\n- Arrêts maladie\n- Droits à l'assurance maladie\n\n**Démarche :**\n1. Créez votre compte Ameli\n2. Commandez votre Carte Vitale\n3. Suivez vos remboursements en ligne\n\n🌐 ameli.fr\n📞 36 46"
            },
            {
                keywords: ['pôle emploi', 'chômage', 'emploi', 'inscription', 'allocation chômage'],
                response: "💼 **Pôle Emploi**\n\n**Inscription :**\n1. Inscrivez-vous sur pole-emploi.fr\n2. Actualisez chaque mois\n3. Recherchez des offres\n4. Suivez vos allocations\n\n**Allocations chômage (ARE) :**\n- Calculées selon vos derniers salaires\n- Versées mensuellement\n- Durée selon votre âge\n\n🌐 pole-emploi.fr\n📞 39 49"
            }
        ],
        orientation: [
            {
                keywords: ['mairie', 'commune', 'municipalité'],
                response: "🏛️ **Mairie**\n\n**Services :**\n- État civil (naissances, mariages, décès)\n- Cartes d'identité et passeports\n- Inscriptions scolaires\n- Urbanisme\n\n**Contact :** Votre mairie locale\n🌐 Trouvez votre mairie : service-public.fr"
            },
            {
                keywords: ['préfecture', 'sous-préfecture', 'titre séjour', 'permis'],
                response: "🏢 **Préfecture**\n\n**Services :**\n- Titres de séjour\n- Permis de conduire\n- Certificats d'immatriculation\n- Naturalisation\n\n**Démarche :** Rendez-vous en ligne obligatoire\n🌐 Trouvez votre préfecture sur service-public.fr"
            }
        ],
        associations: [
            {
                keywords: ['aide', 'association', 'secours', 'solidarité', 'social'],
                response: "🤝 **Associations d'aide**\n\n**Principales associations :**\n- **Secours Catholique** : aide alimentaire, vêtements\n- **Croix-Rouge** : aide d'urgence, santé\n- **Restos du Cœur** : aide alimentaire\n- **Emmaüs** : hébergement, réinsertion\n- **Secours Populaire** : aide aux familles\n\n**Services sociaux de votre mairie** pour orientation locale"
            }
        ],
        juridique: [
            {
                keywords: ['avocat', 'juridique', 'droit', 'justice', 'tribunal'],
                response: "⚖️ **Aide juridique**\n\n**Services gratuits :**\n- **Maison de Justice et du Droit** : conseils gratuits\n- **Aide juridictionnelle** : si revenus faibles\n- **Avocat commis d'office** : sur demande\n\n**Points d'accès au droit :**\n- Permanences d'avocats\n- Consultations gratuites\n\n🌐 justice.fr\n📞 3039"
            }
        ]
    },
    en: {
        documents: [
            {
                keywords: ['id card', 'identity card', 'national id', 'carte identite', 'cni'],
                response: "📄 **National ID Card (CNI)**\n\n**Required documents:**\n- Recent photo\n- Proof of address (less than 3 months old)\n- Birth certificate (less than 3 months old)\n\n**Process:**\n1. Make an appointment at the town hall\n2. Submit your file\n3. Pick up your card (delay: 2-3 weeks)\n\n**Free for first application**\n\n🌐 More info: service-public.fr"
            },
            {
                keywords: ['passport', 'travel', 'voyage'],
                response: "🛂 **Passport**\n\n**Required documents:**\n- Recent photo\n- Proof of address\n- Tax stamp (€86)\n- Old ID card\n\n**Process:**\n1. Pre-application online at ANTS.gouv.fr\n2. Town hall appointment with file\n3. Pick up (delay: 2-4 weeks)\n\n🌐 Website: ants.gouv.fr"
            },
            {
                keywords: ['birth certificate', 'acte naissance', 'born', 'extrait'],
                response: "📋 **Birth Certificate**\n\n**Free online request:**\n- service-public.fr\n- Town hall of birth place\n\n**Process:**\n1. Online request (free)\n2. Receive by mail (5-10 days)\n\n**Alternative:** Request by mail to birth town hall\n\n🌐 service-public.fr"
            }
        ],
        demarches: [
            {
                keywords: ['taxes', 'tax return', 'declaration', 'impots', 'fiscal'],
                response: "💰 **Tax Return**\n\n**Steps:**\n1. Create account on impots.gouv.fr\n2. Declare income (April-June)\n3. Check tax notice (July-August)\n\n**Required documents:**\n- Tax number\n- Previous year income\n- Deductible expenses proof\n\n🌐 impots.gouv.fr\n📞 0809 401 401"
            },
            {
                keywords: ['caf', 'benefits', 'allocation', 'aide', 'family', 'housing'],
                response: "🏠 **CAF - Benefits**\n\n**Types of aid:**\n- RSA (Active Solidarity Income)\n- APL (Housing Assistance)\n- Family allowances\n- Activity bonus\n\n**Process:**\n1. Create account on caf.fr\n2. Apply online\n3. Provide supporting documents\n4. Quarterly income declaration\n\n🌐 caf.fr\n📞 3230"
            },
            {
                keywords: ['social security', 'health', 'healthcare', 'ameli', 'carte vitale', 'reimbursement'],
                response: "🏥 **Social Security - Ameli**\n\n**Services:**\n- Carte Vitale\n- Healthcare reimbursements\n- Sick leave\n- Health insurance rights\n\n**Process:**\n1. Create Ameli account\n2. Order your Carte Vitale\n3. Track reimbursements online\n\n🌐 ameli.fr\n📞 36 46"
            },
            {
                keywords: ['unemployment', 'job center', 'pole emploi', 'employment', 'jobless'],
                response: "💼 **Pôle Emploi**\n\n**Registration:**\n1. Sign up on pole-emploi.fr\n2. Update monthly\n3. Search for job offers\n4. Track benefits\n\n**Unemployment benefits (ARE):**\n- Calculated based on recent salaries\n- Paid monthly\n- Duration depends on age\n\n🌐 pole-emploi.fr\n📞 39 49"
            }
        ],
        orientation: [
            {
                keywords: ['town hall', 'mairie', 'city hall', 'municipality'],
                response: "🏛️ **Town Hall (Mairie)**\n\n**Services:**\n- Civil status (births, marriages, deaths)\n- ID cards and passports\n- School registrations\n- Urban planning\n\n**Contact:** Your local town hall\n🌐 Find your town hall: service-public.fr"
            },
            {
                keywords: ['prefecture', 'sous-prefecture', 'residence permit', 'driving license', 'permis'],
                response: "🏢 **Prefecture**\n\n**Services:**\n- Residence permits\n- Driving licenses\n- Vehicle registration certificates\n- Naturalization\n\n**Process:** Online appointment mandatory\n🌐 Find your prefecture on service-public.fr"
            }
        ],
        associations: [
            {
                keywords: ['help', 'association', 'aid', 'solidarity', 'social', 'charity'],
                response: "🤝 **Aid Associations**\n\n**Main associations:**\n- **Secours Catholique**: food aid, clothing\n- **Croix-Rouge**: emergency aid, health\n- **Restos du Cœur**: food aid\n- **Emmaüs**: shelter, reintegration\n- **Secours Populaire**: family aid\n\n**Social services** at your town hall for local guidance"
            }
        ],
        juridique: [
            {
                keywords: ['lawyer', 'legal', 'law', 'justice', 'court', 'avocat', 'tribunal'],
                response: "⚖️ **Legal Aid**\n\n**Free services:**\n- **Justice and Law Center**: free advice\n- **Legal aid**: for low income\n- **Court-appointed lawyer**: upon request\n\n**Law access points:**\n- Lawyer consultations\n- Free consultations\n\n🌐 justice.fr\n📞 3039"
            }
        ]
    },
    es: {
        documents: [
            {
                keywords: ['dni', 'documento identidad', 'tarjeta identidad', 'carte identite', 'identidad'],
                response: "📄 **Tarjeta Nacional de Identidad (CNI)**\n\n**Documentos necesarios:**\n- Foto reciente\n- Comprobante de domicilio (menos de 3 meses)\n- Acta de nacimiento (menos de 3 meses)\n\n**Procedimiento:**\n1. Solicitar cita en el ayuntamiento\n2. Presentar el expediente\n3. Recoger la tarjeta (plazo: 2-3 semanas)\n\n**Gratis para la primera solicitud**\n\n🌐 Más información: service-public.fr"
            },
            {
                keywords: ['pasaporte', 'passport', 'viaje', 'travel', 'voyage'],
                response: "🛂 **Pasaporte**\n\n**Documentos necesarios:**\n- Foto reciente\n- Comprobante de domicilio\n- Timbre fiscal (86€)\n- DNI antiguo\n\n**Procedimiento:**\n1. Solicitud previa en línea en ANTS.gouv.fr\n2. Cita en el ayuntamiento con expediente\n3. Recogida (plazo: 2-4 semanas)\n\n🌐 Sitio web: ants.gouv.fr"
            },
            {
                keywords: ['acta nacimiento', 'partida nacimiento', 'birth certificate', 'nacimiento', 'naissance'],
                response: "📋 **Acta de Nacimiento**\n\n**Solicitud gratuita en línea:**\n- service-public.fr\n- Ayuntamiento del lugar de nacimiento\n\n**Procedimiento:**\n1. Solicitud en línea (gratis)\n2. Recepción por correo (5-10 días)\n\n**Alternativa:** Solicitud por correo al ayuntamiento de nacimiento\n\n🌐 service-public.fr"
            }
        ],
        demarches: [
            {
                keywords: ['impuestos', 'declaracion', 'taxes', 'fiscal', 'hacienda'],
                response: "💰 **Declaración de Impuestos**\n\n**Pasos:**\n1. Crear cuenta en impots.gouv.fr\n2. Declarar ingresos (abril-junio)\n3. Verificar aviso de impuestos (julio-agosto)\n\n**Documentos necesarios:**\n- Número fiscal\n- Ingresos del año anterior\n- Justificantes de gastos deducibles\n\n🌐 impots.gouv.fr\n📞 0809 401 401"
            },
            {
                keywords: ['caf', 'prestaciones', 'ayuda', 'allocation', 'subsidio', 'familiar'],
                response: "🏠 **CAF - Prestaciones**\n\n**Tipos de ayudas:**\n- RSA (Renta de Solidaridad Activa)\n- APL (Ayuda Personalizada para Vivienda)\n- Prestaciones familiares\n- Prima de actividad\n\n**Procedimiento:**\n1. Crear cuenta en caf.fr\n2. Solicitar en línea\n3. Proporcionar documentos justificativos\n4. Declaración trimestral de recursos\n\n🌐 caf.fr\n📞 3230"
            },
            {
                keywords: ['seguridad social', 'salud', 'health', 'ameli', 'tarjeta vital', 'reembolso'],
                response: "🏥 **Seguridad Social - Ameli**\n\n**Servicios:**\n- Tarjeta Vitale\n- Reembolsos de cuidados\n- Bajas médicas\n- Derechos al seguro médico\n\n**Procedimiento:**\n1. Crear cuenta Ameli\n2. Solicitar Tarjeta Vitale\n3. Seguir reembolsos en línea\n\n🌐 ameli.fr\n📞 36 46"
            },
            {
                keywords: ['desempleo', 'paro', 'pole emploi', 'empleo', 'trabajo', 'unemployment'],
                response: "💼 **Pôle Emploi**\n\n**Inscripción:**\n1. Registrarse en pole-emploi.fr\n2. Actualizar mensualmente\n3. Buscar ofertas\n4. Seguir prestaciones\n\n**Prestaciones de desempleo (ARE):**\n- Calculadas según últimos salarios\n- Pagadas mensualmente\n- Duración según edad\n\n🌐 pole-emploi.fr\n📞 39 49"
            }
        ],
        orientation: [
            {
                keywords: ['ayuntamiento', 'mairie', 'municipio', 'town hall'],
                response: "🏛️ **Ayuntamiento (Mairie)**\n\n**Servicios:**\n- Estado civil (nacimientos, matrimonios, defunciones)\n- Tarjetas de identidad y pasaportes\n- Inscripciones escolares\n- Urbanismo\n\n**Contacto:** Tu ayuntamiento local\n🌐 Encuentra tu ayuntamiento: service-public.fr"
            },
            {
                keywords: ['prefectura', 'prefecture', 'permiso residencia', 'permiso conducir', 'licencia'],
                response: "🏢 **Prefectura**\n\n**Servicios:**\n- Permisos de residencia\n- Permisos de conducir\n- Certificados de matriculación\n- Naturalización\n\n**Procedimiento:** Cita en línea obligatoria\n🌐 Encuentra tu prefectura en service-public.fr"
            }
        ],
        associations: [
            {
                keywords: ['ayuda', 'asociacion', 'socorro', 'solidaridad', 'social', 'caridad'],
                response: "🤝 **Asociaciones de Ayuda**\n\n**Principales asociaciones:**\n- **Secours Catholique**: ayuda alimentaria, ropa\n- **Croix-Rouge**: ayuda de emergencia, salud\n- **Restos du Cœur**: ayuda alimentaria\n- **Emmaüs**: alojamiento, reinserción\n- **Secours Populaire**: ayuda a familias\n\n**Servicios sociales** de tu ayuntamiento para orientación local"
            }
        ],
        juridique: [
            {
                keywords: ['abogado', 'legal', 'derecho', 'justicia', 'tribunal', 'lawyer'],
                response: "⚖️ **Ayuda Jurídica**\n\n**Servicios gratuitos:**\n- **Casa de Justicia y Derecho**: consejos gratuitos\n- **Asistencia jurídica**: para bajos ingresos\n- **Abogado de oficio**: bajo solicitud\n\n**Puntos de acceso al derecho:**\n- Permanencias de abogados\n- Consultas gratuitas\n\n🌐 justice.fr\n📞 3039"
            }
        ]
    },
    ar: {
        documents: [
            {
                keywords: ['بطاقة الهوية', 'بطاقة', 'هوية'],
                response: "📄 **بطاقة الهوية الوطنية**\n\n**الوثائق المطلوبة:**\n- صورة حديثة\n- إثبات السكن (أقل من 3 أشهر)\n- شهادة ميلاد (أقل من 3 أشهر)\n\n**الإجراء:**\n1. حجز موعد في البلدية\n2. تقديم الملف\n3. استلام البطاقة (2-3 أسابيع)\n\n**مجاني للطلب الأول**\n\n🌐 service-public.fr"
            },
            {
                keywords: ['جواز السفر', 'سفر', 'جواز'],
                response: "🛂 **جواز السفر**\n\n**الوثائق المطلوبة:**\n- صورة حديثة\n- إثبات السكن\n- طابع ضريبي (86 يورو)\n- بطاقة الهوية القديمة\n\n**الإجراء:**\n1. طلب مسبق على ANTS.gouv.fr\n2. موعد في البلدية\n3. الاستلام (2-4 أسابيع)\n\n🌐 ants.gouv.fr"
            }
        ],
        demarches: [
            {
                keywords: ['الضرائب', 'إقرار', 'ضريبة'],
                response: "💰 **الإقرار الضريبي**\n\n**الخطوات:**\n1. إنشاء حساب على impots.gouv.fr\n2. التصريح بالدخل (أبريل-يونيو)\n3. التحقق من إشعار الضريبة (يوليو-أغسطس)\n\n🌐 impots.gouv.fr\n📞 0809 401 401"
            },
            {
                keywords: ['صندوق', 'مساعدة', 'إعانة', 'عائلية'],
                response: "🏠 **صندوق المخصصات العائلية**\n\n**أنواع المساعدات:**\n- RSA (دخل التضامن النشط)\n- APL (مساعدة السكن)\n- المخصصات العائلية\n- علاوة النشاط\n\n**الإجراء:**\n1. إنشاء حساب على caf.fr\n2. تقديم الطلب عبر الإنترنت\n3. تقديم المستندات\n\n🌐 caf.fr\n📞 3230"
            }
        ],
        orientation: [
            {
                keywords: ['البلدية', 'مجلس البلدية'],
                response: "🏛️ **البلدية**\n\n**الخدمات:**\n- الحالة المدنية\n- بطاقات الهوية وجوازات السفر\n- التسجيل المدرسي\n- التخطيط الحضري\n\n🌐 service-public.fr"
            }
        ],
        associations: [
            {
                keywords: ['مساعدة', 'جمعية', 'إغاثة', 'تضامن'],
                response: "🤝 **جمعيات المساعدة**\n\n**الجمعيات الرئيسية:**\n- **Secours Catholique** : مساعدات غذائية وملابس\n- **Croix-Rouge** : مساعدة طارئة وصحة\n- **Restos du Cœur** : مساعدة غذائية\n- **Emmaüs** : إيواء وإعادة إدماج\n\n**الخدمات الاجتماعية** في البلدية للتوجيه المحلي"
            }
        ],
        juridique: [
            {
                keywords: ['محامي', 'قانوني', 'قانون', 'عدالة'],
                response: "⚖️ **المساعدة القانونية**\n\n**الخدمات المجانية:**\n- **دار العدالة والقانون** : استشارات مجانية\n- **المساعدة القضائية** : للدخل المنخفض\n- **محامي معين** : عند الطلب\n\n🌐 justice.fr\n📞 3039"
            }
        ]
    }
};

// Traductions
const translations = {
    fr: {
        online: "En ligne",
        offline: "Hors ligne",
        mode: "Mode: ",
        hybride: "Hybride",
        cache: "Cache: ",
        loaded: "Chargé",
        processing: "Traitement en cours...",
        offlineBadge: "RÉPONSE HORS LIGNE",
        errorMessage: "Désolé, une erreur est survenue. Mode hors ligne activé.",
        welcomeTitle: "Bienvenue ! Comment puis-je vous aider ?",
        welcomeText: "Je peux vous guider dans vos démarches administratives, même avec une connexion faible."
    },
    en: {
        online: "Online",
        offline: "Offline",
        mode: "Mode: ",
        hybride: "Hybrid",
        cache: "Cache: ",
        loaded: "Loaded",
        processing: "Processing...",
        offlineBadge: "OFFLINE RESPONSE",
        errorMessage: "Sorry, an error occurred. Offline mode activated.",
        welcomeTitle: "Welcome! How can I help you?",
        welcomeText: "I can guide you through administrative procedures, even with a weak connection."
    },
    es: {
        online: "En línea",
        offline: "Desconectado",
        mode: "Modo: ",
        hybride: "Híbrido",
        cache: "Caché: ",
        loaded: "Cargado",
        processing: "Procesando...",
        offlineBadge: "RESPUESTA SIN CONEXIÓN",
        errorMessage: "Lo siento, ocurrió un error. Modo sin conexión activado.",
        welcomeTitle: "¡Bienvenido! ¿Cómo puedo ayudarte?",
        welcomeText: "Puedo guiarte en tus trámites administrativos, incluso con una conexión débil."
    },
    ar: {
        online: "متصل",
        offline: "غير متصل",
        mode: "الوضع: ",
        hybride: "هجين",
        cache: "ذاكرة التخزين المؤقت: ",
        loaded: "محملة",
        processing: "جاري المعالجة...",
        offlineBadge: "استجابة غير متصلة بالإنترنت",
        errorMessage: "عذرًا، حدث خطأ. تم تنشيط الوضع غير المتصل.",
        welcomeTitle: "مرحبا! كيف يمكنني مساعدتك؟",
        welcomeText: "يمكنني إرشادك في إجراءاتك الإدارية، حتى مع اتصال ضعيف."
    }
};

// Initialisation (géré par chatbot-widget.js pour le widget)
// Exports des fonctions pour utilisation externe
window.chatbotInitialize = function() {
    loadCache();
    updateConnectionStatus();
    
    // Event listeners
    window.addEventListener('online', () => {
        isOnline = true;
        updateConnectionStatus();
    });
    
    window.addEventListener('offline', () => {
        isOnline = false;
        updateConnectionStatus();
    });
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-fr]').forEach(el => {
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            el.placeholder = el.dataset[lang + 'Placeholder'] || el.dataset[lang];
        } else {
            el.textContent = el.dataset[lang];
        }
    });
}

function updateConnectionStatus() {
    const statusEl = document.getElementById('connectionStatus');
    const indicator = statusEl.querySelector('.status-indicator');
    const text = statusEl.querySelector('.status-text');
    
    if (isOnline) {
        indicator.classList.remove('offline');
        indicator.classList.add('online');
        text.textContent = translations[currentLanguage].online;
    } else {
        indicator.classList.remove('online');
        indicator.classList.add('offline');
        text.textContent = translations[currentLanguage].offline;
    }
}

function handleServiceClick(service) {
    const messages = {
        fr: {
            documents: "J'ai besoin d'aide pour des documents administratifs",
            demarches: "J'ai besoin d'aide pour des démarches administratives",
            orientation: "J'ai besoin d'orientation vers les bons services",
            associations: "Je cherche des informations sur les associations d'aide",
            juridique: "J'ai une question juridique"
        },
        en: {
            documents: "I need help with administrative documents",
            demarches: "I need help with administrative procedures",
            orientation: "I need guidance to the right services",
            associations: "I'm looking for information about aid associations",
            juridique: "I have a legal question"
        },
        es: {
            documents: "Necesito ayuda con documentos administrativos",
            demarches: "Necesito ayuda con trámites administrativos",
            orientation: "Necesito orientación hacia los servicios correctos",
            associations: "Busco información sobre asociaciones de ayuda",
            juridique: "Tengo una pregunta legal"
        },
        ar: {
            documents: "أحتاج المساعدة في الوثائق الإدارية",
            demarches: "أحتاج المساعدة في الإجراءات الإدارية",
            orientation: "أحتاج التوجيه إلى الخدمات المناسبة",
            associations: "أبحث عن معلومات حول جمعيات المساعدة",
            juridique: "لدي سؤال قانوني"
        }
    };
    
    const message = messages[currentLanguage][service];
    document.getElementById('userInput').value = message;
    sendMessage(service);
}

async function sendMessage(serviceType = null) {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    // Show loading
    showLoading(true);
    
    try {
        if (isOnline) {
            // ===== TIMEOUT INTELLIGENT: si l'API met >15 secondes, basculer en offline =====
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip, deflate' // Compression
                    },
                    body: JSON.stringify({
                        message: message,
                        language: currentLanguage,
                        serviceType: serviceType
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.success) {
                    // Déterminer le type de badge
                    const isOffline = data.offline === true;
                    const isFromCache = data.cached === true;
                    
                    let badge = null;
                    if (isOffline) {
                        badge = null; // Le badge sera ajouté automatiquement par addMessage avec isOffline=true
                    } else if (isFromCache) {
                        badge = '⚡ RÉPONSE RAPIDE (CACHE)';
                    }
                    
                    addMessage(data.response, 'assistant', isOffline, badge);
                    // Save to cache
                    if (!isOffline) {
                        saveToCache(message, data.response);
                    }
                } else {
                    throw new Error(data.error || 'Erreur inconnue');
                }
            } catch (fetchError) {
                clearTimeout(timeoutId);
                if (fetchError.name === 'AbortError') {
                    console.log('⏱️ Connexion trop lente (>15s), passage en mode offline');
                    throw new Error('Slow connection');
                }
                console.error('Erreur lors de l\'appel API:', fetchError);
                throw fetchError;
            }
        } else {
            throw new Error('Offline');
        }
    } catch (error) {
        console.log('Using offline mode:', error.message);
        // Fallback to offline mode
        const offlineResponse = getOfflineResponse(message);
        addMessage(offlineResponse, 'assistant', true);
    }
    
    showLoading(false);
}

function getOfflineResponse(message) {
    const normalizedMessage = message.toLowerCase();
    const knowledge = offlineKnowledge[currentLanguage];
    
    // Search in all categories
    for (const category in knowledge) {
        for (const item of knowledge[category]) {
            for (const keyword of item.keywords) {
                if (normalizedMessage.includes(keyword.toLowerCase())) {
                    return item.response;
                }
            }
        }
    }
    
    // Default offline response
    const defaultMessages = {
        fr: "Désolé, je suis actuellement hors ligne et je n'ai pas trouvé de réponse dans mon cache. Veuillez réessayer lorsque vous serez connecté, ou essayez d'utiliser les boutons rapides ci-dessus.",
        en: "Sorry, I am currently offline and could not find an answer in my cache. Please try again when you are connected, or try using the quick buttons above.",
        es: "Lo siento, actualmente estoy desconectado y no pude encontrar una respuesta en mi caché. Por favor, inténtalo de nuevo cuando estés conectado, o prueba usando los botones rápidos de arriba.",
        ar: "عذرًا، أنا غير متصل بالإنترنت حاليًا ولا يمكنني العثور على إجابة في ذاكرة التخزين المؤقت. يرجى المحاولة مرة أخرى عندما تكون متصلاً بالإنترنت، أو حاول استخدام الأزرار السريعة أعلاه."
    };
    return defaultMessages[currentLanguage] || defaultMessages['fr'];
}

function addMessage(content, type, isOffline = false, customBadge = null) {
    const chatContainer = document.getElementById('chatContainer');
    
    // Remove welcome message if present
    const welcome = chatContainer.querySelector('.welcome-message');
    if (welcome) {
        welcome.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'user' ? 'U' : 'AI';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    if (isOffline || customBadge) {
        if (isOffline) messageContent.classList.add('offline-response');
        const badge = document.createElement('div');
        badge.className = isOffline ? 'offline-badge' : 'cache-badge';
        badge.textContent = customBadge || translations[currentLanguage].offlineBadge;
        badge.style.backgroundColor = customBadge ? '#10b981' : '#ef4444';
        messageContent.appendChild(badge);
    }
    
    // Format message with markdown-like syntax
    const formattedContent = formatMessage(content);
    const textNode = document.createElement('div');
    textNode.innerHTML = formattedContent;
    messageContent.appendChild(textNode);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatMessage(text) {
    // Simple markdown-like formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/🌐 (.*?)$/gm, '<br><a href="#" style="color: #2563eb;">$1</a>')
        .replace(/📞 (.*?)$/gm, '<br><strong>☎️ $1</strong>');
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.toggle('active', show);
}

function saveToCache(question, answer) {
    offlineCache.push({ question, answer, timestamp: Date.now() });
    // Keep only last 50 items
    if (offlineCache.length > 50) {
        offlineCache = offlineCache.slice(-50);
    }
    localStorage.setItem('iaLowCostCache', JSON.stringify(offlineCache));
}

function loadCache() {
    try {
        const cached = localStorage.getItem('iaLowCostCache');
        if (cached) {
            offlineCache = JSON.parse(cached);
            document.getElementById('cacheInfo').querySelector('span').textContent = 
                translations[currentLanguage].cache + translations[currentLanguage].loaded;
        }
    } catch (e) {
        console.error('Error loading cache:', e);
    }
}
