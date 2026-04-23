const Base = require('./index.js');

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
	get tableName() {
		return 'rice';
	}
	async pageData(param) {
		let sql = this.alias('a').page(param.current || 1).order("upload_time desc");
		if (!think.isEmpty(param.name)) {
			sql = sql.where({ 'a.model_name': ['like', '%' + param.name + '%'] });
		}
		let data = await sql.countSelect();
		return data;
	}
	async getData(id) {
		return await this.where({ id: id }).find();
	}
};