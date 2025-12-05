<?php
// On inclut les fonctions et les données
include '../src/functions.php';

// On inclut le début du document HTML (qui contient le lien vers style.css)
include '../src/includes/header.php';
?>

<link rel="stylesheet" href="assets/css/style.css" />
<script src="assets/js/script.js"></script>

<main class="container" id="main-content">
    <section class="hero">
        <h1>Le Village Numérique Résistant: L'Ecole s'élève face à l'adversité</h1>
        <p class="subtitle">Dossier de Stratégie. Votre équipe est engagée pour l'autonomie technologique de l'École.</p>
    </section>

    <section class="problematique" id="probleme-goliath">
        <h2>Problématique : Le Mur de l'Obsolescence</h2>
        <p>L'abandon du support de Windows 10 rend des milliers d'ordinateurs obsolètes. C'est l'illustration de notre dépendance structurelle : matériel rendu inutilisable, licences coûteuses, et perte d'autonomie pour nos établissements scolaires.</p> 
        
        <h3>Stratégie : S'inspirer d'Astérix</h3>
        <p>Face à cet "empire numérique puissant", l'École peut devenir un village résistant, ingénieux, autonome et créatif. La démarche NIRD (Numérique Inclusif, Responsable et Durable) est notre potion magique pour redonner le pouvoir d'agir aux équipes éducatives.</p>
        
        <div id="cta-area" style="text-align: center;">
            <p>Consulter le Plan de Bataille pour la Résistance NIRD.</p>
            <a href="strategie.php" class="btn-primary" id="btn-next">OUVRIR LE DOSSIER STRATÉGIE &rarr;</a>
        </div>
    </section>
</main>

<?php
// On inclut la fin du document HTML et les scripts
include '../src/includes/footer.php';
?>