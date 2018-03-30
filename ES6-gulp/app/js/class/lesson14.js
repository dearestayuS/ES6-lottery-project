/*==========================================================================================
                                   Iterator和for...of循环
1、什么是Iterator接口：读取不同数据结构
2、Iterator基本用法
4、部署Iterator：（1）[Symbol.iterator](){}（2）函数体
                 （3）返回一个对象为next()方法，包含两个值：value和done
3、for...of
===========================================================================================*/

// Iterator接口
{
	let arr = ['hello','world']
	let map = arr[Symbol.iterator]()
	console.log(map.next()) //Object {value: "hello", done: false}，done为false意味着循环还有下一步
	console.log(map.next()) //Object {value: "world", done: false}
	console.log(map.next()) //Object {value: undefined, done: true}，循环截至
}

//obj自建Iterator接口
{
	let obj = {
		start:[1,3,2],
		end:[7,9,8],
		[Symbol.iterator](){ //Symbol.iterator，ES6中内置的Symbol
			let self = this
			let index = 0
			let arr = self.start.concat(self.end) //将start和end合并成一个数组
			let len = arr.length
			return {
				next(){
					if(index<len){
						return {
							value:arr[index++],
							done:false
						}
					}else{
						return {
							value:arr[index++],
							done:true
						}
					}
				}
			}
		}
	}
	//验证接口是否部署成功，用for...of遍历
	for(let key of obj){
		console.log(key)
	}
}

//for...of循环
{
	let arr = ['hello','world']
	for(let value of arr ){
		console.log(value)
	}
}