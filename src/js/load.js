//加载头部尾部
define(["jquery"],function($){
	$(".header").load("/html/include/header.html",function(){
		//判断注册时设置的密码是否符合要求
		$("#exampleInputPassword1").blur(function(){
			const micaPassword = $("#exampleInputPassword1").val(),
				  passExp = /^.{6,20}$/;
			$("#firstPass").css({"display":"inline-block"});
			if(passExp.test(micaPassword)){
				$("#firstPass").text("密码符合要求").css({"color":"black"});
			}
			
		});
		//判断两次输入的密码是否相同
		$("#exampleInputPassword2").blur(function(){
			const micaPassword = $("#exampleInputPassword1").val(),
				  micaPasswordAgain = $("#exampleInputPassword2").val();
			$("#secondPass").css({"display":"inline-block"});
			if(micaPassword===micaPasswordAgain){
				$("#secondPass").text("密码输入一致").css({"color":"black"});
			}
		});
		//用户注册
		$("#micamikaRegister").click(function(){
			const micaUsername = $("#exampleInputName1").val(),
				  micaPassword = $("#exampleInputPassword1").val(),
				  micaPasswordAgain = $("#exampleInputPassword2").val(),
				  agree = $("#agree");
			//验证密码是6-20位的正则表达式
			const passExp = /^.{6,20}$/;
			//判断输入的用户名密码是否符合要求
			if (micaUsername!==""&&micaPassword!==""&&passExp.test(micaPassword)&&micaPassword===micaPasswordAgain&&agree.is(':checked')){
				$.ajax({
					type : "POST",
					url : "http://localhost:8090/api/register.php",
					datatype : "JSON",
					data : {
						"username" : micaUsername,
						"password" : micaPassword
					},
					success : function(data){
						data=JSON.parse(data);
						$("#profile").html("注册成功");
					}
				});
			}else{
				event.preventDefault();
				$("#registerFail").text("注册失败，请检查输入内容").css({"color":"red"});
			}
		});
		//用户登录
		$("#micamikaLogin").click(function(){
			const micaUsername = $("#inputName3").val(),
				  micaPassword = $("#inputPassword3").val();
			//判断输入的用户名密码是否符合要求
			if (micaUsername!==""&&micaPassword!==""){
				$.ajax({
					type : "POST",
					url : "http://localhost:8090/api/login.php",
					datatype : "JSON",
					data : {
						"username" : micaUsername,
						"password" : micaPassword
					},
					success : function(data){
						data = JSON.parse(data);
						if(data.res_code===1){
							$("#home").html("登录成功");
							$(".helloUser").html(`欢迎您${micaUsername}<a href="#myModal">退出登录</a>`);
						}else{
							alert("未注册");
						}
					}
				});
			}
		});
		
		
		
		
		
	});
	$(".footer").load("/html/include/footer.html");
	$(".sideBar").load("/html/include/sideBar.html");
	
})