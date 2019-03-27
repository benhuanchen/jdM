window.onload = function () {
    search();
    banner();
    downTime();          //-----------倒计时
}

var search = function () {
    var searchBox = document.querySelector(".search-box");

    window.onscroll = function () {
        if (document.documentElement.scrollTop > 0) {
            searchBox.style.background = "#e43130";
        } else {
            searchBox.style.background = "transparent";
        }
    }
}

var banner = function () {
    //1、无缝滚动和无缝滑动
    //2、点盒子对应改变
    //3、可以滑动
    var banner = document.querySelector(".banner");
    var imageList = document.querySelector(".image-list");
    var pointLi = document.querySelector(".item").querySelectorAll("li");
    var width = banner.offsetWidth;

    /*--------------------------------------动画函数+滚动 tool*/
    function transition() {
        imageList.style.transition = "all 0.3s";
    }

    function transformClear() {
        imageList.style.transition = "none";
    }

    function transform(transformWidth) {
        imageList.style.transform = "translateX(" + transformWidth + "px)";
    }
    /*---------------------------------------动画函数+滚动 tool*/

    var index = 1;
    var timer = setInterval(function () {
        index++;
        transition();
        transform(-index * width);
    }, 2000);

    //无缝滚动
    imageList.addEventListener("transitionend", function () {
        if (index == 9) {
            index = 1;
        } else if (index == 0) {
            index = 8;
        }
        transformClear();
        transform(-index * width);
        //index取值1-8,对应点的范围0-7
        // console.log(index);
        setPoint();
    })

    //点对应改变
    var setPoint = function () {
        for (var i = 0; i < pointLi.length; i++) {
            pointLi[i].className = "";
        }
        pointLi[index - 1].className = "active";
    }

    //滑动
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageList.addEventListener("touchstart", function (e) {
        clearInterval(timer);  //清除定时器
        startX = e.touches[0].clientX;
    })

    imageList.addEventListener("touchmove", function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        transformClear();  //清除过渡
        transform(-index * width + distanceX);
        isMove = true;
    })

    imageList.addEventListener("touchend", function () {
        if (isMove) {
            //当滑动距离大于轮播图的三分之一时就滑动
            if (Math.abs(distanceX) >= width / 3) {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
            }
        }
        transition();
        transform(-index * width);

        //定时器重启
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            transition();
            transform(-index * width);
        }, 2000);
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
}
var downTime = function () {
    var timeBox = document.querySelectorAll(".time-box");
    var time = 60 * 60 * 12 + 57 * 60 + 43;

    var timer = setInterval(function() {
        time--;
        var h = Math.floor(time / 60 / 60 % 24);
        var m = Math.floor(time / 60 % 60);
        var s = Math.floor(time % 60);

        timeBox[0].innerHTML = h;
        timeBox[1].innerHTML = m;
        timeBox[2].innerHTML = s;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}