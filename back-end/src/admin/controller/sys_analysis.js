const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		return this.display();
	}
	async allDataAction() {
		let data = await this.model("sys_analysis").allData()
		return this.success(data);
	}

	async pageDataAction() {
		let param = this.post();
		let data = await this.model("sys_analysis").pageData(param);
		return this.success(data);
	}
	async addDataAction() {
		let param = this.post();
		param.user_id = this.userInfo().id;
		await this.model("sys_analysis").addData(param);
		return this.success();
	}

	async updateDataAction() {
		let param = this.post();
		await this.model("sys_analysis").updateData(param);
		return this.success();
	}
	async getDataAction() {
		let param = this.post();
		let data = await this.model("sys_analysis").getData(param.id);
		let user = await this.model("sys_user").getData(data.user_id);
		data.author = user.login_name
		return this.success(data);
	}


	async delDataAction() {
		let param = this.post();
		await this.model("sys_analysis").delData(param);
		return this.success();
	}

};
