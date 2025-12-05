// ============================
// HIDDEN SNAKE OS - Script Principal
// ============================

const CONFIG = {
    SNAKE_SPEED: 100,
    GRID_SIZE: 20,
    INITIAL_LENGTH: 3,
    SECRET_CODE: 'Sn@keNuit',
    KONAMI_CODE: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
};

const STATE = {
    activeWindow: null,
    minimizedWindows: [],
    windowZIndex: 1000,
    windowIdCounter: 0,
    searchActive: false,
    fullscreenMode: false,
    konamiIndex: 0,
    snakeGame: {
        active: false,
        paused: false,
        score: 0,
        highScore: localStorage.getItem('highScore') || 0,
        snake: [],
        direction: 'right',
        nextDirection: 'right',
        food: null,
        gameLoop: null
    }
};

const fileSystem = {
    'Documents': {
        type: 'folder',
        items: {
            'readme.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Bienvenue dans Hidden Snake OS !\n\nCe système d\'exploitation moderne contient de nombreux fichiers et applications.\n\nExplorez les différents dossiers pour découvrir tout le contenu disponible.',
                size: '512 KB',
                modified: '15/01/2024'
            },
            'CV_2024.docx': {
                type: 'file',
                extension: 'docx',
                content: 'Curriculum Vitae - Mise à jour 2024\n\nExpérience professionnelle, formation, compétences...',
                size: '847 KB',
                modified: '20/01/2024'
            },
            'Projet_Final.docx': {
                type: 'file',
                extension: 'docx',
                content: 'Document de projet - Rapport détaillé sur le développement d\'applications web modernes',
                size: '2.4 MB',
                modified: '10/01/2024'
            },
            'notes_reunions.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Notes de réunions:\n\n- 15/01: Discussion sur les nouveaux objectifs\n- 18/01: Présentation des résultats Q4\n- 22/01: Planning des prochains mois',
                size: '156 KB',
                modified: '22/01/2024'
            },
            'todo_list.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Liste des tâches:\n\n✓ Terminer le rapport\n✓ Envoyer les emails\n- Préparer la présentation\n- Mettre à jour le site web\n- Vérifier les sauvegardes',
                size: '89 KB',
                modified: '18/01/2024'
            },
            'passions.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Je suis fan de Retro gaming et j aime beaucoup mettre le code konami un peu partout ;)',
                size: '89 KB',
                modified: '18/01/2024'
            }
        }
    },
    'Images': {
        type: 'folder',
        items: {
            'wallpaper_01.jpg': {
                type: 'file',
                extension: 'jpg',
                content: 'Image JPEG - Fond d\'écran montagne',
                size: '3.2 MB',
                modified: '05/01/2024'
            },
            'wallpaper_02.jpg': {
                type: 'file',
                extension: 'jpg',
                content: 'Image JPEG - Fond d\'écran océan',
                size: '2.8 MB',
                modified: '05/01/2024'
            },
            'vacances_2023.png': {
                type: 'file',
                extension: 'png',
                content: 'Image PNG - Photos de vacances été 2023',
                size: '1.8 MB',
                modified: '08/08/2023'
            },
            'screenshot_01.png': {
                type: 'file',
                extension: 'png',
                content: 'Image PNG - Capture d\'écran',
                size: '945 KB',
                modified: '12/01/2024'
            },
            'logo_entreprise.png': {
                type: 'file',
                extension: 'png',
                content: 'Image PNG - Logo officiel',
                size: '234 KB',
                modified: '03/01/2024'
            }
        }
    },
    'Musique': {
        type: 'folder',
        items: {
            'playlist_favoris.mp3': {
                type: 'file',
                extension: 'mp3',
                content: 'Fichier audio MP3 - Compilation favoris',
                size: '4.5 MB',
                modified: '12/01/2024'
            },
            'podcast_tech.mp3': {
                type: 'file',
                extension: 'mp3',
                content: 'Fichier audio MP3 - Podcast technologie',
                size: '28.3 MB',
                modified: '16/01/2024'
            },
            'musique_relaxation.mp3': {
                type: 'file',
                extension: 'mp3',
                content: 'Fichier audio MP3 - Musique zen',
                size: '6.7 MB',
                modified: '10/01/2024'
            }
        }
    },
    'Videos': {
        type: 'folder',
        items: {
            'presentation_2024.mp4': {
                type: 'file',
                extension: 'mp4',
                content: 'Fichier vidéo MP4 - Présentation annuelle',
                size: '125 MB',
                modified: '03/01/2024'
            },
            'demo_produit.mp4': {
                type: 'file',
                extension: 'mp4',
                content: 'Fichier vidéo MP4 - Démonstration produit',
                size: '45 MB',
                modified: '15/01/2024'
            },
            'tutoriel_formation.mp4': {
                type: 'file',
                extension: 'mp4',
                content: 'Fichier vidéo MP4 - Vidéo de formation',
                size: '89 MB',
                modified: '08/01/2024'
            }
        }
    },
    'Téléchargements': {
        type: 'folder',
        items: {
            'installer_v2.5.exe': {
                type: 'file',
                extension: 'exe',
                content: 'Programme d\'installation version 2.5',
                size: '15 MB',
                modified: '14/01/2024'
            },
            'update_pack.exe': {
                type: 'file',
                extension: 'exe',
                content: 'Pack de mises à jour système',
                size: '8.2 MB',
                modified: '19/01/2024'
            },
            'archive_backup.zip': {
                type: 'file',
                extension: 'zip',
                content: 'Archive compressée - Sauvegarde complète',
                size: '234 MB',
                modified: '13/01/2024'
            },
            'documents_2023.zip': {
                type: 'file',
                extension: 'zip',
                content: 'Archive compressée - Documents année 2023',
                size: '45 MB',
                modified: '02/01/2024'
            },
            'photos_compressees.zip': {
                type: 'file',
                extension: 'zip',
                content: 'Archive compressée - Collection photos',
                size: '128 MB',
                modified: '11/01/2024'
            }
            
        }
    },
    'Projets': {
        type: 'folder',
        items: {
            'site_web.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Notes Projet Site Web\n\n- Refonte complète du design\n- Ajout d\'une section blog\n- Optimisation mobile\n- Intégration paiement en ligne',
                size: '234 KB',
                modified: '17/01/2024'
            },
            'cahier_charges.docx': {
                type: 'file',
                extension: 'docx',
                content: 'Cahier des charges - Spécifications techniques du projet',
                size: '1.2 MB',
                modified: '12/01/2024'
            },
            'planning.docx': {
                type: 'file',
                extension: 'docx',
                content: 'Planning prévisionnel - Répartition des tâches et délais',
                size: '678 KB',
                modified: '14/01/2024'
            }
        }
    },
    'Système': {
        type: 'folder',
        items: {
            'system32.dll': {
                type: 'file',
                extension: 'dll',
                content: 'Bibliothèque système principale - Ne pas modifier',
                size: '5.6 MB',
                modified: '01/01/2024'
            },
            'drivers.sys': {
                type: 'file',
                extension: 'sys',
                content: 'Pilotes système\n\n[DRIVERS]\nGRAPHICS=enabled\nAUDIO=enabled\nNETWORK=enabled\nUSB=enabled',
                size: '2.3 MB',
                modified: '01/01/2024'
            },
            'registry.dat': {
                type: 'file',
                extension: 'dat',
                content: 'Base de registre système - Fichier protégé',
                size: '12.4 MB',
                modified: '01/01/2024'
            },
            'boot.ini': {
                type: 'file',
                extension: 'ini',
                content: '[BOOT CONFIGURATION]\ntimeout=5\ndefault=Windows\nsafe_mode=disabled\n\n[HIDDEN_FEATURES]\ndebug_mode=false',
                size: '34 KB',
                modified: '01/01/2024'
            },
            'system_log.txt': {
                type: 'file',
                extension: 'txt',
                content: 'Journal système\n\n[2024-01-20 10:23:45] Démarrage système\n[2024-01-20 10:23:48] Services chargés\n[2024-01-20 10:23:52] Interface utilisateur active\n[2024-01-20 10:24:01] Tous les composants opérationnels',
                size: '456 KB',
                modified: '20/01/2024'
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🐍 Hidden Snake OS - Initialisation...');
    
    initializeDesktop();
    initializeTaskbar();
    initializeStartMenu();
    initializeSearchBar();
    initializeKeyboardShortcuts();
    initializeSecretCode();
    updateClock();
    initializeEasterEggs();
    
    console.log('✅ Système chargé avec succès!');
    console.log('💡 Astuce: Explorez les fichiers système pour découvrir des secrets...');
    console.log('🕐 L\'horloge cache peut-être quelque chose...');
    
    showNotification('Bienvenue dans Hidden Snake OS!', 'info');
});

function initializeDesktop() {
    const desktop = document.getElementById('desktop');
    const icons = [
        { name: 'Documents', icon: '📁', folder: 'Documents' },
        { name: 'Images', icon: '🖼️', folder: 'Images' },
        { name: 'Musique', icon: '🎵', folder: 'Musique' },
        { name: 'Videos', icon: '🎬', folder: 'Videos' },
        { name: 'Téléchargements', icon: '📥', folder: 'Téléchargements' },
        { name: 'Projets', icon: '💼', folder: 'Projets' },
        { name: 'Système', icon: '⚙️', folder: 'Système' },
        { name: 'Corbeille', icon: '🗑️', folder: null }
    ];
    
    icons.forEach(data => {
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.innerHTML = `
            <div class="desktop-icon-image">${data.icon}</div>
            <div class="desktop-icon-label">${data.name}</div>
        `;
        if (data.folder) {
            icon.addEventListener('dblclick', () => openFolder(data.folder));
        } else {
            icon.addEventListener('dblclick', () => showNotification('Corbeille vide', 'info'));
        }
        desktop.appendChild(icon);
    });
}

function initializeTaskbar() {
    document.getElementById('start-btn').addEventListener('click', toggleStartMenu);
    document.getElementById('search-btn').addEventListener('click', openSearchBar);
}

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);

