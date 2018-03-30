import yargs from 'yargs';//处理命令行参数

const args = yargs //区分开发环境和线上环境
  //option：设置命令的选项部分，比如npm -v中的-v即为选项
  .option('production',{ //是否为开发环境
  	boolean:true,
  	default:false, //默认为开发环境
  	describe:'min all scripts'
  })

  .option('watch',{ //是否监听开发环境中修改的文件
  	boolean:true,
  	default:false,
  	describe:'watch all files'
  })

  .option('verbose',{ //是否详细输出命令行执行的日志
  	boolean:true,
  	default:false,
  	describe:'log'
  })

  .option('sourcemaps',{ //随着代码增多，我们需要对代码进行压缩。代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，当产生错误时直接定位到未压缩前的位置
  	describe:'force the creation of sourcemaps'
  })

  .option('port',{ //开放的服务器端口，默认为8080
  	string:true,
  	default:8080,
  	describe:'server port'
  })

  .argv //以字符串作为解析
  export default args;