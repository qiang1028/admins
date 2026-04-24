<template>
    <div style="width:100%;height:100%;display:flex;gap:10px;">
        <div style="flex:1;height:100%;" id="user_flow_in"></div>
        <div style="flex:1;height:100%;" id="user_flow_out"></div>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'userFlow',
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
        initChart() {
            const inDom = document.getElementById('user_flow_in');
            const outDom = document.getElementById('user_flow_out');
            if (!inDom || !outDom) return;
            
            const healthScore = this.data.healthScore || 78;
            const maturityScore = this.data.maturityScore || 85;

            const inChart = echarts.init(inDom);
            const outChart = echarts.init(outDom);

            const createOption = (value, label, color1, color2, bgColor) => ({
                backgroundColor: 'transparent',
                series: [
                    {
                        name: label,
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '110%',
                        center: ['50%', '60%'],
                        min: 0,
                        max: 100,
                        splitNumber: 5,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: color1 },
                                { offset: 1, color: color2 }
                            ])
                        },
                        progress: {
                            show: true,
                            width: 12,
                            roundCap: true,
                            itemStyle: {
                                shadowColor: color1,
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                width: 12,
                                color: [[1, bgColor]]
                            },
                            roundCap: true
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, '20%'],
                            fontSize: 12,
                            color: 'rgba(255, 255, 255, 0.6)'
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 28,
                            fontWeight: 'bold',
                            offsetCenter: [0, '-10%'],
                            formatter: '{value}',
                            color: '#fff'
                        },
                        data: [{ value: value, name: label }]
                    },
                    // 外圈装饰
                    {
                        name: '装饰',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '125%',
                        center: ['50%', '60%'],
                        min: 0,
                        max: 100,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: color1 },
                                { offset: 1, color: color2 }
                            ])
                        },
                        progress: {
                            show: true,
                            width: 3,
                            roundCap: true,
                            itemStyle: {
                                opacity: 0.3
                            }
                        },
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                width: 3,
                                color: [[1, 'rgba(255,255,255,0.1)']]
                            },
                            roundCap: true
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        data: [{ value: 0, name: '' }]
                    }
                ]
            });

            inChart.setOption(createOption(healthScore, '健康指数', '#00D9A5', '#4CAF50', 'rgba(0, 217, 165, 0.15)'));
            outChart.setOption(createOption(maturityScore, '成熟指数', '#667eea', '#764ba2', 'rgba(102, 126, 234, 0.15)'));

            // 动态更新数据
            setInterval(() => {
                const newIn = 70 + Math.random() * 20;
                const newOut = 75 + Math.random() * 20;
                inChart.setOption({
                    series: [{
                        data: [{ value: newIn.toFixed(1), name: '健康指数' }]
                    }]
                });
                outChart.setOption({
                    series: [{
                        data: [{ value: newOut.toFixed(1), name: '成熟指数' }]
                    }]
                });
            }, 3000);

            window.addEventListener('resize', function () {
                inChart.resize();
                outChart.resize();
            });
        }
    }
};
</script>