function initializeStartMenu() {
    const menu = document.getElementById('start-menu');
    
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !document.getElementById('start-btn').contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.app-item').forEach(app => {
        app.addEventListener('click', () => {
            const name = app.querySelector('.app-name').textContent;
            openApplication(name);
            menu.classList.remove('active');
        });
    });
}

function toggleStartMenu() {
    document.getElementById('start-menu').classList.toggle('active');
}

function openApplication(name) {
    if (name === 'Explorateur') openFolder('Documents');
    else if (name === 'Bloc-notes') openFile('readme.txt', 'Documents');
    else showNotification(`${name} - Bientôt disponible`, 'info');
}

function createWindow(title, content, width = 800, height = 600) {
    const id = `window-${STATE.windowIdCounter++}`;
    const win = document.createElement('div');
    win.className = 'window';
    win.id = id;
    win.style.width = width + 'px';
    win.style.height = height + 'px';
    win.style.zIndex = ++STATE.windowZIndex;
    win.style.left = Math.max(0, (window.innerWidth - width) / 2) + 'px';
    win.style.top = Math.max(0, (window.innerHeight - height) / 2) + 'px';
    
    win.innerHTML = `
        <div class="window-header">
            <div class="window-title">${title}</div>
            <div class="window-controls">
                <button class="window-btn minimize-btn">−</button>
                <button class="window-btn maximize-btn">□</button>
                <button class="window-btn close-btn">×</button>
            </div>
        </div>
        <div class="window-content">${content}</div>
    `;
    
    document.getElementById('desktop').appendChild(win);
    
    makeWindowDraggable(win);
    
    win.querySelector('.close-btn').addEventListener('click', () => closeWindow(id));
    win.querySelector('.minimize-btn').addEventListener('click', () => minimizeWindow(id));
    win.querySelector('.maximize-btn').addEventListener('click', () => maximizeWindow(id));
    win.addEventListener('mousedown', () => focusWindow(id));
    
    addTaskbarItem(id, title);
    STATE.activeWindow = id;
    
    return id;
}

function makeWindowDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false, startX, startY, initialX, initialY;
    
    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = win.offsetLeft;
        initialY = win.offsetTop;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.left = (initialX + dx) + 'px';
        win.style.top = Math.max(0, initialY + dy) + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    header.addEventListener('dblclick', (e) => {
        if (!e.target.classList.contains('window-btn')) {
            maximizeWindow(win.id);
        }
    });
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        // Si c'est la fenêtre du jeu Snake
        if (id === 'snake-window') {
            // Si une partie est en cours, demander confirmation
            if (STATE.snakeGame.active) {
                if (!confirm('Quitter le jeu en cours ?')) {
                    return; // Annuler la fermeture
                }
            }
            // Arrêter le jeu proprement
            stopSnakeGame();
        }
        win.remove();
        removeTaskbarItem(id);
    }
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.add('minimized');
        STATE.minimizedWindows.push(id);
    }
}

function maximizeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.classList.toggle('maximized');
}

function restoreWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.remove('minimized');
        STATE.minimizedWindows = STATE.minimizedWindows.filter(x => x !== id);
        focusWindow(id);
    }
}

function focusWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.zIndex = ++STATE.windowZIndex;
        STATE.activeWindow = id;
        document.querySelectorAll('.taskbar-item').forEach(item => {
            item.classList.toggle('active', item.dataset.windowId === id);
        });
    }
}

function addTaskbarItem(id, title) {
    const item = document.createElement('div');
    item.className = 'taskbar-item active';
    item.dataset.windowId = id;
    item.textContent = title;
    item.addEventListener('click', () => {
        const win = document.getElementById(id);
        if (win.classList.contains('minimized')) restoreWindow(id);
        else if (STATE.activeWindow === id) minimizeWindow(id);
        else focusWindow(id);
    });
    document.querySelector('.taskbar-items').appendChild(item);
}

