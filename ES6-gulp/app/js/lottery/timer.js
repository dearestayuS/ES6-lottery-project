class Timer{
	/*end：截止时间，单位ms
	  update：更新的回调函数
	  handle：截止后的回调函数*/
	countdown(end, update, handle) {
		const self = this; //获取当前对象的指针
		const now = new Date().getTime(); //当前时间
		if (now - end>0) { //当前时间大于截至时间，倒计时结束
			handle.call(self); //将对象传给handle回调函数，执行倒计时结束后的操作
		}else{
			let last_time = end - now;//计算剩余时间，单位ms
			const px_d = 1000*60*60*24; //将一天转换为ms
			const px_h = 1000*60*60;//将小时转换为ms
			const px_m = 1000*60;//将分钟转换为ms
			const px_s = 1000;//将秒转换为ms

			let d=Math.floor(last_time/px_d);
			let h=Math.floor((last_time-d*px_d)/px_h);
			let m=Math.floor((last_time-d*px_d-h*px_h)/px_m);
			let s=Math.floor((last_time-d*px_d-h*px_h-m*px_m)/px_s);

			let r=[];
			if(d>0){
				r.push(`<em>${d}</em>天`);
			}
			if(r.length||(h>0)){
				r.push(`<em>${h}</em>时`);
			}
			if(r.length||(m>0)){
				r.push(`<em>${m}</em>分`);
			}
			if(r.length||(s>0)){
				r.push(`<em>${s}</em>秒`);
			}
			self.last_time = r.join(''); //更新该对象的属性值last_time
			update.call(self, r.join('')); //更新对象的last_time
			setTimeout(function() {
				self.countdown(end, update, handle);
			}, 1000);//每一秒钟轮询一次
		}
	}
}

export default Timer