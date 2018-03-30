/*=====================================================================================================
                                             函数扩展
1、新增特性：（1）参数默认值（2）rest参数（3）扩展运算符（4）箭头函数
             （5）this绑定（6）尾调用

======================================================================================================*/

//参数默认值，默认值的后面不能再有没有默认值的变量，比如(x,y = 'world',c)
{
	function test(x,y = 'world'){ //y的默认值为'world'，若函数在调用时没有为y赋值，y则默认为'world'
		console.log('默认',x,y)
	}
	test('hello');
	test('hello','haha');
}

{
	let x = 'test'
	function test2(x,y=x){
		console.log('作用域',x,y)
	}
	test2('kill');//打印(kill, kill)，此时的x在是块级作用域中的x，与x = 'test'不同
	function test3(c,y=x){
		console.log('作用域',c,y)
	}
	test3('kill');//打印(kill, test)，此时只有一个x = 'test'的x赋值给y
}

//rest参数，将输入的所有参数转换为一个数组，rest参数后不能再有其他参数
{
	function test(...arg){//...arg为rest参数
		for(let v of arg){
			console.log('rest',v)
		}
	}
	test('1',2,3,4,'a ')
}

//扩展运算符，将数组拆成离散的值
{
	console.log(...[1,2,4])
	console.log('a',...[1,2,4])
}

//箭头函数
{
	// 箭头函数的this指向是在定义的时候而不是调用的时候
	let arrow = v => v*2 //函数名，函数参数，函数返回值
	let arrow2 = () => 2 //函数名，函数参数，函数返回值
	console.log('arrow',arrow(3))
	console.log('arrow2',arrow2())
	//注意：做箭头函数时注意this绑定
}

// 提升性能，尾调用
{
	function tail(x){
		console.log('tail',x)
	}
	function fx(x){
		return tail(x) //函数最后返回的是一个函数
	}
	fx(123)
}
