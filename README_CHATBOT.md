# 🤖 Assistant IA - Intégration NIRD

L'assistant IA a été intégré au site NIRD avec un style adapté au thème "Papier Ancien / Dossier".

## ✅ Installation terminée !

### 📦 Fichiers ajoutés :

```
public_html/
├── api.php                          # Backend API
├── cache/                           # Cache des réponses
└── assets/
    ├── css/
    │   ├── chatbot.css             # Styles du chat
    │   └── chatbot-widget.css      # Widget style papier ancien
    └── js/
        ├── chatbot.js              # Logique du chatbot
        └── chatbot-widget.js       # Widget flottant
```

## 🎨 Style adapté au thème du site

Le chatbot utilise les mêmes codes couleurs que le site :
- **Vert Carte** (#5C8D89) : Couleur principale
- **Rouge Cachet** (#C5292A) : Accents
- **Beige Papier** (#F8F4E3) : Fond
- **Encre** (#3E3E3E) : Texte
- **Bleu-Noir** (#1F2833) : Titres

### Design spécial :
- ✅ Bouton flottant style "tampon"
- ✅ Widget style "dossier ancien"
- ✅ Messages style "écriture manuscrite"
- ✅ Texture papier ancien
- ✅ Bordures et ombres cohérentes
- ✅ Police Georgia/Times New Roman

## 🚀 Utilisation

1. Ouvrez : http://localhost:8002/index.php
2. Un **bouton rond vert** apparaît en bas à droite
3. Cliquez pour ouvrir le chat
4. Choisissez votre langue (FR, EN, ES, AR)
5. Posez vos questions sur les services publics

## 🔧 Configuration API

Voir le fichier `test/README.md` pour les instructions complètes de configuration.

**Ligne 21-22 de `api.php` :**
```php
$apiKey = "VOTRE_CLE_API";
$model = "VOTRE_MODELE";
```

## 🎯 Fonctionnalités

✅ **4 langues** : FR, EN, ES, AR  
✅ **Mode hybride** : IA + Base de connaissances offline  
✅ **Style adapté** : Design cohérent avec le site  
✅ **Responsive** : Fonctionne sur mobile  
✅ **Boutons rapides** : Accès direct aux services  

## 📱 Responsive

- **Desktop** : 420px de large, style dossier
- **Mobile** : Plein écran avec adaptation

## 🎨 Personnalisation

Pour changer les couleurs, éditez `assets/css/chatbot-widget.css` :

```css
:root {
    --chatbot-primary: #5C8D89;    /* Vert Carte */
    --chatbot-secondary: #C5292A;  /* Rouge Cachet */
    --chatbot-paper: #F8F4E3;      /* Beige Papier */
}
```

## 🧪 Test

```bash
cd public_html
php -S localhost:8002
```

Puis ouvrez http://localhost:8002/index.php

---

**Bon courage pour la Nuit de l'Info ! 🌙💻**
