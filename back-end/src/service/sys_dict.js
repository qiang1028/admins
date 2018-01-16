'use strict';

module.exports = class extends think.Service {
	constructor(){
		super();
		this._model=this.model('sys_dict');
	}
	async addData(param){
		param.create_date=think.datetime();
		param.del_flag=0;
		param.id=think.uuid('v1');
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
		let sql=this._model.page(param.current).order("create_date desc");
		if(!think.isEmpty(param.type)){
			sql=sql.where({type:['like', '%'+param.type+'%']});
		}
		let data = await sql.countSelect();
		return data;
	}

	async allData(param){
		let data=await this._model.where({del_flag:0}).select();
		return data;
	}

	async getData(id){
		return await this._model.where({id: id}).find();
	}

	async getGroupData(){
		let parent=await this._model.group('type').field('type').select();
		let datas={};
		for (var i = 0; i < parent.length; i++) {		
			let item=parent[i];			
	        let child=await this._model.where({type:item.type,del_flag:0}).order("sort").select();
			parent[i].children = {};			
			let _child={};
			for (var j = 0; j < child.length; j++) {		
				let ch=child[j];
				_child[ch.value]=ch.label;												
		    }
		    datas[item.type]=_child;
	    }
		return datas;
	}
};
