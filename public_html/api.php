<?php
// Configuration
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Compression GZIP pour réduire la bande passante
if (!ob_start('ob_gzhandler')) {
    ob_start();
}

// Gestion OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration API
$apiKey = "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";
$model = "z-ai/glm-4.5-air:free";

// Récupération du message utilisateur
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$userMessage = isset($input['message']) ? trim($input['message']) : '';
$language = isset($input['language']) ? $input['language'] : 'fr';
$serviceType = isset($input['serviceType']) ? $input['serviceType'] : null;

if (empty($userMessage)) {
    echo json_encode([
        "success" => false,
        "error" => $language === 'ar' ? "الرجاء إدخال رسالة" : "Veuillez entrer un message"
    ]);
    exit;
}

// ===== SYSTÈME DE CACHE CÔTÉ SERVEUR =====
$cacheDir = __DIR__ . '/cache';
if (!file_exists($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}

// Fonction pour obtenir le cache
function getCachedResponse($message, $language, $cacheDir) {
    $cacheKey = md5(strtolower(trim($message)) . $language);
    $cacheFile = $cacheDir . '/' . $cacheKey . '.json';
    
    if (file_exists($cacheFile)) {
        $cacheData = json_decode(file_get_contents($cacheFile), true);
        // Cache valide 24h
        if (time() - $cacheData['timestamp'] < 86400) {
            return $cacheData['response'];
        }
    }
    return null;
}

// Fonction pour sauvegarder en cache
function saveCachedResponse($message, $language, $response, $cacheDir) {
    $cacheKey = md5(strtolower(trim($message)) . $language);
    $cacheFile = $cacheDir . '/' . $cacheKey . '.json';
    
    file_put_contents($cacheFile, json_encode([
        'timestamp' => time(),
        'response' => $response,
        'message' => $message
    ]));
}

// Vérifier le cache d'abord
$cachedResponse = getCachedResponse($userMessage, $language, $cacheDir);
if ($cachedResponse !== null) {
    echo json_encode([
        "success" => true,
        "response" => $cachedResponse,
        "model" => $model,
        "language" => $language,
        "offline" => false,
        "cached" => true
    ]);
    exit;
}

// Contexte système selon la langue
$systemPrompts = [
    'fr' => "Tu es un assistant IA spécialisé UNIQUEMENT dans l'aide aux services publics et administratifs français. 

IMPORTANT : Tu ne dois répondre QU'aux questions concernant :
- Documents administratifs (carte d'identité, passeport, actes d'état civil)
- Démarches administratives (impôts, allocations, santé, emploi)
- Orientation vers les bons services (mairie, préfecture, CAF, Pôle Emploi, ANTS)
- Informations sur les associations et services d'aide
- Questions juridiques de base liées aux services publics (droits, procédures administratives)

Si la question n'est PAS liée aux services publics français, réponds poliment : \"Je suis désolé, je suis spécialisé uniquement dans l'aide aux services publics et administratifs français. Pourriez-vous me poser une question sur les documents administratifs, les démarches, l'orientation vers les services publics, les associations d'aide ou le droit administratif ?\"

Réponds de manière claire, concise et pratique. Donne des étapes concrètes et des liens vers les sites officiels quand c'est pertinent.",
    
    'en' => "You are an AI assistant specialized ONLY in helping with French public and administrative services.

IMPORTANT: You must ONLY answer questions about:
- Administrative documents (ID card, passport, birth certificates)
- Administrative procedures (taxes, benefits, health, employment)
- Guidance to the right services (town hall, prefecture, CAF, Pôle Emploi, ANTS)
- Information about associations and aid services
- Basic legal questions related to public services (rights, administrative procedures)

If the question is NOT related to French public services, politely respond: \"I'm sorry, I specialize only in helping with French public and administrative services. Could you ask me a question about administrative documents, procedures, guidance to public services, aid associations, or administrative law?\"

Respond clearly, concisely, and practically. Give concrete steps and links to official websites when relevant.",
    
    'es' => "Eres un asistente de IA especializado ÚNICAMENTE en ayudar con los servicios públicos y administrativos franceses.

IMPORTANTE: Solo debes responder preguntas sobre:
- Documentos administrativos (DNI, pasaporte, actas de nacimiento)
- Trámites administrativos (impuestos, prestaciones, salud, empleo)
- Orientación a los servicios correctos (ayuntamiento, prefectura, CAF, Pôle Emploi, ANTS)
- Información sobre asociaciones y servicios de ayuda
- Preguntas legales básicas relacionadas con servicios públicos (derechos, procedimientos administrativos)

Si la pregunta NO está relacionada con los servicios públicos franceses, responde educadamente: \"Lo siento, me especializo únicamente en ayudar con los servicios públicos y administrativos franceses. ¿Podrías hacerme una pregunta sobre documentos administrativos, trámites, orientación a servicios públicos, asociaciones de ayuda o derecho administrativo?\"

Responde de manera clara, concisa y práctica. Da pasos concretos y enlaces a sitios web oficiales cuando sea relevante.",
    
    'ar' => "أنت مساعد ذكاء اصطناعي متخصص فقط في المساعدة في الخدمات العامة والإدارية الفرنسية.

مهم: يجب أن ترد فقط على الأسئلة المتعلقة بـ:
- الوثائق الإدارية (بطاقة الهوية، جواز السفر، شهادات الحالة المدنية)
- الإجراءات الإدارية (الضرائب، المخصصات، الصحة، التوظيف)
- التوجيه إلى الخدمات المناسبة (البلدية، المحافظة، صندوق المخصصات العائلية، مكتب التوظيف، ANTS)
- معلومات عن الجمعيات وخدمات المساعدة
- أسئلة قانونية أساسية تتعلق بالخدمات العامة (الحقوق، الإجراءات الإدارية)

إذا لم يكن السؤال متعلقًا بالخدمات العامة الفرنسية، أجب بأدب: \"أنا آسف، أنا متخصص فقط في المساعدة في الخدمات العامة والإدارية الفرنسية. هل يمكنك طرح سؤال حول الوثائق الإدارية أو الإجراءات أو التوجيه إلى الخدمات العامة أو الجمعيات أو القانون الإداري؟\"

أجب بوضوح وإيجاز وعملية. أعط خطوات ملموسة وروابط إلى المواقع الرسمية عندما يكون ذلك مناسبًا."
];

// Ajout de contexte spécifique au service si fourni
$serviceContexts = [
    'documents' => [
        'fr' => "L'utilisateur demande des informations sur les documents administratifs.",
        'en' => "The user is asking for information about administrative documents.",
        'es' => "El usuario solicita información sobre documentos administrativos.",
        'ar' => "يطلب المستخدم معلومات حول الوثائق الإدارية."
    ],
    'demarches' => [
        'fr' => "L'utilisateur demande de l'aide pour des démarches administratives.",
        'en' => "The user is asking for help with administrative procedures.",
        'es' => "El usuario solicita ayuda con trámites administrativos.",
        'ar' => "يطلب المستخدم المساعدة في الإجراءات الإدارية."
    ],
    'orientation' => [
        'fr' => "L'utilisateur cherche une orientation vers les bons services.",
        'en' => "The user is looking for guidance to the right services.",
        'es' => "El usuario busca orientación hacia los servicios correctos.",
        'ar' => "يبحث المستخدم عن التوجيه إلى الخدمات المناسبة."
    ],
    'associations' => [
        'fr' => "L'utilisateur cherche des informations sur les associations et services d'aide.",
        'en' => "The user is looking for information about associations and aid services.",
        'es' => "El usuario busca información sobre asociaciones y servicios de ayuda.",
        'ar' => "يبحث المستخدم عن معلومات حول الجمعيات وخدمات المساعدة."
    ],
    'juridique' => [
        'fr' => "L'utilisateur a une question juridique.",
        'en' => "The user has a legal question.",
        'es' => "El usuario tiene una pregunta legal.",
        'ar' => "لدى المستخدم سؤال قانوني."
    ]
];

$systemMessage = $systemPrompts[$language];
if ($serviceType && isset($serviceContexts[$serviceType])) {
    $systemMessage .= "\n\n" . $serviceContexts[$serviceType][$language];
}

// ===== APPEL À L'API AVEC RETRY AUTOMATIQUE =====
$maxRetries = 2;
$retryDelay = 1; // secondes
$response = null;
$httpCode = 0;
$curlError = '';

for ($attempt = 0; $attempt <= $maxRetries; $attempt++) {
    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://openrouter.ai/api/v1/chat/completions",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $apiKey",
            "Content-Type: application/json",
            "HTTP-Referer: https://nuitinformatique.fr",
            "X-Title: IA Low-Cost Assistant",
            "Accept-Encoding: gzip, deflate" // Compression
        ],
        CURLOPT_POSTFIELDS => json_encode([
            "model" => $model,
            "messages" => [
                [
                    "role" => "system",
                    "content" => $systemMessage
                ],
                [
                    "role" => "user",
                    "content" => $userMessage
                ]
            ],
            "temperature" => 0.7,
            "max_tokens" => 800,
            "top_p" => 0.9
        ]),
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT => 60, // Augmenté à 60s pour connexions lentes
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_ENCODING => '', // Support compression automatique
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3
    ]);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);
    
    // Si succès, sortir de la boucle
    if ($httpCode === 200 && !$curlError) {
        break;
    }
    
    // Si c'est pas la dernière tentative, attendre avant de réessayer
    if ($attempt < $maxRetries) {
        sleep($retryDelay);
        $retryDelay *= 2; // Backoff exponentiel
    }
}

