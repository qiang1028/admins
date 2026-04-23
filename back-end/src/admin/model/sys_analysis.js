'use strict';

module.exports = class extends think.Model {
	async addData(param) {
		param.create_date = think.datetime();
		param.update_date = param.create_date
		console.log(param, "params")

		await this.add(param);
	}


	async delData(param) {
		await this.where({ id: param.id }).delete();
	}

	async updateData(param) {
		let id = param.id;
		param.update_date = think.datetime();
		delete param.id;
		delete param.create_date;
		await this.where({ id: id }).update(param);
	}

	async pageData(param) {
		let sql = this.page(param.current).order("create_date desc");
		if (!think.isEmpty(param.name)) {
			sql = sql.where({ name: ['like', '%' + param.name + '%'] });
		}
		let data = await sql.countSelect();
		return data;
	}

	async myDetail(id) {
		let data = await this.alias('a').join({
			table: 'sys_role',
			as: 'b',
			on: ['role_id', 'id']
		}).field("a.*,b.name as rolename").where({ 'a.id': id }).find();
		delete data.password;
		if (id == '1') {
			data.rolename = '超级管理员';
		}
		return data;
	}

	async allData(param) {
		let data = await this.where({ del_flag: 0 }).select();
		return data;
	}

	async getData(id) {
		return await this.where({ id: id }).find();
	}


};
