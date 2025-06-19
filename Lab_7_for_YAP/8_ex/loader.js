document.addEventListener('DOMContentLoaded', () => {
    const loaderBar = document.querySelector('.loader-bar');
    const loaderSection = document.getElementById('loader-section');
    const mainContent = document.getElementById('main-content');

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // После 2 секунд (или когда шкала заполнится), скрываем лоадер и показываем основной контент
            loaderSection.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            width += 5; // Увеличиваем на 5% каждую 100мс (20 * 5% = 100% за 2 секунды)
            loaderBar.style.width = width + '%';
        }
    }, 100); // Интервал обновления каждые 100 мс
});