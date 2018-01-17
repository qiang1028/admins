'use strict';
module.exports = class extends think.Service {
  constructor(){
    super();
    this._model=this.model('sys_test');
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
    let sql=this._model.page(param.current).order('create_date desc');
    if(!think.isEmpty(param.name)){
      sql=sql.where({name:['like', '%'+param.name+'%']});
    }
    if(!think.isEmpty(param.name2)){
      sql=sql.where({name2:['like', '%'+param.name2+'%']});
    }
    if(!think.isEmpty(param.name3)){
      sql=sql.where({name3:['like', '%'+param.name3+'%']});
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
};