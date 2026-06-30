const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// API 1: حساب أرقام الرام
app.post('/calculate-ram', (req, res) => {
    const { ramValue } = req.body;
    if (!ramValue || ramValue <= 0) return res.status(400).json({ error: "حجم الرام غير صحيح!" });
    const ramInMB = ramValue * 1024;
    res.json({ initialSize: ramInMB * 1.5, maxSize: ramInMB * 3 });
});

// API 2: تحميل ملف الـ Virtual Memory
app.get('/download-bat', (req, res) => {
    const ramValue = parseFloat(req.query.ram);
    if (!ramValue || ramValue <= 0) return res.status(400).send("حجم الرام غير صحيح!");
    const ramInMB = ramValue * 1024;
    
    const batContent = `@echo off\nchcp 65001 >nul\nnet session >nul 2>&1\nif %errorLevel% neq 0 (echo [X] يجب تشغيل الملف كمسؤول!\npause\nexit /b)\nwmic computersystem where name="%computername%" set AutomaticManagedPagefile=False >nul\nwmic pagefilesetting where name="C:\\\\pagefile.sys" set InitialSize=${ramInMB * 1.5},MaximumSize=${ramInMB * 3} >nul\necho [V] تم تعيين الـ Virtual Memory بنجاح يا بطل!\npause`;
    
    res.setHeader('Content-Disposition', 'attachment; filename=Optimize_RAM.bat');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(batContent);
});

// API 3 الجديد: بيصنع ملف تنظيف الـ Temp والـ DNS
app.get('/download-cleaner', (req, res) => {
    const cleanerContent = `@echo off
chcp 65001 >nul
echo ==================================================
echo   🧹 جاري تنظيف الجهاز وتسريع الألعاب والإنترنت 🧹
echo ==================================================
echo.

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [X] خطأ: يجب تشغيل الملف كمسؤول (Run as Administrator)!
    pause
    exit /b
)

echo [+] جاري تفريغ كاش الـ DNS لتخفيض الـ Ping...
ipconfig /flushdns >nul

echo [+] جاري تنظيف ملفات النظام المؤقتة (Temp)...
del /f /s /q "%userprofile%\\AppData\\Local\\Temp\\*" >nul 2>&1
del /f /s /q "C:\\Windows\\Temp\\*" >nul 2>&1

echo [+] جاري تنظيف كاش الـ Prefetch...
del /f /s /q "C:\\Windows\\Prefetch\\*" >nul 2>&1

echo.
echo ==================================================
echo   [V] تم تنظيف الجونك وتصفية الـ Ping بنجاح! 🔥
echo ==================================================
echo.
pause
`;

    res.setHeader('Content-Disposition', 'attachment; filename=Clean_PC.bat');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(cleanerContent);
});

app.listen(PORT, () => {
    console.log(`🚀 سـيرفر الداشبورد شغال على: http://localhost:${PORT}`);
    module.exports = app; // لتسهيل الاختبارات أو الاستخدام في ملفات أخرى
});
