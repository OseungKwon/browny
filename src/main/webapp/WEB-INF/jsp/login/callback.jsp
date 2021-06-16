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
  <a href="javascript:void(0)">
   <span>로그인 중입니다...</span>
  </a>
 </li>
</ul>
<script>
$(function(){
	token();
})

function token(){
	var type=location.href.split('login/')[1].split('/callback')[0];
	var code=location.href.split('code=')[1].split('&')[0];
	$.get('/login/'+type+'/token',{'code':code},function(result){
		console.log(result);
	});
}

</script>
</body>
</html>