// Gestion des erreurs
if ($curlError) {
    $offlineMessages = [
        'fr' => "Désolé, je suis actuellement hors ligne et je n'ai pas trouvé de réponse dans mon cache. Veuillez réessayer lorsque vous serez connecté, ou essayez d'utiliser les boutons rapides ci-dessus.",
        'en' => "Sorry, I am currently offline and could not find an answer in my cache. Please try again when you are connected, or try using the quick buttons above.",
        'es' => "Lo siento, actualmente estoy desconectado y no pude encontrar una respuesta en mi caché. Por favor, inténtalo de nuevo cuando estés conectado, o prueba usando los botones rápidos de arriba.",
        'ar' => "عذرًا، أنا غير متصل بالإنترنت حاليًا ولا يمكنني العثور على إجابة في ذاكرة التخزين المؤقت. يرجى المحاولة مرة أخرى عندما تكون متصلاً بالإنترنت، أو حاول استخدام الأزرار السريعة أعلاه."
    ];
    $offlineMessage = $offlineMessages[$language] ?? $offlineMessages['fr'];
    
    echo json_encode([
        "success" => true,
        "response" => $offlineMessage,
        "model" => $model,
        "language" => $language,
        "offline" => true,
        "cached" => false
    ]);
    exit;
}

if ($httpCode !== 200) {
    $offlineMessages = [
        'fr' => "Désolé, je suis actuellement hors ligne et je n'ai pas trouvé de réponse dans mon cache. Veuillez réessayer lorsque vous serez connecté, ou essayez d'utiliser les boutons rapides ci-dessus.",
        'en' => "Sorry, I am currently offline and could not find an answer in my cache. Please try again when you are connected, or try using the quick buttons above.",
        'es' => "Lo siento, actualmente estoy desconectado y no pude encontrar una respuesta en mi caché. Por favor, inténtalo de nuevo cuando estés conectado, o prueba usando los botones rápidos de arriba.",
        'ar' => "عذرًا، أنا غير متصل بالإنترنت حاليًا ولا يمكنني العثور على إجابة في ذاكرة التخزين المؤقت. يرجى المحاولة مرة أخرى عندما تكون متصلاً بالإنترنت، أو حاول استخدام الأزرار السريعة أعلاه."
    ];
    $offlineMessage = $offlineMessages[$language] ?? $offlineMessages['fr'];
    
    echo json_encode([
        "success" => true,
        "response" => $offlineMessage,
        "model" => $model,
        "language" => $language,
        "offline" => true,
        "cached" => false
    ]);
    exit;
}

