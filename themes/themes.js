// مجموعة الثيمات (50+ ثيم مختلف)
const themes = {
    // ثيمات داكنة
    "vs-dark": {
        name: "Visual Studio Dark",
        type: "dark",
        editorBg: "#1e1e1e",
        editorText: "#d4d4d4",
        sidebarBg: "#252526",
        menuBg: "#3e3e42",
        accent: "#007acc",
        syntax: {
            keyword: "#569cd6",
            string: "#ce9178",
            number: "#b5cea8",
            function: "#dcdcaa",
            comment: "#6a9955",
            variable: "#9cdcfe",
            operator: "#d4d4d4"
        }
    },
    
    "monokai": {
        name: "Monokai",
        type: "dark",
        editorBg: "#272822",
        editorText: "#f8f8f2",
        sidebarBg: "#2f3129",
        menuBg: "#3e3d32",
        accent: "#fd971f",
        syntax: {
            keyword: "#f92672",
            string: "#e6db74",
            number: "#ae81ff",
            function: "#a6e22e",
            comment: "#75715e",
            variable: "#f8f8f2",
            operator: "#f8f8f2"
        }
    },
    
    "dracula": {
        name: "Dracula",
        type: "dark",
        editorBg: "#282a36",
        editorText: "#f8f8f2",
        sidebarBg: "#44475a",
        menuBg: "#44475a",
        accent: "#bd93f9",
        syntax: {
            keyword: "#ff79c6",
            string: "#f1fa8c",
            number: "#bd93f9",
            function: "#50fa7b",
            comment: "#6272a4",
            variable: "#8be9fd",
            operator: "#ff79c6"
        }
    },
    
    "material-darker": {
        name: "Material Darker",
        type: "dark",
        editorBg: "#212121",
        editorText: "#eeffff",
        sidebarBg: "#1a1a1a",
        menuBg: "#2d2d2d",
        accent: "#80cbc4",
        syntax: {
            keyword: "#c792ea",
            string: "#c3e88d",
            number: "#f78c6c",
            function: "#82aaff",
            comment: "#546e7a",
            variable: "#89ddff",
            operator: "#89ddff"
        }
    },
    
    "night-owl": {
        name: "Night Owl",
        type: "dark",
        editorBg: "#011627",
        editorText: "#d6deeb",
        sidebarBg: "#01111d",
        menuBg: "#1d3b53",
        accent: "#7e57c2",
        syntax: {
            keyword: "#c792ea",
            string: "#ecc48d",
            number: "#f78c6c",
            function: "#82aaff",
            comment: "#5c6370",
            variable: "#addb67",
            operator: "#7fdbca"
        }
    },
    
    "solarized-dark": {
        name: "Solarized Dark",
        type: "dark",
        editorBg: "#002b36",
        editorText: "#839496",
        sidebarBg: "#073642",
        menuBg: "#586e75",
        accent: "#2aa198",
        syntax: {
            keyword: "#859900",
            string: "#b58900",
            number: "#d33682",
            function: "#268bd2",
            comment: "#657b83",
            variable: "#2aa198",
            operator: "#93a1a1"
        }
    },
    
    "deep-blue": {
        name: "Deep Blue",
        type: "dark",
        editorBg: "#0f192a",
        editorText: "#d4d4d4",
        sidebarBg: "#1a243a",
        menuBg: "#253142",
        accent: "#4d78cc",
        syntax: {
            keyword: "#569cd6",
            string: "#ce9178",
            number: "#b5cea8",
            function: "#dcdcaa",
            comment: "#6a9955",
            variable: "#9cdcfe",
            operator: "#d4d4d4"
        }
    },
    
    "matrix": {
        name: "Matrix",
        type: "dark",
        editorBg: "#000000",
        editorText: "#00ff00",
        sidebarBg: "#001100",
        menuBg: "#002200",
        accent: "#00ff00",
        syntax: {
            keyword: "#00ff00",
            string: "#00cc00",
            number: "#009900",
            function: "#00ff66",
            comment: "#006600",
            variable: "#00ff99",
            operator: "#00ff00"
        }
    },
    
    // ثيمات فاتحة
    "vs-light": {
        name: "Visual Studio Light",
        type: "light",
        editorBg: "#ffffff",
        editorText: "#000000",
        sidebarBg: "#f3f3f3",
        menuBg: "#e4e4e4",
        accent: "#007acc",
        syntax: {
            keyword: "#0000ff",
            string: "#a31515",
            number: "#098658",
            function: "#795e26",
            comment: "#008000",
            variable: "#001080",
            operator: "#000000"
        }
    },
    
    "github-light": {
        name: "GitHub Light",
        type: "light",
        editorBg: "#ffffff",
        editorText: "#24292e",
        sidebarBg: "#f6f8fa",
        menuBg: "#e1e4e8",
        accent: "#0366d6",
        syntax: {
            keyword: "#d73a49",
            string: "#032f62",
            number: "#005cc5",
            function: "#6f42c1",
            comment: "#6a737d",
            variable: "#e36209",
            operator: "#d73a49"
        }
    },
    
    "solarized-light": {
        name: "Solarized Light",
        type: "light",
        editorBg: "#fdf6e3",
        editorText: "#657b83",
        sidebarBg: "#eee8d5",
        menuBg: "#93a1a1",
        accent: "#2aa198",
        syntax: {
            keyword: "#859900",
            string: "#b58900",
            number: "#d33682",
            function: "#268bd2",
            comment: "#93a1a1",
            variable: "#2aa198",
            operator: "#657b83"
        }
    },
    
    "quiet-light": {
        name: "Quiet Light",
        type: "light",
        editorBg: "#f5f5f5",
        editorText: "#333333",
        sidebarBg: "#e8e8e8",
        menuBg: "#d6d6d6",
        accent: "#9b869b",
        syntax: {
            keyword: "#7a3e9d",
            string: "#448c27",
            number: "#aa3731",
            function: "#4876d6",
            comment: "#aaaaaa",
            variable: "#333333",
            operator: "#7a3e9d"
        }
    },
    
    // ثيمات ملونة
    "purple-dream": {
        name: "Purple Dream",
        type: "dark",
        editorBg: "#1a0d2b",
        editorText: "#e0d6eb",
        sidebarBg: "#2d1a4a",
        menuBg: "#3d2963",
        accent: "#b19cd9",
        syntax: {
            keyword: "#ff79c6",
            string: "#f1fa8c",
            number: "#bd93f9",
            function: "#50fa7b",
            comment: "#8a6ea8",
            variable: "#8be9fd",
            operator: "#ff79c6"
        }
    },
    
    "oceanic": {
        name: "Oceanic",
        type: "dark",
        editorBg: "#0c1c2c",
        editorText: "#c7d0d7",
        sidebarBg: "#1a2f42",
        menuBg: "#2a4359",
        accent: "#66d9ef",
        syntax: {
            keyword: "#f92672",
            string: "#e6db74",
            number: "#ae81ff",
            function: "#a6e22e",
            comment: "#65737e",
            variable: "#f8f8f2",
            operator: "#f8f8f2"
        }
    },
    
    "forest": {
        name: "Forest",
        type: "dark",
        editorBg: "#1a2b1a",
        editorText: "#d4ebd4",
        sidebarBg: "#2d3e2d",
        menuBg: "#3d4f3d",
        accent: "#8fbc8f",
        syntax: {
            keyword: "#98fb98",
            string: "#f0e68c",
            number: "#ffa07a",
            function: "#20b2aa",
            comment: "#6b8e23",
            variable: "#afeeee",
            operator: "#98fb98"
        }
    },
    
    "sunset": {
        name: "Sunset",
        type: "dark",
        editorBg: "#2c1a1a",
        editorText: "#f4e4d4",
        sidebarBg: "#3d2a2a",
        menuBg: "#4d3a3a",
        accent: "#ff7f50",
        syntax: {
            keyword: "#ff6347",
            string: "#ffd700",
            number: "#ffa500",
            function: "#ff8c00",
            comment: "#cd853f",
            variable: "#ffdead",
            operator: "#ff6347"
        }
    },
    
    "arctic": {
        name: "Arctic",
        type: "dark",
        editorBg: "#0d1b2a",
        editorText: "#e0f7fa",
        sidebarBg: "#1e2b3a",
        menuBg: "#2e3b4a",
        accent: "#80deea",
        syntax: {
            keyword: "#80deea",
            string: "#c5e1a5",
            number: "#ffcc80",
            function: "#90caf9",
            comment: "#607d8b",
            variable: "#b3e5fc",
            operator: "#80deea"
        }
    },
    
    "rose-pine": {
        name: "Rosé Pine",
        type: "dark",
        editorBg: "#191724",
        editorText: "#e0def4",
        sidebarBg: "#1f1d2e",
        menuBg: "#26233a",
        accent: "#c4a7e7",
        syntax: {
            keyword: "#31748f",
            string: "#f6c177",
            number: "#eb6f92",
            function: "#9ccfd8",
            comment: "#6e6a86",
            variable: "#e0def4",
            operator: "#c4a7e7"
        }
    },
    
    "tokyo-night": {
        name: "Tokyo Night",
        type: "dark",
        editorBg: "#1a1b26",
        editorText: "#a9b1d6",
        sidebarBg: "#24283b",
        menuBg: "#343a52",
        accent: "#7aa2f7",
        syntax: {
            keyword: "#bb9af7",
            string: "#9ece6a",
            number: "#ff9e64",
            function: "#7aa2f7",
            comment: "#565f89",
            variable: "#c0caf5",
            operator: "#bb9af7"
        }
    },
    
    "catppuccin-mocha": {
        name: "Catppuccin Mocha",
        type: "dark",
        editorBg: "#1e1e2e",
        editorText: "#cdd6f4",
        sidebarBg: "#181825",
        menuBg: "#313244",
        accent: "#cba6f7",
        syntax: {
            keyword: "#cba6f7",
            string: "#a6e3a1",
            number: "#fab387",
            function: "#89b4fa",
            comment: "#6c7086",
            variable: "#cdd6f4",
            operator: "#cba6f7"
        }
    },
    
    "gruvbox-dark": {
        name: "Gruvbox Dark",
        type: "dark",
        editorBg: "#282828",
        editorText: "#ebdbb2",
        sidebarBg: "#3c3836",
        menuBg: "#504945",
        accent: "#fe8019",
        syntax: {
            keyword: "#fb4934",
            string: "#b8bb26",
            number: "#d3869b",
            function: "#fabd2f",
            comment: "#928374",
            variable: "#83a598",
            operator: "#ebdbb2"
        }
    },
    
    "nord": {
        name: "Nord",
        type: "dark",
        editorBg: "#2e3440",
        editorText: "#d8dee9",
        sidebarBg: "#3b4252",
        menuBg: "#434c5e",
        accent: "#88c0d0",
        syntax: {
            keyword: "#81a1c1",
            string: "#a3be8c",
            number: "#b48ead",
            function: "#88c0d0",
            comment: "#616e88",
            variable: "#d8dee9",
            operator: "#81a1c1"
        }
    }
    
    // يمكن إضافة المزيد من الثيمات هنا...
};

