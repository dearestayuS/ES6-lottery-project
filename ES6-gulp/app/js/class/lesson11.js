/*==========================================================================================
                                             Proxy和Reflect
1、Proxy：代理，连接了用户和最真实对象的中间层
2、Reflect：反射Obj

===========================================================================================*/ 

//Proxy
{	
	//供应商，原始对象
	let obj = {
		time:'2017-03-26',
		name:'net',
		_r:123
	}
	// 代理商，映射obj，对读写进行干涉，最终用户访问的是monitor
	let monitor = new Proxy(obj,{ //写方法
		// 拦截对象属性的读取
		get(target,key){
			return target[key].replace('2017','2018')
		},
		// 拦截对象设置属性
		set(target,key,val){
			if (key === 'name') {
				return target[key] =val
			}else{
				return target[key]
			}
		}, //只允许修改name
		//拦截key in obj操作
		has(target,key){
			if (key === 'name') {
				return target[key]
			}else{
				return false
			}
		},
		// 拦截删除
		deleteProperty(target,key){
			if (key.indexOf('_')>-1) { //如果属性是'_'开头，允许删除
				delete target[key]
				return true
			}else{
				return target[key]
			}
		},
		// 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNmaes
		ownKeys(target){
			return Object.keys(target).filter(item=>item!='time')
		}
	})

	console.log(monitor.time)  //2018-03-26
	monitor.time = '2016'
	console.log(monitor.time)  //2018-03-26，值没有改变，因为规定是name时，才改变
	monitor.name = 'chensisi'
	console.log(monitor.name)  //chensisi

	console.log('has','name' in monitor,'time' in monitor)

	delete monitor.time;
	console.log('delete',monitor)

	delete monitor._r;
	console.log('delete',monitor)

	console.log('ownKeys',Object.keys(monitor))
}

//Reflect，Proxy有的方法，Reflect都有
{
	let obj = {
		time:'2017-10-19',
		name:'net',
		_r:123
	}

	console.log('Reflect',Reflect.get(obj,'time'))
	Reflect.set(obj,'name','hhh')
	console.log('Reflect-set',obj)
	console.log('Reflect-has',Reflect.has(obj,'name'))
}

// 适用场景：验证字段的合法性
{
	function validator(target,validator){
		return new Proxy(target,{
			_validator:validator,
			set(target,key,value,proxy){
				if (target.hasOwnProperty(key)) { //当前对象是否有该key值
					let va = this._validator[key]
					if (!!va(value)) {
						return Reflect.set(target,key,value,proxy)
					}else{
						throw Error (`不能设置${key}为${value}`)
					}
				}else{
					throw Error(`${key} 不存在`)
				}
			}
		})
	}

	const personValidators = {
		name(val){
			return typeof val === 'string'
		},
		age(val){
			return typeof val === 'number' && val>18
		}
	}

	class Person{
		constructor(name,age){
			this.name = name
			this.age = age
			return validator(this,personValidators)
		}
	}

	const person = new Person('chensisi',25) //实例化时，输入的值不做判断

	console.log(person)

	// person.name =58
	// console.log(person)
	person.name = 'haha'
	console.log(person)
}