function removeTaskbarItem(id) {
    const item = document.querySelector(`[data-window-id="${id}"]`);
    if (item) item.remove();
}

function openFolder(path) {
    const folder = fileSystem[path];
    if (!folder || folder.type !== 'folder') return;
    
    let content = `
        <div class="file-explorer">
            <div class="explorer-toolbar">
                <button class="toolbar-btn" onclick="goBack()">← Retour</button>
                <div class="explorer-path">📁 ${path}</div>
            </div>
            <div class="explorer-content">
    `;
    
    for (let [name, item] of Object.entries(folder.items)) {
        const icon = getFileIcon(item.extension);
        content += `
            <div class="file-item" ondblclick="openFile('${name}', '${path}')">
                <div class="file-icon">${icon}</div>
                <div class="file-name">${name}</div>
                <div class="file-info">${item.size || ''}</div>
            </div>
        `;
    }
    
    content += '</div></div>';
    createWindow(`Explorateur - ${path}`, content, 900, 600);
}

function openFile(name, folder) {
    const file = fileSystem[folder].items[name];
    if (!file) return;
    
    let content = '';
    
    if (file.extension === 'txt' || file.extension === 'sys' || file.extension === 'ini' || file.extension === 'dat') {
        content = `<div class="text-editor"><pre>${file.content}</pre></div>`;
        createWindow(name, content, 700, 500);
    }
    else if (file.extension === 'docx') {
        content = `<div class="document-viewer"><div class="document-header">📄 Document Word</div><div class="document-content">${file.content}</div></div>`;
        createWindow(name, content, 800, 600);
    }
    else if (file.extension === 'jpg' || file.extension === 'png') {
        content = `<div class="image-viewer"><div class="image-placeholder"><div class="placeholder-icon">🖼️</div><div>${file.content}</div></div></div>`;
        createWindow(name, content, 800, 600);
    }
    else if (file.extension === 'mp3') {
        content = `<div class="media-player"><div class="media-icon">🎵</div><div class="media-title">${name}</div><div class="media-controls"><button class="media-btn">▶️ Lecture</button><button class="media-btn">⏸️ Pause</button><button class="media-btn">⏹️ Stop</button></div></div>`;
        createWindow(name, content, 600, 400);
    }
    else if (file.extension === 'mp4') {
        content = `<div class="media-player"><div class="media-icon">🎬</div><div class="media-title">${name}</div><div class="media-controls"><button class="media-btn">▶️ Lecture</button><button class="media-btn">⏸️ Pause</button><button class="media-btn">⏹️ Stop</button></div></div>`;
        createWindow(name, content, 800, 600);
    }
    else if (file.extension === 'exe') {
        showNotification(`Exécution de ${name}...`, 'info');
        setTimeout(() => showNotification('Programme terminé', 'success'), 2000);
    }
    else if (file.extension === 'zip') {
        content = `<div class="archive-viewer"><div class="archive-header">📦 Archive ZIP</div><div class="archive-content"><p>${file.content}</p><button class="btn-primary" onclick="showNotification('Extraction simulée', 'success')">Extraire</button></div></div>`;
        createWindow(name, content, 600, 400);
    }
}

function getFileIcon(ext) {
    const icons = {
        'txt': '📝', 'docx': '📄', 'jpg': '🖼️', 'png': '🖼️',
        'mp3': '🎵', 'mp4': '🎬', 'exe': '⚙️', 'zip': '📦',
        'sys': '🔧', 'dll': '📚', 'dat': '💾', 'ini': '⚙️'
    };
    return icons[ext] || '📄';
}

function goBack() {
    if (STATE.activeWindow) closeWindow(STATE.activeWindow);
}

function initializeSearchBar() {
    const bar = document.getElementById('search-bar');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    
    document.getElementById('close-search').addEventListener('click', closeSearchBar);
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length === 0) {
            results.innerHTML = '';
            return;
        }
        performSearch(query);
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearchBar();
    });
}

function openSearchBar() {
    const bar = document.getElementById('search-bar');
    bar.classList.add('active');
    STATE.searchActive = true;
    document.getElementById('search-input').focus();
}

function closeSearchBar() {
    const bar = document.getElementById('search-bar');
    bar.classList.remove('active');
    STATE.searchActive = false;
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
}

