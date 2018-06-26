require(["config"],function(){
	require(["jquery","template","load"],function($,template){//短名称的顺序和函数中的金额对应
		//将模板信息添加进页面中
		$(function(){
			$.getJSON("/mock/cakeTemp.json",function(data){
				//渲染模板
				const html = template("cakeTemp",{list:data.res_body.list});
				//添加进网页中
				$("#cakes").prepend(html);
			});
		});
	});	
});
