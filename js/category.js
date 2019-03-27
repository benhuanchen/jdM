window.onload = function() {
    /*左侧滑动 */
    // leftSwiper();
    newLeftSwiper();
    /*右侧滑动 */
    rightSwiper();
}

var leftSwiper = function() {
    /*上下滑动*/
    var parentBox = document.querySelector(".main-left");
    var childBox = parentBox.querySelector("ul");

    var startY = 0;
    var distanceY = 0;
    var currentY = 0;
    childBox.addEventListener("touchstart", function(e) {
        startY = e.touches[0].clientY;
    })

    childBox.addEventListener("touchmove", function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        // console.log(distanceY)
        var translateY = distanceY + currentY;

        childBox.style.transform = "translateY(" + translateY + "px)";

    })

    childBox.addEventListener("touchend", function() {
        currentY = currentY + distanceY;
    })
};

var newLeftSwiper = function() {
    var myScroll = new IScroll(".main-left");  //使用插件iscroll
}

var rightSwiper = function() {

};