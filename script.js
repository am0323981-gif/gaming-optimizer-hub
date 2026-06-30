document.addEventListener('DOMContentLoaded', function() {
    // الجزء الأول: الـ Virtual Memory
    const ramInput = document.getElementById('ramInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', async function() {
            const ramValue = parseFloat(ramInput.value);
            if (isNaN(ramValue) || ramValue <= 0) {
                resultContainer.innerHTML = "❌ صاحبي، اكتب حجم رام حقيقي الأول!";
                resultContainer.className = "result-box result-error";
                return;
            }
            resultContainer.innerHTML = "⏳ جاري الحساب عبر السيرفر...";
            resultContainer.className = "result-box result-loading";

            try {
                const response = await fetch('/calculate-ram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ramValue: ramValue })
                });
                const data = await response.json();
                if (response.ok) {
                    resultContainer.className = "result-box result-success";
                    resultContainer.innerHTML = `
                        <div class="server-badge">⚡ تم الحساب بواسطة السيرفر ⚡</div>
                        <p>• المبدئي: ${data.initialSize} MB | الأقصى: ${data.maxSize} MB</p>
                        <a href="/download-bat?ram=${ramValue}" class="neon-btn">🚀 تحميل ملف التفعيل (.bat)</a>
                    `;
                }
            } catch (error) {
                resultContainer.innerHTML = "❌ فشل الاتصال بالسيرفر!";
            }
        });
    }

    // الجزء الثاني الجديد: زر تنظيف الجهاز
    const cleanerBtn = document.getElementById('cleanerBtn');
    const cleanerResult = document.getElementById('cleanerResult');

    if (cleanerBtn) {
        cleanerBtn.addEventListener('click', function() {
            cleanerResult.className = "result-box result-success";
            cleanerResult.innerHTML = `
                <div class="server-badge" style="border-color:#00e1ff; color:#00e1ff; background:rgba(0,225,255,0.1)">⚙️ الملف جاهز في الخلفية ⚙️</div>
                <br>
                <a href="/download-cleaner" class="neon-btn blue-neon">📥 تحميل منظف الجهاز والـ Ping (.bat)</a>
            `;
        });
    }
});