
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `value` varchar(100) NOT NULL COMMENT '数据值',
  `label` varchar(100) NOT NULL COMMENT '标签名',
  `type` varchar(100) NOT NULL COMMENT '类型',
  `description` varchar(100) NOT NULL COMMENT '描述',
  `sort` decimal(10,0) NOT NULL COMMENT '排序（升序）',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `sys_dict_value` (`value`),
  KEY `sys_dict_label` (`label`),
  KEY `sys_dict_del_flag` (`del_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('0a22f3278a624882a822e0820f27efcb', '1', '主表', 'table_type', '表类型', '20', '2016-01-05 21:47:14', '2016-01-05 21:53:34', '', '0');
INSERT INTO `sys_dict` VALUES ('1c0ac576c33d41fcb4c16602bf4fad5d', 'post', 'post', 'interface_type', '接口类型', '20', '2015-11-30 15:52:25', '2015-11-30 15:52:39', '', '0');
INSERT INTO `sys_dict` VALUES ('221a918bd1e149239a17ab0fdeaf5ecd', 'get', 'get', 'interface_type', '接口类型', '10', '2015-11-30 15:51:56', '2015-11-30 15:51:56', '', '0');
INSERT INTO `sys_dict` VALUES ('43c9472f411c4d3eafb3bf5319ffe499', '2', '异常报告', 'report_type', '异常的报告', '20', '2015-12-08 17:49:57', '2015-12-08 17:49:57', '', '0');
INSERT INTO `sys_dict` VALUES ('5b899603552c48519e7ba8eb9da0b41f', '0', '单表', 'table_type', '表类型', '10', '2016-01-05 21:46:39', '2016-01-05 21:53:50', '', '0');
INSERT INTO `sys_dict` VALUES ('680ddd8c91fe43588a7bb7aafe816633', '1', '正常报告', 'report_type', '正常的报告', '10', '2015-12-08 17:49:28', '2015-12-08 17:49:28', '正常的报告', '0');
INSERT INTO `sys_dict` VALUES ('71804c6b820048b09c9f6f2c11121113', 'ace', 'ACE风格', 'theme', '主题方案', '15', '2016-04-20 21:57:21', '2016-04-20 21:57:21', '', '0');
INSERT INTO `sys_dict` VALUES ('86bfebb0-f1ec-11e7-b55b-a7aaa2233168', '1', '支付宝', 'order_type', '交易类型', '1', '2018-01-05 15:46:23', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_dict` VALUES ('97538ae0-f1ec-11e7-b55b-a7aaa2233168', '2', '微信', 'order_type', '交易类型', '2', '2018-01-05 15:46:51', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_dict` VALUES ('bde6043665ef4571b85d0edab667cd15', '3', '树结构表', 'table_type', '表类型', '40', '2016-01-06 19:48:50', '2016-01-06 19:48:50', '', '0');
INSERT INTO `sys_dict` VALUES ('cc94b0c5df554a46894991210a5fc486', '2', '附表', 'table_type', '表类型', '30', '2016-01-05 21:47:38', '2016-01-05 21:53:44', '', '0');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(64) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `pid` varchar(64) NOT NULL COMMENT '父级编号',
  `name` varchar(100) NOT NULL COMMENT '名称',
  `sort` decimal(10,0) NOT NULL COMMENT '排序',
  `href` varchar(2000) DEFAULT NULL COMMENT '链接',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `is_show` char(1) NOT NULL COMMENT '是否在菜单中显示',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sys_menu_parent_id` (`pid`),
  KEY `sys_menu_del_flag` (`del_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '0', 'sys_admin', '1', null, 'android-settings', '1', '2017-12-15 15:48:13', '0000-00-00 00:00:00', null, '0', '系统设置');
INSERT INTO `sys_menu` VALUES ('2', '1', 'sys_menu', '1', 'sys/sys_menu', 'android-menu', '1', '2017-12-15 15:50:39', '0000-00-00 00:00:00', null, '0', '菜单管理');
INSERT INTO `sys_menu` VALUES ('3', '0', 'international', '2', 'international/international', 'earth', '1', '2017-12-15 15:52:29', '0000-00-00 00:00:00', null, '0', '多语言切换');
INSERT INTO `sys_menu` VALUES ('16', '0', 'error-page', '3', 'error-page/error-page', 'android-sad', '1', '2017-12-21 14:11:41', '0000-00-00 00:00:00', null, '0', '错误页面');
INSERT INTO `sys_menu` VALUES ('41', '1', 'sys_dict', '2', 'sys/sys_dict', 'cube', '1', '2017-12-25 23:19:01', '2017-12-25 23:19:45', null, '0', '字典管理');
INSERT INTO `sys_menu` VALUES ('49', '1', 'sys_user', '3', 'sys/sys_user', 'person', '1', '2018-01-08 16:16:56', '0000-00-00 00:00:00', null, '0', '用户管理');
INSERT INTO `sys_menu` VALUES ('51', '1', 'sys_role', '4', 'sys/sys_role', 'ios-cog-outline', '1', '2018-01-10 14:46:28', '0000-00-00 00:00:00', null, '0', '角色管理');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `name` varchar(100) NOT NULL COMMENT '角色名称',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `sys_role_del_flag` (`del_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('05b473a0-f69d-11e7-a516-971fc283909c', '111111', '2018-01-11 14:59:52', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_role` VALUES ('0be9f5b0-f69d-11e7-a516-971fc283909c', '222222aaa', '2018-01-11 15:00:02', '2018-01-11 15:08:40', null, '0');
INSERT INTO `sys_role` VALUES ('1c54e003c1fc4dcd9b087ef8d48abac3', '操作员', '2015-11-11 15:59:43', '2017-10-27 23:48:27', '', '0');
INSERT INTO `sys_role` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '测试', '2018-01-10 22:48:12', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_role` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '管理员', '2018-01-10 16:22:48', '2018-01-11 17:28:46', null, '0');
INSERT INTO `sys_role` VALUES ('c706e740-f5df-11e7-87c1-15f25aec6855', '1212', '2018-01-10 16:25:12', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_role` VALUES ('caacf61017114120bcf7bf1049b6d4c3', '666', '2015-11-13 10:54:36', '2018-01-11 17:31:02', '', '0');
INSERT INTO `sys_role` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '1212', '2018-01-10 16:26:05', '0000-00-00 00:00:00', null, '0');
INSERT INTO `sys_role` VALUES ('f2834210-f5df-11e7-ae1f-598e5a070a61', '33333', '2018-01-10 16:26:25', '0000-00-00 00:00:00', null, '0');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_id` varchar(64) NOT NULL COMMENT '角色编号',
  `menu_id` varchar(64) NOT NULL COMMENT '菜单编号',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色-菜单';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('05b473a0-f69d-11e7-a516-971fc283909c', '1');
INSERT INTO `sys_role_menu` VALUES ('05b473a0-f69d-11e7-a516-971fc283909c', '2');
INSERT INTO `sys_role_menu` VALUES ('0be9f5b0-f69d-11e7-a516-971fc283909c', '1');
INSERT INTO `sys_role_menu` VALUES ('0be9f5b0-f69d-11e7-a516-971fc283909c', '16');
INSERT INTO `sys_role_menu` VALUES ('0be9f5b0-f69d-11e7-a516-971fc283909c', '3');
INSERT INTO `sys_role_menu` VALUES ('0be9f5b0-f69d-11e7-a516-971fc283909c', '49');
INSERT INTO `sys_role_menu` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '1');
INSERT INTO `sys_role_menu` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '2');
INSERT INTO `sys_role_menu` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '41');
INSERT INTO `sys_role_menu` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '49');
INSERT INTO `sys_role_menu` VALUES ('48252730-f615-11e7-b7c3-65b70d485048', '51');
INSERT INTO `sys_role_menu` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '1');
INSERT INTO `sys_role_menu` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '3');
INSERT INTO `sys_role_menu` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '41');
INSERT INTO `sys_role_menu` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '49');
INSERT INTO `sys_role_menu` VALUES ('711911f0-f5df-11e7-8d24-11bfb4b0f3be', '51');
INSERT INTO `sys_role_menu` VALUES ('caacf61017114120bcf7bf1049b6d4c3', '16');
INSERT INTO `sys_role_menu` VALUES ('caacf61017114120bcf7bf1049b6d4c3', '3');
INSERT INTO `sys_role_menu` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '1');
INSERT INTO `sys_role_menu` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '2');
INSERT INTO `sys_role_menu` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '41');
INSERT INTO `sys_role_menu` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '49');
INSERT INTO `sys_role_menu` VALUES ('e6c016b0-f5df-11e7-bdf8-05f5ffe6f289', '51');
INSERT INTO `sys_role_menu` VALUES ('f2834210-f5df-11e7-ae1f-598e5a070a61', '1');
INSERT INTO `sys_role_menu` VALUES ('f2834210-f5df-11e7-ae1f-598e5a070a61', '51');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `login_name` varchar(100) NOT NULL COMMENT '登录名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `name` varchar(100) NOT NULL COMMENT '姓名',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(200) NOT NULL COMMENT '电话',
  `login_ip` varchar(100) DEFAULT NULL COMMENT '最后登陆IP',
  `login_date` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标记',
  `role_id` varchar(64) DEFAULT NULL COMMENT '角色ID',
  `status` char(1) DEFAULT NULL COMMENT '状态 1 正常  0 冻结',
  PRIMARY KEY (`id`),
  KEY `sys_user_login_name` (`login_name`),
  KEY `sys_user_update_date` (`update_date`),
  KEY `sys_user_del_flag` (`del_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '96e79218965eb72c92a549dd5a330112', '超级管理员', null, '13693711024', '::1', '2018-01-08 16:22:51', '2017-12-14 11:52:46', '2018-01-08 16:22:51', null, '0', null, '1');
INSERT INTO `sys_user` VALUES ('3f28fab0-e082-11e7-9787-67e0bff90b39', 'test', '96e79218965eb72c92a549dd5a330112', '大将军', null, '13693711024', '::1', '2017-12-17 00:52:09', '2017-12-14 11:52:46', '2018-01-11 17:28:31', null, '0', '711911f0-f5df-11e7-8d24-11bfb4b0f3be', '1');
INSERT INTO `sys_user` VALUES ('574a0a10-f5e7-11e7-ae1f-598e5a070a61', '24', '96e79218965eb72c92a549dd5a330112', '3', '44', '55', null, null, '2018-01-10 17:19:20', null, null, '0', '1c54e003c1fc4dcd9b087ef8d48abac3', '1');
INSERT INTO `sys_user` VALUES ('7a8b50d0-f5d1-11e7-9e2c-ebedd8cae72e', '1', '96e79218965eb72c92a549dd5a330112', '2', '3', '4', null, null, '2018-01-10 14:42:51', '2018-01-10 14:43:36', null, '0', 'caacf61017114120bcf7bf1049b6d4c3', '1');
INSERT INTO `sys_user` VALUES ('7e9da4c0-f5d1-11e7-9e2c-ebedd8cae72e', '2', '96e79218965eb72c92a549dd5a330112', '3', '4', '5', null, null, '2018-01-10 14:42:57', null, null, '0', 'caacf61017114120bcf7bf1049b6d4c3', '1');
INSERT INTO `sys_user` VALUES ('b283ad70-f5d6-11e7-9d3f-b1f35e3e7552', '3', '96e79218965eb72c92a549dd5a330112', '2', null, '', null, null, '2018-01-10 15:20:12', null, null, '0', '1c54e003c1fc4dcd9b087ef8d48abac3', '1');