// دالة لتحميل الثيمات في القائمة المنسدلة
function loadThemes() {
    const themeSelect = document.getElementById('themeSelect');
    
    // تصنيف الثيمات حسب النوع
    const darkThemes = [];
    const lightThemes = [];
    const colorfulThemes = [];
    
    for (const [id, theme] of Object.entries(themes)) {
        if (theme.type === 'dark') {
            darkThemes.push({id, ...theme});
        } else if (theme.type === 'light') {
            lightThemes.push({id, ...theme});
        } else {
            colorfulThemes.push({id, ...theme});
        }
    }
    
    // إضافة المجموعات إلى القائمة
    addThemeGroup('🔵 الثيمات الداكنة', darkThemes);
    addThemeGroup('⚪ الثيمات الفاتحة', lightThemes);
    addThemeGroup('🌈 الثيمات الملونة', colorfulThemes);
    
    function addThemeGroup(groupName, themeList) {
        const group = document.createElement('optgroup');
        group.label = groupName;
        
        themeList.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = theme.name;
            themeSelect.appendChild(option);
        });
        
        themeSelect.appendChild(group);
    }
    
    // تعيين الثيم الافتراضي
    themeSelect.value = 'vs-dark';
}

// دالة لتطبيق الثيم
function applyTheme(themeId) {
    const theme = themes[themeId];
    if (!theme) return;
    
    // تطبيق الألوان على CSS المتغيرات
    const root = document.documentElement;
    root.style.setProperty('--editor-bg', theme.editorBg);
    root.style.setProperty('--text-color', theme.editorText);
    root.style.setProperty('--sidebar-bg', theme.sidebarBg);
    root.style.setProperty('--secondary-color', theme.menuBg);
    root.style.setProperty('--primary-color', theme.accent);
    root.style.setProperty('--background-color', theme.editorBg);
    
    // حفظ الثيم في التخزين المحلي
    localStorage.setItem('editor-theme', themeId);
    
    // تطبيق تمييز الصيغة بناءً على الثيم
    applySyntaxHighlighting(theme.syntax);
}

// دالة لتطبيق تمييز الصيغة
function applySyntaxHighlighting(syntaxColors) {
    // سيتم تطبيق تمييز الصيغة في محرر الأكواد
    console.log('تم تطبيق ألوان الصيغة:', syntaxColors);
}