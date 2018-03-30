/*==========================================================================================
                                      Decorator
1、基本概念：（1）一个函数（2）通过Decorator修改类的行为
2、基本用法
===========================================================================================*/

{
	let readonly = function (target,name,descriptor) {
		descriptor.writable = false
		return descriptor
	}

	class Test{
		@readonly
		time(){
			return '2017-10-23'
		}
	}

	let test = new Test()

	// test.time = function(){
	// 	console.log(test.time()) //会报错，因为是只读
	// }
	console.log(test.time())
}

//在class前面进行操作
{
	let typename = function(target,name,descriptor){
		target.myname = 'hello' //target指的类本身，不是实例
	}

	@typename
	class Test{
		show(){
			console.log('Test is show')
		}
	}
	let test = new Test();
	test.show();
	console.log('类修饰符',Test.myname)//myname为静态属性
	// 第三方库修饰器的js库：core-decorators
}

{
	let log =(type)=>{
		return function(target,name,descriptor){
			let src_method = descriptor.value //原始的抽象函数体
			descriptor.value = (...arg)=>{
				src_method.apply(target,arg)//将抽象函数体实例化ad.show()、ad.click()，arg为输入参数
				console.info(`log ${type}`)
			}
		}
	}

	class AD{
		@log('show')
		show(){
			console.log('ad is show')
		}
		@log('click')
		click(){
			console.log('ad is click')
		}
	}

	let ad = new AD()
	ad.show()
	ad.click()
}