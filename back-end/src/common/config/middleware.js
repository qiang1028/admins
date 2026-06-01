const path = require('path');
const isDev = think.env === 'development';
const kcors = require('kcors');

module.exports = [
  {
    handle: kcors, // 处理跨域
    options: {}
  },
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: true,
      sourceMap: false,
      error(err, ctx) {
        let now = new Date();
        let _id = now.getFullYear() +
          String(now.getMonth() + 1).padStart(2, '0') +
          String(now.getDate()).padStart(2, '0') +
          String(now.getHours()).padStart(2, '0') +
          String(now.getMinutes()).padStart(2, '0') +
          String(now.getSeconds()).padStart(2, '0') +
          Math.random().toString(36).substr(2, 4);
        think.logger.error("异常编号:", _id, " , 异常内容:", err.message || err);
        return ctx.fail(9999, "请求失败！错误ID：" + _id);
      }
    }
  },
  {
    handle: 'payload',
    options: {
      limit: '10mb',  // 设置请求体大小限制为10MB
      encoding: 'utf8',
      jsonLimit: '10mb',
      formLimit: '10mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle: 'paramMid',
    options: {}
  },
  'logic',
  'controller'
];
