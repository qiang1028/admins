

<template>
    <div class="dashboard-container">
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
                            <Icon type="ios-people" />
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.userCount }}</div>
                            <div class="stat-label">系统用户</div>
                        </div>
                        <div class="stat-trend up">
                            <Icon type="md-arrow-up" />
                        </div>
                    </div>
                </Col>
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-2">
                        <div class="stat-icon">
                            <Icon type="ios-leaf"></Icon>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.riceArea }}</div>
                            <div class="stat-label">种植面积(万亩)</div>
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
                            <div class="stat-value">{{ dashboardData.stats.yieldPerMu }}</div>
                            <div class="stat-label">预估亩产量(kg)</div>
                        </div>
                        <div class="stat-trend up">
                            <Icon type="md-arrow-up" />
                        </div>
                    </div>
                </Col>
                <Col :xs="12" :sm="12" :md="6">
                    <div class="stat-card stat-card-4">
                        <div class="stat-icon">
                            <Icon type="help-circle"></Icon>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">{{ dashboardData.stats.logCount }}</div>
                            <div class="stat-label">日志记录</div>
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
                        <!-- 产量趋势 -->
                        <Col :span="12">
                            <div class="card-box">
                                <div class="card-header">
                                    <Icon type="md-trending-up" class="header-icon" />
                                    <span class="header-title">产量预测趋势</span>
                                </div>
                                <div class="card-body" v-if="yieldData!='{}'">
                                    <service-requests :data="yieldData"></service-requests>
                                </div>
                            </div>
                        </Col>
                        <!-- 生长周期 -->
                        <Col :span="12">
                            <div class="card-box">
                                <div class="card-header">
                                    <Icon type="md-calendar" class="header-icon" />
                                    <span class="header-title">生长周期进度</span>
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
                            <span class="header-title">环境实时监测</span>
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

                    <!-- 产量因素 -->
                    <div class="card-box" style="margin-top:16px;">
                        <div class="card-header">
                            <Icon type="md-pie" class="header-icon" />
                            <span class="header-title">产量影响因素</span>
                        </div>
                        <div class="card-body">
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

            <!-- 第三行：农事提醒 -->
            <Row :gutter="16" class="todo-row">
                <Col :span="24">
                    <div class="card-box todo-section">
                        <div class="card-header">
                            <Icon type="md-notifications" class="header-icon" />
                            <span class="header-title">农事提醒</span>
                            <span class="todo-count">{{ todoList.length }} 条待办</span>
                        </div>
                        <div class="card-body">
                            <div class="todo-list">
                                <div v-for="item in todoList" :key="item.id" class="todo-item" :class="'priority-' + item.priority">
                                    <div class="todo-status">
                                        <Icon v-if="item.status === 'completed'" type="md-checkmark-circle" class="completed" />
                                        <span v-else class="status-dot"></span>
                                    </div>
                                    <div class="todo-content">
                                        <span class="todo-text">{{ item.title }}</span>
                                        <Tag :color="getTagColor(item.tag)" size="small">{{ item.tag }}</Tag>
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
                    icon: 'ios-flame',
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
        this.timer = setInterval(() => {
            this.updateTime();
            this.loadEnvData(); // 每3秒刷新环境数据
        }, 3000);
    },
    beforeDestroy () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
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

/* 农事提醒样式 */
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
