/*=====================================================================================================
                                             对象扩展
1、新增特性：（1）简洁表示法（2）属性表达式（3）扩展运算符（4）Object新增方法

======================================================================================================*/

// 简洁表示法
{
	let o = 1,k = 2;
	let es5 = { //在ES5中声明对象
		o:o,
		k:k
	};
	let es6 = { //在ES6中声明对象
		o,
		k
	}
	console.log(es5,es6)

	let es5_method = { //ES5中声明对象中存在方法
		hello:function () {
			console.log('hello')
		}
	}
	let es6_method = { //ES6中声明方法
		hello() {
			console.log('hello')
		}
	}
	console.log(es5_method.hello(),es6_method.hello())
}

// 属性表达式
{
	let a = 'b';
	let es5_obj = {
		a:'c' //key值为'a'
	};
	let es6_obj = {
		[a]:'c' //key值为'b'，[a]是变量
	};
	console.log(es5_obj,es6_obj);
}

// 新增API
{
	// is，判断两个值是否相等
	console.log('str',Object.is('abc','abc'),'abc'==='abc')
	console.log('arr',Object.is([],[]),[]===[]) //arr false false 存储地址不同
	//assign，拷贝
	console.log('copy',Object.assign({a:'a'},{b:'b'})) //浅拷贝，只会将对象的地址引用拷贝过去，不会拷贝继承的属性
	//entries，将key和value都能拿到
	let test = {k:123,o:456}
	for(let [key,value] of Object.entries(test)){
		console.log([key,value])
	}
}

// 扩展运算符
{
	// let {a,b,c,...d} = {a:'test',b:'kill',c:'ddd',d:'ccc'}; //目前编译暂时不会通过
}
