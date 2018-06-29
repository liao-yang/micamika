require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,template){//短名称的顺序和函数中的金额对应
		$(function(){
				$.getJSON("/mock/cakeTemp.json",function(data){
					//渲染模板
					const html = template("cakeTemp",{list:data.res_body.list});
					//添加进网页中
					$("#cakes").prepend(html);	
				});	
			});
		//添加之前修改蛋糕的数量
		$("#cakes").on("click",".increase",function(){
			let amount = $(this).parent().find(".changeNum").val();
			amount ++;
			$(this).parent().find(".changeNum").val(amount);
		});
		$("#cakes").on("click",".induce",function(){
			let amount = $(this).parent().find(".changeNum").val();
			amount --;
			if (amount<1) {
				amount = 1;
			}
			$(this).parent().find(".changeNum").val(amount);
		});
		//商品添加进购物车
		$(function(){
			//获取当前商品的信息
			$("#cakes").on("click",".addToCart",function(){
				const currPro = {
					id : $(this).parent().parent().find(".id").text(),
					title : $(this).parent().parent().find(".title").text(),
					price : $(this).parent().parent().find(".price").text().slice(1),
					img : $(this).parent().parent().find(".img").attr("src"),
					amount : $(this).parent().find(".changeNum").val()
				}
				console.log(currPro);
				//使用cookie插件保存修改cookie
				//配置cookie
				$.cookie.json = true;
				//首先读取cookie，判断是否存在cookie
				const prodCookie = $.cookie("products") || [];
				console.log(prodCookie);
				//利用exist函数判断当前添加的商品是否存在于cookie中
				const index = exist(currPro.id,prodCookie);
				if (index === -1) {
					prodCookie.push(currPro);
				}else {
					prodCookie[index].amount ++;
				}
				//将当前选购的商品信息保存到 cookie 中：即将数组存回cookie
				$.cookie("products",prodCookie,{experis:7,path:"/"});
				})
			});
			
			//写一个函数用于判断cookie数组中是否存在当前商品信息
			function exist(id,array) {
				for (let i=0;i<array.length;i++) {
					if (array[i].id == id) {
						return i;
					}
				}
				return -1;
			}
	});	
	
});
