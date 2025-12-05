<?php
// On inclut les fonctions et les données
include '../src/functions.php';

// On inclut le début du document HTML
include '../src/includes/header.php';
?>

<script src="assets/js/script.js"></script>
<link rel="stylesheet" href="assets/css/style.css" />

<main class="container">
    <h1>DOSSIER D'URGENCE : Analyse et Stratégie Anti-Goliath</h1>
    <p class="subtitle">Évaluation de la menace des Big Tech et pour l'autonomie scolaire.</p>

    <section class="problematique" id="menace">
        <h2>OBJECTIF 1 : Identifier et quantifier la Menace (Goliath)</h2>
        <p>Le problème de l'obsolescence va au-delà des coûts de licences. Il s'agit d'une perte d'autonomie et d'un coût environnemental massif.</p>
        
        <div class="menace-data" style="display: flex; justify-content: space-around; text-align: center; margin: 30px 0;">
            <div class="data-point">
                <h3 style="color: var(--color-stamp-red); font-size: 2em;">33 000</h3>
                <p>Établissements scolaires concernés en France.</p>
            </div>
            <div class="data-point">
                <h3 style="color: var(--color-ink-dark); font-size: 2em;">~250 000</h3>
                <p>Ordinateurs fonctionnels rendus obsolètes par Windows 11.</p>
            </div>
            <div class="data-point">
                <h3 style="color: var(--color-map-green); font-size: 2em;">- 80%</h3>
                <p>Réduction des dépendances avec le Logiciel Libre.</p>
            </div>
        </div>
        
        <p style="border-left: 4px solid var(--color-stamp-red); padding-left: 15px; background-color: #fcecec;">
            <strong>ALERTE ROUGE :</strong> Le renouvellement forcé des parcs informatiques représente une facture colossale pour les collectivités, sans compter l'impact du gaspillage électronique sur l'environnement.
        </p>
    </section>

    <section id="contre-mesure">
        <h2>OBJECTIF 2 : Le Plan de Contre-Attaque (Détails Stratégiques NIRD)</h2>
        <p>Le Plan NIRD se déploie en trois phases interconnectées, agissant comme le bouclier et la potion magique du Village Résistant.</p>
        
        <div class="phase-container" style="margin-top: 30px;">
            
            <h3 style="color: var(--color-map-green);">Phase I : Le Réemploi (DURABLE)</h3>
            <p style="border-left: 3px solid var(--color-map-green); padding-left: 15px;">
                <strong>Action clé : Migration Linux.</strong> Remplacer les systèmes propriétaires lourds par des distributions légères et libres (ex: Linux Mint, Ubuntu) sur le matériel existant. 
                <br>➔ Résultats : Prolongation de vie de 5 à 10 ans du matériel. Économie immédiate.
            </p>

            <h3 style="color: var(--color-map-green);">Phase II : La Souveraineté (RESPONSABLE)</h3>
            <p style="border-left: 3px solid var(--color-map-green); padding-left: 15px;">
                <strong>Action clé : Forge et Cloud Éducatif Local.</strong> Utiliser des plateformes de développement et de stockage mutualisées et locales (comme la Forge Éducative) pour garantir que les données restent sur le territoire national.
                <br>➔ Résultats : Protection RGPD renforcée et autonomie face aux géants du Cloud.
            </p>

            <h3 style="color: var(--color-map-green);">Phase III : L'Ouverture (INCLUSIF)</h3>
            <p style="border-left: 3px solid var(--color-map-green); padding-left: 15px;">
                <strong>Action clé : Formation et Co-construction.</strong> Ouvrir la gouvernance du numérique aux élèves et enseignants pour qu'ils deviennent acteurs des solutions, non simples consommateurs.
                <br>➔ Résultats : Réduction de la fracture numérique et développement de compétences critiques.
            </p>
            
        </div>
    </section>

    <section class="action-finale" style="text-align: center; margin-top: 50px;">
        <h2>OBJECTIF 3 : Déploiement et Mobilisation</h2>
        <p>Chaque établissement peut commencer l'audit de ses ressources et choisir les actions NIRD adaptées.</p>
        <p>Êtes-vous prêt à devenir l'architecte de ce Village Numérique Résistant ?</p>
        
        <a href="https://nird.forge.apps.education.fr/" target="_blank" class="btn-secondary">CONSULTER LA FORGE NIRD (EXTERNE)</a>
    </section>
</main>

<?php
// On inclut la fin du document HTML et les scripts
include '../src/includes/footer.php';
?>