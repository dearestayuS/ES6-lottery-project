/*=====================================================================================================
                                             正则扩展

1、构造函数的变化：ES6中允许new RegExp(/pattern/modifiers, 'modifiers')，后面的modifiers会覆盖前面的
2、正则方法的扩展
3、u修饰符：（1）如果处理的字符串和正则表达式中有大于2个字符的，要/u
			（2）'.'只能匹配除换行符、回车符、行分隔符、段分隔符以外的，字符串长度小于2个字符的任意字符
4、y修饰符：与g相似，为全局匹配；
            但g修饰符的下一次匹配，可以在前一次匹配的字符以后的任何一个字符开始；
            而y修饰符的下一次匹配只能从上一次匹配后的第一个字符开始匹配
5、s修饰符：匹配换行符、回车符、行分隔符、段分隔符（新的提案）
======================================================================================================*/
{
	let regex = new RegExp('xyz', 'i'); //ES5检测字符串'xyz'，并且不区分大小写，如果是'g'，则是全局
	let regex2 = new RegExp(/xyz/i);

	console.log(regex.flags, regex2.test('xyz123'));

	let regex3 = new RegExp(/xyz/ig,'i'); //ES6中允许该写法，后边的'i'会替换前面的'ig'
	console.log(regex3.flags);
}

//y修饰符
{
	let s = '_bbb_bb_b';
	let a1=/b+/g;
	let a2=/b+/y;

	console.log('one',a1.exec(s),a2.exec(s)); //bbb
	console.log('two',a1.exec(s),a2.exec(s)); //null

	console.log(a1.sticky, a2.sticky); //检测是否开始了y修饰符
}

//u修饰符
{
	console.log('u-1',/^\uD83D/.test('\uD83D\uDC2A')); //true，将\uD83D\uDC2A作为2个字符
	console.log('u-2',/^\uD83D/u.test('\uD83D\uDC2A')); //false，将\uD83D\uDC2A作为一个整体

	console.log(/\u{61}/.test('a')); //false
	console.log(/\u{61}/u.test('a')); //true，若用{}包起来的unicode字符，必须跟/u

	console.log(`\u{20BB7}`);

	let s='𠮷';

	console.log('u',/^.$/.test(s));
	console.log('u',/^.$/u.test(s));//如果字符串中有字符是大于2个字节的，用.处理，在要/u
	
	console.log('test',/𠮷{2}/.test('𠮷𠮷'));//如果字符串中有字符是大于2个字节的，要/u
	console.log('test-2',/𠮷{2}/u.test('𠮷𠮷'));
}