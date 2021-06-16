<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
	<meta charset="UTF-8">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<style>
	table tr td {
	border:1px black solid;
	}
	</style>
</head>
<body>
	<ul>
 <li id="GgCustomLogin">
  <a href="javascript:void(0)" onclick="login('Google');">
   <span>Login with Google</span>
  </a>
 </li>
</ul>
<script>
function login(type){
	if(type=="Google"){
		$.get('/login/google',function(result){
			location.href=result.url;
// 			window.open(result.url,"PopupWin","width=500,height=600");
		});
	}
}

</script>
</body>
</html>