<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=no">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%@ page isELIgnored="false"%>
<title>Session info</title>

<link rel="stylesheet" type="text/css" href="../../resources/css/common.css">
<style type="text/css">
#cover {
	display: none;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 18888;
	background-color: #000000;
	opacity: 0.7;
}

#guide {
	display: none;
	position: absolute;
	right: 18px;
	top: 5px;
	z-index: 19999;
}

#guide img {
	width: 300px;
	height: 175px;
}
</style>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" language="javascript">
	function is_weixin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}

	var browser = {
		versions : function() {
			var u = navigator.userAgent;
			var app = navigator.appVersion;
			return {
				trident : u.indexOf('Trident') > -1,
				presto : u.indexOf('Presto') > -1,
				webKit : u.indexOf('AppleWebKit') > -1,
				gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				mobile : !!u.match(/AppleWebKit.*Mobile.*/),
				ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				iPhone : u.indexOf('iPhone') > -1,
				iPad : u.indexOf('iPad') > -1,
				webApp : u.indexOf('Safari') == -1
			}
		}(),
		language : (navigator.browserLanguage || navigator.language)
				.toLowerCase()
	};

    function init() {
        //下载页div
        var downloadDiv = document.getElementById("downloadBlock");
        var guideDiv = document.getElementById("guide");

        if (is_weixin()) {
            var imageControl = document.createElement("img");
            //weixin为提示使用浏览器打开的div
            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
//                imageControl.setAttribute("src",
//                    "http://tripc2c-default.b0.upaiyun.com/app/image/wechat-tips-ios.png");
//                guideDiv.appendChild(imageControl);
//                var buttonControl = document.createElement("input");
//                buttonControl.setAttribute("type", "button");
//                buttonControl.setAttribute("class", "upload_btn");
//                buttonControl.setAttribute("onclick", "javascript:_system._guide(true)");
//                buttonControl.setAttribute("value", "立刻下载");
//                downloadDiv.appendChild(buttonControl);

                var buttonControl = document.createElement("a");
                buttonControl.setAttribute("class", "download_btn");
                buttonControl.setAttribute("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.redoct.iclub");
                buttonControl.innerHTML = "立刻下载";
                downloadDiv.appendChild(buttonControl);
            } else if (browser.versions.android) {
                var buttonControl = document.createElement("a");
                buttonControl.setAttribute("class", "download_btn");
                buttonControl.setAttribute("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.redoct.iclub");
                buttonControl.innerHTML = "立刻下载";
                downloadDiv.appendChild(buttonControl);
            }
        } else {
            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                var buttonControl = document.createElement("a");
                buttonControl.setAttribute("class", "download_btn");
                buttonControl.setAttribute("href", "https://itunes.apple.com/cn/app/id935223459");
                buttonControl.innerHTML = "立刻下载";
                downloadDiv.appendChild(buttonControl);
            } else if (browser.versions.android) {
                var buttonControl = document.createElement("a");
                buttonControl.setAttribute("class", "download_btn");
                buttonControl .setAttribute("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.redoct.iclub");
                buttonControl.innerHTML = "立刻下载";
                downloadDiv.appendChild(buttonControl);
            } else {
                var buttonControl = document.createElement("a");
                buttonControl.setAttribute("class", "download_btn");
                buttonControl .setAttribute("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.redoct.iclub");
                buttonControl.innerHTML = "立刻下载";
                downloadDiv.appendChild(buttonControl);
            }
        }
    }
</script>
</head>

<body>
  <div class="spread" id="downloadBlock">
    <span class="ui_icon"><img src="http://tripc2c-default.b0.upaiyun.com/app/image/logo-28.png" /></span>
    <em>A计划，带你开启精彩旅程。</em>
<!--
    <input type="button" class="upload_btn" onclick="javascript:_system._guide(true)" value="立即下载">
-->
  </div>


  <div class="wrap hppad" id="hp_wrap">

    <ul class="list_msg">
        <li class="icon2"><i></i>${account.nickname}</li>
        <span class="u_icon"><img src="${account.avatarUrl}" /></span>
        <li class="icon3"><i></i>${account.desc}</li>
    </ul>

    <ul class="list_msg">
        <li class="icon2"><i></i>loginType: ${session.loginType}</li>
        <li class="icon2"><i></i>loginName: ${session.loginName}</li>
        <li class="icon2"><i></i>accountId: ${session.accountId}</li>
        <li class="icon3"><i></i>deviceId: ${session.deviceId}</li>
        <li class="icon3"><i></i>deviceOsVersion: ${session.deviceOsVersion}</li>
        <li class="icon3"><i></i>notifyToken: ${session.notifyToken}</li>
        <li class="icon1"><i></i>expriyTime: ${session.expiryTime}</li>
    </ul>

    <form method=”get” action="removeSession">
       <input type="hidden" id="ticket" name="ticket" value="${ticket}">
       <input type="submit" name="" class="submit_btn" value="Remove session">
    </form>

  </div>



	<div id="cover"></div>
	<div id="guide"></div>

	<script type="text/javascript" language="javascript">
		var _system = {
			$ : function(id) {
				return document.getElementById(id);
			},
			_client : function() {
				return {
					w : document.documentElement.scrollWidth,
					h : document.documentElement.scrollHeight,
					bw : document.documentElement.clientWidth,
					bh : document.documentElement.clientHeight
				};
			},
			_scroll : function() {
				return {
					x : document.documentElement.scrollLeft ? document.documentElement.scrollLeft
							: document.body.scrollLeft,
					y : document.documentElement.scrollTop ? document.documentElement.scrollTop
							: document.body.scrollTop
				};
			},
			_cover : function(show) {
				if (show) {
					this.$("cover").style.display = "block";
					this.$("cover").style.width = (this._client().bw > this
							._client().w ? this._client().bw : this._client().w)
							+ "px";
					this.$("cover").style.height = (this._client().bh > this
							._client().h ? this._client().bh : this._client().h)
							+ "px";
				} else {
					this.$("cover").style.display = "none";
				}
			},
			_guide : function(click) {
				this._cover(true);
				this.$("guide").style.display = "block";
				this.$("guide").style.top = (_system._scroll().y + 5) + "px";
				window.onresize = function() {
					_system._cover(true);
					_system.$("guide").style.top = (_system._scroll().y + 5)
							+ "px";
				};
				if (click) {
					_system.$("cover").onclick = function() {
						_system._cover();
						_system.$("guide").style.display = "none";
						_system.$("cover").onclick = null;
						window.onresize = null;
					};
				}
			},
			_zero : function(n) {
				return n < 0 ? 0 : n;
			}
		};

		init();
	</script>

</body>
</html>
