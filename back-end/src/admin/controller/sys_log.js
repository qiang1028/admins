const Base = require('./base.js');

module.exports = class LogService extends Base {
	/**
	 * 记录日志
	 * @param {Object} logData 日志数据
	 * @param {string} logData.log_type 日志类型
	 * @param {string} logData.content 日志内容
	 * @param {string} logData.source 日志来源
	 * @param {string} logData.ip 客户端IP
	 * @returns {Promise<Object>} 入库结果
	 */
	async indexAction() {
		return this.display();
	}

	async pageDataAction() {
		let param = this.post();
		let data = await this.model("sys_log").pageData(param);
		return this.success(data);
	}

	async getDataAction() {
		let param = this.post();
		let data = await this.model("sys_log").getData(param.id);
		return this.success(data);
	}

	async addDataAction() {
		let param = this.post();
		await this.model("sys_log").addData(param);
		return this.success();
	}

	async updateDataAction() {
		let param = this.post();
		await this.model("sys_log").updateData(param);
		return this.success();
	}

	async delDataAction() {
		let param = this.post();
		await this.model("sys_log").delData(param);
		return this.success();
	}
};