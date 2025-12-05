<?php
// On inclut les fonctions et les données
include '../src/functions.php';

// On inclut le début du document HTML
include '../src/includes/header.php';
?>
<link rel="stylesheet" href="assets/css/style.css" />
<main class="container" id="main-content">
    <section class="hero">
        <h1>Le Village Numérique Résistant: Tenons Tête aux Big Tech</h1>
        <p class="subtitle">David contre Goliath, Astérix contre l'Empire numérique. Votre équipe est engagée pour l'autonomie technologique de l'École.</p>
    </section>

    <section class="problematique" id="probleme-goliath">
        <h2>La Dépendance, un Problème d'Obsolescence</h2>
        <p>La fin du support de Windows 10 met en évidence une dépendance structurelle : matériel rendu obsolète, licences coûteuses, et perte d'autonomie pour les équipes éducatives.</p>
        
        <div id="cta-area">
            <p>Prêt à découvrir les solutions NIRD ?</p>
            <a href="solutions.php" class="btn-primary" id="btn-next">Découvrir les solutions NIRD &rarr;</a>
        </div>
    </section>
</main>

<?php
// On inclut la fin du document HTML et les scripts
include '../src/includes/footer.php';
?>