import $ from 'jquery'
class Base{
	/**
	 * 初始化奖金和玩法及说明
	 */
	initPlayList(){
		this.play_list.set('r2',{
			bonus:6,
			tip:'从01-11中任选2个或多个号码，所选号码与开奖号码任意两个相同，即中奖<em class="red">6</em>元',
			name:'任二'
		})
		.set('r3',{
			bonus:19,
			tip:'从01-11中任选3个或多个号码，所选号码与开奖号码任意三个相同，即中奖<em class="red">19</em>元',
			name:'任三'
		})
		.set('r4',{
			bonus:78,
			tip:'从01-11中任选4个或多个号码，所选号码与开奖号码任意四个相同，即中奖<em class="red">78</em>元',
			name:'任四'
		})
		.set('r5',{
			bonus:540,
			tip:'从01-11中任选5个或多个号码，所选号码与开奖号码任意五个相同，即中奖<em class="red">540</em>元',
			name:'任五'
		})
		.set('r6',{
			bonus:90,
			tip:'从01-11中任选6个或多个号码，所选号码与开奖号码任意六个相同，即中奖<em class="red">90</em>元',
			name:'任六'
		})
		.set('r7',{
			bonus:26,
			tip:'从01-11中任选7个或多个号码，所选号码与开奖号码任意七个相同，即中奖<em class="red">26</em>元',
			name:'任七'
		})
		.set('r8',{
			bonus:9,
			tip:'从01-11中任选8个或多个号码，所选号码与开奖号码任意八个相同，即中奖<em class="red">9</em>元',
			name:'任八'
		})
	}//级联操作

	/**
	 * 初始化号码
	 */
	initNumber(){
		for(let i=1; i<12; i++){
			this.number.add((''+i).padStart(2,'0')) //每个字符串保持2位，若不足，向前补0
		}
	}

	/**
	 * 设置遗漏数据
	 * omit：map对象，存储遗漏数据
	 */
	setOmit(omit){
		let self = this
		self.omit.clear();
		for(let [index, value] of omit.entries()){
			self.omit.set(index, value)
		}
		$(self.omit_el).each(function(index, item){
			$(item).text(self.omit.get(index))
		});
	}

	/**
	 * 设置开奖
	 * code：set对象，开奖号码
	 */
	setOpenCode(code){
		let self = this
		self.open_code.clear()
		for(let item of code.values()){
			self.open_code.add(item)
		}
		self.updateOpenCode&&self.updateOpenCode.call(sef,code)
	}

	/**
	 * 设置号码选中/取消
	 * e：点击的对象
	 */
	toggleCodeActive(e){
		let self = this;
		let $cur = $(e.currentTarget); //获取当前选中的对象的dom结构
		$cur.toggleClass('btn-boll-active');//切换类
		self.getCount(); //获取选中的金额
	}

	/**
	 * 切换玩法
	 * e：点击的对象
	 */
	changePlayNav(e){
		let self = this;
		let $cur = $(e.currentTarget);
		$cur.addClass('active').siblings().removeClass('active'); //将选中的激活active类，其他对象取消
		self.cur_play = $cur.attr('desc').toLocaleLowerCase(); //将desc属性的值转为小写
		$('#zx_sm span').html(self.play_list.get(self.cur_play).tip); //将当前选中的提示信息tip显示
		$('.boll-list .btn-boll').removeClass('btn-boll-active'); //切换玩法后会将上一次选中的号码都清空
		self.getCount();
	}

	/**
	 * 操作区：大、小、奇、偶、清空
	 * e：点击的对象
	 */
	assistHandle(e){
		e.preventDefault(); //不进行e对象的默认事件
		let self= this;
		let $cur = $(e.currentTarget);
		let index = $cur.index();// 返回点击的是第几个按钮
		$('.boll-list .btn-boll').removeClass('btn-boll-active') //先清楚所有被选的状态
		if (index===0) { //全选
			$('.boll-list .btn-boll').addClass('btn-boll-active')
		}
		if (index===1) { //选大
			$('.boll-list .btn-boll').each(function(i,t) {
				if (t.textContent-5>0) {
					$(t).addClass('btn-boll-active')
				}
			});
		}
		if (index===2) { //选小
			$('.boll-list .btn-boll').each(function(i,t) {
				if (t.textContent-6<0) {
					$(t).addClass('btn-boll-active')
				}
			});
		}
		if (index===3) { //选奇
			$('.boll-list .btn-boll').each(function(i,t) {
				if (t.textContent%2===1) {
					$(t).addClass('btn-boll-active')
				}
			});
		}
		if (index===4) { //选偶
			$('.boll-list .btn-boll').each(function(i,t) {
				if (t.textContent%2===0) {
					$(t).addClass('btn-boll-active')
				}
			});
		}
		//清除无需再额外处理，因为第一步就清除了
		self.getCount()
	}

