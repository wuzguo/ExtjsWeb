package com.extweb.dao;

import java.util.Map;

import com.extweb.dao.base.BaseDao;
import com.extweb.model.RoleEty;
/*
 * 角色管理
 * @author lijialong
 * */
public interface RoleDao extends BaseDao<RoleEty>{
 	/**
	 * 将角色ID 和 菜单ID 插入 临时表
	 * @param userData
	 */
	public void insertMenu(Map<String,Integer> roleMap);
	/**
	 * 删除角色菜单
	 * @param userData
	 */
	public void deleteMenu(Integer roleId);
	
	/**
	 * 根据角色ID 查看是否有用户使用该角色
	 * @param roleId
	 */
	public int getUsingRole(Integer roleId);
}
