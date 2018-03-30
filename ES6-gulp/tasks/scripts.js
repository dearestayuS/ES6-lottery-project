import gulp from 'gulp'; // 引入gulp
import gulpif from 'gulp-if'; // 在gulp语句中做if判断
import concat from 'gulp-concat'; // 在gulp中处理文件拼接
import webpack from 'webpack'; // 打包文件
import gulpWebpack from 'webpack-stream'; // gulp处理文件流
import named from 'vinyl-named'; // 文件重命名，做标志
import livereload from 'gulp-livereload'; // 热更新，文件修改以后浏览器自动刷新
import plumber from 'gulp-plumber'; // 处理文件信息流
import rename from 'gulp-rename'; // 对文件重命名
import uglify from 'gulp-uglify'; // 处理js和css压缩
import {log,colors} from 'gulp-util'; // 在命令行工具输出
import args from './util/args'; // 命令行参数进行解析


//创建一个gulp任务，任务名称为scripts
gulp.task('scripts',()=>{
	return gulp.src(['app/js/index.js']) //打开该文件，因为index.js会引入其他所有js，因此只需打开index.js即可
	  .pipe(plumber({ //打开以后首先处理错误信息流，pipe为管道
	  	errorHandle:function() {

	  	}
	  }))
	  .pipe(named()) //对该文件重命名
	  .pipe(gulpWebpack({ //对该js进行编译
	  	module:{
	  		loaders:[{ //如果遇到js，需要用babel这个loader去处理
	  			test:/\.js$/,
	  			loader:'babel-loader'
	  		}]
	  	}
	  }),null,(err,stats)=>{
	  	log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
	  		chunks:false
	  	}))
	  }) 
	  .pipe(gulp.dest('server/public/js')) //将打开的该文件保存到目的地址
	  .pipe(rename({ //将该文件重命名
	  	basename:'cp',
	  	extname:'.min.js'
	  }))
	  .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}})) //将该文件压缩
	  .pipe(gulp.dest('server/public/js'))//将该文件保存到目的地址
	  .pipe(gulpif(args.watch,livereload())) //判断命令行参数中是否有watch，如果有，则进行热更新
})