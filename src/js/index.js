require(["config"],function(){
	require(["jquery","load","cookie","carousel"],function($){
		
		$(function(){
			//轮播图
			const imgWidth = $("body").width();
			$(".banner").carousel({
				duration: 3000, 
				imgs: [
					{href:"#", src:"/img/index_img/671840b9dfbc12a14e12eb8ccb67ec3e.jpg"},
					{href:"#", src:"/img/index_img/d27d8d54d47d9a8c78d7e70f39a47cd1.jpg"},
					{href:"#", src:"/img/index_img/c23750ce19901648514e7c19372e24b3.jpg"},
					{href:"#", src:"/img/index_img/505f96872db355b06fd9c6a1811bb10d.jpg"}
				], 
				width:imgWidth, 
				height:588,
				showBtn: true
			})
			//轮播图下面切换
			//右边切换图片
			$(".rightArrow").on("click",function(){
				let margin_left = parseInt($(".recBox").css("marginLeft"));
				if(margin_left<0){
					$(".rightClick").on("click",null);
				}else{
					$(".recBox").animate({marginLeft:margin_left-1151+"px"},"100");
				}
			});
			//左边切换图片
			$(".leftArrow").on("click",function(){
				let margin_left = parseInt($(".recBox").css("marginLeft"));
				if (margin_left>-1151){
					$(".leftClick").on("click",null);
				}else{
					$(".recBox").animate({marginLeft:margin_left+1151+"px"},"100");
				}
			});
		});
	});
});
