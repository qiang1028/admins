'use strict';

module.exports = class extends think.Model {

	get tableName() {
		return 'models';
	}
	async pageData(param) {
		let sql = this.alias('a').page(param.current || 1).order("file_modified_time desc");
		if (!think.isEmpty(param.name)) {
			sql = sql.where({ 'a.model_name': ['like', '%' + param.name + '%'] });
		}
		let data = await sql.countSelect();
		return data;
	}

	async getData(id) {
		return await this.where({ id: id }).find();
	}

	async addData(param) {
		param.create_date = think.datetime();
		param.update_date = think.datetime();
		param.del_flag = 0;
		await this.add(param);
	}

	async updateData(param) {
		let id = param.id;
		param.update_date = think.datetime();
		delete param.id;
		delete param.create_date;
		await this.where({ id: id }).update(param);
	}

	async delData(param) {
		await this.where({ id: param.id }).delete();
	}
};
