//引入模块
const gulp = require("gulp"),
	  connect = require("gulp-connect"),//gulp插件
	  sass = require("gulp-sass");
	  
//开始任务	  
	  
//定制gulp任务，启动服务器
gulp.task("connect",function(){
	connect.server({
		root:"dist",//服务器的根
		livereload:true//是否自动刷新
	});
});

//复制html文件到dist目录下，让html页面修改后能够重新加载
gulp.task("html",function(){
	gulp.src("src/**/*.html")//src目录下所有文件夹中，包括src本身
	.pipe(gulp.dest("dist/"))//写入到相对于index.html的dist文件夹里面，可以不要/，里面的文件夹根据src里面的生成
	.pipe(connect.reload());//浏览器自动刷新
})

//复制js文件到dist目录下，让js修改后页面能够重新加载
gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})



//复制img文件夹
gulp.task("copy-image",function(){
	gulp.src("src/img/**/*.*")
	.pipe(gulp.dest("dist/img"))
})

//复制lib文件夹
gulp.task("copy-lib",function(){
	gulp.src("src/lib/**/*.*")
	.pipe(gulp.dest("dist/lib"))
})

//复制mock文件夹
gulp.task("copy-mock",function(){
	gulp.src("src/mock/**/*.*")
	.pipe(gulp.dest("dist/mock"))
})



//将上面复制任务合并为一个
gulp.task("copy",["copy-lib", "copy-image", "copy-mock"])


//编译sass
gulp.task("sass-task",function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass({outputStyle: "compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());//浏览器自动刷新
});
// 监视
gulp.task("watch", function(){
	// 监视*.scss的修改，自动执行编译sass任务
	gulp.watch("src/sass/*.scss", ["sass-task"]);//每发现.scss文件修改，去执行"sass-task"任务
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/js/**/*.js",["js"]);
});



//定制默认（缺省任务）
gulp.task("default",["html","js","sass-task","copy","connect","watch"]);
