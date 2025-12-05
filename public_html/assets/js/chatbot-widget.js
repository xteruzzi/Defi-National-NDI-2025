// Widget Chatbot - Bouton flottant et popup
let chatbotOpen = false;

// Créer le bouton flottant
function createChatbotButton() {
    const button = document.createElement('button');
    button.id = 'chatbot-toggle';
    button.className = 'chatbot-toggle';
    button.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.4 4 4 8.6 4 14.5C4 17.4 5.3 20 7.5 22L6 28L12.5 25C13.6 25.3 14.8 25.5 16 25.5C22.6 25.5 28 20.9 28 15C28 9.1 22.6 4 16 4Z" fill="white"/>
            <circle cx="11" cy="14" r="2" fill="#1F2833"/>
            <circle cx="16" cy="14" r="2" fill="#1F2833"/>
            <circle cx="21" cy="14" r="2" fill="#1F2833"/>
        </svg>
    `;
    button.setAttribute('aria-label', 'Ouvrir l\'assistant services publics');
    button.title = 'Assistant IA Services Publics';
    document.body.appendChild(button);
    
    button.addEventListener('click', toggleChatbot);
}

// Créer le conteneur du chatbot
function createChatbotContainer() {
    const container = document.createElement('div');
    container.id = 'chatbot-widget';
    container.className = 'chatbot-widget';
    container.style.display = 'none';
    
    container.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-header-content">
                <div class="logo">
                    <svg width="30" height="30" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="#F8F4E3"/>
                        <path d="M20 10 L20 30 M10 20 L30 20" stroke="#1F2833" stroke-width="3"/>
                    </svg>
                    <h3>Assistant Services Publics</h3>
                </div>
                <div class="chatbot-controls">
                    <div class="language-selector-mini">
                        <button class="lang-btn-mini active" data-lang="fr">FR</button>
                        <button class="lang-btn-mini" data-lang="en">EN</button>
                        <button class="lang-btn-mini" data-lang="es">ES</button>
                        <button class="lang-btn-mini" data-lang="ar">AR</button>
                    </div>
                    <button id="chatbot-close" class="chatbot-close" aria-label="Fermer">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="connection-status" id="connectionStatus">
                <span class="status-indicator online"></span>
                <span class="status-text" data-fr="En ligne" data-en="Online" data-es="En línea" data-ar="متصل">En ligne</span>
            </div>
        </div>
        
        <div class="chatbot-services">
            <button class="service-btn-mini" data-service="documents" data-fr="📄 Documents" data-en="📄 Documents" data-es="📄 Documentos" data-ar="📄 الوثائق">📄 Documents</button>
            <button class="service-btn-mini" data-service="demarches" data-fr="📝 Démarches" data-en="📝 Procedures" data-es="📝 Trámites" data-ar="📝 الإجراءات">📝 Démarches</button>
            <button class="service-btn-mini" data-service="orientation" data-fr="🧭 Orientation" data-en="🧭 Guidance" data-es="🧭 Orientación" data-ar="🧭 التوجيه">🧭 Orientation</button>
            <button class="service-btn-mini" data-service="associations" data-fr="🤝 Associations" data-en="🤝 Associations" data-es="🤝 Asociaciones" data-ar="🤝 الجمعيات">🤝 Associations</button>
            <button class="service-btn-mini" data-service="juridique" data-fr="⚖️ Juridique" data-en="⚖️ Legal" data-es="⚖️ Legal" data-ar="⚖️ القانونية">⚖️ Juridique</button>
        </div>
        
        <div class="chat-container" id="chatContainer">
            <div class="welcome-message">
                <h4 data-fr="Bienvenue ! Comment puis-je vous aider ?" data-en="Welcome! How can I help you?" data-es="¡Bienvenido! ¿Cómo puedo ayudarte?" data-ar="مرحبا! كيف يمكنني مساعدتك؟">Bienvenue ! Comment puis-je vous aider ?</h4>
                <p data-fr="Je peux vous guider dans vos démarches administratives." data-en="I can guide you through administrative procedures." data-es="Puedo guiarte en tus trámites administrativos." data-ar="يمكنني إرشادك في إجراءاتك الإدارية.">Je peux vous guider dans vos démarches administratives.</p>
            </div>
        </div>
        
        <div class="input-container">
            <div class="input-wrapper">
                <textarea 
                    id="userInput" 
                    rows="1"
                    data-fr-placeholder="Posez votre question ici..."
                    data-en-placeholder="Ask your question here..."
                    data-es-placeholder="Haz tu pregunta aquí..."
                    data-ar-placeholder="اطرح سؤالك هنا..."
                    placeholder="Posez votre question ici..."></textarea>
                <button id="sendBtn" class="send-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 8L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="loading-overlay" id="loadingOverlay">
            <div class="loading-spinner"></div>
            <p data-fr="Traitement en cours..." data-en="Processing..." data-es="Procesando..." data-ar="جاري المعالجة...">Traitement en cours...</p>
        </div>
    `;
    
    document.body.appendChild(container);
    
    // Ajouter l'event listener pour fermer
    document.getElementById('chatbot-close').addEventListener('click', toggleChatbot);
}

// Toggle chatbot
function toggleChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const button = document.getElementById('chatbot-toggle');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        widget.style.display = 'flex';
        button.classList.add('hidden');
    } else {
        widget.style.display = 'none';
        button.classList.remove('hidden');
    }
}

// Initialiser le widget au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createChatbotButton();
        createChatbotContainer();
        initChatbotEvents();
    });
} else {
    createChatbotButton();
    createChatbotContainer();
    initChatbotEvents();
}

// Initialiser les événements du chatbot
function initChatbotEvents() {
    // Initialiser le chatbot
    if (typeof window.chatbotInitialize === 'function') {
        window.chatbotInitialize();
    }
    
    // Attendre que le DOM soit complètement chargé
    setTimeout(() => {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (typeof sendMessage === 'function') {
                    sendMessage();
                }
            });
        }
        
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (typeof sendMessage === 'function') {
                        sendMessage();
                    }
                }
            });
            
            // Auto-resize
            userInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
        
        // Language selector
        document.querySelectorAll('.lang-btn-mini').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof switchLanguage === 'function') {
                    switchLanguage(btn.dataset.lang);
                }
                // Update active state
                document.querySelectorAll('.lang-btn-mini').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Service buttons
        document.querySelectorAll('.service-btn-mini').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof handleServiceClick === 'function') {
                    handleServiceClick(btn.dataset.service);
                }
            });
        });
    }, 100);
}
