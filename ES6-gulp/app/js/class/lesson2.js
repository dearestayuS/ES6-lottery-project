/*================================================================================
                               解构赋值

1、分类：数组、对象、字符串、布尔值、函数参数、数值解构赋值
2、解构赋值没有在结构上成功配对，则会去找默认值，若没有默认值，则是undefined
3、数组赋值的常用场景：（1）变量交换：例1
                       （2）函数的解构赋值：例2
                       （3）当返回多种值的情况下，可以选择性赋值：例3
                       （4）在不知道函数返回的长度为多少时候，可以取出第一个：例4
4、对象嵌套赋值：例5
==================================================================================*/

//按块作用域运行
/*=========数组类型的解构赋值============*/
{
	let a, b, rest;
	[a, b] = [1, 2]; 
	console.log(a, b);
}

{
	let a, b, rest;
	[a,b,...rest] = [1, 2, 3, 4, 5, 6];
	console.log(a, b, rest);
}

{
	let a, b, c, rest;
	[a, b, c=3] = [1, 2]; //解构赋值没有在结构上成功配对，则会去找默认值，若没有默认值，则是undefined
	console.log(a, b, c);
}

{
	let a=1;
	let b=2;
	[a, b]=[b, a]//例1
	console.log(a, b)
}

{
	function f () {
		return [1, 2];
	}
	let a, b;
	[a, b] = f(); //例2
	console.log(a, b)
}

{
	function f () {
		return [1, 2, 3, 4, 5];
	}
	let a, b, c;
	[a,,,b] = f(); //例3
	console.log(a, b)
}

{
	function f () {
		return [1, 2, 3, 4, 5];
	}
	let a, b, c;
	[a,,...b] = f(); //例4
	console.log(a, b)
}

/*============对象类型的解构赋值============*/
{
	let a, b;
	({a, b}={a:1, b:2})
	console.log(a, b)
}

{
	let o={p:42, q:true};
	let {p, q} = o;
	console.log(p, q);
}

{
	let {a=10, b=5} = {a:3}
	console.log(a, b);
}

{
	let metData={
		title:'abc',
		test:[{
			title:'test',
			desc:'description'
		}]
	}
	let {title:esTitle, test:[{title:cnTitle}]}=metData; //例5：对象嵌套赋值
	console.log(esTitle, cnTitle);
}