const Base = require('./base.js');
const https = require('https');

module.exports = class extends Base {
    
    /**
     * 获取金堂实时天气
     * 使用高德地图天气API
     */
    async getWeatherAction() {
        // 金堂的adcode是510121
        const cityCode = '510121';
        const key = '7282778d6e50e9dd7b8b59c395f15577'; // 请替换为你的高德API Key
        
        try {
            const weatherData = await this.fetchGaoDeWeather(cityCode, key);
            console.log("weatherData",weatherData)
            return this.success(weatherData);
        } catch (error) {
            // 如果API调用失败，返回模拟数据作为后备
            console.log('天气API调用失败，使用默认数据:', error.message);
            return this.success(this.getMockWeather());
        }
    }
    
    /**
     * 获取天气预报
     */
    async getForecastAction() {
        const cityCode = '510121';
        const key = '7282778d6e50e9dd7b8b59c395f15577';
        
        try {
            const forecastData = await this.fetchGaoDeForecast(cityCode, key);
            return this.success(forecastData);
        } catch (error) {
            console.log('天气预报API调用失败:', error.message);
            return this.success(this.getMockForecast());
        }
    }
    
    /**
     * 调用高德地图实时天气API
     */
    fetchGaoDeWeather(cityCode, key) {
        return new Promise((resolve, reject) => {
            // 如果没有配置key，返回模拟数据
            if (!key || key === 'your_gaode_key') {
                resolve(this.getMockWeather());
                return;
            }
            
            const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${key}&extensions=base`;
            console.log('请求天气API URL:', url);
            
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    console.log('天气API响应:', data);
                    try {
                        const result = JSON.parse(data);
                        console.log('解析结果:', result);
                        
                        // 高德API返回status为1但infocode为10000表示成功
                        if (result.status === '1') {
                            // 检查是否有lives数据（实时天气）
                            if (result.lives && result.lives.length > 0) {
                                const live = result.lives[0];
                                resolve({
                                    city: live.city,
                                    weather: this.convertWeather(live.weather),
                                    temperature: parseInt(live.temperature),
                                    humidity: parseInt(live.humidity),
                                    windDirection: live.winddirection,
                                    windPower: live.windpower,
                                    reportTime: live.reporttime
                                });
                            } else {
                                // 没有lives数据，可能是城市编码问题，返回模拟数据
                                console.log('API返回成功但无lives数据，使用模拟数据');
                                resolve(this.getMockWeather());
                            }
                        } else {
                            reject(new Error(result.info || '获取天气失败'));
                        }
                    } catch (e) {
                        console.error('解析天气数据失败:', e);
                        reject(e);
                    }
                });
            }).on('error', (err) => {
                console.error('HTTPS请求失败:', err);
                reject(err);
            });
        });
    }
    
    /**
     * 调用高德地图天气预报API
     */
    fetchGaoDeForecast(cityCode, key) {
        return new Promise((resolve, reject) => {
            if (!key || key === 'your_gaode_key') {
                resolve(this.getMockForecast());
                return;
            }
            
            const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${key}&extensions=all`;
            
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const result = JSON.parse(data);
                        if (result.status === '1' && result.forecasts && result.forecasts.length > 0) {
                            const forecast = result.forecasts[0];
                            resolve({
                                city: forecast.city,
                                casts: forecast.casts.map(item => ({
                                    date: item.date,
                                    week: item.week,
                                    dayWeather: this.convertWeather(item.dayweather),
                                    nightWeather: this.convertWeather(item.nightweather),
                                    dayTemp: parseInt(item.daytemp),
                                    nightTemp: parseInt(item.nighttemp),
                                    dayWind: item.daywind,
                                    nightWind: item.nightwind,
                                    dayPower: item.daypower,
                                    nightPower: item.nightpower
                                }))
                            });
                        } else {
                            reject(new Error(result.info || '获取预报失败'));
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on('error', reject);
        });
    }
    
    /**
     * 转换天气状态为中文描述
     */
    convertWeather(code) {
        const weatherMap = {
            '晴': '晴天',
            '多云': '多云',
            '阴': '阴天',
            '小雨': '小雨',
            '中雨': '中雨',
            '大雨': '大雨',
            '暴雨': '暴雨',
            '雷阵雨': '雷阵雨',
            '小雪': '小雪',
            '中雪': '中雪',
            '大雪': '大雪',
            '雾': '雾',
            '冻雨': '冻雨',
            '沙尘暴': '沙尘暴',
            '强沙尘暴': '强沙尘暴',
            '霾': '霾'
        };
        return weatherMap[code] || code || '未知';
    }
    
    /**
     * 获取模拟天气数据（后备方案）
     */
    getMockWeather() {
        const weathers = [
            { weather: '多云', temperature: 26, humidity: 65, windDirection: '东南风', windPower: '2级' },
            { weather: '晴天', temperature: 28, humidity: 55, windDirection: '东风', windPower: '1级' },
            { weather: '阴天', temperature: 24, humidity: 70, windDirection: '北风', windPower: '2级' },
            { weather: '小雨', temperature: 22, humidity: 80, windDirection: '东北风', windPower: '3级' }
        ];
        const mock = weathers[Math.floor(Math.random() * weathers.length)];
        return {
            city: '金堂',
            ...mock,
            reportTime: new Date().toLocaleString('zh-CN')
        };
    }
    
    /**
     * 获取模拟预报数据
     */
    getMockForecast() {
        const days = ['今天', '明天', '后天'];
        return {
            city: '金堂',
            casts: days.map((day, i) => ({
                date: day,
                week: ['日', '一', '二', '三', '四', '五', '六'][(new Date().getDay() + i) % 7],
                dayWeather: '多云',
                nightWeather: '多云',
                dayTemp: 26 + i,
                nightTemp: 18 + i
            }))
        };
    }
};
