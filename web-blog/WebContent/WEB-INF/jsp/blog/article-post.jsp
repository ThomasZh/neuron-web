<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<!-- Meta Tags -->
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<title>发布博客文章</title>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- 可选的Bootstrap主题文件（一般不用引入） -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="../../resources/bootstrap/fileinput/css/fileinput.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
<script src="../../resources/jquery/jquery-1.11.3.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../../resources/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="../../resources/bootstrap/fileinput/js/fileinput.min.js"></script>
<script src="../../resources/bootstrap/fileinput/js/fileinput_locale_zh.js"></script>
<script src="../../resources/js/spark-md5.min.js"></script>
<script src="../../resources/js/async.js"></script>
<script src="../../resources/js/upyun-mu.js"></script>

<!-- CSS -->
<link href="../../resources/blog/css/index.css" rel="stylesheet">
<link href="../../resources/blog/css/theme.css" rel="stylesheet">
<script src="../../resources/blog/js/shn5sjh.js"></script>
<link href="../../resources/blog/css/shn5sjh-d.css" rel="stylesheet">
</head>

<body id="public" onorientationchange="window.scrollTo(0, 1)">


<div id="container" class="ltr">
    <h1 id="logo"> <a>Wufoo</a> </h1>


    <form id="form1" name="form1" class="wufoo topLabel page1"
        accept-charset="UTF-8" autocomplete="off"
        enctype="multipart/form-data" method="get" novalidate=""
        action="article-post-action" modelAttribute="blogArticle" >

        <header id="header" class="info">
            <h2>发布博客文章</h2>
            <div> <br>请填写以下信息<br> </div>
        </header>

        <ul>
        <li id="fo1li1" class="notranslate">
            <label class="desc" id="title1" for="Field1"> 标题: <span id="req_1" class="req">*</span></label>
            <div>
                <input id="title" name="title" class="field text large"
                    maxlength="255" tabindex="6" onkeyup="handleInput(this); "
                    onchange="handleInput(this);" required="" type="text"> 
                <label for="Field1">最多字数: <var id="rangeMaxMsg1">50</var> 个.&nbsp;&nbsp;&nbsp; 
                    <em style="display: inline;" class="currently">当前字数: <var id="rangeUsedMsg1">0</var> 个.  </em>
                </label>
            </div>
        </li>



        <li id="fo1li14" class="notranslate">
            <label class="desc" id="title14" for="Field14"> 描述: <span id="req_14" class="req">*</span>
            </label>

            <div>
                <textarea id="content" name="content"
                class="field textarea medium" spellcheck="true" rows="10"
                cols="50" tabindex="8"
                onkeyup="handleInput(this); validateRange(14, 'character');"
                onchange="handleInput(this);" required=""></textarea>

                <label for="Field14">最多字数: <var id="rangeMaxMsg14">1000</var> 个.&nbsp;&nbsp;&nbsp; 
                    <em style="display: inline;" class="currently">当前字数: <var id="rangeUsedMsg14">0</var> 个.
                    </em>
                </label>
            </div>

            <p class="instruct" id="instruct14">
                <small>请提供一个令人垂涎的食谱。(可以是一行或几行文字)。<br> </small>
            </p>
        </li>



        <li id="fo1li115" class="notranslate">
            <label class="desc" id="title115" for="Field115"> 添加图片: <span id="req_15" class="req">*</span></label>
            <div>
                <input id="file" name="file" class="file" type="file" 
                    data-show-caption="false" data-show-upload="false" data-show-remove="true" />
            </div>
            <input id="imgUrl" name="imgUrl" type="hidden" />
            <p class="instruct" id="instruct115">
                <small>请注意: 图像将被裁剪和调整到适合的大小。 </small>
            </p>
        </li>



        <li class="buttons">
            <p> <a id="submit" class="btn btn-primary ">发布</a> </p>
            <div id="success-block"></div>
        </li>

    </form>


</div>
<!--container-->


	<script>
		function uuid() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		}
		
		document.getElementById('submit').onclick = function() {
			var ext = '.' + document.getElementById('file').files[0].name.split('.').pop();
			
			var config = {
				// 空间名称
				bucket : 'bighorn',
				// 上传请求过期时间
				expiration : parseInt((new Date().getTime() + 3600000) / 1000),
				// 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
				form_api_secret : 'minNcL/cabhEznMeFpYhEQFsH+k='
			};

			var instance = new Sand(config);
			var options = {
				'notify_url' : 'http://upyun.com'
			};
			instance.setOptions(options);
			
			var d = new Date();
			var month = d.getMonth() + 1;
			var filename = '/image/test/' + d.getFullYear() + '/' + month + '/' + d.getDate() + '/' + uuid() + ext;
			
			instance.upload(filename);
			document.getElementById("imgUrl").value = 'http://bighorn.b0.upaiyun.com' + filename;
		};

		document.addEventListener('uploaded',function(e) {
			var block = document.getElementById('success-block');

			var elem = document.createElement("ul");
			elem.innerHTML += '<div class="alert alert-success" role="alert">Well done! You successfully upload this file.</div>';
			block.appendChild(elem);

			setTimeout(function() {
				elem.remove();
			}, 5000);

			document.getElementById("form1").submit();
		});
	</script>
</body>
</html>
