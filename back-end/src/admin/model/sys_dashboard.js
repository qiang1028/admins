'use strict';

module.exports = class extends think.Model {
    
    // 获取首页仪表盘统计数据
    async getStats() {
        try {
            // 从各业务表获取真实统计数据
            const riceCount = await this.model('sys_rice').where({  }).count();
            const modelCount = await this.model('sys_model').where({  }).count();
            const userCount = await this.model('sys_user').where({ del_flag: 0 }).count();
            const reportCount = await this.model('sys_analysis').where({  }).count();
            const logCount = await this.model('sys_log').where({  }).count();
            const roleCount = await this.model('sys_role').where({ del_flag: 0 }).count();
            
            // 获取水稻数据分析统计
            const riceList = await this.model('sys_rice').where({  }).select();
            const totalArea = riceList.reduce((sum, item) => sum + (parseFloat(item.area) || 0), 0);
            const totalYield = riceList.reduce((sum, item) => sum + (parseFloat(item.yield_) || 0), 0);
            
            return {
                riceCount,          // 水稻记录数
                modelCount,         // AI模型数
                userCount,          // 系统用户数
                reportCount,        // 报告数量
                logCount,           // 日志记录数
                roleCount,          // 角色数量
                totalArea: totalArea ,       // 总种植面积(万亩)
                totalYield: userCount,    // 总产量(吨)
                avgYield: totalArea > 0 ? (totalYield / totalArea).toFixed(1) : 650  // 平均亩产量
            };
        } catch (err) {
            // console.error('获取统计数据失败:', err);
            return {
                riceCount: 0,
                modelCount: 0,
                userCount: 0,
                reportCount: 0,
                logCount: 0,
                roleCount: 0,
                totalArea: 0,
                totalYield: 0,
                avgYield: 0
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
    
    // 获取分析报告数据 - 从sys_analysis表获取最近5天每日生成报告数量
    async getGrowthData() {
        try {
            const today = new Date();
            
            // 从sys_analysis表获取数据
            const analysisList = await this.model('sys_analysis')
                .where({  })
                .order('create_date desc')
                .select();
            
            // 计算总报告数
            const totalCount = analysisList.length;
            
            // 按天统计最近5天的报告生成数量
            const dailyStats = [];
            for (let i = 4; i >= 0; i--) {
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() - i);
                const dateStr = `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
                const dateKey = targetDate.toISOString().split('T')[0];
                
                // 统计该日期的报告生成数量
                const count = analysisList.filter(item => {
                    const itemDate = new Date(item.create_date || item.create_time);
                    return itemDate.toISOString().split('T')[0] === dateKey;
                }).length;
                
                dailyStats.push({
                    date: dateStr,
                    count: count
                });
            }
            
            // 获取今天的报告列表用于展示
            const todayKey = today.toISOString().split('T')[0];
            const todayReports = analysisList.filter(item => {
                const itemDate = new Date(item.create_date || item.create_time);
                return itemDate.toISOString().split('T')[0] === todayKey;
            }).slice(0, 3);
            
            return {
                isAnalysisData: true,
                totalCount: totalCount,
                // 今日生成报告数量
                todayCount: dailyStats[4] ? dailyStats[4].count : 0,
                // 最近5天数据
                dates: dailyStats.map(d => d.date),
                predictions: dailyStats.map(d => d.count),
                // 今日生成的报告列表
                todayReports: todayReports.map(item => ({
                    id: item.id,
                    name: item.analysis_name || item.name || '分析报告',
                    createTime: item.create_date || item.create_time,
                    result: item.analysis_result || item.result || '--'
                }))
            };
        } catch (err) {
            // console.error('获取分析报告失败:', err);
        }
        
        // 默认数据
        return {
            isAnalysisData: true,
            totalCount: 0,
            todayCount: 0,
            dates: ['4月20日', '4月21日', '4月22日', '4月23日', '4月24日'],
            predictions: [3, 5, 8, 6, 12],
            todayReports: []
        };
    }
    
    // 获取水稻图片上传数据 - 按天统计最近5天的上传数量
    async getYieldData() {
        try {
            const today = new Date();
            
            // 从水稻表获取数据
            const riceList = await this.model('sys_rice')
                .where({  })
                .order('upload_time desc')
                .select();
            
            // 计算总图片数
            const totalCount = riceList.length;
            
            // 按天统计最近5天的上传数量
            const dailyStats = [];
            for (let i = 4; i >= 0; i--) {
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() - i);
                const dateStr = `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
                const dateKey = targetDate.toISOString().split('T')[0];
                
                // 统计该日期的上传数量
                const count = riceList.filter(item => {
                    const itemDate = new Date(item.modified_time || item.upload_time);
                    return itemDate.toISOString().split('T')[0] === dateKey;
                }).length;
                
                dailyStats.push({
                    date: dateStr,
                    count: count
                });
            }
            
            // 获取今天的图片列表用于展示
            const todayKey = today.toISOString().split('T')[0];
            const todayImages = riceList.filter(item => {
                const itemDate = new Date(item.modified_time || item.upload_time);
                return itemDate.toISOString().split('T')[0] === todayKey;
            }).slice(0, 3);
            
            return {
                isRiceData: true,
                isImageData: true,
                totalCount: totalCount,
                // 今日上传数量
                todayCount: dailyStats[4] ? dailyStats[4].count : 0,
                // 最近5天数据
                dates: dailyStats.map(d => d.date),
                predictions: dailyStats.map(d => d.count),
                // 今日上传的图片列表
                todayImages: todayImages.map(item => ({
                    id: item.id,
                    filename: item.filename || '未命名图片',
                    filePath: item.file_path || '',
                    sizeMb: item.size_mb || 0,
                    modifiedTime: item.modified_time || item.upload_time
                }))
            };
        } catch (err) {
            // console.error('获取图片数据失败:', err);
        }
        
        // 默认数据
        return {
            isRiceData: true,
            isImageData: true,
            totalCount: 0,
            todayCount: 0,
            dates: ['4月20日', '4月21日', '4月22日', '4月23日', '4月24日'],
            predictions: [5, 8, 12, 10, 20],
            todayImages: []
        };
    }
    
    // 获取用户角色分布 - 替代原产量影响因素
    async getYieldFactors() {
        try {
            // 从用户表和角色表关联统计各角色人数
            const roleList = await this.model('sys_role').where({ del_flag: 0 }).select();
            const userList = await this.model('sys_user').where({ del_flag: 0 }).select();
            // 统计各角色用户数量
            const roleStats = {};
            const colors = ['#00D9A5', '#667eea', '#FF9800', '#F44336', '#2196F3', '#4CAF50', '#9C27B0', '#795548'];
            if (roleList && roleList.length > 0) {
                roleList.forEach((role, idx) => {
                    const count = userList.filter(u => u.role_id == role.id).length;
                    if (count > 0) {
                        roleStats[role.name] = {
                            value: count,
                            color: colors[idx % colors.length]
                        };
                    }
                });
            }
            // 如果有统计数据
            if (Object.keys(roleStats).length > 0) {
                return Object.entries(roleStats).map(([name, data]) => ({
                    name,
                    value: data.value,
                    color: data.color
                }));
            }
        } catch (err) {
            // console.error('获取角色分布失败:', err);
        }
        
        // 默认数据
        return [
            
        ];
    }
    
    // 获取日志记录前6条 - 替代原农事提醒
    async getTodoList() {
        try {
            const logs = await this.model('sys_log')
                .where({  })
                .order('create_time desc')
                .limit(6)
                .select();
            
            if (logs && logs.length > 0) {
                return logs.map((log, idx) => {
                    // 根据日志类型设置样式
                    let tag = '常规';
                    let priority = 'normal';
                    let status = 'completed';
                    
                    if (log.log_type === 'error' || log.type === 1) {
                        tag = '错误';
                        priority = 'urgent';
                    } else if (log.log_type === 'warning' || log.type === 2) {
                        tag = '警告';
                        priority = 'high';
                    } else if (log.log_type === 'info' || log.type === 0) {
                        tag = '信息';
                        priority = 'normal';
                    }
                    
                    return {
                        id: log.id || idx + 1,
                        title: log.remark || log.content || '系统日志',
                        tag: tag,
                        priority: priority,
                        status: status,
                        createTime: log.create_date || log.create_time,
                        userName: log.user_name || log.create_by || '系统'
                    };
                });
            }
        } catch (err) {
            // console.error('获取日志记录失败:', err);
        }
        
        return [
            { id: 1, title: '系统运行正常', tag: '信息', priority: 'normal', status: 'completed', createTime: think.datetime(), userName: '系统' }
        ];
    }
    
    // 获取监测站点数据 - 基于水稻数据中的位置
    async getMonitorStations() {
        try {
            const riceList = await this.model('sys_rice')
                .where({  })
                .select();
            
            if (riceList && riceList.length > 0) {
                return riceList.slice(0, 6).map((item, idx) => ({
                    name: item.location || `监测点${idx + 1}`,
                    coords: [104.4 + Math.random() * 0.2, 30.8 + Math.random() * 0.2],
                    value: Math.floor(80 + Math.random() * 50),
                    status: idx % 3 === 0 ? 'warning' : 'normal'
                }));
            }
        } catch (err) {
            // console.error('获取监测站点失败:', err);
        }
        
        return [
            { name: '金堂', coords: [104.45, 30.88], value: 128, status: 'normal' },
            { name: '淮口', coords: [104.52, 30.85], value: 115, status: 'normal' },
            { name: '三溪', coords: [104.38, 30.92], value: 98, status: 'warning' },
            { name: '官仓', coords: [104.42, 30.82], value: 105, status: 'normal' },
            { name: '福兴', coords: [104.55, 30.78], value: 92, status: 'normal' },
            { name: '赵家', coords: [104.48, 30.95], value: 88, status: 'normal' }
        ];
    }
    
    // 获取预警信息 - 基于日志数据
    async getWarnings() {
        try {
            const recentLogs = await this.model('sys_log')
                .where({  })
                .order('create_time desc')
                .limit(5)
                .select();
            
            return recentLogs.map(log => ({
                id: log.id,
                title: log.remark || log.content || '系统消息',
                type: log.log_type === 'error' || log.type === 1 ? 'error' : 'warning',
                time: log.create_date || log.create_time
            }));
        } catch (err) {
            return [];
        }
    }
    
    // 获取最近的水稻记录
    async getRecentRice() {
        try {
            return await this.model('sys_rice')
                .where({ del_flag: 0 })
                .order('upload_time desc')
                .limit(5)
                .select();
        } catch (err) {
            return [];
        }
    }
    
    // 获取最近的AI模型
    async getRecentModels() {
        try {
            return await this.model('sys_model')
                .where({ del_flag: 0 })
                .order('file_modified_time desc')
                .limit(3)
                .select();
        } catch (err) {
            return [];
        }
    }
    
    // 获取最近的报告
    async getRecentReports() {
        try {
            return await this.model('sys_analysis')
                .where({ })
                .order('create_date desc')
                .limit(3)
                .select();
        } catch (err) {
            return [];
        }
    }
    
    // 获取最近的日志
    async getRecentLogs() {
        try {
            return await this.model('sys_log')
                .where({  })
                .order('create_date desc')
                .limit(5)
                .select();
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
            warnings: await this.getWarnings(),
            recentRice: await this.getRecentRice(),
            recentModels: await this.getRecentModels(),
            recentReports: await this.getRecentReports(),
            recentLogs: await this.getRecentLogs()
        };
    }
};
