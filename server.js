const express = require('express');
const path = require('path');
const app = express();

// إعداد السيرفر عشان يقرأ ملفات CSS و JS والصور من نفس المكان اللي فيه الـ HTML
app.use(express.static(path.join(__dirname, './')));

// إرسال ملف الـ index.html لما حد يفتح رابط الموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// المسارات الخاصة بالأدوات (عشان الأزرار تشتغل)
app.get('/calculate-ram', (req, res) => {
    // هنا كود الـ RAM بتاعك
});

app.get('/download-bat', (req, res) => {
    // هنا كود التحميل
});

app.get('/download-cleaner', (req, res) => {
    // هنا كود التنظيف
});

// تشغيل السيرفر (Vercel بيستخدم الإعدادات دي أوتوماتيك)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
