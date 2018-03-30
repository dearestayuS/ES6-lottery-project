/*==========================================================================================
                                             类和对象
1、基本语法、类的继承、静态方法、静态属性、getter、setter

===========================================================================================*/

//基本定义和生成实例
{
	class Parent{
		constructor(name='defaultName'){ //constructor，构造函数
			this.name = name

		}
	}
	let v_parent = new Parent('chensisi')
	console.log('构造函数和实例',v_parent)
}

//继承
{   
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
	}

	class Child extends Parent{ //子类继承父类
		
	}

	console.log('继承',new Child())
}

// 继承传递参数
{
	class Parent{
		constructor(name='parentName'){
			this.name = name

		}
	}
	// 子类向父类传递参数
	class Child extends Parent{
		constructor(name = 'childName'){
			// 使用super一定放在第一行
			super(name) //将子类的name传到父类的name中
			this.type = 'child'//子类的构造参数要放在super之后
		}
	}

	console.log('继承',new Child(/*'hhh'*/))
}

// getter setter
{
	class Parent{
		constructor(name='parentName'){
			this.name = name
		}

		get longName(){ //增加一个longName属性
			return 'abc'+this.name
		}

		set longName(value){
			this.name = value
		}
	}

	let v = new Parent()
	console.log('getter',v.longName)
	v.longName = 'hhh'
	console.log('setter', v.longName)
}

// 静态方法：通过类调用，而不是类的实例去调用
{
	class Parent{
		constructor(name='parentName'){
			this.name = name

		}

		static tell(){ //增加一个方法
			console.log('tell')
		}
	}

	Parent.tell()
}

// 静态属性
{
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
		static tell(){
			console.log('tell')
		}

	}
	Parent.type = 'test'

	console.log('静态属性',Parent.type)
}