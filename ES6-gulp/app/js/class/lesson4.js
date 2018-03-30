/*=====================================================================================================
                                             字符串扩展

1、unicode表示法：ES5使用charAt和charCodeAt，ES6使用codePointAt
2、遍历接口：ES5使用str[i]，ES6使用(code of str)
3、常用字符串操作：includes（包含），startsWith（以...开头），endsWith（以...结尾），repeat（重复）
4、模板字符串：`i am ${name}, ${info}`
5、新增方法（其中有部分方法是ES7的提案，需要打补丁，安装babel-polyfill）：
   （1）padStart、padEnd

======================================================================================================*/

{
	console.log('a', '\u0061');
	console.log('s', '\u20BB7'); //不能正常显示，因为\u20BB7已经超过了0xFFFF，此时会将前\u20BB作为2个字符，剩余部分作为2个字符

	console.log('s', '\u{20BB7}'); //如此就可将20BB7强制设为整体

}

{
	let s='𠮷';
	console.log('length', s.length); //length = 2，每两个字节为1个长度
	console.log('0', s.charAt(0)); //取第一个字符
	console.log('1', s.charAt(1));//取第二个字符
	console.log('at0', s.charCodeAt(0));//取第一个字符码值
	console.log('at1', s.charCodeAt(1));//取第一个字符码值

	let s1= '𠮷a';
	console.log('length', s1.length);//length = 3

	//s1共有3个长度，𠮷占2个长度，a占1个长度
	console.log('code0', s1.codePointAt(0));
	console.log('code0', s1.codePointAt(0).toString(16));//直接返回'𠮷'的4个字节，即2个长度
	console.log('code0', s1.codePointAt(1));//返回'𠮷'的后2个字节
	console.log('code0', s1.codePointAt(2).toString(16));//返回a的2个字节，即1个长度
}

{
	console.log(String.fromCharCode("0x20bb7")); //ES5
	console.log(String.fromCodePoint("0x20bb7")); //ES6，能处理4个字节的unicode编码
}

{
	let str = '\u{20BB7}abc';
	for( let i=0; i<str.length; i++){
		console.log('es5', str[i]);
	}
	for (let code of str){
		console.log('es6', code);
	}
}

{
	let str = 'string'; 
	console.log('includes', str.includes('r')); //判断字符串是否包含'r'
	console.log('start', str.startsWith('str'));//判断字符串是否以'str'开头
	console.log('end', str.endsWith('ng'));//判断字符串是否以'ng'开头
}

{
	let str = 'abc';
	console.log(str.repeat(2));
}

{
	let name = 'list';
	let info = 'hell world';
	let m =`i am ${name}, ${info}`;
	console.log(m);
}

{
	//ES7的草案，加入babel-polyfill
	//padStart()，第一个参数为字符串长度，若不够长度的部分，以第二个参数的字符串补齐
	console.log('1'.padStart(2, '0')); //从前面补齐
	console.log('1'.padEnd(2, '0')); //从后面补齐
}

//标签模板
{
	let user = {
		name: 'list',
		info: 'hello world'
	};
	abc`i am ${user.name}, ${user.info}`;
	console.log(abc`i am ${user.name}, ${user.info}`);
	function abc(s, v1, v2){
		console.log(s, v1, v2); //s=['i am ', ', ', '']，v1='list'，v2='hello world'
		return s+v1+v2;
	}
}

//raw对所有字符串中的'\'都自动转义为普通字符串
{
	console.log(String.raw`Hi\n${1+2}`); //打印Hi\n3
	console.log(`Hi\n${1+2}`); /*打印Hi
	                                 3*/
}