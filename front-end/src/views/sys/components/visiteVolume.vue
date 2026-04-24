<template>
    <div class="report-container">
        <!-- 统计概览 -->
        
        <!-- 最近5天数据图表 -->
        <div v-if="data.isAnalysisData && data.dates && data.dates.length > 0" class="chart-container">
            <div style="width:100%;height:240px;" id="visite_volume_con"></div>
        </div>
        
       
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'visiteVolume',
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    watch: {
        data: {
            handler() {
                this.$nextTick(() => {
                    this.initChart();
                });
            },
            deep: true
        }
    },
    methods: {
        formatTime(timeStr) {
            if (!timeStr) return '--';
            const date = new Date(timeStr);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${month}月${day}日 ${hours}:${minutes}`;
        },
        initChart() {
            // 如果是分析数据，渲染柱状图
            if (this.data.isAnalysisData && this.data.dates && this.data.dates.length > 0) {
                this.$nextTick(() => {
                    const chartDom = document.getElementById('visite_volume_con');
                    if (!chartDom) return;
                    
                    const myChart = echarts.init(chartDom);
                    
                    const dates = this.data.dates || [];
                    const counts = this.data.predictions || [];
                    
                    // 计算最大值
                    const maxCount = Math.max(...counts, 1);
                    
                    const option = {
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(10, 14, 39, 0.95)',
                            borderColor: 'rgba(33, 150, 243, 0.3)',
                            borderWidth: 1,
                            textStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            axisPointer: {
                                type: 'line',
                                lineStyle: {
                                    color: 'rgba(33, 150, 243, 0.5)',
                                    type: 'dashed'
                                }
                            },
                            formatter: function(params) {
                                const item = params[0];
                                return item.name + '<br/>' +
                                       '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background:linear-gradient(135deg, #00D9A5, #2196F3);"></span>' +
                                       '生成: ' + item.value + ' 份';
                            }
                        },
                        grid: {
                            top: '15px',
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.15)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 11,
                                fontWeight: 500
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false
                        },
                        yAxis: {
                            type: 'value',
                            name: '份',
                            nameTextStyle: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: 10,
                                padding: [0, 0, 0, -10]
                            },
                            max: Math.ceil(maxCount * 1.2) || 5,
                            min: 0,
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: 10
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.05)',
                                    type: 'dashed'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        series: [
                            {
                                name: '报告数量',
                                type: 'line',
                                data: counts,
                                smooth: 0.4,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    width: 3,
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        { offset: 0, color: '#00D9A5' },
                                        { offset: 1, color: '#2196F3' }
                                    ]),
                                    shadowColor: 'rgba(0, 217, 165, 0.3)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 8
                                },
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        { offset: 0, color: '#00D9A5' },
                                        { offset: 1, color: '#2196F3' }
                                    ]),
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                    shadowColor: 'rgba(0, 217, 165, 0.5)',
                                    shadowBlur: 8
                                },
                                emphasis: {
                                    scale: 1.5,
                                    itemStyle: {
                                        shadowBlur: 15,
                                        shadowColor: 'rgba(0, 217, 165, 0.8)'
                                    }
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: 'rgba(0, 217, 165, 0.35)' },
                                        { offset: 0.5, color: 'rgba(33, 150, 243, 0.15)' },
                                        { offset: 1, color: 'rgba(33, 150, 243, 0.02)' }
                                    ])
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    distance: 8,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    formatter: '{c}份',
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                    textShadowBlur: 4
                                }
                            }
                        ]
                    };
                    
                    myChart.setOption(option);
                    
                    window.addEventListener('resize', function () {
                        myChart.resize();
                    });
                });
            } 
            // 兼容旧数据格式
            else if (this.data.categories && this.data.categories.length > 0) {
                this.$nextTick(() => {
                    const chartDom = document.getElementById('visite_volume_con');
                    if (!chartDom) return;
                    
                    const visiteVolume = echarts.init(chartDom);
                    
                    const categories = this.data.categories || [];
                    const scores = this.data.scores || [];
                    
                    const getColor = (score) => {
                        if (score >= 85) return '#4CAF50';
                        if (score >= 70) return '#2196F3';
                        if (score >= 60) return '#FF9800';
                        return '#F44336';
                    };
                    
                    const chartData = scores.map((score, idx) => ({
                        value: score,
                        name: categories[idx],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: getColor(score) },
                                { offset: 1, color: getColor(score) + '99' }
                            ])
                        }
                    }));
                    
                    const option = {
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            backgroundColor: 'rgba(10, 14, 39, 0.95)',
                            borderColor: 'rgba(0, 217, 165, 0.3)',
                            borderWidth: 1,
                            textStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            formatter: function(params) {
                                const item = params[0];
                                return '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' + item.color + ';"></span>' +
                                       item.name + ': ' + item.value + '分';
                            }
                        },
                        grid: {
                            top: 10,
                            left: '2%',
                            right: '10%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            max: 100,
                            axisLine: { show: false },
                            axisLabel: {
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: 11,
                                formatter: '{c}分'
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.05)',
                                    type: 'dashed'
                                }
                            },
                            axisTick: { show: false }
                        },
                        yAxis: {
                            type: 'category',
                            data: categories,
                            nameTextStyle: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: 10
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 11,
                                fontWeight: 500
                            },
                            axisTick: { show: false }
                        },
                        series: [
                            {
                                name: '分析评分',
                                type: 'bar',
                                data: chartData,
                                barWidth: '50%',
                                label: {
                                    show: true,
                                    position: 'right',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: 11,
                                    formatter: '{c}分'
                                },
                                itemStyle: {
                                    borderRadius: [0, 6, 6, 0],
                                    shadowColor: 'rgba(0, 217, 165, 0.3)',
                                    shadowBlur: 8
                                },
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 15,
                                        shadowColor: 'rgba(0, 217, 165, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

                    visiteVolume.setOption(option);

                    window.addEventListener('resize', function () {
                        visiteVolume.resize();
                    });
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
.report-container {
    width: 100%;
    height: 100%;
    min-height: 200px;
    overflow-y: auto;
}

// 统计概览
.analysis-stats {
    display: flex;
    gap: 12px;
    padding: 8px 4px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 8px;

    .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        background: rgba(0, 0, 0, 0.2);
        padding: 10px 14px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
            background: rgba(0, 0, 0, 0.3);
        }

        &.highlight {
            background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1));
            border: 1px solid rgba(33, 150, 243, 0.3);
        }

        .stat-icon {
            font-size: 26px;
            color: #667eea;
        }

        &.highlight .stat-icon {
            color: #2196F3;
        }

        .stat-info {
            display: flex;
            flex-direction: column;

            .stat-value {
                font-size: 20px;
                font-weight: 700;
                color: #fff;
                line-height: 1.2;
            }

            .stat-label {
                font-size: 10px;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}

// 图表容器
.chart-container {
    margin-bottom: 8px;
    
    .chart-title {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
        margin-bottom: 8px;
        padding-left: 4px;

        i {
            color: #2196F3;
            font-size: 14px;
        }
    }
}

// 报告列表
.report-list {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 8px;
    
    .list-title {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
        margin-bottom: 8px;
        padding-left: 4px;

        i {
            color: #FF9800;
            font-size: 14px;
        }
    }

    .report-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        margin-bottom: 6px;
        transition: all 0.3s;

        &:hover {
            background: rgba(33, 150, 243, 0.1);
            transform: translateX(4px);
        }

        .report-icon {
            width: 32px;
            height: 32px;
            border-radius: 6px;
            background: linear-gradient(135deg, #2196F3, #03A9F4);
            display: flex;
            align-items: center;
            justify-content: center;
            
            i {
                font-size: 18px;
                color: #fff;
            }
        }

        .report-info {
            flex: 1;
            min-width: 0;

            .report-name {
                color: #fff;
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .report-time {
                color: rgba(255, 255, 255, 0.4);
                font-size: 10px;
            }
        }
    }
}

// 空状态
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
    color: rgba(255, 255, 255, 0.4);

    .empty-icon {
        font-size: 48px;
        margin-bottom: 12px;
        color: #2196F3;
        opacity: 0.5;
    }

    p {
        font-size: 13px;
    }
}
</style>
