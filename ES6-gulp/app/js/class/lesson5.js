/*=====================================================================================================
                                             数值扩展

新增方法：isFinite()、isNaN()、isInteger()、isSafeInteger()、Math.trunc()、Math.sign()、Math.cbrt()

======================================================================================================*/

{
	// 不区分大小写 0b 0o
	console.log(0b111110111); //0b开头，二进制转换为十进制
	console.log(0o767); //0o开头，八进制转换为十进制
}

{
	// Number.isFinite()是否是有尽的
	console.log('15',Number.isFinite(15)) //True
	console.log('NaN',Number.isFinite(NaN)) //False
	console.log('1/0',Number.isFinite(1/0)) //False
	// Number.isNaN()是否为无尽的
	console.log( 'NaN',Number.isNaN(NaN) ) //True
	console.log( '0', Number.isNaN(0) ) //False
}

{
	// Number.isInteger()是否是整数
	console.log('25',Number.isInteger(25)) //True
	console.log('25.0',Number.isInteger(25.0)) //True
	console.log('25.1',Number.isInteger(25.1)) //False
	console.log("'25'",Number.isInteger('25')) //False，'25'是一个字符串
}

{
	// 数值上下限
	console.log(Number.MAX_SAFE_INTEGER) //表示数的最大上限，2的53次方
	console.log(Number.MIN_SAFE_INTEGER) //表示数的最小下限，-2的52次方
	//判断数值是否在有效的区间内，即(MIN_SAFE_INTEGER, MAX_SAFE_INTEGER)内
	console.log('10',Number.isSafeInteger(10)) //True
	console.log('a',Number.isSafeInteger('a')) //False
}

{
	// Math.trunc()，返回小数的整数部分
	console.log(4.1,Math.trunc(4.1))  //4
	console.log(4.9,Math.trunc(4.9)) //4
}

{
	// 判断正、负数或是0，若为负数返回-1，若为0返回0，若为正数返回1，无效为NaN
	console.log('-5',Math.sign(-5))	//-1
	console.log('0',Math.sign(0))	//0
	console.log('5',Math.sign(5))	//1
	console.log("'50'",Math.sign('50'))	//1，可以识别为数字
	console.log('faa',Math.sign('faa'))	//NaN
}

{
	// 立方根
	console.log('-1',Math.cbrt(-1))
	console.log('8',Math.cbrt(8))
}
