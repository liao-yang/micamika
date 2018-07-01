require.config({
	baseUrl:"/",
	paths:{
		jquery:"/lib/jquery/jquery-1.12.4.min",
		load:"/js/load",
		template:"/lib/artTemplate/template-web",
		cookie:"/lib/jquery-plugins/jquery.cookie",
		zoom:"/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		fly:"/lib/jquery-plugins/jquery.fly.min",
		header:"/js/header",
		carousel:"/lib/jquery-plugins/jquery.xm_carousel"
	},
	shim:{
		zoom : {
			deps : ["jquery"]
		},
		fly : {
			deps : ["jquery"]
		},
		carousel : {
			deps : ["jquery"]
		}
	}
});
