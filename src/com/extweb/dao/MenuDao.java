package com.extweb.dao;

import java.util.List;

import com.extweb.dao.base.BaseDao;
import com.extweb.model.MenuEty;
/*
 * 菜单管理
 * @author lijialong
 * */
public interface MenuDao extends BaseDao<MenuEty>{
	 /**
 	 * 根据父节点id 获得菜单列表
 	 * @param Integer 父节点id
 	 * @return List 客户菜单列表
 	 */
 	public List<MenuEty> getListByParentId(int id);
 	
 	/**
	 * 根据菜单ID 查看是否有角色使用该菜单
	 * @param menuId
	 */
	public int getUsingMenu(Integer menuId);
 	
}
