/*==========================================================================================
                                             模块化
1、基本概念
2、基本语法
===========================================================================================*/
// 
// export import

//导出对外暴露的变量、函数和类
// export let A = 123 

// export function test(){
// 	console.log('test')
// }

// export class Hello{
// 	test(){
// 		console.log('class')
// 	}
// }

let A = 123

function test(){
	console.log('test')
}

class Hello{
	test(){
		console.log('class')
	}
}

export default {
	A,test,Hello
}