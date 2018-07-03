require(["config"],function(){
	require(["jquery","template","cookie","load"],function($,template){
		$(function(){
			
			/* 读取并渲染购物车 */
			
			$.cookie.json = true;
			// 读取购物车保存的 cookie
			let products = $.cookie("products") || [];
			// 判断是否有选购过商品
			if (products.length === 0) { // 未选购商品
				$(".buy").html(`<h2 style="text-align:center;">购物车内容为空</h2>`);
			}
			// 已有选购商品
			let html = template ("cartCakes",{cartCakes:products});
			$(".cartContent").html(html);
			calcTotal();
			
			/* 删除 */
			
			$(".cartContent").on("click", "span", function(){
				// 获取待删除商品的id
				const id = $(this).parent().parent().parent().find(".id").text().slice(5);
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				// 从数组指定 index 索引处删除1个元素
				products.splice(index, 1);
				// 从cookie中删除部分数据(覆盖保存)
				$.cookie("products", products, {expires:7, path:"/"});
				// 从DOM树中删除节点
				$(this).parent().parent().parent().remove();
				// 判断购物车是否为空
				if (products.length === 0) {
					$(".buy").html(`<h2 style="text-align:center;">购物车内容为空</h2>`);
				}
				// 计算合计
				calcTotal();
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
			});
			
			//点击按钮更改数量
			
			$(".cakeNumber").on("click",".induce,.increase",function(){
				const id = $(this).parent().parent().parent().parent().find(".id").text().slice(5);
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				
				 //修改指定索引处元素的 amount 属性值
				const prod = products[index];
				if ($(this).is(".induce")) {
					if (prod.amount <= 1) // 商品数量小于等于1，不再减
						return;
					prod.amount--;
				} else {
					prod.amount++;
				}
				// 覆盖保存回 cookie 中
				$.cookie("products", products, {expires:7, path:"/"});
				// 将兄弟元素（文本框）的值修改
				$(this).siblings("input").val(prod.amount);
				// 更新小计金额
				$(this).parent().parent().siblings(".integral").text((prod.price*prod.amount));
				$(this).parent().parent().siblings(".total").text(("￥"+prod.price*prod.amount));
				// 计算合计
				calcTotal();
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
			});
			
			//输入框修改数量
			
			$(".cakeNumber").on("blur", ".changeNum", function(){
				// 获取待修改数量商品的id
				const id = $(this).parent().parent().parent().parent().find(".id").text().slice(5);
				// 获取指定id商品在 products 数组中的下标
				const index = exist(id, products);
				 //修改指定索引处元素的 amount 属性值
				const prod = products[index];
				// 判断输入的值格式是否正确
				const val = $(this).val();
				if (!/^[1-9]\d*$/.test(val)) { // 格式有误
					$(this).val(prod.amount);
					return;
				}
				// 修改数量：将商品数量修改为文本框输入的数量
				prod.amount = val;
				// 覆盖保存回 cookie 中
				$.cookie("products", products, {expires:7, path:"/"});
				// 更新小计金额
				$(this).parent().parent().siblings(".integral").text(prod.price*prod.amount);
				$(this).parent().parent().siblings(".total").text("￥"+(prod.price*prod.amount));
				// 计算合计
				calcTotal();
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
			});
			
			//清空购物车
			$("#clearCart").click(function(){
				products.splice(0);
				$.cookie("products", products, {expires:7, path:"/"});
				$(".buy").html(`<h2 style="text-align:center;">购物车内容为空</h2>`);
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
			})
			
			
			// 判断某 id 商品在数组中是否存在，
			// 存在则返回其在数组中的下标，-1表示不存在
			function exist(id, array) {
				for (let i = 0, len = array.length; i < len; i++) {
					if (array[i].id == id)
						return i;
				}
				return -1;
			}
			
			/* 计算合计金额 */
			
			function calcTotal() {
				let sum = 0;
				$(".addCake").each(function(index, element){
					// index 是当前遍历到的DOM元素在数组中的下标
					// element 是当前遍历到的DOM元素
					// this === element
					sum += Number($(element).find(".total").text().slice(1));
					
				});
				// 显示总金额
				$('._totalPrice').text("￥"+(sum).toFixed(2));
			}
			
			
			//结算订单模态框
			$("#pay").click(function(){
				$(".occlusion").css({"display":"block"});
				$(".payBox").css({"display":"block"});
				$("body").css({"overflow":"hidden"});
				loadProvince();
				// 省份选择发生改变，则加载城市
				$("#province").on("change", loadCity);
				// 城市选择发生改变，加载区县
				$("#city").on("change", loadDistrict);
				
			})
			//模态框内容
			// 加载省份
			function loadProvince() {
				const url1 = "http://route.showapi.com/1149-1?showapi_appid=66926&showapi_sign=3fdc81abebb64ff98f511b171f265dea&level=1&page=1",
					url2 = "http://route.showapi.com/1149-1?showapi_appid=66926&showapi_sign=3fdc81abebb64ff98f511b171f265dea&level=1&page=2";
				// 读取两页省份数据
				$.when($.ajax(url1,{dataType:"json"}), $.ajax(url2, {dataType:"json"}))
				  .then(function(data1, data2){
				  	// html 字符串
				  	let html = "<option value='-1'>请选择省份</option>";
				  	// 将省份数组遍历，每个省份信息添加到下拉列表项中
					data1[0].showapi_res_body.data
						.concat(data2[0].showapi_res_body.data)
						.forEach(function(curr){
							html += `<option value="${curr.id}">${curr.areaName}</option>`;
						});	
					// 显示省份信息
					$("#province").html(html);
				});
			}
			// 加载城市
			function loadCity() {
				// 获取所选中的省份id
				const prov_id = $("#province").val();
				// 根据省份id查询城市信息
				const url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${prov_id}`;
				$.getJSON(url, function(data){
					let html = "<option value='-1'>请选择城市</option>";
					data.showapi_res_body.data.forEach(function(curr){
						html += `<option value="${curr.id}">${curr.areaName}</option>`;
					});
					// 显示所有城市
				 	$("#city").html(html);
				});
			}
		
			// 加载区县
			function loadDistrict() {
				// 获取所选中的城市id
				const city_id = $("#city").val();
				// 根据城市id查询区县信息
				const url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${city_id}`;
				$.getJSON(url, function(data){
					let html = "<option value='-1'>请选择区县</option>";
					data.showapi_res_body.data.forEach(function(curr){
						html += `<option value="${curr.id}">${curr.areaName}</option>`;
					});
					// 显示所有区县
				 	$("#count").html(html);
				});
			}
			//取消
			$("#cansel").click(function(){
				$(".occlusion").css({"display":"none"});
				$(".payBox").css({"display":"none"});
				$("body").css({"overflow":"auto"});
			})
		});
	});
});
