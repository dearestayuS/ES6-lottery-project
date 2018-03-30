import gulp from 'gulp'; // 引入gulp
import gulpif from 'gulp-if'; // 在gulp语句中做if判断
import livereload from 'gulp-livereload'; // 热更新，文件修改以后浏览器自动刷新
import args from './util/args'; // 命令行参数进行解析

//创建一个gulp任务，任务名称为scripts
gulp.task('pages',()=>{
	return gulp.src('app/**/*.ejs') //**表示app目录下各个嵌套目录的.ejs
	  .pipe(gulp.dest('server')) //将打开的该文件保存到目的地址
	  .pipe(gulpif(args.watch,livereload())) //判断命令行参数中是否有watch，如果有，则进行热更新
})