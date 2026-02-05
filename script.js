// حالة التطبيق
const appState = {
    files: [],
    currentFile: null,
    theme: 'vs-dark',
    fontSize: 16,
    sidebarVisible: true,
    previewVisible: false,
    editMode: 'insert'
};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الثيمات
    if (typeof loadThemes === 'function') {
        loadThemes();
    }
    
    // تحميل الحالة السابقة
    loadState();
    
    // إعداد العناصر
    setupElements();
    
    // إضافة ملفات افتراضية
    addDefaultFiles();
    
    // تحديث الواجهة
    updateUI();
});

// تحميل الحالة من التخزين المحلي
function loadState() {
    const savedTheme = localStorage.getItem('editor-theme');
    const savedFontSize = localStorage.getItem('editor-fontSize');
    const savedFiles = localStorage.getItem('editor-files');
    
    if (savedTheme) appState.theme = savedTheme;
    if (savedFontSize) appState.fontSize = parseInt(savedFontSize);
    if (savedFiles) {
        try {
            appState.files = JSON.parse(savedFiles);
        } catch (e) {
            console.error('خطأ في تحميل الملفات:', e);
        }
    }
    
    // تطبيق الثيم
    if (typeof applyTheme === 'function') {
        applyTheme(appState.theme);
    }
}

// حفظ الحالة في التخزين المحلي
function saveState() {
    localStorage.setItem('editor-files', JSON.stringify(appState.files));
}

// إعداد العناصر والمستمعين للأحداث
function setupElements() {
    // العناصر
    const codeEditor = document.getElementById('codeEditor');
    const themeSelect = document.getElementById('themeSelect');
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const togglePreview = document.getElementById('togglePreview');
    const newFileBtn = document.getElementById('newFileBtn');
    const fileModal = document.getElementById('fileModal');
    const fileNameInput = document.getElementById('fileNameInput');
    const confirmCreate = document.getElementById('confirmCreate');
    const cancelCreate = document.getElementById('cancelCreate');
    
    // مستمعو الأحداث
    themeSelect.addEventListener('change', function() {
        appState.theme = this.value;
        if (typeof applyTheme === 'function') {
            applyTheme(this.value);
        }
    });
    
    fontSizeSlider.addEventListener('input', function() {
        appState.fontSize = this.value;
        fontSizeValue.textContent = this.value + 'px';
        codeEditor.style.fontSize = this.value + 'px';
        localStorage.setItem('editor-fontSize', this.value);
    });
    
    toggleSidebar.addEventListener('click', function() {
        appState.sidebarVisible = !appState.sidebarVisible;
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    });
    
    togglePreview.addEventListener('click', function() {
        appState.previewVisible = !appState.previewVisible;
        const previewPane = document.getElementById('previewPane');
        previewPane.classList.toggle('visible');
        
        if (appState.previewVisible) {
            updatePreview();
        }
    });
    
    newFileBtn.addEventListener('click', function() {
        fileModal.classList.add('active');
        fileNameInput.focus();
    });
    
    confirmCreate.addEventListener('click', function() {
        const fileName = fileNameInput.value.trim();
        if (fileName) {
            createNewFile(fileName);
            fileModal.classList.remove('active');
            fileNameInput.value = '';
        }
    });
    
    cancelCreate.addEventListener('click', function() {
        fileModal.classList.remove('active');
        fileNameInput.value = '';
    });
    
    fileNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            confirmCreate.click();
        }
    });
    
    // مستمعون للقوائم
    setupMenuListeners();
    
    // مستمعون لمحرر الأكواد
    setupEditorListeners();
    
    // تحديث حجم الخط
    fontSizeSlider.value = appState.fontSize;
    fontSizeValue.textContent = appState.fontSize + 'px';
    codeEditor.style.fontSize = appState.fontSize + 'px';
    
    // تحديث الثيم
    if (themeSelect.value !== appState.theme) {
        themeSelect.value = appState.theme;
    }
}

