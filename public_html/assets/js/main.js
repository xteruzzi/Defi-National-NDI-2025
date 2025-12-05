// Fichier: public_html/assets/js/main.js
// Logique JavaScript pour le projet NIRD - Dossier de Résistance

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Fonctionnalité 1 : Suivi des Piliers NIRD (solutions.php) ---
    const solutionSections = document.querySelectorAll('.piliers-grid .card');
    
    if (solutionSections.length > 0) {
        let pillarsChecked = 0;
        const totalPillars = solutionSections.length;
        const actionFinaleTitle = document.querySelector('.action-finale h3');
        
        solutionSections.forEach(section => {
            section.addEventListener('click', () => {
                if (!section.classList.contains('validated')) {
                    section.classList.add('validated');
                    pillarsChecked++;
                    updateEngagementStatus();
                }
            });
            section.setAttribute('title', ">> CLIQUEZ POUR APPOSER LE CACHET D'APPROBATION <<");
        });

        function updateEngagementStatus() {
            if (actionFinaleTitle) {
                // Mise à jour du titre
                actionFinaleTitle.textContent = `[ DOSSIER ] ${pillarsChecked} / ${totalPillars} Piliers Validés.`;
                
                if (pillarsChecked === totalPillars) {
                    // Message final pour l'engagement
                    actionFinaleTitle.innerHTML = ">>> VÉRITABLE RÉSISTANT : LE PLAN EST DÉVERROUILLÉ ! <<<";
                    // Utilisation des variables CSS pour le style manuscrit/cachet
                    actionFinaleTitle.style.color = 'var(--color-stamp-red)';
                    actionFinaleTitle.style.textDecoration = 'underline wavy var(--color-stamp-red)';
                }
            }
        }
        
        updateEngagementStatus();
    }
    
    // --- Fonctionnalité 2 : Animation sur le bouton d'accueil (index.php) ---
    const btnNext = document.getElementById('btn-next');
    const ctaParagraph = document.querySelector('#cta-area p');

    if (btnNext && ctaParagraph) {
        let originalText = ctaParagraph.textContent;
        let changeTextTimeout;

        btnNext.addEventListener('mouseover', () => {
            // Changement de texte au survol pour un effet de "clignement d'alerte"
            ctaParagraph.textContent = "ALERTE! L'ennemi est à la porte. DÉPLOIEMENT IMMÉDIAT !";
        });

        btnNext.addEventListener('mouseout', () => {
            // Retour au texte original
            ctaParagraph.textContent = originalText;
        });
    }
});