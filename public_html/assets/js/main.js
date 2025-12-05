// Fichier: main.js
// Logique JavaScript pour le projet NIRD

document.addEventListener('DOMContentLoaded', () => {
    console.log("Projet NIRD : Script principal chargé !");

    // 1. Amélioration de l'interactivité du bouton principal
    const nextButton = document.getElementById('btn-next');
    const ctaArea = document.getElementById('cta-area');

    if (nextButton && ctaArea) {
        let hoverCount = 0;
        
        // Ajout d'une petite animation/changement de texte sur le survol (ludique)
        nextButton.addEventListener('mouseover', () => {
            if (hoverCount === 0) {
                ctaArea.querySelector('p').textContent = "C'est l'heure de l'action !";
            }
            hoverCount++;
        });

        // 2. Initialisation pour un éventuel ajout futur d'animations GSAP ou de quiz
        // Ici, vous ajouteriez la logique de chargement de données, de quiz ou de simulation.
        
        console.log("Les éléments interactifs de la page d'accueil sont prêts.");
    }

});