// إعداد مستمعي القوائم
function setupMenuListeners() {
    // ملف جديد
    document.getElementById('newFile').addEventListener('click', function() {
        document.getElementById('fileModal').classList.add('active');
        document.getElementById('fileNameInput').focus();
    });
    
    // فتح ملف
    document.getElementById('openFile').addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.html,.css,.js,.txt,.json,.md,.py';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    createNewFile(file.name, e.target.result);
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    });
    
    // حفظ
    document.getElementById('saveFile').addEventListener('click', saveCurrentFile);
    
    // حفظ باسم
    document.getElementById('saveAs').addEventListener('click', function() {
        if (appState.currentFile) {
            const content = document.getElementById('codeEditor').value;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = appState.currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    });
    
    // تصدير الكود
    document.getElementById('exportCode').addEventListener('click', function() {
        const content = document.getElementById('codeEditor').value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = appState.currentFile ? appState.currentFile.name : 'code.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
    
    // تحرير
    document.getElementById('undo').addEventListener('click', function() {
        document.execCommand('undo');
    });
    
    document.getElementById('redo').addEventListener('click', function() {
        document.execCommand('redo');
    });
    
    document.getElementById('cut').addEventListener('click', function() {
        document.execCommand('cut');
    });
    
    document.getElementById('copy').addEventListener('click', function() {
        document.execCommand('copy');
    });
    
    document.getElementById('paste').addEventListener('click', function() {
        document.execCommand('paste');
    });
    
    // بحث
    document.getElementById('find').addEventListener('click', function() {
        document.getElementById('findModal').classList.add('active');
        document.getElementById('findInput').focus();
    });
    
    // تشغيل الكود
    document.getElementById('runCode').addEventListener('click', function() {
        updatePreview();
        appState.previewVisible = true;
        document.getElementById('previewPane').classList.add('visible');
    });
    
    // تنسيق الكود
    document.getElementById('formatCode').addEventListener('click', formatCode);
    
    // إغلاق المعاينة
    document.getElementById('closePreview').addEventListener('click', function() {
        appState.previewVisible = false;
        document.getElementById('previewPane').classList.remove('visible');
    });
    
    // البحث في النافذة المنبثقة
    setupFindModal();
}

// إعداد مستمعي محرر الأكواد
function setupEditorListeners() {
    const editor = document.getElementById('codeEditor');
    
    editor.addEventListener('input', function() {
        if (appState.currentFile) {
            appState.currentFile.content = this.value;
            appState.currentFile.unsaved = true;
            updateTab(appState.currentFile);
            saveState();
        }
        
        updateStats();
        
        // تحديث المعاينة إذا كانت ظاهرة
        if (appState.previewVisible) {
            updatePreview();
        }
    });
    
    editor.addEventListener('keydown', function(e) {
        // التكميل التلقائي
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            // إضافة مسافة بادئة
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            
            updateStats();
        }
        
        // تغيير وضع الكتابة
        if (e.key === 'Insert') {
            appState.editMode = appState.editMode === 'insert' ? 'overwrite' : 'insert';
            document.getElementById('editMode').textContent = appState.editMode.toUpperCase();
        }
    });
    
    editor.addEventListener('click', updateCursorPosition);
    editor.addEventListener('keyup', updateCursorPosition);
    editor.addEventListener('scroll', updateCursorPosition);
}

// إعداد نافذة البحث
function setupFindModal() {
    const findModal = document.getElementById('findModal');
    const findInput = document.getElementById('findInput');
    const findNext = document.getElementById('findNext');
    const replaceBtn = document.getElementById('replaceBtn');
    const replaceAll = document.getElementById('replaceAll');
    const closeFind = document.getElementById('closeFind');
    
    closeFind.addEventListener('click', function() {
        findModal.classList.remove('active');
    });
    
    findNext.addEventListener('click', findText);
    replaceBtn.addEventListener('click', replaceText);
    replaceAll.addEventListener('click', replaceAllText);
    
    findInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findText();
        }
    });
}

// إنشاء ملف جديد
function createNewFile(name, content = '') {
    const id = Date.now();
    const extension = getFileExtension(name);
    const type = getFileType(extension);
    
    const file = {
        id,
        name,
        extension,
        type,
        content: content || getDefaultContent(type),
        unsaved: false,
        active: true
    };
    
    appState.files.push(file);
    appState.currentFile = file;
    
    // تحديث الملفات النشطة الأخرى
    appState.files.forEach(f => {
        if (f.id !== id) f.active = false;
    });
    
    saveState();
    updateUI();
    
    // التركيز على المحرر
    setTimeout(() => {
        document.getElementById('codeEditor').focus();
    }, 100);
}

// الحصول على الامتداد من اسم الملف
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}

// الحصول على نوع الملف بناءً على الامتداد
function getFileType(extension) {
    const types = {
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'md': 'markdown',
        'py': 'python',
        'txt': 'text'
    };
    
    return types[extension] || 'text';
}

