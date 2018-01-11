'use strict';

module.exports = class extends think.Service {
	constructor(){
		super();
		this._model=this.model('sys_menu');
	}
	async addData(param){
		param.create_date=think.datetime();
		param.is_show=1;
		if(think.isEmpty(param.pid)){
			param.pid=0;
		}
		await this._model.add(param);
	}

	async delData(param){
		await this._model.where({id:param.id}).delete();
	}

	async updateData(param){
		let id=param.id;
		param.update_date=think.datetime();
		delete param.id;
		delete param.create_date;
		await this._model.where({id:id}).update(param);
	}

	async pageData(param){

	}

	async allData(param){
		let menu=[];
		let pMenu=await this._model.where({pid:0,del_flag:0,is_show:1}).order("sort").select();
		for (var i = 0; i < pMenu.length; i++) {		
			let item=pMenu[i];
			let len =menu.push(item);
	        let childMenu=await this._model.where({pid:item.id,del_flag:0,is_show:1}).order("sort").select();
			menu[len - 1].children = childMenu;
	    }
		return menu;
	}

	async getData(id){
		return await this._model.where({id: id}).find();
	}

	async getMyMenuData(user_id,role_id){
		let menu=[];
		if(user_id=='1'&&think.isEmpty(role_id)){
			let pMenu=await this._model.where({pid:0,del_flag:0,is_show:1}).order("sort").select();
			for (var i = 0; i < pMenu.length; i++) {		
				let item=pMenu[i];
				let len =menu.push(item);
		        let childMenu=await this._model.where({pid:item.id,del_flag:0,is_show:1}).order("sort").select();
				menu[len - 1].children = childMenu;
		    }
		}else{
			let rolemenu=await this.model('sys_role_menu').where({role_id:role_id}).select();
			let menuids=[];
			for (var i = 0; i < rolemenu.length; i++) {		
				let item=rolemenu[i];
				menuids.push(item.menu_id);
		    }
			
			let pMenu=await this._model.where({pid:0,del_flag:0,is_show:1,id: ['IN', menuids]}).order("sort").select();
			for (var i = 0; i < pMenu.length; i++) {		
				let item=pMenu[i];
				let len =menu.push(item);
		        let childMenu=await this._model.where({pid:item.id,del_flag:0,is_show:1,id: ['IN',menuids]}).order("sort").select();
				menu[len - 1].children = childMenu;
		    }
		}
		return menu;
		
	}

	async getMenuTree(){
		let menu=[];
		let pMenu=await this._model.where({pid:0,del_flag:0,is_show:1}).order("sort").select();
		for (var i = 0; i < pMenu.length; i++) {		
			let item=pMenu[i];
			let len =menu.push(item);
	        let childMenu=await this._model.where({pid:item.id,del_flag:0,is_show:1}).order("sort").select();
			menu[len - 1].children = childMenu;
	    }
		return menu;		
	}

};
