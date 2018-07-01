//加载头部尾部
define(["jquery","cookie"],function($,cookie){
	$(".header").load("/html/include/header.html",function(){
		//点击登录注册跳转到正确的模态框
		$("._btn1").click(function(){
			$(".nav-tabs li:first-child").addClass("active");
			$(".nav-tabs li:last-child").removeClass("active");
			$("#home").addClass("active");
			$("#profile").removeClass("active");
			$("#inputName3").val($.cookie().users.username);
			$("#inputPassword3").val($.cookie().users.password);
		});
		$("._btn2").click(function(){
			$(".nav-tabs li:first-child").removeClass("active");
			$(".nav-tabs li:last-child").addClass("active");
			$("#home").removeClass("active");
			$("#profile").addClass("active");
		});
		//注册
		//判断注册时用户名是否被占用
		$("#exampleInputName1").blur(function(){
			const micaUsername = $("#exampleInputName1").val();
			$.ajax({
				type : "POST",
				url : "http://localhost:8090/api/check.php",
				datatype : "JSON",
				data : {
					"username" : micaUsername
				},
				success : function(data){
					data = JSON.parse(data);
					if(data.res_code===0){
						$("#exsit").text("用户名可以使用").css({"color":"black"});
					}else{
						$("#exsit").css({"display":"inline-block"});
					}
				}
			});
		});
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
		//点击注册按钮
		$("#micamikaRegister").click(function(){
			const micaUsername = $("#exampleInputName1").val(),
				  micaPassword = $("#exampleInputPassword1").val(),
				  micaPasswordAgain = $("#exampleInputPassword2").val(),
				  agree = $("#agree"),
				  passExp = /^.{6,20}$/;
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
						$("#profile").html(`注册成功<a href="#myModal">点击登录</a>`);
						$("#profile a").click(function(){
							$(".nav-tabs li:first-child").addClass("active");
							$(".nav-tabs li:last-child").removeClass("active");
							$("#home").addClass("active");
							$("#profile").removeClass("active");
						})
					}
				});
			}else{
//				event.preventDefault();
				$("#registerFail").text("注册失败，请检查输入内容").css({"color":"red"});
				console.log(1)
			}
		});
		
		
		//用户登录
		$("#micamikaLogin").click(function(){
			const micaUsername = $("#inputName3").val(),
				  micaPassword = $("#inputPassword3").val(),
				  remenber = $("#remenber")
			//判断输入的用户名密码是否符合要求
			if (micaUsername!==""&&micaPassword!==""){
				if (remenber.is(":checked")) {
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
								$("#home").html("登录成功，登陆框将于3秒后消失");
								$(".helloUser").html(`欢迎您${micaUsername}&nbsp;&nbsp;<button id="logout">退出登录</button>`);
								console.log($("#logout"))
								setTimeout(function(){
									$(".modal").css({"display":"none"}),
									$(".modal-backdrop").css({"display":"none"})
								},3000);
								const users = {
									username : micaUsername,
									password : micaPassword
								}
								//使用cookie插件保存修改cookie
								//配置cookie
								$.cookie.json = true;
								//将当前选购的商品信息保存到 cookie 中：即将数组存回cookie
								$.cookie("users",users,{experis:7,path:"/"});
							}else{
								$(".col-sm-offset-2 span").css({"display":"inline-block"});
							}
						}
					});
				}else{
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
								$("#home").html("登录成功，登陆框将于3秒后消失");
								$(".helloUser").html(`欢迎您${micaUsername}&nbsp;&nbsp;<button id="logout">退出登录</button>`);
								setTimeout(function(){
									$(".modal").css({"display":"none"}),
									$(".modal-backdrop").css({"display":"none"})
								},3000);
								//配置cookie
								$.cookie.json = true;
								//删除cookie
								$.cookie("users","",{experis:-1,path:"/"});
							}else{
								$(".col-sm-offset-2 span").css({"display":"inline-block"});
							}
						}
					});
				}
				
			}
		});
		
		
		//修改header和sideBar中购物车的数量
		$(function(){
			let sum = 0;
			$.cookie.json = true;
			const _cookie = $.cookie("products")
			$(_cookie).each(function(index,element){
				 sum += Number(element.amount);
			})
			$(".header_middle_wrap .cart span").text(sum);
		});
		
		//点击退出登陆
		/*$("#logout").click(function(){
			console.log(1)
			$(".helloUser").html(
				`<button type="button" class="btn btn-primary btn-lg _btn1" data-toggle="modal" data-target="#myModal">登录</button>或
				<button type="button" class="btn btn-primary btn-lg _btn2" data-toggle="modal" data-target="#myModal">加入会员</button>`
			
		})*/
		
	});
	$(".footer").load("/html/include/footer.html");
	$(".sideBar").load("/html/include/sideBar.html",function(){
		$(".miniCart span").text($(".header_middle_wrap .cart span").text());
	});
	
})