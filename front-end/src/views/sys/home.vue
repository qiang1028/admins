

<template>
    <div class="dashboard-container">
        <!-- 动态粒子背景 -->
        <div class="particles-bg">
            <div class="particle large" v-for="i in 10" :key="'large-'+i" :style="getParticleStyle(i, 'large')"></div>
            <div class="particle medium" v-for="i in 15" :key="'medium-'+i" :style="getParticleStyle(i, 'medium')"></div>
            <div class="particle small" v-for="i in 20" :key="'small-'+i" :style="getParticleStyle(i, 'small')"></div>
        </div>

        <!-- 光晕效果 -->
        <div class="glow-effects">
            <div class="glow-orb glow-1"></div>
            <div class="glow-orb glow-2"></div>
            <div class="glow-orb glow-3"></div>
        </div>

        <!-- 顶部导航 -->
        <div class="dashboard-header">
            <div class="header-left">
                <div class="logo">
                    <Icon type="md-leaf" />
                    <span>金堂水稻智慧监测平台</span>
                </div>
            </div>
            <div class="header-center">
                <div class="time-box">
                    <Icon type="ios-time" />
                    <span class="time">{{ currentTime }}</span>
                    <span class="date">{{ currentDate }}</span>
                </div>
            </div>
            <div class="header-right">
                <div class="weather-box">
                    <Icon type="ios-cloudy" />
                    <span>多云 26°C</span>
                </div>
            </div>
        </div>

        <!-- 主内容区 -->
        <div class="dashboard-content">
            <!-- 第一行：统计卡片 -->
            <Row :gutter="16" class="stat-row">
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-1">
                        <div class="stat-icon">
                            <Icon type="leaf" />
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.riceCount || 0 }}</div>
                            <div class="stat-label">水稻记录</div>
                        </div>
                        <div class="stat-trend up">
                            <Icon type="md-arrow-up" />
                        </div>
                    </div>
                </Col>
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-2">
                        <div class="stat-icon">
                            <Icon type="ios-cloud-outline"></Icon>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.modelCount || 0 }}</div>
                            <div class="stat-label">水稻预测模型</div>
                        </div>
                        <div class="stat-trend up">
                            <Icon type="md-arrow-up" />
                        </div>
                    </div>
                </Col>
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-3">
                        <div class="stat-icon">
                            <Icon type="ios-analytics" />
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.totalYield-1 || 0 }}</div>
                            <div class="stat-label">用户总数</div>
                        </div>
                        <div class="stat-trend up">
                            <Icon type="md-arrow-up" />
                        </div>
                    </div>
                </Col>
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-4">
                        <div class="stat-icon">
                            <Icon type="document-text" />
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.reportCount || 0 }}</div>
                            <div class="stat-label">分析报告</div>
                        </div>
                        <div class="stat-trend" :class="warnings.length > 0 ? 'down' : 'up'">
                            <Icon :type="warnings.length > 0 ? 'md-arrow-down' : 'md-checkmark-circle'" />
                        </div>
                    </div>
                </Col>
            </Row>

            <!-- 第二行：主要图表 -->
            <Row :gutter="16" class="main-row">
                <!-- 左侧 - 环境监测 -->
                <Col :xs="24" :sm="24" :md="16">
                    <Row :gutter="16">
                        <!-- 地图 -->
                        <Col :span="24">
                            <div class="card-box map-section">
                                <div class="card-header">
                                    <Icon type="md-map" class="header-icon" />
                                    <span class="header-title">金堂县水稻种植区监测分布</span>
                                    <span class="header-tag">成都平原经济区</span>
                                </div>
                                <div class="card-body map-body">
                                    <home-map :city-data="monitorStations"></home-map>
                                    <div class="map-legend">
                                        <div class="legend-item"><span class="dot green"></span> 正常</div>
                                        <div class="legend-item"><span class="dot yellow"></span> 预警</div>
                                        <div class="legend-item"><span class="dot red"></span> 告警</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row :gutter="16" class="sub-row">
                        <!-- 水稻管理数据 -->
                        <Col :span="12">
                            <div class="card-box">
                                <div class="card-header">
                                    <Icon type="leaf" class="header-icon" />
                                    <span class="header-title">水稻数据</span>
                                </div>
                                <div class="card-body" v-if="yieldData!='{}'">
                                    <service-requests :data="yieldData"></service-requests>
                                </div>
                            </div>
                        </Col>
                        <!-- 分析报告 -->
                        <Col :span="12">
                            <div class="card-box">
                                <div class="card-header">
                                    <Icon type="document-text" class="header-icon" />
                                    <span class="header-title">分析报告</span>
                                </div>
                                <div class="card-body" v-if="growthData!='{}'">
                                    <visite-volume :data="growthData"></visite-volume>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>

                <!-- 右侧 - 环境与指数 -->
                <Col :xs="24" :sm="24" :md="8">
                    <!-- 环境监测 -->
                    <div class="card-box env-section">
                        <div class="card-header">
                            <Icon type="md-cloud" class="header-icon" />
                            <span class="header-title">田间环境监测</span>
                            <span class="live-indicator">
                                <span class="pulse-dot"></span>LIVE
                            </span>
                        </div>
                        <div class="card-body env-grid">
                            <div class="env-item" v-for="(item, idx) in envItems" :key="idx">
                                <div class="env-icon" :style="{ background: item.bg }">
                                    <Icon :type="item.icon" />
                                </div>
                                <div class="env-info">
                                    <span class="env-value">{{ item.value }}</span>
                                    <span class="env-unit">{{ item.unit }}</span>
                                </div>
                                <span class="env-label">{{ item.label }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 用户角色分布 -->
                    <div class="card-box" style="margin-top:20px;">
                        <div class="card-header">
                            <Icon type="person" class="header-icon" />
                            <span class="header-title">角色分布</span>
                        </div>
                        <div class="card-body" >
                            <data-source-pie :data="yieldFactors"></data-source-pie>
                        </div>
                    </div>

                    <!-- 综合指数 -->
                    <!-- <div class="card-box">
                        <div class="card-header">
                            <Icon type="ios-stats" class="header-icon" />
                            <span class="header-title">综合生长指数</span>
                        </div>
                        <div class="card-body">
                            <user-flow :data="growthIndexData"></user-flow>
                        </div>
                    </div> -->
                </Col>
            </Row>

            <!-- 第三行：系统日志 -->
            <Row :gutter="16"  class="todo-row">
                <Col :span="24" >
                    <div class="card-box todo-section">
                        <div class="card-header">
                            <Icon type="md-list-box" class="header-icon" />
                            <span class="header-title">系统日志</span>
                            <span class="todo-count">{{ todoList.length }} 条记录</span>
                        </div>
                        <div class="card-body">
                            <div class="log-list">
                                <div v-for="item in todoList" :key="item.id" class="log-item" :class="'log-' + item.priority">
                                    <div class="log-time">
                                        <Icon type="ios-time-outline" />
                                        <span>{{ formatLogTime(item.createTime) }}</span>
                                    </div>
                                    <div class="log-user">
                                        <Icon type="md-person" />
                                        <span>{{ item.userName }}</span>
                                    </div>
                                    <div class="log-content">
                                        <span class="log-text">{{ item.title }}</span>
                                    </div>
                                    <div class="log-tag">
                                        <Tag :color="getLogTagColor(item.tag)" size="small">{{ item.tag }}</Tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 加载状态 -->
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load" :class="{'ivu-load-loop': true}"></Icon>
            <div>加载中...</div>
        </Spin>
    </div>
</template>

<script>
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import util from '@/libs/util.js';
export default {
    name: 'dashboard',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow
    },
    data () {
        return {
            loading: true,
            currentTime: '',
            currentDate: '',
            dashboardData: {
                stats: {
                    userCount: 0,
                    roleCount: 0,
                    riceArea: 0,
                    yieldPerMu: 0,
                    totalYield: 0
                },
                envData: {},
                growthData: {},
                yieldData: {},
                yieldFactors: [],
                todoList: [],
                monitorStations: [],
                warnings: []
            },
            timer: null
        };
    },
    computed: {
        // 从 dashboardData 中获取监测站点数据
        monitorStations () {
            return this.dashboardData.monitorStations || [];
        },
        // 从 dashboardData 中获取预警数据
        warnings () {
            return this.dashboardData.warnings || [];
        },
        // 从 dashboardData 中获取待办列表
        todoList () {
            return this.dashboardData.todoList || [];
        },
        // 产量预测数据
        yieldData () {
            return this.dashboardData.yieldData || {};
        },
        // 生长周期数据
        growthData () {
            return this.dashboardData.growthData || {};
        },
        // 产量影响因素
        yieldFactors () {
            return this.dashboardData.yieldFactors || [];
        },
        // 生长指数数据（用于仪表盘）
        growthIndexData () {
            const growth = this.dashboardData.growthData || {};
            return {
                healthScore: growth.percent || 48,
                maturityScore: growth.percent || 48
            };
        },
        envItems () {
            const env = this.dashboardData.envData || {};
            return [
                {
                    icon: 'thermometer',
                    label: '环境温度',
                    value: env.temperature || '--',
                    unit: '°C',
                    bg: 'linear-gradient(135deg, #FF9800, #F57C00)'
                },
                {
                    icon: 'waterdrop',
                    label: '空气湿度',
                    value: env.humidity || '--',
                    unit: '%',
                    bg: 'linear-gradient(135deg, #2196F3, #03A9F4)'
                },
                {
                    icon: 'ios-sunny',
                    label: '光照强度',
                    value: env.light || '--',
                    unit: 'lux',
                    bg: 'linear-gradient(135deg, #FFD93D, #FFC107)'
                },
                {
                    icon: 'leaf',
                    label: '土壤湿度',
                    value: env.soilMoisture || '--',
                    unit: '%',
                    bg: 'linear-gradient(135deg, #4CAF50, #388E3C)'
                }
            ];
        }
    },
    mounted () {
        this.updateTime();
        this.loadDashboardData();
        this.loadEnvData();
        // this.timer = setInterval(() => {
        //     this.updateTime();
        //     this.loadEnvData(); // 每3秒刷新环境数据
        // }, 3000);
    },
    beforeDestroy () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        getParticleStyle(index, type) {
            const seed = index * 137.508;
            let size, duration, opacity;

            if (type === 'large') {
                size = 8;
                duration = 20 + (index % 8);
                opacity = 0.4 + (index % 3) * 0.1;
            } else if (type === 'medium') {
                size = 5;
                duration = 15 + (index % 6);
                opacity = 0.3 + (index % 3) * 0.1;
            } else {
                size = 3;
                duration = 12 + (index % 5);
                opacity = 0.2 + (index % 3) * 0.1;
            }

            const left = (seed * 1.618) % 100;
            const top = (seed * 0.618) % 100;
            const delay = (index * 0.8) % 10;

            return {
                width: size + 'px',
                height: size + 'px',
                left: left + '%',
                top: top + '%',
                opacity: opacity,
                animationDuration: duration + 's',
                animationDelay: delay + 's'
            };
        },
        updateTime () {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            this.currentDate = now.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short'
            });
        },
        loadDashboardData () {
            var that = this;
            util.post(this,'admin/sys_dashboard/allData',{},function(res){
                console.log("res",res)
                if (res) {
                    const data = res;
                    // 合并数据到 dashboardData
                    that.dashboardData = {
                        ...that.dashboardData,
                        ...data
                    };
                }
                that.loading = false;
            });
                
           
        },
        loadEnvData () {
            var that = this
            util.post(this,'admin/sys_dashboard/envData',{},function(res){
                if (res) {
                    that.dashboardData.envData = res;
                    console.log("sss",that.dashboardData)
                }
            })
        },
        getTagColor (tag) {
            const colorMap = {
                '紧急': 'red',
                '重要': 'green',
                '常规': 'blue'
            };
            console.log(colorMap[tag])
            return colorMap[tag] || 'default';
        },
        getLogTagColor (tag) {
            const colorMap = {
                '错误': 'red',
                '警告': 'orange',
                '信息': 'blue',
                '成功': 'green'
            };
            return colorMap[tag] || 'default';
        },
        formatLogTime (timeStr) {
            if (!timeStr) return '--';
            const date = new Date(timeStr);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${month}月${day}日 ${hours}:${minutes}`;
        }
    }
};
</script>
<style lang="less">
@import "./home.less";

/* 卡片图标样式 */
.header-icon {
    color: #00D9A5;
    margin-right: 8px;
    font-size: 18px;
}

/* 环境监测样式 */
.env-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 8px;

    .env-item {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
        border: 1px solid transparent;

        &:hover {
            background: rgba(0, 217, 165, 0.1);
            border-color: rgba(0, 217, 165, 0.3);
            transform: translateY(-2px);
        }

        .env-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            color: #fff;
        }

        .env-info {
            text-align: center;

            .env-value {
                font-size: 22px;
                font-weight: 700;
                color: #fff;
            }

            .env-unit {
                font-size: 12px;
                color: #A0A0A0;
                margin-left: 2px;
            }
        }

        .env-label {
            font-size: 11px;
            color: #A0A0A0;
        }
    }
}

/* 系统日志样式 */
.log-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .log-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        border-left: 3px solid #00D9A5;
        transition: all 0.3s;

        &:hover {
            background: rgba(0, 217, 165, 0.08);
            transform: translateX(4px);
        }

        &.log-urgent {
            border-left-color: #F44336;
        }

        &.log-high {
            border-left-color: #FF9800;
        }

        .log-time {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
            min-width: 100px;

            i {
                font-size: 14px;
                color: #00D9A5;
            }
        }

        .log-user {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            min-width: 80px;

            i {
                font-size: 14px;
                color: #667eea;
            }
        }

        .log-content {
            flex: 1;
            min-width: 0;

            .log-text {
                color: #E8E8E8;
                font-size: 13px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
            }
        }

        .log-tag {
            flex-shrink: 0;
        }
    }
}

/* 保留原农事提醒样式（兼容） */
.todo-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 12px;

    .todo-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        border-left: 3px solid #00D9A5;
        transition: all 0.3s;

        &:hover {
            background: rgba(0, 217, 165, 0.08);
            transform: translateX(4px);
        }

        &.priority-urgent {
            border-left-color: #F44336;
            .status-dot { background: #F44336; }
        }

        &.priority-high {
            border-left-color: #FF9800;
            .status-dot { background: #FF9800; }
        }

        .todo-status {
            .completed {
                font-size: 20px;
                color: #4CAF50;
            }

            .status-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #00D9A5;
                display: block;
                animation: statusPulse 2s ease-in-out infinite;
            }
        }

        .todo-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;

            .todo-text {
                color: #E8E8E8;
                font-size: 13px;
            }
        }
    }
}

.todo-count {
    margin-left: auto;
    background: rgba(0, 217, 165, 0.15);
    color: #00D9A5;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 11px;
}

@keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
}

/* 地图区域 */
.map-section {
    .map-body {
        padding: 0;
        height: 320px;
        position: relative;
    }

    .map-legend {
        position: absolute;
        bottom: 12px;
        left: 12px;
        background: rgba(10, 14, 39, 0.9);
        padding: 10px 14px;
        border-radius: 8px;
        display: flex;
        gap: 16px;
        z-index: 10;

        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            color: #A0A0A0;

            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;

                &.green { background: #00D9A5; }
                &.yellow { background: #FF9800; }
                &.red { background: #F44336; }
            }
        }
    }
}

/* 实时指示器 */
.live-indicator {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(244, 67, 54, 0.15);
    color: #F44336;
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 600;

    .pulse-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #F44336;
        animation: livePulse 1s ease-in-out infinite;
    }
}

@keyframes livePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

/* 加载动画 */
.demo-spin-icon-load {
    animation: demo-spin 1s linear infinite;
}

@keyframes demo-spin {
    from { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    to { transform: rotate(360deg); }
}
</style>
