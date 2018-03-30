/*=====================================================================================================
                                             数组扩展
1、新增特性：（1）Array.from（2）Array.of（3）copyWithin（4）find\findIndex
             （5）fill（6）entries\keys\values（7）includes

======================================================================================================*/

//Array.of：将一组数据变量转换成一个数组
{
	let arr = Array.of(3,4,7,9,11)
	console.log('arr=',arr)

	let empty = Array.of()
	console.log('empty',empty) //如果未放任何数据变量，则返回空数组
}

//Array.from：将一些伪数组或集合转换成真正的数组，并且对数组中的每个数进行处理
{
	let arr = document.querySelectorAll('p') //p标签的集合
	let pArr = Array.from(arr)
	pArr.forEach(function(item){
		console.log(item.textContent)
	})
	// 类似map，将数组[1,3,5]中的每个数都乘2
	console.log(Array.from([1,3,5],function(item){
		return item*2
	}))
}

// fill()：覆盖数组的值
{
	console.log('fill-7',[1,'a',undefined].fill(7)) //将数组中的每个元素变为7
	console.log('fill,pos',['a','b','c','d','e'].fill(7,1,3)) //从第一个到第三（不到3）个位置（下标）截止，换成7
	//fill,pos ["a", 7, 7, "d", "e"]
}

//keys()遍历数组的下标，values()遍历数组的值，entries()既能返回下标又能返回对应的值
{
	for(let index of ['1','c','ks'].keys()){
		console.log('keys',index)
	}
	for(let value of ['1','c','ks'].values()){
		console.log('value',value)
	}
	for(let [index,value] of ['1','c','ks'].entries()){
		console.log('key,value',index,value)
	}
}

//copyWithin()：在当前数组内部，将指定数组的成员复制到另一个位置上
{
	console.log([1,2,3,4,5].copyWithin(0,3,4)) 
	//[4, 2, 3, 4, 5]，0：从什么位置替换；2：从什么位置读取；4：从什么位置截止（不包括4）
}

//find()：找出第一个符合条件的内容；findIndex()：找出第一个符合条件的内容的下标
{
	// 只知道第一个符合条件的
	console.log([1,2,3,4,5,6].find(function(item){
		return item>3
	}))
	console.log([1,2,3,4,5,6].findIndex(function(item){
		return item>3
	}))
}

//includes()：判断数组中是否包含某值
{
	console.log('number',[1,2,NaN].includes(1))
	console.log('number',[1,2,NaN].includes(NaN))
}