function performSearch(query) {
    const results = [];
    
    for (let [folderName, folderData] of Object.entries(fileSystem)) {
        if (folderData.type === 'folder') {
            for (let [fileName, fileData] of Object.entries(folderData.items)) {
                if (fileName.toLowerCase().includes(query)) {
                    results.push({
                        type: 'file',
                        name: fileName,
                        folder: folderName,
                        path: `${folderName}/${fileName}`,
                        icon: getFileIcon(fileData.extension)
                    });
                }
                
                if (fileData.content && fileData.content.toLowerCase().includes(query)) {
                    const snippet = extractSnippet(fileData.content, query);
                    results.push({
                        type: 'content',
                        name: fileName,
                        folder: folderName,
                        path: `${folderName}/${fileName}`,
                        snippet: snippet,
                        icon: getFileIcon(fileData.extension)
                    });
                }
            }
        }
    }
    
    displaySearchResults(results);
}

function extractSnippet(content, query) {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    const start = Math.max(0, index - 40);
    const end = Math.min(content.length, index + query.length + 40);
    let snippet = content.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet += '...';
    
    const regex = new RegExp(`(${query})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    
    return snippet;
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
        return;
    }
    
    let html = '';
    const files = results.filter(r => r.type === 'file');
    const contents = results.filter(r => r.type === 'content');
    
    if (files.length > 0) {
        html += '<div class="search-category">Fichiers</div>';
        files.forEach(r => {
            html += `
                <div class="search-result-item" onclick="openFileFromSearch('${r.name}', '${r.folder}')">
                    <div class="result-icon">${r.icon}</div>
                    <div class="result-info">
                        <div class="result-title">${r.name}</div>
                        <div class="result-path">${r.path}</div>
                    </div>
                </div>
            `;
        });
    }
    
    if (contents.length > 0) {
        html += '<div class="search-category">Contenu</div>';
        contents.forEach(r => {
            html += `
                <div class="search-result-item" onclick="openFileFromSearch('${r.name}', '${r.folder}')">
                    <div class="result-icon">${r.icon}</div>
                    <div class="result-info">
                        <div class="result-title">${r.name}</div>
                        <div class="result-snippet">${r.snippet}</div>
                        <div class="result-path">${r.path}</div>
                    </div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

function openFileFromSearch(name, folder) {
    openFile(name, folder);
    closeSearchBar();
}

function initializeSecretCode() {
    const modal = document.getElementById('secret-code-modal');
    const input = document.getElementById('secret-code-input');
    
    document.getElementById('submit-code').addEventListener('click', () => checkSecretCode(input.value));
    document.getElementById('cancel-code').addEventListener('click', hideSecretCodeModal);
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkSecretCode(input.value);
        else if (e.key === 'Escape') hideSecretCodeModal();
    });
}

function showSecretCodeModal() {
    const modal = document.getElementById('secret-code-modal');
    modal.classList.add('active');
    document.getElementById('secret-code-input').value = '';
    document.getElementById('secret-code-input').focus();
}

function hideSecretCodeModal() {
    document.getElementById('secret-code-modal').classList.remove('active');
}

function checkSecretCode(code) {
    if (code.toLowerCase() === CONFIG.SECRET_CODE.toLowerCase()) {
        hideSecretCodeModal();
        showNotification('🎉 Code correct ! Lancement du jeu...', 'success');
        setTimeout(() => launchSnakeGame(), 1000);
    } else {
        showNotification('❌ Code incorrect. Indice : fichiers système...', 'error');
        document.getElementById('secret-code-input').value = '';
    }
}

function launchSnakeGame() {
    if (document.getElementById('snake-window')) {
        focusWindow('snake-window');
        return;
    }
    
    const content = `
        <div class="snake-game">
            <div id="snake-start-screen" class="snake-start-screen">
                <div class="snake-logo">🐍</div>
                <h1 class="snake-title">Hidden Snake</h1>
                <p class="snake-subtitle">Un jeu caché dans le système...</p>
                <div class="snake-stats">
                    <div class="stat-item">
                        <span class="stat-label">Meilleur Score</span>
                        <span class="stat-value">${STATE.snakeGame.highScore}</span>
                    </div>
                </div>
                <button class="snake-start-btn" onclick="startSnakeGame()">
                    <span class="btn-icon">▶️</span>
                    <span class="btn-text">Commencer</span>
                </button>
                <div class="snake-instructions">
                    <p>🎮 Utilisez les flèches pour diriger le serpent</p>
                    <p>🍎 Mangez la nourriture pour grandir</p>
                    <p>⚠️ Évitez les murs et votre propre corps</p>
                </div>
            </div>
            <div id="snake-game-screen" class="snake-game-screen" style="display: none;">
                <div class="snake-header">
                    <div class="snake-score">
                        <div>Score: <span id="current-score">0</span></div>
                        <div>Record: <span id="high-score">${STATE.snakeGame.highScore}</span></div>
                    </div>
                    <div class="snake-controls">
                        <button class="snake-btn" id="pause-btn" onclick="togglePauseSnake()">⏸️ Pause</button>
                        <button class="snake-btn" onclick="restartSnakeGame()">🔄 Recommencer</button>
                    </div>
                </div>
                <canvas id="snake-canvas" width="400" height="400"></canvas>
                <div class="snake-instructions">
                    <p>🎮 Flèches pour jouer | Espace: Pause | R: Recommencer | ESC: Quitter</p>
                </div>
            </div>
        </div>
    `;
    
    const id = createWindow('🐍 Hidden Snake Game', content, 500, 650);
    document.getElementById(id).id = 'snake-window';
}

