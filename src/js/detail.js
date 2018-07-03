require(["config"],function(){
	require(["jquery","load","zoom","cookie"],function($){
		$(function(){
			// 放大镜
			$(".zoom").elevateZoom({
				gallery:'gallery_01', 
				cursor: 'pointer', 
				galleryActiveClass: "active"});
			//右边切换图片
			$(".rightClick").on("click",function(){
				let margin_left = parseInt($(".imgs").css("marginLeft"));
				if(margin_left<-339){
					$(".rightClick").on("click",null);
				}else{
					$(".imgs").animate({marginLeft:margin_left-113+"px"},"100");
				}
			});
			//左边切换图片
			$(".leftClick").on("click",function(){
				let margin_left = parseInt($(".imgs").css("marginLeft"));
				if (margin_left>-113){
					$(".leftClick").on("click",null);
				}else{
					$(".imgs").animate({marginLeft:margin_left+113+"px"},"100");
				}
			});
			var _price = $(".addCart h3").text().slice(1);
			//选择规格
			$(".standard :input").click(function(){
				$(this).addClass("inputChecked");
				$(this).siblings("input").removeClass("inputChecked");
				if ($(this).val()==="2磅") {
					$(".addCart h3").text("￥317.00");
				}else if($(this).val()==="3磅") {
					$(".addCart h3").text("￥477.00");
				}else {
					$(".addCart h3").text("￥617.00");
				}
				_price = $(".addCart h3").text().slice(1);
			})
			//修改数量
			$(".cakeNumber").on("click",".induce,.increase",function(){
				let amount = $(this).siblings("input").val();
				if ($(this).is(".induce")) {
					if (amount <= 1) // 商品数量小于等于1，不再减
						return;
					amount--;
				} else {
					amount++;
				}
				// 将兄弟元素（文本框）的值修改
				$(this).siblings("input").val(amount);
				$(".addCart h3").text("￥"+_price*amount+".00");
				console.log($(".addCart h3").text().slice(1));
			});
			//商品添加进购物车
			$(function(){
				$(".addToCart").on("click",haha);
				$(".immediately").on("click",haha);
				//获取当前商品的信息
				function haha (){
					const currPro = {
						id : 0,
						title : "摩天轮 Ferris Wheel",
						price : $(".addCart h3").text().slice(1),
						img : "/img/allCakes_img/ff22def1f569b0710b45ed4d3d3b3ed4.jpg",
						amount : Number($(".changeNum").val()) 
					}
					//使用cookie插件保存修改cookie
					//配置cookie
					$.cookie.json = true;
					//首先读取cookie，判断是否存在cookie
					const prodCookie = $.cookie("products") || [];
					//利用exist函数判断当前添加的商品是否存在于cookie中
					const index = exist(currPro.id,prodCookie);
					if (index === -1) {
						prodCookie.push(currPro);
					}else {
						prodCookie[index].amount += currPro.amount;
					}
					//将当前选购的商品信息保存到 cookie 中：即将数组存回cookie
					$.cookie("products",prodCookie,{experis:7,path:"/"});
					//修改header和sideBar中购物车的数量
					$(function(){
						let sum = 0;
						$.cookie.json = true;
						const _cookie = $.cookie("products")
						$(_cookie).each(function(index,element){
							 sum += Number(element.amount);
						})
						$(".header_middle_wrap .cart span").text(sum);
						$(".miniCart span").text(sum);
					})
				};
				
			});
			// 判断某 id 商品在数组中是否存在，
			// 存在则返回其在数组中的下标，-1表示不存在
			function exist(id, array) {
				for (let i = 0, len = array.length; i < len; i++) {
					if (array[i].id == id)
						return i;
				}
				return -1;
			}
			
			
			
		});
	});
})
