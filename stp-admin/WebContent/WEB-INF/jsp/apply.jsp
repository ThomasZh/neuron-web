<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=no">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ page isELIgnored="false"%>
<%
	response.setCharacterEncoding("UTF-8");
	request.setCharacterEncoding("UTF-8");
%>
<title>填写报名信息</title>

<link rel="stylesheet" type="text/css" href="../../resources/css/common.css">

<script type="text/javascript">
	var rows = 1;
	var rowNums = 1;
	var rowArray = new Array();
	rowArray.push(rowNums);

	function remove(arr, item) {
		for (var i = arr.length; i--;) {
			if (arr[i] === item) {
				arr.splice(i, 1);
			}
		}
	}

	function DeleteDom(row) {
		var strId = "participationRow_" + row;
		oldChild = document.getElementById(strId);
		document.getElementById("participationCells").removeChild(oldChild);

		rows--;
		remove(rowArray, row);
		document.getElementById("hidden_participationRowNum").value = rows;
		document.getElementById("hidden_participationRowArray").value = rowArray
				.toString();
	}

	function AddDom() {
		rows++;
		rowNums++;
		rowArray.push(rowNums);
		var strId = "participationRow_" + rows;
		var columns = document.getElementById("hidden_participationColumnNum").value;
		document.getElementById("hidden_participationRowNum").value = rows;
		document.getElementById("hidden_participationRowArray").value = rowArray
				.toString();

		var divControl = document.createElement("div");
		divControl.setAttribute("id", strId);

		var labelControl = document.createElement("h4");
		labelControl.setAttribute("class", "form-signin-heading");
		labelControl.innerHTML = "同行人";
		divControl.appendChild(labelControl);

		var buttonControl = document.createElement("input");
		buttonControl.setAttribute("type", "button");
		buttonControl.setAttribute("class", "btn btn-sm btn_danger active");
		buttonControl.setAttribute("name", "btnDeleteText");
		buttonControl.setAttribute("value", "删除同行人");
		var strAction = "javascript:DeleteDom(" + rows + ");";
		buttonControl.setAttribute("onclick", strAction);
		divControl.appendChild(buttonControl);

		for (var i = 0; i < columns; i++) {
			var seq = document.getElementById("hidden_inputParticipation_"
					+ (i + 1) + "_seq").value;
			var name = document.getElementById("hidden_inputParticipation_"
					+ (i + 1) + "_name").value;

			var textControl = document.createElement("input");
			textControl.setAttribute("type", "text");
			textControl.setAttribute("class", "form-control");
			textControl.setAttribute("name", "inputParticipation_" + rows + "_"
					+ seq);
			textControl.setAttribute("id", "inputParticipation_" + rows + "_"
					+ seq);
			textControl.setAttribute("placeholder", name);
			divControl.appendChild(textControl);
		}

		document.getElementById("participationCells").appendChild(divControl);
	}
</script>
</head>



<body>

  ${message}

<div class="wrap greybg">
    <div class="Signup">
        <div class="pictext">
            <dl>
                <dt><img src="${info.bgImageUrl}!200x200" /></dt>
                <dd><p>${info.name}</p><span>${datetime}</span></dd>
            </dl>
        </div>
    </div>

  <form class="form-signin" action="applyAction" commandName="contact">
    <div id="participationCells">
      <input type="hidden" id="hidden_id" name="hidden_id" value="${id}">
      <input type="hidden" id="hidden_participationColumnNum"
              name="hidden_participationColumnNum"
              value="${participationColumnNum}">
      <input type="hidden"
              id="hidden_participationRowNum"
              name="hidden_participationRowNum"
              value="1">
      <input type="hidden"
              id="hidden_participationRowArray"
              name="hidden_participationRowArray"
              value="1">
      <div id="participationRow_1">
        <p class="cyr">参加人信息</p>
        <div class="participant">
          <ul>
            <c:forEach items="${templateResponses}" var="participationCell" varStatus="stat">
              <input type="hidden"
                     id="hidden_inputParticipation_${participationCell.seq}_seq"
                     value="${participationCell.seq}">
              <input type="hidden"
                     id="hidden_inputParticipation_${participationCell.seq}_name"
                     value="${participationCell.fieldName}">
              <li><span>${participationCell.fieldName}：</span>
                  <input type="text" 
                         name="inputParticipation_1"
                         id="inputParticipation_1"
                         class="inp_part"/>
              </li>
            </c:forEach>
          </ul>
        </div> <!-- participationRow_1 -->
      </div>
    </div> <!-- participationCells -->


    <div class="btn">
        <input type="submit" name="" class="submit_btn" value="提交报名">
    </div>
  </form>
</div>

</body>
</html>
