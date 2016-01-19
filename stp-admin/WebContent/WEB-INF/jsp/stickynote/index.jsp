<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/> 
<title>Sticky notes</title>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="../../resources/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- Custom styles for this template -->
<link href="../../resources/css/sticky-notes.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../../resources/jquery/quickflip2/basic-quickflips.css" />

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
<script src="../../resources/jquery/quickflip2/jquery.quickflip.source.js"></script>
 
</head>

<body style="margin:0em; background:url(../../resources/images/banner.jpg) repeat">
  <div class="quickFlip">
    <div class="blackPanel" style="background:#176f4e" >
      <!-- START THE NAVBAR -->
      <nav class="navbar navbar-default navbar-static-top" style="background:url(../../resources/images/banner.jpg) repeat" >
        <div class="container">
          <div class="navbar-header">
            <a herf="#" class="quickFlipCta navbar-toggle collapsed">
              <span class="glyphicon glyphicon-refresh" aria-hidden="true">
              </span></a>
            <a href="../blackboard/index" class="navbar-brand" >
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true">
              </span>${board.title}  （未完成）</a>
          </div>
          <div class="collapse navbar-collapse">
            <div class="nav navbar-nav navbar-right">
              <a href="#" class="quickFlipCta navbar-brand" >
                <span class="glyphicon glyphicon-refresh" aria-hidden="true">
                </span> Click to Flip</a>
            </div>
          </div>
      </nav>
      <!-- END NAVBAR -->

      <ul id="uncompletedBoard">
        <li>
          <a href="add?boardId=${board.id}">
            <img src="../../resources/images/plus-black.png" width="100%" height="100%" />
          </a>
        </li>
        <c:forEach items="${uncompletedNotes}" var="unnote" varStatus="stat">
        <li>
          <a class="${unnote.color}" 
             href="edit?boardId=${board.id}&id=${unnote.id}&title=${unnote.title}&color=${unnote.color}&completed=${unnote.completed}">
              <h2>${unnote.title}</h2>
          </a>
        </li>
        </c:forEach>
      </ul>
    </div>

    <div class="redPanel" style="background:#ffffff" >
      <!-- START THE NAVBAR -->
      <nav class="navbar navbar-default navbar-static-top" style="background:url(../../resources/images/banner.jpg) repeat" >
        <div class="container">
          <div class="navbar-header">
            <a herf="#" class="quickFlipCta navbar-toggle collapsed">
              <span class="glyphicon glyphicon-refresh" aria-hidden="true">
              </span></a>
            <a href="../blackboard/index" class="navbar-brand" >
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true">
              </span>${board.title}  （已完成）</a>
          </div>
          <div class="collapse navbar-collapse">
            <div class="nav navbar-nav navbar-right">
                <a href="#" class="quickFlipCta navbar-brand" >
                  <span class="glyphicon glyphicon-refresh" aria-hidden="true">
                  </span> Click to Flip</a>
            </div>
          </div>
        </div>
      </nav>
      <!-- END NAVBAR -->

      <ul id="completedBoard">
        <c:forEach items="${completedNotes}" var="cnote" varStatus="stat">
        <li>
          <a class="${cnote.color}" 
             href="edit?boardId=${board.id}&id=${cnote.id}&title=${cnote.title}&color=${cnote.color}&completed=${cnote.completed}">
              <h2>${cnote.title}</h2>
          </a>
        </li>
        </c:forEach>
      </ul>
    </div>
  </div>
  
<script type="text/javascript">
    $(function() {
        $('.quickFlip').quickFlip();
    });
</script>
</body>
</html>
