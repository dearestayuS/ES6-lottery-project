import gulp from 'gulp'; // 引入gulp
import gulpif from 'gulp-if'; // 在gulp语句中做if判断
import livereload from 'gulp-livereload'; // 热更新，文件修改以后浏览器自动刷新
import args from './util/args'; // 命令行参数进行解析

//创建一个gulp任务，任务名称为scripts
gulp.task('css',()=>{
	return gulp.src('app/**/*.css')
		.pipe(gulp.dest('server/public'))
		// 是否热更新
		// .pipe(gulpif(args.watch,livereload()))
})