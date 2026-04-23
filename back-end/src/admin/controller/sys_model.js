const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		return this.display();
	}

	async pageDataAction() {
		let param = this.post();
		let data = await this.model("sys_model").pageData(param);
		return this.success(data);
	}

	async getDataAction() {
		let param = this.post();
		let data = await this.model("sys_model").getData(param.id);
		return this.success(data);
	}

	async addDataAction() {
		let param = this.post();
		await this.model("sys_model").addData(param);
		return this.success();
	}

	async updateDataAction() {
		let param = this.post();
		await this.model("sys_model").updateData(param);
		return this.success();
	}

	async delDataAction() {
		let param = this.post();
		await this.model("sys_model").delData(param);
		return this.success();
	}
};
