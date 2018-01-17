/**
 * 自动生成代码：service模版
 * 2018年1月17日 
 */
const fs = require('fs');
const common = require('../util/common.js');
const _path='/back-end/src/service';

module.exports =  {
  do(time,param,data) {
  	/*
  	创建目录
  	 */
  	let targetDir=think.config('generator_path')+'/'+time+_path;
  	common.mkdirs(targetDir);
  	let file=targetDir+'/'+param.tablename+'.js';
  	let template=
  		"'use strict';\r\n"+
      "module.exports = class extends think.Service {\r\n"+
      "  constructor(){\r\n"+
      "    super();\r\n"+
      "    this._model=this.model('"+param.tablename+"');\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async addData(param){\r\n"+
      "    param.create_date=think.datetime();\r\n"+
      "    param.del_flag=0;\r\n"+
      "    param.id=think.uuid('v1');\r\n"+
      "    await this._model.add(param);\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async delData(param){\r\n"+
      "    await this._model.where({id:param.id}).delete();\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async delFlagData(param){\r\n"+
      "    let id=param.id;\r\n"+
      "    await this._model.where({id:id}).update({update_date:think.datetime(),del_flag:1});\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async updateData(param){\r\n"+
      "    let id=param.id;\r\n"+
      "    param.update_date=think.datetime();\r\n"+
      "    delete param.id;\r\n"+
      "    delete param.create_date;\r\n"+
      "    await this._model.where({id:id}).update(param);\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async pageData(param){\r\n"+
      "    let sql=this._model.page(param.current).order('create_date desc');\r\n";
      for(let p of param.parameter){
        if(p.is_search==1){
          template+=
          "    if(!think.isEmpty(param."+p.name+")){\r\n"+
          "      sql=sql.where({"+p.name+":['like', '%'+param."+p.name+"+'%']});\r\n"+
          "    }\r\n";
        }
      }
      template+=
      "    let data = await sql.countSelect();\r\n"+
      "    return data;\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async allData(param){\r\n"+
      "    let data=await this._model.where({del_flag:0}).select();\r\n"+
      "    return data;\r\n"+
      "  }\r\n"+
      "\r\n"+
      "  async getData(id){\r\n"+
      "    return await this._model.where({id: id,del_flag:0}).find();\r\n"+
      "  }\r\n"+
      "};";
  	fs.writeFileSync(file,template);
  }
};
