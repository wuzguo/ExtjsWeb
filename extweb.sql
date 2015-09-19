/*
Navicat MySQL Data Transfer

Source Server         : xxxx
Source Server Version : 50087
Source Host           : localhost:3306
Source Database       : extweb

Target Server Type    : MYSQL
Target Server Version : 50087
File Encoding         : 65001

Date: 2015-06-13 11:01:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` int(10) NOT NULL auto_increment,
  `menuName` varchar(45) default NULL,
  `parantMenuID` int(10) default NULL,
  `icon` varchar(100) default NULL,
  `openIcon` varchar(100) default NULL,
  `actionPath` varchar(300) default NULL,
  `menuOrder` int(10) default NULL,
  `isValiDate` int(11) default NULL,
  `description` varchar(45) default NULL,
  `jsPanelClassFile` varchar(500) default NULL,
  `jsCtrlClassFile` varchar(500) default NULL,
  `type` varchar(45) default NULL,
  `namespace` varchar(100) default NULL,
  `mainClass` varchar(100) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=247 DEFAULT CHARSET=utf8 COMMENT='菜单资源';

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('228', '请假规则', '226', 'discussion.png', 'discussion.png', 'http://www.baidu.com', null, '0', '', '', '', 'actionPath', null, null);
INSERT INTO `t_menu` VALUES ('226', '人事管理', '0', 'advmmange.png', 'advmmange.png', '', null, '0', '用于对公司人员的请假管理', '', '', 'firstMenu', null, null);
INSERT INTO `t_menu` VALUES ('227', '请假申请', '226', 'bpexchange.png', 'bpexchange.png', '', null, '0', '请假申请', '', '', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('221', '权限管理', '0', 'root.png', 'root.png', '', null, '0', '', null, '', 'firstMenu', null, null);
INSERT INTO `t_menu` VALUES ('222', '用户管理', '221', 'yhmanage.png', 'yhmanage.png', '', null, '0', '', 'user.UserPanel', 'user.Controller', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('223', '菜单管理', '221', 'menumanage.png', 'menumanage.png', '', null, '0', '', 'menu.MenuPanel', 'menu.MenuController', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('224', '角色管理', '221', 'rolemanage.png', 'rolemanage.png', '', null, '0', '', 'role.RolePanel', 'role.RoleController', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('245', '产品管理', '0', 'flowcontrol.png', 'flowcontrol.png', '', null, '0', '公司产品信息管理', '', '', 'firstMenu', null, null);
INSERT INTO `t_menu` VALUES ('246', '产品信息', '245', 'chareport.png', 'chareport.png', '', null, '0', '展示产品基本信息或参数', 'product.ProductPanel', 'product.ProductController', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('243', '客户信息', '242', 'menummanage.png', 'menummanage.png', '', null, '0', '展示公司各类客户的信息', 'custom.CustomPanel', 'CustomController', 'jsClassFile', null, null);
INSERT INTO `t_menu` VALUES ('242', '客户管理', '0', 'menu-item.png', 'menu-item.png', '', null, '0', '管理客户信息', '', '', 'firstMenu', null, null);

-- ----------------------------
-- Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `roleName` varchar(45) default NULL,
  `describle` varchar(500) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('20', '系统管理员', '管理整个系统，拥有最高权限123123啊实打实');
INSERT INTO `t_role` VALUES ('21', '数据管理员', '管理系统数据');
INSERT INTO `t_role` VALUES ('30', '游客', '游客');
INSERT INTO `t_role` VALUES ('32', 'xxx', '阿尔法社会上');

-- ----------------------------
-- Table structure for `t_roleresource`
-- ----------------------------
DROP TABLE IF EXISTS `t_roleresource`;
CREATE TABLE `t_roleresource` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `roleId` int(10) unsigned NOT NULL,
  `menuId` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `index_crm_stat_roleresource_nodeId` (`menuId`),
  KEY `index_crm_stat_roleresource_roleId` (`roleId`)
) ENGINE=MyISAM AUTO_INCREMENT=1078 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_roleresource
-- ----------------------------
INSERT INTO `t_roleresource` VALUES ('1073', '30', '228');
INSERT INTO `t_roleresource` VALUES ('1072', '30', '227');
INSERT INTO `t_roleresource` VALUES ('1071', '30', '226');
INSERT INTO `t_roleresource` VALUES ('1070', '30', '224');
INSERT INTO `t_roleresource` VALUES ('1069', '30', '223');
INSERT INTO `t_roleresource` VALUES ('1068', '30', '222');
INSERT INTO `t_roleresource` VALUES ('1067', '30', '221');
INSERT INTO `t_roleresource` VALUES ('1041', '36', '221');
INSERT INTO `t_roleresource` VALUES ('1042', '36', '222');
INSERT INTO `t_roleresource` VALUES ('1043', '36', '223');
INSERT INTO `t_roleresource` VALUES ('1044', '36', '224');
INSERT INTO `t_roleresource` VALUES ('1045', '36', '226');
INSERT INTO `t_roleresource` VALUES ('1046', '36', '227');
INSERT INTO `t_roleresource` VALUES ('1047', '36', '228');
INSERT INTO `t_roleresource` VALUES ('1077', '30', '246');
INSERT INTO `t_roleresource` VALUES ('1076', '30', '245');
INSERT INTO `t_roleresource` VALUES ('1075', '30', '243');
INSERT INTO `t_roleresource` VALUES ('1074', '30', '242');
INSERT INTO `t_roleresource` VALUES ('1066', '32', '227');
INSERT INTO `t_roleresource` VALUES ('1065', '32', '223');
INSERT INTO `t_roleresource` VALUES ('1064', '32', '222');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL auto_increment COMMENT '用户ID',
  `group_id` int(11) default NULL,
  `name` varchar(255) NOT NULL COMMENT '用户名称',
  `password` varchar(128) NOT NULL COMMENT '密码',
  `description` varchar(255) default NULL COMMENT '备注',
  `insert_date` datetime default NULL COMMENT '创建时间',
  `login_ip` varchar(15) default NULL COMMENT '登入IP',
  `status` varchar(1) NOT NULL COMMENT '状态',
  `username` varchar(100) default NULL,
  `usertype` varchar(100) default NULL,
  `useremail` varchar(100) default NULL,
  `userphone` varchar(100) default NULL,
  `region` varchar(255) default NULL,
  `level` varchar(100) default NULL,
  `gender` varchar(255) default NULL,
  `cellphone` varchar(100) default NULL,
  `qq` varchar(255) default NULL,
  `workstatus` varchar(255) default NULL,
  `password_update_date` datetime default NULL,
  `sex` varchar(45) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1752 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1717', '1', 'admin', '1', '123123123', null, null, '0', 'admin', null, '449237205@qq.com', '12312312', null, null, null, null, null, null, null, '1');
INSERT INTO `t_user` VALUES ('1727', null, 'adData', '4530243', '123123123', null, null, '0', '广告数据', null, 'adData@youku.com', '2312312312', null, null, null, null, null, null, null, '0');
INSERT INTO `t_user` VALUES ('1745', null, 'xxxx', 'xxx', 'xxxxxxxxxxxx', '2014-11-13 13:50:29', null, '0', 'xx', null, 'xxx@qq.com', 'xxx', null, null, null, null, null, null, null, '0');
INSERT INTO `t_user` VALUES ('1751', null, 'aaa', 'qqq', 'aaaaaaaaaaaaaaaa', '2014-11-14 16:26:22', null, '0', 'aaaa', null, 'aaaaa@q.com', 'aaaaaa', null, null, null, null, null, null, null, '0');
INSERT INTO `t_user` VALUES ('1741', null, 'wwww', 'wwww', 'wwwwwadasd', '2014-11-12 16:23:04', null, '1', 'www', null, 'wwww@qq.com', 'www', null, null, null, null, null, null, null, '1');
INSERT INTO `t_user` VALUES ('1748', null, '志国', '1234', '测试信息', '2014-11-13 13:57:50', null, '0', '物质', null, 'yyang.wu@qq.com', '15018522500', null, null, null, null, null, null, null, '1');

-- ----------------------------
-- Table structure for `t_userrole`
-- ----------------------------
DROP TABLE IF EXISTS `t_userrole`;
CREATE TABLE `t_userrole` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `userId` int(10) unsigned NOT NULL,
  `roleId` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `index_crm_stat_userrole_userId` (`userId`),
  KEY `index_crm_stat_userrole_roleId` (`roleId`)
) ENGINE=MyISAM AUTO_INCREMENT=739 DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- ----------------------------
-- Records of t_userrole
-- ----------------------------
INSERT INTO `t_userrole` VALUES ('694', '1727', '30');
INSERT INTO `t_userrole` VALUES ('693', '1717', '30');
INSERT INTO `t_userrole` VALUES ('712', '1743', '30');
INSERT INTO `t_userrole` VALUES ('707', '1739', '21');
INSERT INTO `t_userrole` VALUES ('706', '1739', '20');
INSERT INTO `t_userrole` VALUES ('711', '1744', '30');
INSERT INTO `t_userrole` VALUES ('713', '1748', '21');
INSERT INTO `t_userrole` VALUES ('714', '1748', '30');
INSERT INTO `t_userrole` VALUES ('733', '1750', '21');
INSERT INTO `t_userrole` VALUES ('738', '1745', '30');
INSERT INTO `t_userrole` VALUES ('732', '1750', '20');
INSERT INTO `t_userrole` VALUES ('737', '1745', '32');
