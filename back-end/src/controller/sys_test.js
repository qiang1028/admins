const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async allDataAction() {
    let data=await this.service('sys_test').allData()
    return this.success(data);
  }

  async pageDataAction() {
    let param=this.post();
    let data=await this.service('sys_test').pageData(param);
    return this.success(data);
  }

  async addDataAction() {
    let param=this.post();
    await this.service('sys_test').addData(param);
    return this.success();
  }

  async updateDataAction() {
    let param=this.post();
    await this.service('sys_test').updateData(param);
    return this.success();
  }

  async delDataAction() {
    let param=this.post();
    await this.service('sys_test').delData(param);
    return this.success();
  }
};