// Traitement de la réponse
$data = json_decode($response, true);

if (isset($data['choices'][0]['message']['content'])) {
    $aiResponse = $data['choices'][0]['message']['content'];
    
    // Sauvegarder en cache pour les prochaines fois
    saveCachedResponse($userMessage, $language, $aiResponse, $cacheDir);
    
    echo json_encode([
        "success" => true,
        "response" => $aiResponse,
        "model" => $model,
        "language" => $language,
        "offline" => false,
        "cached" => false,
        "attempts" => $attempt + 1
    ]);
} else {
    $offlineMessages = [
        'fr' => "Désolé, je suis actuellement hors ligne et je n'ai pas trouvé de réponse dans mon cache. Veuillez réessayer lorsque vous serez connecté, ou essayez d'utiliser les boutons rapides ci-dessus.",
        'en' => "Sorry, I am currently offline and could not find an answer in my cache. Please try again when you are connected, or try using the quick buttons above.",
        'es' => "Lo siento, actualmente estoy desconectado y no pude encontrar una respuesta en mi caché. Por favor, inténtalo de nuevo cuando estés conectado, o prueba usando los botones rápidos de arriba.",
        'ar' => "عذرًا، أنا غير متصل بالإنترنت حاليًا ولا يمكنني العثور على إجابة في ذاكرة التخزين المؤقت. يرجى المحاولة مرة أخرى عندما تكون متصلاً بالإنترنت، أو حاول استخدام الأزرار السريعة أعلاه."
    ];
    $offlineMessage = $offlineMessages[$language] ?? $offlineMessages['fr'];
    
    echo json_encode([
        "success" => true,
        "response" => $offlineMessage,
        "model" => $model,
        "language" => $language,
        "offline" => true,
        "cached" => false
    ]);
}
