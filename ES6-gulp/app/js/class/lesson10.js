/*==========================================================================================
                                             数据结构
1、Set的用法、WeakSet的用法、Map的用法、WeakMap的用法
2、Map与Array的对比、Set与Array的对比

===========================================================================================*/

//Set
//Set集合中的元素不能重复
{
	let list = new Set();
	list.add(5);
	list.add(7);

	console.log('size',list.size); //获取集合长度：2
}

{
	let arr = [1,2,3,4,5];
	let list = new Set(arr);

	console.log('size',list.size); //5
}

{
	let list = new Set();
	list.add(1);
	list.add(2);
	list.add(1);

	console.log('list',list);  //元素不会重复，{1, 2}

	let arr = [1,2,3,4,5,'2',3,4]
	let list2 = new Set(arr)

	console.log('unique',list2) //包括判断数据类型，字符串的2和整型的2不同
}

{
	let arr = ['add','delete','clear','has']//添加、删除、清空、判断有无
	let list = new Set(arr)

	console.log('has',list.has('add')) //判断集合中有无'add'元素
	console.log('del',list.delete('add'),list)
	list.clear()
	console.log('list',list)

}

{   //Set的遍历
	let arr = ['add','delete','clear','has']
	let list = new Set(arr)

	for(let key of list.keys()){
		console.log('keys',key) //['add','delete','clear','has']
	}
	for(let value of list.values()){
		console.log('values',value) //['add','delete','clear','has']
	}
	for(let value of list){
		console.log('values',value) //['add','delete','clear','has']
	}
	for(let [key,value] of list.entries()){
		console.log('entries',key,value) //key和value相同
	}

	list.forEach(function (item) {
		console.log(item)
	})
}

// WeakSet
{
	// WeakSet只支持对象；弱引用：地址引用；没有size属性、clear方法，不能遍历
	let weakList = new WeakSet()

	let arg = {} //只能放对象
	weakList.add(arg)
	console.log('weakList',weakList)
/*
	weakList.add(2)
	console.log('weakList',weakList)*/
}

//Map
//Map和Object相似，但Map的key可以是任意类型的值
{
	let map = new Map()
	let arr = ['123']

	map.set(arr,456) //Set添加元素是用add，map添加元素使用set

	console.log('map',map,map.get(arr))//map.get(arr)：获取该key的值
}

{   //属性有size，方法有get、delete、clear
	let map = new Map([['a','123'],['b','456']])

	console.log('map',map)

	console.log('size',map.size)
	console.log('delete',map.delete('a'),map)
	console.log('clear',map.clear(),map)
}

//WeakMap
{
	// 区别类似Set与WeakSet，WeakMap接收的key只能是对象，没有clear、size，不能遍历
	let weakmap = new WeakMap();

	let o = {}
	weakmap.set(o,123)
	console.log(weakmap.get(o))
}


// Map与Array对比
{
	// 数据结构横向对比：增删改查
	let map = new Map();
	let arr = [];

	//增
	map.set('t',1);
	arr.push({t:1});

	console.info('map-arr',map,arr);

	// 查
	let map_exist = map.has('t')

	let arr_exist = arr.find(item=>item.t)//遍历数组中每一个元素，如果存在key值't'，则返回该值
	console.info(map_exist,arr_exist)

	//改
	map.set('t',2)
	arr.forEach(item=>item.t?item.t=2:'')

	console.info(map,arr)

	//删
	map.delete('t')
	let index = arr.findIndex(item=>item.t)
	arr.splice(index,1) //删除index位置的元素，删除1个

	console.info('map-arr-empty',map,arr)
}

// Set与Array对比
{
	let set = new Set()
	let arr = []

	//增
	set.add({t:1})
	arr.push({t:1})

	console.info('set-arr',set,arr)

	//查
	let set_exist = set.has({t:1}) //false，除非{t:1}地址存在
	let arr_exist = arr.find(item=>item.t)
	console.info(set_exist,arr_exist)

	// 改
	set.forEach(item=>item.t?item.t=2:'')
	arr.forEach(item=>item.t?item.t=2:'')
	console.info(set,arr)

	// 删
	set.forEach(item=>item.t?set.delete(item):'')
	let index = arr.findIndex(item=>item.t)
	arr.splice(index,1)

	console.info(set,arr)
}

// Map与Object对比
// Set与Object对比

{
	let item = {t:1}
	let map = new Map()
	let set = new Set()
	let obj = new Object()

	// 增
	map.set('t',1)
	set.add(item)
	obj['t'] = 1
	console.info('map-set-obj',map,set,obj)

	// 查
	console.info({
		map:map.has('t'),
		set:set.has(item),
		obj:'t' in obj
	})

	//改
	map.set('t',2)
	item.t = 2 //set本身的引用不做变化
	obj['t'] =2
	console.log('map-set-obj-modify',map,set,obj)

	// 删
	map.delete('t')
	set.delete(item)
	delete obj['t']
	console.info('map-set-obj-delete',map,set,obj)
}
// 
// 总结：能使用map，如果对数据要求比较高，要保证每个数据的唯一性，使用set
		// 尽可能不使用arr和obj