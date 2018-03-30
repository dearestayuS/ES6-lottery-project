/*=====================================================================================================
                                             Symbol用法
1、Symbol概念：该数据类型提供一个独一无二的值，永远不可能相等
2、Symbol语法

======================================================================================================*/

{
	// 声明方法一：
	let a1 = Symbol();
	let a2 = Symbol();
	console.log(a1===a2) //=== ，判断值和类型是否完全相等，false
	//声明方法二：
	let a3 = Symbol.for('a3') //Symbol.for会检测全局是否有'a3'，若有则调用，若没有，则等同于Symbol()
	let a4 = Symbol.for('a3') //Symbol.for()拿到了之前的a3，因此为true
	console.log(a3===a4) //true	
}

//作用
{
	let a1 = Symbol.for('abc')
	let obj = {
		[a1]:'123',
		'abc':456,
		'c':678
	};
	// 不会造成属性冲突
	console.log(obj)
	// for in 与let of 拿不到属性Symbol('abc')的属性
	for(let [key,value] of Object.entries(obj)){
		console.log('let of',key,value)
	}
	Object.getOwnPropertySymbols(obj).forEach(function(key){
		console.log(obj[key]) //只拿到Symbol属性
	})
	Reflect.ownKeys(obj).forEach(function(key){
		console.log('ownKeys',key,obj[key])
	})
}