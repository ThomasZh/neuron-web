<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Upload file demo</title>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- 可选的Bootstrap主题文件（一般不用引入） -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="../../resources/bootstrap/fileinput/css/fileinput.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="./resources/jquery/jquery-1.11.3.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../../resources/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="../../resources/bootstrap/fileinput/js/fileinput.min.js"></script>
<script src="../../resources/bootstrap/fileinput/js/fileinput_locale_zh.js"></script>
<script src="../../resources/js/spark-md5.min.js"></script>
<script src="../../resources/js/async.js"></script>
<script src="../../resources/js/upyun-mu.js"></script>

</head>
<body>

	<div id="example" class="jumbotron">
		<div class="box">
			<h1>Information</h1>
			<p>The Upload can be used as a drop-in replacement for file input
				elements. This "synchronous" mode does not require special handling
				on the server.</p>
		</div>
		<div class="box">
			<form enctype="multipart/form-data" id="uploadForm">
				<label class="control-label">Select File</label>
				<input id="file" type="file" class="file" name="file"
					data-show-caption="true" data-show-upload="false" data-show-remove="true" />
				<p>
					<a id="submit" class="btn btn-primary btn-lg">Upload</a>
				</p>
			</form>
		</div>

		<div id="success-block"></div>
	</div>


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
		};

		document.addEventListener('uploaded',function(e) {
			var block = document.getElementById('success-block');

			var elem = document.createElement("ul");
			elem.innerHTML += '<div class="alert alert-success" role="alert">Well done! You successfully upload this file.</div>';
			block.appendChild(elem);

			setTimeout(function() {
				elem.remove();
			}, 5000);
		});

	</script>
</body>
</html>