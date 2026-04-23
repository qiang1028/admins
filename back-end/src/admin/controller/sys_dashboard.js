const Base = require('./base.js');

module.exports = class extends Base {
    
    async indexAction() {
        return this.display();
    }
    
    // 获取仪表盘全部数据
    async allDataAction() {
        let data = await this.model("sys_dashboard").getDashboardData();
        return this.success(data);
    }
    
    // 获取统计数据
    async statsAction() {
        let data = await this.model("sys_dashboard").getStats();
        return this.success(data);
    }
    
    // 获取环境数据
    async envDataAction() {
        let data = await this.model("sys_dashboard").getEnvData();
        return this.success(data);
    }
    
    // 获取生长周期数据
    async growthDataAction() {
        let data = await this.model("sys_dashboard").getGrowthData();
        return this.success(data);
    }
    
    // 获取产量预测数据
    async yieldDataAction() {
        let data = await this.model("sys_dashboard").getYieldData();
        return this.success(data);
    }
    
    // 获取农事提醒
    async todoListAction() {
        let data = await this.model("sys_dashboard").getTodoList();
        return this.success(data);
    }
    
    // 获取监测站点
    async monitorStationsAction() {
        let data = await this.model("sys_dashboard").getMonitorStations();
        return this.success(data);
    }
    
    // 获取预警信息
    async warningsAction() {
        let data = await this.model("sys_dashboard").getWarnings();
        return this.success(data);
    }
};
