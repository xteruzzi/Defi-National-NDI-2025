<?php
// On inclut les fonctions et les données
include '../src/functions.php';

// On inclut le début du document HTML
include '../src/includes/header.php';
?>

<main class="container">
    <h1>PLAN D'ACTION : Les Trois Piliers NIRD du Village Résistant</h1>
    
    <div class="piliers-grid">
        <section class="pilier inclusif card">
            <h2>1. Numérique Inclusif 🤝</h2>
            <p class="tagline">Garantir l'accès et l'usage pour tous, c'est la première ligne de défense contre l'Empire.</p>
            <ul>
                <li>Favoriser la co-construction de solutions numériques locales.</li>
                <li>Mutualiser les ressources et outils libres via la Forge des communs numériques éducatifs.</li>
                <li>Assurer l'accès aux outils numériques pour tous les élèves et enseignants.</li>
            </ul>
        </section>
        
        <section class="pilier responsable card">
            <h2>2. Numérique Responsable 🛡️</h2>
            <p class="tagline">Gestion éthique, souveraine et éco-citoyenne : nos données sont NOTRE territoire.</p>
            <ul>
                <li>Sensibiliser les équipes éducatives et les élèves à la sobriété numérique.</li>
                <li>Utiliser des solutions locales et mutualisées pour éviter les écosystèmes fermés.</li>
                <li>Adopter un numérique libre et écocitoyen au sein des établissements.</li>
            </ul>
        </section>

        <section class="pilier durable card">
            <h2>3. Numérique Durable ♻️</h2>
            <p class="tagline">Prolonger la vie du matériel, car un outil qui fonctionne est une victoire contre l'obsolescence.</p>
            <ul>
                <li>Encourager le **réemploi** et le reconditionnement du matériel.</li>
                <li>Promouvoir l'usage de **Linux** afin de lutter contre l'obsolescence programmée.</li>
                <li>Prolonger la vie des milliers d'ordinateurs non compatibles avec les systèmes Big Tech.</li>
            </ul>
        </section>
    </div>
    
    <section class="action-finale" style="text-align: center; margin-top: 40px;">
        <h3 style="font-family: var(--font-heading); color: var(--color-ink-dark);"> DOSSIER 0 / 3 Piliers Validés.</h3>
        <p>Cliquez sur les cartes pour apposer le **Cachet d'Approbation** et valider ces stratégies de résistance.</p>
    </section>
</main>

<?php
// On inclut la fin du document HTML et les scripts
include '../src/includes/footer.php';
?>