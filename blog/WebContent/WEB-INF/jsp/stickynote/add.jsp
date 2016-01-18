<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<!-- Meta Tags -->
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/> 

<title>Add sticky note</title>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
<script src="../../resources/jquery/jquery-1.11.3.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../../resources/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<style type="text/css">
      body {
        padding-top: 2px;
        padding-left: 2px;
        padding-right: 2px;
        padding-bottom: 2px;
        background-color: #666;
      }

      .form-signin {
        max-width: 600px;
        padding: 19px 19px 19px;
        margin: 0 auto 20px;
        background-color: #ffc;
        border: 0px solid #e5e5e5;
        -webkit-border-radius: 0px;
           -moz-border-radius: 0px;
                border-radius: 0px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading,
      .form-signin .checkbox {
        margin-bottom: 10px;
      }
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }

    </style>

<style>
@-webkit-keyframes click-wave {
  0% {
    width: 40px;
    height: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0.0;
  }
}
@-moz-keyframes click-wave {
  0% {
    width: 40px;
    height: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0.0;
  }
}
@-o-keyframes click-wave {
  0% {
    width: 40px;
    height: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0.0;
  }
}
@keyframes click-wave {
  0% {
    width: 40px;
    height: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0.0;
  }
}
.option-input {
	-webkit-appearance: none;
	-moz-appearance: none;
	-ms-appearance: none;
	-o-appearance: none;
	appearance: none;
	position: relative;
	top: 13.33333px;
	width: 40px;
	height: 40px;
	-webkit-transition: all 0.15s ease-out 0;
	-moz-transition: all 0.15s ease-out 0;
	transition: all 0.15s ease-out 0;
	background: #cbd1d8;
	border: none;
	color: #9faab7;
	cursor: pointer;
	display: inline-block;
	outline: none;
	position: relative;
	margin-right: 0.5rem;
	z-index: 1000;
}

.option-input:hover {
	background: #9faab7;
}

.option-input:checked {
	background: #40e0d0;
	border-style:solid;
	border-width:1px;
}

.option-input:checked::before {
	width: 40px;
	height: 40px;
	position: absolute;
//	content: '\272a';
	display: inline-block;
	font-size: 26.66667px;
	text-align: center;
	line-height: 40px;
}

.option-input:checked::after {
	-webkit-animation: click-wave 0.65s;
	-moz-animation: click-wave 0.65s;
	animation: click-wave 0.65s;
	background: #40e0d0;
	content: '';
	display: block;
	position: relative;
	z-index: 100;
}

.option-input.radio {
	border-radius: 50%;
}

.option-input.radio.yellow {
	background: #ffc;
}

.option-input.radio.green {
	background: #c2ffc1;
}

.option-input.radio.blue {
	background: #81effe;
}

.option-input.radio.red {
	background: #fc76bb;
}

.option-input.radio.purple {
	background: #c0befe;
}

.option-input.radio::after {
	border-radius: 50%;
}
</style>
</head>

<body style="background:#176f4e">
<div class="container2">
    <div class="text-center2">
        <form id="stickyNote" class="form-signin" name="form1" method="get" action="add-action" >
            <h4 class="form-signin-heading glyphicon glyphicon-chevron-left" style="cursor: pointer"
                  onClick="history.go(-1);return true;">${board.title}（未完成）</h4>
            <p class="help-block">&nbsp;</p>
            <input type="hidden" value="${board.id}" name="boardId" />
            <div class="form-group">
                <textarea id="title" name="title" class="form-control input-lg" 
                    placeholder="Please input content..." rows="6"></textarea>
            </div>
            <div style="float: left">
		<input type="radio" class="option-input radio yellow" value="yellow" name="color" checked
			onclick="javascript:change('#ffc')" > 
		<input type="radio" class="option-input radio green" value="green" name="color"
			onclick="javascript:change('#c2ffc1')" >
		<input type="radio" class="option-input radio blue" value="blue" name="color"
			onclick="javascript:change('#81effe')" >
		<input type="radio" class="option-input radio purple" value="purple" name="color"
			onclick="javascript:change('#c0befe')" >
		<input type="radio" class="option-input radio red" value="red" name="color"
			onclick="javascript:change('#fc76bb')" >
            </div>
            <div class="float: left">
                <p class="help-block">&nbsp;</p>
                <p class="help-block">&nbsp;</p>
                <p class="help-block">&nbsp;</p>
            </div>
            <div>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Done</button>
            </div>
            <p class="help-block"></p>
        </form>
    </div>
</div>
<!--container-->

<script type="text/javascript">
	function findSelection(field) {
		var radios = document.getElementsByName(field);

		for (var i = 0, length = radios.length; i < length; i++) {
		    if (radios[i].checked) {
		        return radios[i].value;
		    }
		}
	}
	
	function submitForm() {
	    var genderS = findSelection("color");
	    alert(genderS);
	}

	function change(color){
		var board = document.getElementById("stickyNote");
		board.style.backgroundColor = color;
	}
</script>
</body>
</html>
