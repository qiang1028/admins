<template>
    <div class="chart-container">
        <div style="width:100%;height:250px;" id="data_source_con"></div>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    props: {
        data: {
            type: Array,
            default: () => []
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
    beforeDestroy() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }
    },
    methods: {
        initChart() {
            const chartDom = document.getElementById('data_source_con');
            if (!chartDom) return;
            
            const dataSourcePie = echarts.init(chartDom);
            
            // 使用传入数据或默认数据（用户角色分布）
            const chartData = this.data.length > 0 ? this.data.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: { normal: { color: item.color || '#00D9A5' } }
            })) : [
            ];

            const option = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(10, 14, 39, 0.95)',
                    borderColor: 'rgba(0, 217, 165, 0.3)',
                    borderWidth: 1,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    formatter: '{b}: {c}人 <br/>占比: {d}%'
                },
                legend: {
                    orient: 'vertical',
                    right: '5%',
                    top: 'center',
                    itemGap: 12,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 12
                    },
                    itemWidth: 14,
                    itemHeight: 8,
                    itemStyle: {
                        borderWidth: 0
                    },
                    formatter: function(name) {
                        let total = 0;
                        chartData.forEach(item => {
                            total += item.value;
                        });
                        let item = chartData.find(d => d.name === name);
                        let percent = item ? ((item.value / total) * 100).toFixed(1) : 0;
                        return name + '  ' + item.value + '人';
                    }
                },
                series: [
                    {
                        name: '用户分布',
                        type: 'pie',
                        radius: ['45%', '70%'],
                        center: ['35%', '50%'],
                        avoidLabelOverlap: false,
                        animationType: 'expansion',
                        animationTypeUpdate: 'transition',
                        animation: true,
                        animationDuration: 1500,
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return idx * 150 + 200;
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            scale: true,
                            scaleSize: 10,
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#fff',
                                formatter: '{b}\n{c}人'
                            },
                            itemStyle: {
                                shadowBlur: 20,
                                shadowColor: 'rgba(0, 217, 165, 0.5)'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: chartData,
                        itemStyle: {
                            borderRadius: 6,
                            borderColor: 'rgba(10, 14, 39, 0.8)',
                            borderWidth: 3
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 20
                    }
                ]
            };
            
            dataSourcePie.setOption(option);
            
            // 循环旋转动画
            let rotationAngle = 0;
            this.animationTimer = setInterval(() => {
                rotationAngle = (rotationAngle + 0.3) % 360;
                dataSourcePie.setOption({
                    series: [{
                        center: ['35%', '50%']
                    }]
                });
            }, 50);
            
            // 饼图呼吸高亮动画
            let currentIndex = 0;
            const highlightTimer = setInterval(() => {
                dataSourcePie.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0
                });
                dataSourcePie.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % chartData.length;
            }, 2000);
            
            this.animationTimer = highlightTimer;
            
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        }
    }
};
</script>