function startSnakeGame() {
    const startScreen = document.getElementById('snake-start-screen');
    const gameScreen = document.getElementById('snake-game-screen');
    
    if (startScreen && gameScreen) {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        setTimeout(() => initSnakeGame(), 100);
    }
}

function initSnakeGame() {
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    STATE.snakeGame.active = true;
    STATE.snakeGame.paused = false;
    STATE.snakeGame.score = 0;
    STATE.snakeGame.direction = 'right';
    STATE.snakeGame.nextDirection = 'right';
    STATE.snakeGame.snake = [];
    
    for (let i = 0; i < CONFIG.INITIAL_LENGTH; i++) {
        STATE.snakeGame.snake.push({ x: CONFIG.INITIAL_LENGTH - i, y: 10 });
    }
    
    spawnFood();
    
    if (STATE.snakeGame.gameLoop) clearInterval(STATE.snakeGame.gameLoop);
    
    STATE.snakeGame.gameLoop = setInterval(() => {
        if (!STATE.snakeGame.paused && STATE.snakeGame.active) {
            updateSnakeGame();
            drawSnakeGame(ctx);
        }
    }, CONFIG.SNAKE_SPEED);
}

function updateSnakeGame() {
    STATE.snakeGame.direction = STATE.snakeGame.nextDirection;
    
    const head = { ...STATE.snakeGame.snake[0] };
    
    if (STATE.snakeGame.direction === 'up') head.y--;
    else if (STATE.snakeGame.direction === 'down') head.y++;
    else if (STATE.snakeGame.direction === 'left') head.x--;
    else if (STATE.snakeGame.direction === 'right') head.x++;
    
    if (head.x < 0 || head.x >= CONFIG.GRID_SIZE || head.y < 0 || head.y >= CONFIG.GRID_SIZE) {
        gameOver();
        return;
    }
    
    for (let seg of STATE.snakeGame.snake) {
        if (head.x === seg.x && head.y === seg.y) {
            gameOver();
            return;
        }
    }
    
    STATE.snakeGame.snake.unshift(head);
    
    if (head.x === STATE.snakeGame.food.x && head.y === STATE.snakeGame.food.y) {
        STATE.snakeGame.score += 10;
        updateScore();
        spawnFood();
    } else {
        STATE.snakeGame.snake.pop();
    }
}

