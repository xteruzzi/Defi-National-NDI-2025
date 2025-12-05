<?php
/**
 * Fichier de fonctions PHP
 * Contient toutes les fonctions réutilisables dans le projet NIRD.
 */

// Exemple de fonction : charger les données depuis un fichier JSON
function loadJsonData($filepath) {
    if (file_exists($filepath)) {
        $json_content = file_get_contents($filepath);
        return json_decode($json_content, true);
    }
    return [];
}
?>