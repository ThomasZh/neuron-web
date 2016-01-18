<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">

<title>重置密码</title>

<link href="../../resources/css/common.css" rel="stylesheet" />

</head>

<body>

  <div class="wrap greybg">
    ${message}
    <form class="form-signin" action="reset-pwd" method="post">
      <input type="hidden" id="ekey" name="ekey" value="${ekey}">
      <div class="forms">
        <input type="password" name="inputPassword" id="inputPassword" class="inp_txt" placeholder="输入密码" required>
        <input type="password" name="inputPassword2" id="inputPassword2" class="inp_txt" placeholder="重复输入密码" required>
      </div>
      <input class="submit_btn" type="submit" value="完成" />
    </form>
  </div>


</body>
</html>