function drawSnakeGame(ctx) {
    const size = ctx.canvas.width / CONFIG.GRID_SIZE;
    
    // Fond avec dégradé
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, '#0a0f1a');
    gradient.addColorStop(1, '#0f1419');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Grille subtile
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CONFIG.GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, ctx.canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * size);
        ctx.lineTo(ctx.canvas.width, i * size);
        ctx.stroke();
    }
    
    // Serpent avec effet 3D et dégradé
    STATE.snakeGame.snake.forEach((seg, i) => {
        const x = seg.x * size;
        const y = seg.y * size;
        const padding = 3;
        const segSize = size - padding * 2;
        
        // Ombre portée
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + padding + 2, y + padding + 2, segSize, segSize);
        
        // Corps du serpent avec dégradé
        const segGradient = ctx.createLinearGradient(x, y, x + size, y + size);
        if (i === 0) {
            // Tête - cyan brillant
            segGradient.addColorStop(0, '#22d3ee');
            segGradient.addColorStop(1, '#06b6d4');
        } else {
            // Corps - cyan vers bleu
            const opacity = 1 - (i / STATE.snakeGame.snake.length) * 0.3;
            segGradient.addColorStop(0, `rgba(34, 211, 238, ${opacity})`);
            segGradient.addColorStop(1, `rgba(6, 182, 212, ${opacity})`);
        }
        
        ctx.fillStyle = segGradient;
        ctx.fillRect(x + padding, y + padding, segSize, segSize);
        
        // Bordure brillante
        if (i === 0) {
            ctx.strokeStyle = '#67e8f9';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + padding, y + padding, segSize, segSize);
            
            // Yeux pour la tête
            const eyeSize = 3;
            const eyeOffsetX = segSize * 0.3;
            const eyeOffsetY = segSize * 0.3;
            
            ctx.fillStyle = '#0f172a';
            // Œil gauche
            ctx.beginPath();
            ctx.arc(x + padding + eyeOffsetX, y + padding + eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            // Œil droit
            ctx.beginPath();
            ctx.arc(x + padding + segSize - eyeOffsetX, y + padding + eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Bordure subtile pour le corps
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.3 - i * 0.01})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + padding, y + padding, segSize, segSize);
        }
        
        // Effet de brillance
        if (i < 3) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.2 - i * 0.05})`;
            ctx.fillRect(x + padding + 2, y + padding + 2, segSize * 0.4, segSize * 0.4);
        }
    });
    
    // Nourriture avec animation pulse
    if (STATE.snakeGame.food) {
        const centerX = STATE.snakeGame.food.x * size + size / 2;
        const centerY = STATE.snakeGame.food.y * size + size / 2;
        const baseRadius = (size - 6) / 2;
        const pulse = Math.sin(Date.now() / 200) * 2;
        const radius = baseRadius + pulse;
        
        // Ombre de la nourriture
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + 2, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Halo lumineux
        const haloGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
        haloGradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        haloGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Nourriture principale avec dégradé
        const foodGradient = ctx.createRadialGradient(
            centerX - radius/3, centerY - radius/3, 0,
            centerX, centerY, radius
        );
        foodGradient.addColorStop(0, '#fca5a5');
        foodGradient.addColorStop(0.5, '#ef4444');
        foodGradient.addColorStop(1, '#dc2626');
        
        ctx.fillStyle = foodGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Reflet brillant
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(centerX - radius/3, centerY - radius/3, radius/3, 0, Math.PI * 2);
        ctx.fill();
        
        // Bordure subtile
        ctx.strokeStyle = '#fca5a5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function spawnFood() {
    let food;
    let valid = false;
    
    while (!valid) {
        food = {
            x: Math.floor(Math.random() * CONFIG.GRID_SIZE),
            y: Math.floor(Math.random() * CONFIG.GRID_SIZE)
        };
        valid = true;
        for (let seg of STATE.snakeGame.snake) {
            if (seg.x === food.x && seg.y === food.y) {
                valid = false;
                break;
            }
        }
    }
    
    STATE.snakeGame.food = food;
}

function updateScore() {
    const el = document.getElementById('current-score');
    if (el) el.textContent = STATE.snakeGame.score;
    
    if (STATE.snakeGame.score > STATE.snakeGame.highScore) {
        STATE.snakeGame.highScore = STATE.snakeGame.score;
        localStorage.setItem('highScore', STATE.snakeGame.highScore);
        const hs = document.getElementById('high-score');
        if (hs) hs.textContent = STATE.snakeGame.highScore;
    }
}

function togglePauseSnake() {
    STATE.snakeGame.paused = !STATE.snakeGame.paused;
    const btn = document.getElementById('pause-btn');
    if (btn) btn.textContent = STATE.snakeGame.paused ? '▶️ Reprendre' : '⏸️ Pause';
}

function restartSnakeGame() {
    stopSnakeGame();
    initSnakeGame();
}

function gameOver() {
    STATE.snakeGame.active = false;
    clearInterval(STATE.snakeGame.gameLoop);
    
    const score = STATE.snakeGame.score;
    const isRecord = score > parseInt(localStorage.getItem('highScore') || 0);
    
    let msg = `Game Over!\n\nScore: ${score}`;
    if (isRecord) msg += '\n\n🎉 Nouveau record !';
    
    setTimeout(() => {
        if (confirm(msg + '\n\nRecommencer ?')) {
            restartSnakeGame();
        } else {
            // Retourner à l'écran d'accueil au lieu de fermer
            const startScreen = document.getElementById('snake-start-screen');
            const gameScreen = document.getElementById('snake-game-screen');
            if (startScreen && gameScreen) {
                gameScreen.style.display = 'none';
                startScreen.style.display = 'flex';
                // Mettre à jour le meilleur score affiché
                const statValue = startScreen.querySelector('.stat-value');
                if (statValue) statValue.textContent = STATE.snakeGame.highScore;
            }
        }
    }, 100);
}

function stopSnakeGame() {
    STATE.snakeGame.active = false;
    if (STATE.snakeGame.gameLoop) {
        clearInterval(STATE.snakeGame.gameLoop);
        STATE.snakeGame.gameLoop = null;
    }
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (STATE.snakeGame.active) {
            if (e.key === 'ArrowUp' && STATE.snakeGame.direction !== 'down') {
                STATE.snakeGame.nextDirection = 'up';
                e.preventDefault();
            } else if (e.key === 'ArrowDown' && STATE.snakeGame.direction !== 'up') {
                STATE.snakeGame.nextDirection = 'down';
                e.preventDefault();
            } else if (e.key === 'ArrowLeft' && STATE.snakeGame.direction !== 'right') {
                STATE.snakeGame.nextDirection = 'left';
                e.preventDefault();
            } else if (e.key === 'ArrowRight' && STATE.snakeGame.direction !== 'left') {
                STATE.snakeGame.nextDirection = 'right';
                e.preventDefault();
            }
            
            if (e.key === ' ') {
                togglePauseSnake();
                e.preventDefault();
            }
            
            if (e.key === 'r' || e.key === 'R') {
                restartSnakeGame();
                e.preventDefault();
            }
            
            if (e.key === 'Escape') {
                // Arrêter le jeu et retourner à l'écran d'accueil
                stopSnakeGame();
                const startScreen = document.getElementById('snake-start-screen');
                const gameScreen = document.getElementById('snake-game-screen');
                if (startScreen && gameScreen) {
                    gameScreen.style.display = 'none';
                    startScreen.style.display = 'flex';
                }
                e.preventDefault();
            }
        }
        
        // Si on est sur l'écran d'accueil du jeu et qu'on appuie sur ESC, fermer la fenêtre
        if (e.key === 'Escape' && !STATE.snakeGame.active) {
            const snakeWindow = document.getElementById('snake-window');
            if (snakeWindow) {
                const startScreen = document.getElementById('snake-start-screen');
                if (startScreen && startScreen.style.display !== 'none') {
                    closeWindow('snake-window');
                    e.preventDefault();
                    return;
                }
            }
        }
        
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            openSearchBar();
        }
        
        if (e.key === 'Escape' && !STATE.snakeGame.active) {
            if (STATE.searchActive) closeSearchBar();
            const modal = document.getElementById('secret-code-modal');
            if (modal.classList.contains('active')) hideSecretCodeModal();
        }
        
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
        
        if (e.ctrlKey && e.key === 'w') {
            e.preventDefault();
            if (STATE.activeWindow) closeWindow(STATE.activeWindow);
        }
        
        if (e.altKey && e.key === 'Tab') {
            e.preventDefault();
            switchToNextWindow();
        }
        
        checkKonamiCode(e.key);
    });
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Essayer différentes méthodes selon le navigateur
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then(() => {
                showNotification('Mode plein écran activé (F11 pour quitter)', 'info');
            }).catch(() => {
                showNotification('Plein écran non disponible', 'warning');
            });
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
            showNotification('Mode plein écran activé', 'info');
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            showNotification('Mode plein écran activé', 'info');
        } else {
            showNotification('Plein écran non supporté par votre navigateur', 'error');
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        showNotification('Mode plein écran désactivé', 'info');
    }
}

function switchToNextWindow() {
    const windows = Array.from(document.querySelectorAll('.window:not(.minimized)'));
    if (windows.length === 0) return;
    
    const idx = windows.findIndex(w => w.id === STATE.activeWindow);
    const next = (idx + 1) % windows.length;
    focusWindow(windows[next].id);
}

function checkKonamiCode(key) {
    if (key === CONFIG.KONAMI_CODE[STATE.konamiIndex]) {
        STATE.konamiIndex++;
        if (STATE.konamiIndex === CONFIG.KONAMI_CODE.length) {
            STATE.konamiIndex = 0;
            showNotification('🎮 Konami Code ! Code: ' + CONFIG.SECRET_CODE, 'success');
        }
    } else {
        STATE.konamiIndex = 0;
    }
}

function initializeEasterEggs() {
    const clock = document.getElementById('clock');
    clock.addEventListener('dblclick', showSecretCodeModal);
    
    let clicks = 0;
    let timer = null;
    document.getElementById('start-btn').addEventListener('click', () => {
        clicks++;
        if (timer) clearTimeout(timer);
        if (clicks === 3) {
            launchSnakeGame();
            clicks = 0;
        } else {
            timer = setTimeout(() => clicks = 0, 1000);
        }
    });
}

function showNotification(msg, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    
    const icons = { 'info': 'ℹ️', 'success': '✅', 'error': '❌', 'warning': '⚠️' };
    
    notif.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${msg}</span>
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

console.log('🐍 Hidden Snake OS - Prêt!');
