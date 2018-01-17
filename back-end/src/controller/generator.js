const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async todoAction() {
    let data=await this.model.query("select * from information_schema.columns where table_schema = (select database()) and table_name = 'sys_dict'");
    return this.success(data);
  }

};
