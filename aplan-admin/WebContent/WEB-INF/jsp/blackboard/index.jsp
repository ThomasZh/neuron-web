<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/> 
<title>Black boards</title>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- Custom styles for this template -->
<link href="../../resources/bootstrap/stickup/stickup.css" rel="stylesheet">    
<link href="../../resources/css/sticky-notes.css" rel="stylesheet" type="text/css">

<style type="text/css">
@font-face {
  font-family: 'Reenie Beanie';
  font-style: normal;
  font-weight: 400;
  src: local('Reenie Beanie'), local('ReenieBeanie'), url(../../resources/css/ljpKc6CdXusL1cnGUSamX4kaQb-UsZVONjobs91YQtw.woff) format('woff');
}
</style>


<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
<script src="../../resources/jquery/jquery-1.11.3.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../../resources/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="../../resources/bootstrap/stickup/stickup.min.js"></script>
 
</head>

<body style="margin: 8 0 0 8; background:url(../../resources/images/banner.jpg) repeat">
    <div>
      <ul id="blackboard">
        <li>
          <a id="plus" class="black" href="add">
            <img src="../../resources/images/plus-white.png" width="100%" height="100%" />
          </a>
        </li>
        <c:forEach items="${boards}" var="board" varStatus="stat">
        <li>
          <a id="${board.id}" class="black" name="boardlinks" href="../stickynote/index?boardId=${board.id}">
            <h2>${board.title}</h2>
          </a>
        </li>
        </c:forEach>
      </ul>
    </div>


<script type="text/javascript" language="javascript">
    function enableLongPress(target, threshold) {
        var timer;
        var timeOut;
        var evt = document.createEvent('Event');
        evt.initEvent('longpress', true, true);
        target.addEventListener('mousedown', function() {
            timer = Date.now();
            timeOut=setTimeout(function(){
                target.dispatchEvent(evt);
            },threshold);
        }, false);
        target.addEventListener('mouseup', function() {
            if(Date.now() - timer < threshold) {
                evt.duration = Date.now() - timer;
                clearTimeout(timeOut);
            }
        }, false);
    }
</script>
<script>
    var pArys = document.getElementsByName("boardlinks");
    for (var i = 0; i <= pArys.length; i++){
        var button = pArys[i];
        enableLongPress(button, 1000);
        button.addEventListener('longpress', function(e) {
             window.location.href="edit?id="+this.id;
        }, false);
    }
</script>

<input id="slide" type="hidden" />

<script type="text/javascript">
    //全局变量，触摸开始位置
    var startX = 0, startY = 0;
            
    //touchstart事件
    function touchSatrtFunc(evt) {
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
        } catch (e) {
            alert('touchSatrtFunc：' + e.message);
        }
    }

    //touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(evt) {
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标

            //判断滑动方向
            if (x - startX < -150) {
                // right-left
                document.getElementById("slide").value = "right_left";
            } else if (x - startX > 150) {
                // left-right
                document.getElementById("slide").value = "left_right";
            } else {
                // left=right
                document.getElementById("slide").value = "clicked";
            } 
//            if (y - startY != 0) {
//                document.getElementById("slide").value = "top_down";
//                // text += '<br/>上下滑动';
//            }

        } catch (e) {
            alert('touchMoveFunc：' + e.message);
        }
    }

    //touchend事件
    function touchEndFunc(evt) {
        try {
             //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
             var text = document.getElementById("slide").value;
             if (text == "left_right")
                 window.location.href="../stickynote/index?boardId="+this.id;
             else if (text == "right_left")
                 window.location.href="edit?id="+this.id;
//             else if (text == "clicked")
//                 window.location.href="../stickynote/index?boardId="+this.id;
        } catch (e) {
            alert('touchEndFunc：' + e.message);
        }
    }

    //判断是否支持触摸事件
    function isTouchDevice() {
        document.getElementById("version").innerHTML = navigator.appVersion;

        try {
            document.createEvent("TouchEvent");
//            alert("支持TouchEvent事件！");

            bindEvent(); //绑定事件
        } catch (e) {
//            alert("不支持TouchEvent事件！" + e.message);
        }
    }

    window.onload = isTouchDevice;
</script>
<script type="text/javascript">
    //绑定事件
    var  pArys=document.getElementsByName("boardlinks");
    for(var i = 0; i <= pArys.length; i++){
        var button = pArys[i];
        button.addEventListener('touchstart', touchSatrtFunc, false);
        button.addEventListener('touchmove', touchMoveFunc, false);
        button.addEventListener('touchend', touchEndFunc, false);
    }
</script>

</body>
</html>
