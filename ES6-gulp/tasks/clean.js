import gulp from 'gulp';
import del from 'del';
import args from './util/args';

//在每次监听覆盖前，都需将server下的目录清空
gulp.task('clean',()=>{
	return del(['server/public','server/views'])
})