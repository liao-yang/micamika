require.config({
	baseUrl:"/",
	paths:{
		jquery:"/lib/jquery/jquery-1.12.4.min",
		load:"/js/load",
		template:"/lib/artTemplate/template-web",
		cookie:"/lib/jquery-plugins/jquery.cookie",
		zoom:"/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		fly:"/lib/jquery-plugins/jquery.jquery.fly.min",
		header:"/js/header"
	},
	shim:{
		zoom : {
			deps : ["jquery"]
		},
		fly : {
			deps : ["jquery"]
		}
	}
});
