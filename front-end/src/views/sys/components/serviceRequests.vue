<template>
    <div class="rice-data-container">
        <!-- 统计概览 -->
        
        
        <!-- 最近5天数据图表 -->
        <div v-if="data.isImageData && data.dates && data.dates.length > 0" class="chart-container">
            <div style="width:100%;height:240px;" id="service_request_con"></div>
        </div>
        
        <!-- 今日上传图片列表 -->
        
        
        <!-- 默认空状态 -->
        <div v-else-if="!data.isImageData" style="width:100%;height:100%;" id="service_request_con"></div>
        <div v-else class="empty-state">
            <Icon type="ios-images-outline" class="empty-icon" />
            <p>暂无图片上传</p>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'serviceRequests',
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
        handleImgError(e) {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+5aSP5LqrPC90ZXh0Pjwvc3ZnPg==';
        },
        initChart() {
            // 如果是图片数据，渲染柱状图
            if (this.data.isImageData && this.data.dates && this.data.dates.length > 0) {
                this.$nextTick(() => {
                    const chartDom = document.getElementById('service_request_con');
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
                            borderColor: 'rgba(0, 217, 165, 0.3)',
                            borderWidth: 1,
                            textStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function(params) {
                                const item = params[0];
                                return item.name + '<br/>' +
                                       '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#4CAF50;"></span>' +
                                       '上传: ' + item.value + ' 张';
                            }
                        },
                        grid: {
                            top: '20px',
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
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: 10
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: '张',
                            nameTextStyle: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: 10,
                                padding: [0, 0, 0, -10]
                            },
                            max: Math.ceil(maxCount * 1.2),
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
                                name: '上传数量',
                                type: 'bar',
                                barWidth: '40%',
                                data: counts.map((count, idx) => ({
                                    value: count,
                                    itemStyle: {
                                        color: idx === counts.length - 1 ? 
                                            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: '#4CAF50' },
                                                { offset: 1, color: '#81C784' }
                                            ]) : 
                                            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: '#667eea' },
                                                { offset: 1, color: '#764ba2' }
                                            ])
                                    }
                                })),
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    formatter: '{c}张'
                                },
                                itemStyle: {
                                    borderRadius: [6, 6, 0, 0]
                                },
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(76, 175, 80, 0.5)'
                                    }
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
        }
    }
};
</script>

<style lang="less" scoped>
.rice-data-container {
    width: 100%;
    height: 100%;
    min-height: 200px;
    overflow-y: auto;
}

// 图片统计概览
.image-stats {
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
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
            border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .stat-icon {
            font-size: 26px;
            color: #667eea;
        }

        &.highlight .stat-icon {
            color: #4CAF50;
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
            color: #4CAF50;
            font-size: 14px;
        }
    }
}

// 今日上传列表
.today-list {
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

    .today-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        margin-bottom: 6px;
        transition: all 0.3s;

        &:hover {
            background: rgba(255, 152, 0, 0.1);
            transform: translateX(4px);
        }

        .image-preview {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
            border-radius: 4px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.3);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .image-info {
            flex: 1;
            min-width: 0;

            .image-name {
                color: #fff;
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .image-meta {
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
        color: #4CAF50;
        opacity: 0.5;
    }

    p {
        font-size: 13px;
    }
}
</style>
