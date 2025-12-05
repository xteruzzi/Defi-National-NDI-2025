<?php
// On inclut les fonctions et les données
include '../src/functions.php';

// On inclut le début du document HTML
include '../src/includes/header.php';
?>

<link rel="stylesheet" href="assets/css/style.css">

<main class="container">
    <h1>Les Solutions du NIRD : Pour un Numérique Autonome</h1>
    
    <section class="pilier inclusif">
        <h2>1. Numérique Inclusif</h2>
        <p>Assurer l'accès et l'utilisation des outils numériques pour tous les élèves et enseignants.</p>
    </section>
    
    <section class="pilier responsable">
        <h2>2. Numérique Responsable</h2>
        <p>Gérer les données de manière éthique et souveraine, en utilisant des solutions locales et mutualisées comme la Forge.</p>
    </section>

    <section class="pilier durable">
        <h2>3. Numérique Durable (La Potion Magique)</h2>
        <p>Lutter contre l'obsolescence en favorisant le **réemploi** et la migration vers les **logiciels libres** (comme Linux) sur le matériel existant.</p>
    </section>

    <section class="action-finale">
        <h3>Prêt à devenir un Résistant ?</h3>
        <p>Chacun, élève, enseignant ou collectivité, peut contribuer à l'autonomie du village numérique.</p>
        <a href="index.php" class="btn-secondary">Retour à l'accueil</a>
    </section>
</main>

<?php
// On inclut la fin du document HTML et les scripts
include '../src/includes/footer.php';
?>