	/**
	 * 获取当前彩票名称
	 */
	getName(){
		return this.name;
	}

	/**
	 * 添加号码
	 */
	addCode(){
		let self = this
		let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g); //将选中的号码2个为一组分割
		let active = $active?$active.length:0; //计算数组的长度
		let count = self.computeCount(active,self.cur_play); //算出注数
		if (count) {
			self.addCodeItem($active.join(' '),self.cur_play,self.play_list.get(self.cur_play).name,count);
		}
	}

	/**
	 * 添加单次号码
	 * code:选的号码
	 * type:玩法
	 * typeName:玩法的中文名称
	 * count:注数
	 */
	addCodeItem(code,type,typeName,count){
		let self = this;
		const tpl=`
		<li codes="${type}|${code}" bonus="${count*2}" count="${count}">
			<div class="code">
				<b>${typeName}${count>1?'复式':'单式'}</b>
				<b class="em">${code}</b>
				[${count}注，<em class="code-list-money">${count*2}</em>元]
			</div>
		</li>
		`;
		$(self.cart_el).append(tpl);
		self.getTotal();
	}

	/**
	 * 计算下注后的结果
	 */
	getCount(){
		let self = this;
		let active = $('.boll-list .btn-boll-active').length;
		let count = self.computeCount(active,self.cur_play);
		let range = self.computeBonus(active,self.cur_play);
		let money = count *2;
		let win1 = range[0]-money;
		let win2 = range[1]-money;
		let tpl;
		let c1 = (win1<0&&win2<0)?Math.abs(win1):win1;
		let c2 = (win1<0&&win2<0)?Math.abs(win2):win2;
		if (count===0) {
			tpl=`您选了<b class="red">${count}</b> 注，共 <b class="red">${count*2}</b> 元`;
		}else if (range[0]===range[1]){
			tpl=`您选了<b>${count}</b> 注，共 <b>${count*2}</b> 元 <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 元，
			您将${win1>=0?'盈利':'亏损'}
			<strong class="${win1>=0?'red':'green'}">${Math.abs(win1)}</strong> 元</em>`
		}else{
			tpl=`您选了<b>${count}</b> 注，共 <b>${count*2}</b> 元 <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong>元，
			您将${(win1<0&&win2<0)?'亏损':'盈利'}
			<strong class="${win1>=0?'red':'green'}">${c1}</strong> 
			至 <strong class="${win2>=0?'red':'green'}">${range[1]-count*2}</strong>元</em>`
		}
		$('.sel_info').html(tpl)
	}

	/**
	 * 计算所有彩票花费
	 */
	getTotal(){
		let count = 0
		$('.codelist li').each(function(index, item) {
			count+=$(item).attr('count')*1
		});
		$('#count').text(count)
		$('#count').text(count*2)
	}

	/**
	 * 随机生成号码
	 */
	getRandom(num){
		let arr =[],index;
		let number = Array.from(this.number) //将set集合转成真正的数组
		while(num--){
			index=Number.parseInt(Math.random()*number.length)
			arr.push(number[index])
			number.splice(index,1)
		}
		return arr.join(' ')
	}

	/**
	 * 添加随机号码
	 */
	getRandomCode(e){
		e.preventDefault()
		let num = e.currentTarget.getAttribute('count')
		let play = this.cur_play.match(/\d+/g)[0]
		let self=this
		if(num==='0'){
			$(self.cart_el).html('')
		}else{
			for (var i = 0; i < num; i++) {
				self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name,1)
			}
		}
	}
}

export default Base