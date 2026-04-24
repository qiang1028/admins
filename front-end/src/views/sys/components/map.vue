<template>
    <div style="width:100%;height:100%;position:relative;" id="home_page_map">
        <!-- 地图加载中的装饰 -->
        <div class="map-loading" v-if="loading">
            <div class="loading-spinner"></div>
            <span>地图加载中...</span>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import geoData from '../map-data/get-geography-value.js';
export default {
    name: 'homeMap',
    props: {
        cityData: Array
    },
    data() {
        return {
            loading: true,
            mapChart: null
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initMap();
        });
    },
    watch: {
        cityData: {
            handler() {
                this.initMap();
            },
            deep: true
        }
    },
    beforeDestroy() {
        if (this.mapChart) {
            window.removeEventListener('resize', this.handleResize);
        }
    },
    methods: {
        initMap() {
            const mapDom = document.getElementById('home_page_map');
            if (!mapDom) return;
            
            this.loading = false;
            
            var convertData = function (data) {
                let res = [];
                if (!data) return res;
                let len = data.length;
                for (var i = 0; i < len; i++) {
                    var geoCoord = geoData[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            this.mapChart = echarts.init(mapDom);
            
            // 异步加载地图数据
            try {
                const chinaJson = require('../map-data/china.json');
                echarts.registerMap('china', chinaJson);
                
                // 默认监测站点数据
                const defaultData = [
                    { name: '成都', value: 85 },
                    { name: '德阳', value: 72 },
                    { name: '绵阳', value: 68 },
                    { name: '宜宾', value: 78 },
                    { name: '南充', value: 65 },
                    { name: '达州', value: 58 },
                    { name: '泸州', value: 82 },
                    { name: '广安', value: 70 }
                ];
                
                const chartData = this.cityData && this.cityData.length > 0 ? this.cityData : defaultData;

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
                        formatter: function(params) {
                            if (params.data && params.data.value) {
                                return params.name + '<br/>监测指数: ' + params.data.value;
                            }
                            return params.name;
                        }
                    },
                    geo: {
                        map: 'china',
                        roam: true,
                        scaleLimit: {
                            min: 0.8,
                            max: 3
                        },
                        zoom: 1.2,
                        center: [105, 36],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true,
                                color: '#fff',
                                fontSize: 11
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: {
                                    type: 'linear',
                                    x: 0, y: 0, x2: 0, y2: 1,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(0, 217, 165, 0.15)' },
                                        { offset: 1, color: 'rgba(0, 184, 148, 0.08)' }
                                    ]
                                },
                                borderColor: 'rgba(0, 217, 165, 0.3)',
                                borderWidth: 1,
                                shadowColor: 'rgba(0, 217, 165, 0.2)',
                                shadowBlur: 20
                            },
                            emphasis: {
                                areaColor: {
                                    type: 'linear',
                                    x: 0, y: 0, x2: 0, y2: 1,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(0, 217, 165, 0.3)' },
                                        { offset: 1, color: 'rgba(0, 184, 148, 0.15)' }
                                    ]
                                },
                                borderColor: 'rgba(0, 217, 165, 0.6)',
                                borderWidth: 2
                            }
                        }
                    },
                    series: [
                        // 监测站点散点
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(chartData.filter(d => d.value > 75)),
                            symbolSize: function (val) {
                                return Math.max(val[2] / 8, 8);
                            },
                            showEffectOn: 'emphasis',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 3,
                                period: 4
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    color: '#fff',
                                    fontSize: 12,
                                    backgroundColor: 'rgba(0, 217, 165, 0.8)',
                                    padding: [4, 8],
                                    borderRadius: 4
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                                        { offset: 0, color: '#00D9A5' },
                                        { offset: 1, color: '#4CAF50' }
                                    ]),
                                    shadowColor: 'rgba(0, 217, 165, 0.5)',
                                    shadowBlur: 15
                                }
                            }
                        },
                        // 普通站点
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(chartData.filter(d => d.value <= 75)),
                            symbolSize: function (val) {
                                return Math.max(val[2] / 10, 6);
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    color: '#fff',
                                    fontSize: 12,
                                    backgroundColor: 'rgba(255, 152, 0, 0.8)',
                                    padding: [4, 8],
                                    borderRadius: 4
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                                        { offset: 0, color: '#FF9800' },
                                        { offset: 1, color: '#F57C00' }
                                    ]),
                                    shadowColor: 'rgba(255, 152, 0, 0.4)',
                                    shadowBlur: 10
                                }
                            }
                        }
                    ]
                };

                this.mapChart.setOption(option);
                
                this.handleResize = () => {
                    this.mapChart.resize();
                };
                window.addEventListener('resize', this.handleResize);
                
            } catch (e) {
                console.log('地图数据加载失败:', e);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.map-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;

    .loading-spinner {
        width: 30px;
        height: 30px;
        border: 3px solid rgba(0, 217, 165, 0.2);
        border-top-color: #00D9A5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
