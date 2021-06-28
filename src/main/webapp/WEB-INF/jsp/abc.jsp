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
	<table id="list">
		<tr>
			<td>category</td>
			<td>title</td>
			<td>content</td>
		</tr>
	</table>
	<script>
		$(function(){
			getList(1,'','');	
		})
		
		function getList(page, token, email){
			$list=$('#list');
// 			$list.empty();
			$.post('/post/list/json',{'token':token,'email':email},function(result){
				console.log(result);
				$.each(result.data,function(i,oDATA){
					var tags='';
					tags+='<tr>';
					tags+='<td>'+oDATA.category+'</td>';
					tags+='<td>'+oDATA.postTitle+'</td>';
					tags+='<td>'+oDATA.postContent+'</td>';
					tags+='</tr>';
		
					$list.append(tags);
				});
			});
		}
	</script>
</body>
</html>