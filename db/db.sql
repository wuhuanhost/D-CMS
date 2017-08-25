/*
Navicat MySQL Data Transfer

Source Server         : MYSQL57
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : cms

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-25 17:40:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(20) NOT NULL COMMENT '账号',
  `password` varchar(200) NOT NULL COMMENT '密码',
  `nickname` varchar(20) DEFAULT NULL COMMENT '昵称',
  `email` varchar(20) NOT NULL COMMENT '邮件',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `role_id` int(11) NOT NULL COMMENT '外键：角色id',
  `token` varchar(255) NOT NULL COMMENT '登录校验令牌',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_name_unique` (`account_name`) USING HASH,
  KEY `role_id_key` (`role_id`) USING HASH,
  CONSTRAINT `role_id_key` FOREIGN KEY (`role_id`) REFERENCES `admin_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for `admin_module`
-- ----------------------------
DROP TABLE IF EXISTS `admin_module`;
CREATE TABLE `admin_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '模块名称',
  `name` varchar(20) NOT NULL,
  `controller` varchar(255) NOT NULL COMMENT '模块对应的控制器或者链接',
  `method` varchar(255) NOT NULL COMMENT '模块请求方法',
  `params` varchar(255) NOT NULL COMMENT '模块传递的参数',
  `icon` varchar(255) DEFAULT NULL COMMENT '模块图标',
  `state` int(1) DEFAULT NULL COMMENT '模块状态',
  `type` int(1) NOT NULL COMMENT '区分提交的链接是控制器还是连接',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级模块id',
  `level` int(1) DEFAULT NULL COMMENT '模块级别',
  `order` int(11) DEFAULT NULL COMMENT '排序字段',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_module
-- ----------------------------

-- ----------------------------
-- Table structure for `admin_permission`
-- ----------------------------
DROP TABLE IF EXISTS `admin_permission`;
CREATE TABLE `admin_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '权限名称',
  `module_id` int(11) NOT NULL COMMENT '模块id',
  `right_value` int(1) NOT NULL COMMENT '权限值',
  `order` int(11) NOT NULL COMMENT '排序字段',
  `group_name` varchar(20) NOT NULL COMMENT '分组名称',
  `remark` varchar(200) NOT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_permission
-- ----------------------------

-- ----------------------------
-- Table structure for `admin_role`
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '角色名称',
  `state` int(1) NOT NULL COMMENT '状态',
  `create_time` varchar(20) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `level` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_role
-- ----------------------------

-- ----------------------------
-- Table structure for `admin_role_permission_relative`
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_permission_relative`;
CREATE TABLE `admin_role_permission_relative` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `permission_id` int(11) NOT NULL COMMENT '权限id',
  PRIMARY KEY (`id`),
  KEY `role_id_forkey` (`role_id`),
  KEY `permission_id_forkey` (`permission_id`),
  CONSTRAINT `permission_id_forkey` FOREIGN KEY (`permission_id`) REFERENCES `admin_permission` (`id`),
  CONSTRAINT `role_id_forkey` FOREIGN KEY (`role_id`) REFERENCES `admin_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin_role_permission_relative
-- ----------------------------

-- ----------------------------
-- Table structure for `config`
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` json NOT NULL COMMENT '关键字对应的json字符串',
  `state` int(1) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `key` varchar(255) NOT NULL COMMENT '关键字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of config
-- ----------------------------

-- ----------------------------
-- Table structure for `material`
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '素材类型，1=图片，2=音频，3=视频',
  `type` int(1) NOT NULL,
  `title` varchar(20) NOT NULL COMMENT '标题',
  `url` varchar(255) NOT NULL COMMENT '素材地址',
  `create_time` varchar(20) NOT NULL COMMENT '创建时间',
  `state` int(1) NOT NULL COMMENT '0=删除，1=正常',
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_forkey` (`category_id`),
  CONSTRAINT `category_id_forkey` FOREIGN KEY (`category_id`) REFERENCES `material_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of material
-- ----------------------------

-- ----------------------------
-- Table structure for `material_category`
-- ----------------------------
DROP TABLE IF EXISTS `material_category`;
CREATE TABLE `material_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '分类名称',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `order` int(11) DEFAULT NULL COMMENT '排序',
  `state` int(1) NOT NULL COMMENT '状态',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级id',
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of material_category
-- ----------------------------

-- ----------------------------
-- Table structure for `material_tag`
-- ----------------------------
DROP TABLE IF EXISTS `material_tag`;
CREATE TABLE `material_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `state` int(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of material_tag
-- ----------------------------

-- ----------------------------
-- Table structure for `material_tag_relative`
-- ----------------------------
DROP TABLE IF EXISTS `material_tag_relative`;
CREATE TABLE `material_tag_relative` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tags_id_forkey` (`tag_id`),
  KEY `material_id_forkey` (`material_id`),
  CONSTRAINT `material_id_forkey` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `tags_id_forkey` FOREIGN KEY (`tag_id`) REFERENCES `material_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of material_tag_relative
-- ----------------------------

-- ----------------------------
-- Table structure for `nav`
-- ----------------------------
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `parent_id` int(11) unsigned zerofill DEFAULT NULL COMMENT '上级id',
  `target` varchar(20) NOT NULL COMMENT '菜单打开的页面的目标',
  `href` varchar(255) NOT NULL COMMENT '菜单对应的链接',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `state` int(1) NOT NULL COMMENT '菜单状态',
  `order` int(11) DEFAULT NULL COMMENT '排序字段',
  `level` int(1) unsigned zerofill DEFAULT NULL COMMENT '菜单级别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of nav
-- ----------------------------

-- ----------------------------
-- Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) NOT NULL COMMENT '文章作者',
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `keyword` varchar(200) NOT NULL COMMENT '关键字',
  `post_resource` varchar(255) NOT NULL,
  `content` text NOT NULL COMMENT '内容',
  `create_time` varchar(20) NOT NULL COMMENT '创建时间',
  `published_time` varchar(20) NOT NULL,
  `update_time` varchar(20) NOT NULL,
  `delete_time` varchar(20) NOT NULL,
  `thumbnail` varchar(255) NOT NULL COMMENT '缩略图',
  `cover` varchar(255) NOT NULL COMMENT '封面图',
  `state` int(1) NOT NULL COMMENT '状态',
  `order` int(11) NOT NULL COMMENT '排序字段',
  `top` int(11) NOT NULL COMMENT '置顶',
  `recommend` int(11) NOT NULL COMMENT '推荐',
  `abstract` varchar(200) NOT NULL COMMENT '摘要',
  `remark` varchar(200) NOT NULL COMMENT '备注',
  `attachment` varchar(255) NOT NULL COMMENT '附件',
  `admin_id` int(11) NOT NULL,
  `post_hits` int(11) NOT NULL COMMENT '点击数',
  `post_like` int(11) NOT NULL COMMENT '点赞数',
  `more` int(255) NOT NULL COMMENT '相册图片',
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `category` (`category_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `post_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post
-- ----------------------------

-- ----------------------------
-- Table structure for `post_category`
-- ----------------------------
DROP TABLE IF EXISTS `post_category`;
CREATE TABLE `post_category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '分类名称',
  `list_template` varchar(255) NOT NULL COMMENT '列表模板',
  `post_template` varchar(255) NOT NULL COMMENT '文章模板',
  `parent_id` int(11) NOT NULL,
  `level` int(1) NOT NULL,
  `order` int(11) NOT NULL COMMENT '排序字段',
  `state` int(1) unsigned NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post_category
-- ----------------------------

-- ----------------------------
-- Table structure for `post_extend`
-- ----------------------------
DROP TABLE IF EXISTS `post_extend`;
CREATE TABLE `post_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail_16x9` varchar(255) NOT NULL,
  `cover_16x9` varchar(255) NOT NULL,
  `thumbnail_4x3` varchar(255) NOT NULL,
  `cover_4x3` varchar(255) NOT NULL,
  `post_hits_base` int(11) NOT NULL COMMENT '点击基数',
  `post_like_base` int(11) NOT NULL COMMENT '点赞基数',
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id_forkey` (`post_id`),
  CONSTRAINT `post_id_forkey` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post_extend
-- ----------------------------

-- ----------------------------
-- Table structure for `slider`
-- ----------------------------
DROP TABLE IF EXISTS `slider`;
CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  `state` int(1) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `group_name` varchar(20) NOT NULL COMMENT '分组名称',
  `url` varchar(255) DEFAULT NULL COMMENT '图片点击后跳转的链接地址',
  `target` varchar(20) DEFAULT NULL COMMENT '打开方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of slider
-- ----------------------------
