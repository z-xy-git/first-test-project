$(function () {
    // 监听游戏规则按钮的点击
    $('.rules').click(function () {
        $('.rule').stop().fadeIn(100);
    });
    $('.close').click(function () {
        $('.rule').stop().fadeOut(100);
    });
    
    // 监听开始游戏按钮的点击
    $('.startPlay').click(function () {
        $(this).stop().fadeOut(100);
        progressHander();
        startWolfAnimation();
    });

    // 监听重新开始按钮的点击
    $('.startNew').click(function () {
        $('.mask').stop().fadeOut(100);
        $('.startPlay').stop().fadeIn(100);
        $('.progress').css({
            width: 180
        });
        $('.score').text(0);
    });

    // 定义一个进度条的动态减少方法
    function progressHander() {
        $('.progress').css({
            width: 180
        });
        var timer = setInterval(function () {
            var progressWidth = $('.progress').width();
            if(progressWidth <= 0) {
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);
                stopWolfAnimation();
            }
            progressWidth -= 1;
            $('.progress').css({
                width: progressWidth
            });
        },100);
    }
    
    // 定义灰太狼和小灰灰随机显示的方法
    var wolfTimer = null;
    function startWolfAnimation() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png',
            './images/h3.png','./images/h4.png','./images/h5.png',
            './images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png',
            './images/x3.png','./images/x4.png','./images/x5.png',
            './images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        // 创建一个空的图片元素
        var wolfImage = $('<img src="" class="wolfImage">');
        // 随机生成将出现在页面中的图片的位置
        var posIndex = Math.round(Math.random() * 8);
            wolfImage.css({
                position: "absolute",
                left: arrPos[posIndex].left,
                top: arrPos[posIndex].top
            });
        // 随机生成将出现在页面中的图片的类型
        var wolfType = Math.round(Math.random()) === 0 ? wolf_1 : wolf_2;
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
            wolfTimer = setInterval(function () {
                if( wolfIndex > wolfIndexEnd ){
                    wolfImage.remove();
                    clearInterval(wolfTimer);
                    startWolfAnimation();
                }
                wolfImage.attr('src',wolfType[wolfIndex]);     // 给空的图片元素添加 src 属性
                wolfIndex++;
            },300);
        $('.container').append(wolfImage);    // 将图片元素添加到页面中
        gameRules(wolfImage);
    }

    // 定义拍打效果的方法
    function gameRules(wolfImage) {
        wolfImage.one('click',function () {
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            var $src = $(this).attr('src');
            var flag = $src.indexOf('h') >= 0;
                if (flag) {
                    $('.score').text(parseInt($('.score').text()) + 10);
                }else {
                    $('.score').text(parseInt($('.score').text()) - 10);
                }
        });
    }

    // 定义一个停止的动画
    function stopWolfAnimation() {
        $('.wolfImage').remove();
        clearInterval(wolfTimer);
    }

})