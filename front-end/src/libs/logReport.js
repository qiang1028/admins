import axios from 'axios'; // 推荐用 axios，比 fetch 更易调试

// 创建 axios 实例（统一配置）
const logAxios = axios.create({
	baseURL: 'http://localhost:8360', // 替换为你的 ThinkJS 服务地址
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		"x-token": localStorage.getItem('token')
	}
});

// 响应拦截器（统一处理错误）
logAxios.interceptors.response.use(
	(response) => response.data,
	(error) => {
		console.error('日志上报接口请求失败：', error.message);
		// 跨域错误提示
		if (error.message.includes('CORS')) {
			console.error('⚠️ 跨域问题：请在 ThinkJS 后端配置跨域');
		}
		return Promise.reject(error);
	}
);

/**
 * 日志上报核心函数
 * @param {Object} logData 日志数据
 */
export async function reportLog(logData) {
	// 1. 校验必填参数
	if (!logData.content) {
		console.warn('日志内容不能为空，跳过上报');
		return;
	}

	// 2. 构造上报数据
	const data = {
		log_type: logData.log_type || 'info',
		content: logData.content,
		source: logData.source || '水稻预测系统-前端'
	};

	try {
		// 3. 发送请求（async/await 便于调试）
		const res = await logAxios.post('/admin/sys_log/addData', data);
		console.log('日志上报成功：', res);
	} catch (err) {
		// 4. 上报失败时降级（记录到控制台，不影响主流程）
		console.error('日志上报失败，内容：', data, '错误：', err);
		// 可选：把日志临时存在 localStorage，后续重传
		const localLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
		localLogs.push({ ...data, time: new Date().getTime() });
		localStorage.setItem('failedLogs', JSON.stringify(localLogs));
	}
}

// 快捷调用方法
export const log = {
	info: (content, source) => reportLog({ log_type: 'info', content, source }),
	warn: (content, source) => reportLog({ log_type: 'warn', content, source }),
	error: (content, source) => reportLog({ log_type: 'error', content, source }),
	debug: (content, source) => reportLog({ log_type: 'debug', content, source })
};