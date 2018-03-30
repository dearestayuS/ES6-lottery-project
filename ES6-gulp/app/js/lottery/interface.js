import $ from 'jquery';

class Interface{
	/**
	 * 获取遗漏数据
	 * issue：当前期号
	 */
	getOmit(issue){
		let self = this;
		return new Promise(function (resolve, reject){
			$.ajax({
				url:'/get/omit',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){ //res：服务器端返回的数据
					self.setOmit(res.data); //将服务器的遗漏数据保存到当前对象中
					resolve.call(self, res)
				},
				error:function(XMLHttpRequest, errormessage){
					reject.call(XMLHttpRequest); //如果出错，则阻断当前操作
				}
			})
		})
	}

	/**
	 * 获取开奖号码
	 * issue：期号
	 */
	getOpenCode(issue){
		let self = this;
		return new Promise(function(resolve, reject){
			$.ajax({
				url:'/get/opencode',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					self.setOpenCode(res.data); //将服务器的开奖号码保存到当前对象中
					resolve.call(self,res);
				},
				err:function(err){
					reject.call(err);
				}
			})
		});
	}

	/**
	 * 获取当前状态
	 * issue：期号
	 */
	getState( issue ){
		let self = this;
		return new Promise(function(resolve, reject){
			$.ajax({
				url:'/get/state',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					resolve.call(self,res);
				},
				err:function(err){
					reject.call(err);
				}
			})
		});
	}
}

export default Interface