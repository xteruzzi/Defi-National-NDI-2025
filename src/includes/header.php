<?php
// Chemin d'accès relatif à la racine publique
$base_url = '/'; 
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NIRD - Le Village Numérique Résistant</title>

    <link rel="stylesheet" href="<?= $base_url ?>assets/css/style.css"> 

</head>
<body>

<header>
    <nav>
        <div class="logo">
            <img src="<?= $base_url ?>assets/images/logo-NIRD.png" alt="Logo NIRD">
        </div>
        <ul>
            <li><a href="<?= $base_url ?>index.php">Accueil</a></li>
            <li><a href="<?= $base_url ?>solutions.php">Solutions NIRD</a></li>
        </ul>
    </nav>
</header>