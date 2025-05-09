// 点击事件：随机改变背景色并飘落贴纸
document.addEventListener('click', function(event) {
    // 随机背景颜色 (淡色系 HSL)
    var hue = Math.floor(Math.random() * 360);
    document.body.style.background = 'hsl(' + hue + ', 80%, 90%)';
    // 生成随机贴纸
    createSticker();
});
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