// المحتوى الافتراضي بناءً على نوع الملف
function getDefaultContent(type) {
    const defaults = {
        'html': `<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مشروعي الجديد</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>مرحباً بالعالم!</h1>
    <p>هذا مشروع HTML جديد.</p>
    <script src="script.js"></script>
</body>
</html>`,
        
        'css': `/* أنماط CSS لمشروعك */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}`,
        
        'javascript': `// كود JavaScript لمشروعك
console.log('مرحباً بالعالم!');

// دالة ترحيب
function greet(name) {
    return 'مرحباً ' + name + '!';
}

// مثال على استخدام الدالة
const message = greet('المستخدم');
console.log(message);

// دالة لجمع رقمين
function add(a, b) {
    return a + b;
}

// تصدير الدوال إذا لزم الأمر
module.exports = {
    greet,
    add
};`,
        
        'python': `# كود Python لمشروعك
print("مرحباً بالعالم!")

# دالة ترحيب
def greet(name):
    return f"مرحباً {name}!"

# مثال على استخدام الدالة
message = greet("المستخدم")
print(message)

# دالة لجمع رقمين
def add(a, b):
    return a + b

# فئة مثال
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"أنا {self.name}، وعمري {self.age} سنة."`,
        
        'json': `{
  "name": "مشروعي",
  "version": "1.0.0",
  "description": "وصف المشروع",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "اسمك",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}`,
        
        'markdown': `# عنوان المستند

## قسم فرعي

هذا مستند Markdown مثال.

### قائمة
- عنصر 1
- عنصر 2
- عنصر 3

### كود
\`\`\`javascript
console.log('مرحباً!');
\`\`\`

### رابط
[زيارة Google](https://google.com)

### صورة
![وصف الصورة](https://example.com/image.jpg)`
    };
    
    return defaults[type] || '// ابدأ بكتابة الكود هنا...';
}

// إضافة ملفات افتراضية
function addDefaultFiles() {
    if (appState.files.length === 0) {
        createNewFile('index.html');
        createNewFile('style.css');
        createNewFile('script.js');
    }
}

// تحديث الواجهة
function updateUI() {
    updateFileExplorer();
    updateTabs();
    updateEditor();
    updateStats();
}

// تحديث مستكشف الملفات
function updateFileExplorer() {
    const fileExplorer = document.getElementById('fileExplorer');
    fileExplorer.innerHTML = '';
    
    appState.files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = `file-item file ${file.type} ${file.id === appState.currentFile?.id ? 'active' : ''}`;
        fileElement.dataset.id = file.id;
        
        // الأيقونة بناءً على نوع الملف
        let icon = 'fa-file';
        if (file.type === 'html') icon = 'fa-html5';
        else if (file.type === 'css') icon = 'fa-css3-alt';
        else if (file.type === 'javascript') icon = 'fa-js';
        else if (file.type === 'python') icon = 'fa-python';
        else if (file.type === 'markdown') icon = 'fa-markdown';
        else if (file.type === 'json') icon = 'fa-code';
        
        fileElement.innerHTML = `
            <i class="fas ${icon} file-icon"></i>
            <span class="file-name">${file.name}</span>
            ${file.unsaved ? '<i class="fas fa-circle unsaved-icon"></i>' : ''}
        `;
        
        fileElement.addEventListener('click', function() {
            const fileId = parseInt(this.dataset.id);
            openFile(fileId);
        });
        
        fileExplorer.appendChild(fileElement);
    });
    
    // تحديث عدد الملفات
    document.getElementById('fileCount').textContent = `${appState.files.length} ملفات`;
}

