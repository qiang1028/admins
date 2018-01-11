'use strict';

module.exports = class extends think.Service {
	constructor(){
		super();
		this._model=this.model('sys_user');
	}

	async addData(param){
		param.create_date=think.datetime();
		param.del_flag=0;
		param.id=think.uuid('v1');
		param.password=think.md5('111111');
		param.status=1;
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
		delete param.password;
		await this._model.where({id:id}).update(param);
	}

	async changeStatus(param){
		let id=param.id;
		param.update_date=think.datetime();
		await this._model.where({id:id}).update({status:param.status});
	}

	async resetPwd(param){
		let id=param.id;
		param.update_date=think.datetime();
		await this._model.where({id:id}).update({password:think.md5('111111')});
	}


	async pageData(param){
		let sql=this._model.alias('a').join({
	      table: 'sys_role',
	      as: 'b',
	      on: ['role_id', 'id']
	    }).field("a.*,b.name as rolename").where({'a.id': ['!=', 1]}).page(param.current).order("create_date desc");
		if(!think.isEmpty(param.name)){
			sql=sql.where({'a.name':['like', '%'+param.name+'%']});
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

	async findByLoginName(login_name){
		return await this._model.where({login_name: login_name}).find();
	}

	async login(param){
		return await this._model.where({login_name: param.login_name,password:think.md5(param.password)}).find();
	}
};
