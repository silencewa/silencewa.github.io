// 页面加载完成后触发贴纸雨动画
document.addEventListener('DOMContentLoaded', function() {
    // 启动贴纸雨
    startConfettiRain();
});

// 点击事件：随机改变背景色并飘落贴纸
document.addEventListener('click', function(event) {
    // 如果点击的不是lightbox和关闭按钮，则显示随机语录气泡和改变背景色
    if (!event.target.closest('.lightbox') && !event.target.closest('.close-lightbox') && !event.target.classList.contains('zoomable')) {
        // 随机背景颜色 (淡色系 HSL)
        var hue = Math.floor(Math.random() * 360);
        document.body.style.background = 'hsl(' + hue + ', 80%, 90%)';
        // 显示随机语录
        showRandomQuote(event.clientX, event.clientY);
        // 生成随机贴纸
        createSticker();
    }
});

// 为所有可放大图片添加点击事件
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡，避免触发body的点击事件
        openLightbox(this.src);
    });
});

// 关闭放大查看功能
document.querySelector('.close-lightbox').addEventListener('click', function() {
    closeLightbox();
});

// Lightbox背景点击关闭
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// ESC键关闭Lightbox
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('lightbox').classList.contains('active')) {
        closeLightbox();
    }
});

// 贴纸雨动画函数
function startConfettiRain() {
    // 贴纸种类（使用emoji作为贴纸）
    const confettiEmojis = ['🌟', '💖', '🌈', '🎀', '✨', '💕', '🍭', '🦄', '🌸', '🍬'];
    
    // 创建20-30个随机贴纸
    const confettiCount = Math.floor(Math.random() * 11) + 20;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfetti(confettiEmojis);
        }, i * 200); // 每200ms创建一个，形成连续效果
    }
}

// 创建单个贴纸
function createConfetti(emojis) {
    const confetti = document.createElement('div');
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.classList.add('sticker-rain');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.fontSize = `${Math.random() * 20 + 20}px`; // 20-40px的随机大小
    
    // 添加到文档中
    document.body.appendChild(confetti);
    
    // 动画结束后移除
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

// 随机语录函数
function showRandomQuote(x, y) {
    // 有趣的随机语录数组
    const quotes = [
        '今天也要元气满满哦！✨',
        '你今天真好看！💕',
        '每天都是新的开始！🌈',
        '记得微笑，世界会跟着你笑！😊',
        '加油！你是最棒的！💪',
        '生活就像表情包，多彩有趣！🎭',
        '今天也要开心点！🌞',
        '热爱生活，热爱自己！❤️',
        '做自己的小太阳！☀️',
        '每一天都值得被珍藏！📸'
    ];
    
    // 创建气泡元素
    const bubble = document.createElement('div');
    bubble.classList.add('quote-bubble');
    bubble.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    
    // 设置气泡位置
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    
    // 添加到页面
    document.body.appendChild(bubble);
    
    // 动画结束后移除
    setTimeout(() => {
        bubble.remove();
    }, 3000);
}

// 打开照片查看器
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // 设置图片源
    lightboxImg.src = imgSrc;
    
    // 显示lightbox
    lightbox.classList.add('active');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

// 关闭照片查看器
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // 隐藏lightbox
    lightbox.classList.remove('active');
    
    // 恢复背景滚动
    document.body.style.overflow = '';
}

// 点击事件：随机改变背景色并飘落贴纸（保留原有功能）
function createSticker() {
    // 假设本地有以下几张贴纸图片
    var stickers = [
        'stickers/star.png', 
        'stickers/heart.png', 
        'stickers/bubble.png', 
        'stickers/explosion.png'
    ];
    var src = stickers[Math.floor(Math.random() * stickers.length)];
    var sticker = document.createElement('img');
    sticker.src = src;
    sticker.classList.add('sticker');
    // 随机水平位置
    sticker.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    document.body.appendChild(sticker);
    // 动画结束后移除元素
    sticker.addEventListener('animationend', function() {
        sticker.remove();
    });
}
