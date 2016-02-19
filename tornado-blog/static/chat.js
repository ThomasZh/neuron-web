$(function() {
    var $msg = $('#msg');
    var $content = $('#content');
    var chatId = document.getElementById("chatId").value;

    function wait(callback,seconds){
        var timelag=null;//这里应该用if判断一下；可以扩展
        timelag=window.setTimeout(callback,seconds);
    }
    
	var error_sleep_time = 5000;
	function poll() {
		wait(function(){
	        $.ajax({
	            url: '/chat/msg?id=' + chatId,
	            type: 'GET',
	            success: function(event) {
	            	ajaxobj = eval("("+event+")");
	            	
	            	if (ajaxobj == null || ajaxobj == undefined || ajaxobj == '') {
	            		;
	            	} else {
	            		for (var i in ajaxobj) {
	            			$msg.append('<p>' + ajaxobj[i].fromNickname + ': ' + ajaxobj[i].content + '</p>');	
	            		}
	            	}
	                error_sleep_time = 5000;
	                poll();
	            },
	            error: function() {
	                error_sleep_time *= 2;
	                setTimeout(poll, error_sleep_time);
	            }
	        });
	    },1000);	
	}
	poll();
})();

function SubmitForm() {
	var $content = document.getElementById("content");
	var chatId = document.getElementById("chatId").value;
	_xsrf = getCookie("_xsrf");
	$.ajax({
		url : '/chat/msg',
		type : 'POST',
		data : {
			"_xsrf" : _xsrf,
			"content" : $content.value,
			"chatId" : chatId
		},
		success : function() {
			$('#msg').append('<p>' + $content.value + '</p>');
			$content.value = '';
		}
	});
	return false;
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}