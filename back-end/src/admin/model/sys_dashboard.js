'use strict';

module.exports = class extends think.Model {
    
    // 获取首页仪表盘统计数据
    async getStats() {
        try {
            const userCount = await this.model('sys_user').where({ del_flag: 0 }).count();
            const roleCount = await this.model('sys_role').where({ del_flag: 0 }).count();
            const menuCount = await this.model('sys_menu').where({ del_flag: 0 }).count();
            const logCount = await this.model('sys_log').where({ log_type:'error' }).count();
            
            console.log("userCount",userCount)
            // 模拟水稻种植相关数据（实际项目中应从传感器接口获取）
            const riceArea = 42.8;  // 万亩
            const yieldPerMu = 650;  // kg/亩
            
            return {
                userCount,
                roleCount,
                menuCount,
                logCount,
                riceArea,
                yieldPerMu,
                totalYield: (riceArea * 10000 * yieldPerMu / 1000).toFixed(1)  // 总产量(吨)
            };
        } catch (err) {
            console.error('获取统计数据失败:', err);
            return {
                userCount: 0,
                roleCount: 0,
                menuCount: 0,
                logCount: 0,
                riceArea: 0,
                yieldPerMu: 0,
                totalYield: 0
            };
        }
    }
    
    // 获取环境监测数据
    async getEnvData() {
        // 模拟环境数据，实际应从IoT传感器接口获取
        return {
            temperature: +(22 + Math.random() * 8).toFixed(1),
            humidity: Math.floor(65 + Math.random() * 20),
            light: Math.floor(800 + Math.random() * 400),
            soilMoisture: +(55 + Math.random() * 25).toFixed(1),
            soilPH: +(5.8 + Math.random() * 1.5).toFixed(1),
            co2: Math.floor(380 + Math.random() * 60),
            updateTime: think.datetime()
        };
    }
    
    // 获取生长周期数据
    async getGrowthData() {
        return {
            stages: [
                { name: '播种期', days: 15, status: 'completed', progress: 100 },
                { name: '幼苗期', days: 20, status: 'completed', progress: 100 },
                { name: '分蘖期', days: 35, status: 'active', progress: 72 },
                { name: '拔节期', days: 25, status: 'pending', progress: 0 },
                { name: '抽穗期', days: 20, status: 'pending', progress: 0 },
                { name: '灌浆期', days: 25, status: 'pending', progress: 0 },
                { name: '成熟期', days: 15, status: 'pending', progress: 0 }
            ],
            currentStage: '分蘖期',
            totalDays: 155,
            elapsedDays: 75,
            percent: 48
        };
    }
    
    // 获取产量预测数据
    async getYieldData() {
        const dates = [];
        const predictions = [];
        const lastYear = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(`${date.getMonth() + 1}月${date.getDate()}日`);
            predictions.push(+(620 + Math.random() * 50).toFixed(1));
            lastYear.push(+(580 + Math.random() * 40).toFixed(1));
        }
        
        return { dates, predictions, lastYear };
    }
    
    // 获取产量影响因素
    async getYieldFactors() {
        return [
            { name: '水分管理', value: 32, color: '#00D9A5' },
            { name: '肥料施用', value: 28, color: '#4CAF50' },
            { name: '温度条件', value: 18, color: '#FF9800' },
            { name: '光照时长', value: 14, color: '#FFD93D' },
            { name: '土壤pH', value: 8, color: '#9C27B0' }
        ];
    }
    
    // 获取农事提醒
    async getTodoList() {
        try {
            // 从数据库获取农事提醒，实际项目可单独建表
            return [
                { id: 1, title: '检查淮口镇水稻分蘖期水肥管理情况', tag: '重要', priority: 'high', status: 'pending' },
                { id: 2, title: '处理三溪镇监测点土壤湿度偏低问题', tag: '紧急', priority: 'urgent', status: 'pending' },
                { id: 3, title: '更新官仓街道智慧灌溉系统参数', tag: '常规', priority: 'normal', status: 'pending' },
                { id: 4, title: '准备本周水稻抽穗期技术指导材料', tag: '常规', priority: 'normal', status: 'completed' }
            ];
        } catch (err) {
            console.error('获取农事提醒失败:', err);
            return [];
        }
    }
    
    // 获取监测站点数据
    async getMonitorStations() {
        return [
            { name: '金堂', coords: [104.45, 30.88], value: 128, status: 'normal' },
            { name: '淮口', coords: [104.52, 30.85], value: 115, status: 'normal' },
            { name: '三溪', coords: [104.38, 30.92], value: 98, status: 'warning' },
            { name: '官仓', coords: [104.42, 30.82], value: 105, status: 'normal' },
            { name: '福兴', coords: [104.55, 30.78], value: 92, status: 'normal' },
            { name: '赵家', coords: [104.48, 30.95], value: 88, status: 'normal' }
        ];
    }
    
    // 获取预警信息
    async getWarnings() {
        try {
            const recentLogs = await this.model('sys_log')
                .where({ type: ['!=', 0], del_flag: 0 })
                .order('create_date desc')
                .limit(5)
                .select();
            
            return recentLogs.map(log => ({
                id: log.id,
                title: log.remark || '系统消息',
                type: log.type === 1 ? 'error' : 'warning',
                time: log.create_date
            }));
        } catch (err) {
            return [];
        }
    }
    
    // 获取仪表盘全部数据
    async getDashboardData() {
        return {
            stats: await this.getStats(),
            envData: await this.getEnvData(),
            growthData: await this.getGrowthData(),
            yieldData: await this.getYieldData(),
            yieldFactors: await this.getYieldFactors(),
            todoList: await this.getTodoList(),
            monitorStations: await this.getMonitorStations(),
            warnings: await this.getWarnings()
        };
    }
};