// تحديث علامات التبويب
function updateTabs() {
    const tabsBar = document.getElementById('tabsBar');
    tabsBar.innerHTML = '';
    
    appState.files.forEach(file => {
        const tab = document.createElement('div');
        tab.className = `tab ${file.id === appState.currentFile?.id ? 'active' : ''}`;
        tab.dataset.id = file.id;
        
        // الأيقونة بناءً على نوع الملف
        let icon = 'fa-file';
        if (file.type === 'html') icon = 'fa-html5';
        else if (file.type === 'css') icon = 'fa-css3-alt';
        else if (file.type === 'javascript') icon = 'fa-js';
        
        tab.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="tab-name">${file.name}</span>
            <i class="fas fa-times tab-close"></i>
        `;
        
        // حدث فتح التبويب
        tab.addEventListener('click', function(e) {
            if (!e.target.classList.contains('tab-close')) {
                const fileId = parseInt(this.dataset.id);
                openFile(fileId);
            }
        });
        
        // حدث إغلاق التبويب
        const closeBtn = tab.querySelector('.tab-close');
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const fileId = parseInt(tab.dataset.id);
            closeFile(fileId);
        });
        
        tabsBar.appendChild(tab);
    });
}

// تحديث علامة تبويب معينة
function updateTab(file) {
    const tab = document.querySelector(`.tab[data-id="${file.id}"]`);
    if (tab) {
        const unsavedIcon = file.unsaved ? '●' : '';
        tab.querySelector('.tab-name').textContent = file.name + (file.unsaved ? ' *' : '');
    }
}

// تحديث المحرر
function updateEditor() {
    const editor = document.getElementById('codeEditor');
    const currentFile = document.getElementById('currentFile');
    const fileType = document.getElementById('fileType');
    
    if (appState.currentFile) {
        editor.value = appState.currentFile.content;
        editor.disabled = false;
        currentFile.textContent = appState.currentFile.name;
        fileType.textContent = appState.currentFile.extension.toUpperCase() || 'بدون';
    } else {
        editor.value = '';
        editor.disabled = true;
        currentFile.textContent = 'لا يوجد ملف مفتوح';
        fileType.textContent = 'بدون امتداد';
    }
}

// تحديث الإحصائيات
function updateStats() {
    const editor = document.getElementById('codeEditor');
    const lineCount = document.getElementById('lineCount');
    const charCount = document.getElementById('charCount');
    
    const text = editor.value;
    const lines = text.split('\n').length;
    const chars = text.length;
    
    lineCount.textContent = `${lines} سطور`;
    charCount.textContent = `${chars} أحرف`;
}

// تحديث موضع المؤشر
function updateCursorPosition() {
    const editor = document.getElementById('codeEditor');
    const cursorPosition = document.getElementById('cursorPosition');
    
    const text = editor.value.substring(0, editor.selectionStart);
    const lines = text.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    cursorPosition.textContent = `السطر: ${line}, العمود: ${column}`;
}

// فتح ملف
function openFile(fileId) {
    const file = appState.files.find(f => f.id === fileId);
    if (file) {
        // تحديث الملفات النشطة
        appState.files.forEach(f => f.active = f.id === fileId);
        appState.currentFile = file;
        
        updateUI();
        
        // التركيز على المحرر
        setTimeout(() => {
            document.getElementById('codeEditor').focus();
        }, 100);
    }
}

// حفظ الملف الحالي
function saveCurrentFile() {
    if (appState.currentFile) {
        const editor = document.getElementById('codeEditor');
        appState.currentFile.content = editor.value;
        appState.currentFile.unsaved = false;
        
        updateTab(appState.currentFile);
        saveState();
        
        // رسالة تأكيد
        showNotification('تم حفظ الملف بنجاح');
    }
}

// إغلاق ملف
function closeFile(fileId) {
    const fileIndex = appState.files.findIndex(f => f.id === fileId);
    if (fileIndex !== -1) {
        const file = appState.files[fileIndex];
        
        // إذا كان الملف يحتوي على تغييرات غير محفوظة
        if (file.unsaved) {
            if (!confirm(`هل تريد حفظ التغييرات في "${file.name}" قبل الإغلاق؟`)) {
                appState.files.splice(fileIndex, 1);
                
                // إذا كان الملف المغلق هو الملف الحالي
                if (appState.currentFile?.id === fileId) {
                    appState.currentFile = appState.files.length > 0 ? appState.files[0] : null;
                    if (appState.currentFile) {
                        appState.currentFile.active = true;
                    }
                }
                
                saveState();
                updateUI();
            } else {
                saveCurrentFile();
                closeFile(fileId); // إعادة المحاولة بعد الحفظ
            }
        } else {
            appState.files.splice(fileIndex, 1);
            
            // إذا كان الملف المغلق هو الملف الحالي
            if (appState.currentFile?.id === fileId) {
                appState.currentFile = appState.files.length > 0 ? appState.files[0] : null;
                if (appState.currentFile) {
                    appState.currentFile.active = true;
                }
            }
            
            saveState();
            updateUI();
        }
    }
}

// تحديث المعاينة
function updatePreview() {
    const previewFrame = document.getElementById('previewFrame');
    const currentFile = appState.currentFile;
    
    if (!currentFile) return;
    
    let content = '';
    
    if (currentFile.type === 'html') {
        content = currentFile.content;
    } else if (currentFile.type === 'css') {
        content = `<style>${currentFile.content}</style><body><h1>معاينة CSS</h1><div class="preview-box">هذا عنصر معاينة</div></body>`;
    } else if (currentFile.type === 'javascript') {
        content = `<script>${currentFile.content}<\/script><body><h1>معاينة JavaScript</h1><p>افتح وحدة التحكم لمشاهدة النتائج</p></body>`;
    } else {
        content = `<pre>${currentFile.content}</pre>`;
    }
    
    previewFrame.srcdoc = content;
}

// تنسيق الكود
function formatCode() {
    const editor = document.getElementById('codeEditor');
    let code = editor.value;
    
    // تنسيق HTML بسيط
    if (appState.currentFile?.type === 'html') {
        // إضافة مسافات بادئة للوسوم
        let indentLevel = 0;
        let formatted = '';
        const lines = code.split('\n');
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed.startsWith('</')) {
                indentLevel--;
            }
            
            formatted += '    '.repeat(Math.max(0, indentLevel)) + trimmed + '\n';
            
            if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
                indentLevel++;
            }
        });
        
        editor.value = formatted;
        editor.dispatchEvent(new Event('input'));
    }
    // تنسيق JavaScript بسيط
    else if (appState.currentFile?.type === 'javascript') {
        // إضافة فواصل سطر بعد curly braces
        code = code.replace(/\{/g, ' {\n');
        code = code.replace(/\}/g, '\n}\n');
        editor.value = code;
        editor.dispatchEvent(new Event('input'));
    }
    
    showNotification('تم تنسيق الكود');
}

// البحث عن نص
function findText() {
    const editor = document.getElementById('codeEditor');
    const findInput = document.getElementById('findInput');
    const matchCase = document.getElementById('matchCase').checked;
    const wholeWord = document.getElementById('wholeWord').checked;
    
    const searchText = findInput.value;
    if (!searchText) return;
    
    let content = editor.value;
    let searchIn = content;
    
    if (!matchCase) {
        searchIn = searchIn.toLowerCase();
        searchText = searchText.toLowerCase();
    }
    
    const index = searchIn.indexOf(searchText, editor.selectionStart);
    
    if (index !== -1) {
        editor.focus();
        editor.setSelectionRange(index, index + searchText.length);
        editor.scrollTop = (content.substring(0, index).match(/\n/g) || []).length * 20;
    } else {
        showNotification('لم يتم العثور على النص', 'error');
    }
}

// استبدال نص
function replaceText() {
    const editor = document.getElementById('codeEditor');
    const findInput = document.getElementById('findInput');
    const replaceInput = document.getElementById('replaceInput');
    
    if (editor.selectionStart !== editor.selectionEnd) {
        const selected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
        if (selected === findInput.value) {
            editor.setRangeText(replaceInput.value, editor.selectionStart, editor.selectionEnd);
            editor.dispatchEvent(new Event('input'));
            findText(); // البحث عن التالي
        }
    } else {
        findText();
    }
}

// استبدال كل النصوص
function replaceAllText() {
    const editor = document.getElementById('codeEditor');
    const findInput = document.getElementById('findInput');
    const replaceInput = document.getElementById('replaceInput');
    const matchCase = document.getElementById('matchCase').checked;
    
    let content = editor.value;
    let searchText = findInput.value;
    let replaceWith = replaceInput.value;
    
    if (!matchCase) {
        const regex = new RegExp(searchText, 'gi');
        editor.value = content.replace(regex, replaceWith);
    } else {
        const regex = new RegExp(searchText, 'g');
        editor.value = content.replace(regex, replaceWith);
    }
    
    editor.dispatchEvent(new Event('input'));
    showNotification('تم استبدال جميع التطابقات');
}

// عرض إشعار
function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${type === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Cairo', sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// اختصارات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // Ctrl+S للحفظ
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveCurrentFile();
    }
    
    // Ctrl+F للبحث
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('findModal').classList.add('active');
        document.getElementById('findInput').focus();
    }
    
    // Ctrl+N لملف جديد
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        document.getElementById('fileModal').classList.add('active');
        document.getElementById('fileNameInput').focus();
    }
    
    // Ctrl+O لفتح ملف
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        document.getElementById('openFile').click();
    }
    
    // Ctrl+` لإظهار/إخفاء الشريط الجانبي
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        document.getElementById('toggleSidebar').click();
    }
    
    // Ctrl+P للمعاينة
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        document.getElementById('togglePreview').click();
    }
    
    // Ctrl+Shift+F لتنسيق الكود
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCode();
    }
});