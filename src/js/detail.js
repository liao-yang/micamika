require(["config"],function(){
	require(["jquery","load","zoom"],function($){
			
			$(".rightClick").on("click",function(){
				let margin_left = parseInt($(".imgs").css("marginLeft"));
				if(margin_left<-339){
					$(".rightClick").on("click",null);
				}else{
					$(".imgs").animate({marginLeft:margin_left-113+"px"},"100");
				}
			});
			$(".leftClick").on("click",function(){
				let margin_left = parseInt($(".imgs").css("marginLeft"));
				if (margin_left>-113){
					$(".leftClick").on("click",null);
				}else{
					$(".imgs").animate({marginLeft:margin_left+113+"px"},"100");
				}
			});

		$(function(){
			// 放大镜
			$(".zoom").elevateZoom({
				gallery:'gallery_01', 
				cursor: 'pointer', 
				galleryActiveClass: "active"});
		});
	});
})
