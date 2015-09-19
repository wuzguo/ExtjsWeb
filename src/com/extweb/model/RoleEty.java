package com.extweb.model;

import com.extweb.dao.base.BaseEntity;

public class RoleEty extends BaseEntity{
	private Integer id;//ID
	private String roleName;//角色名称
	private String describle;//角色描述
	private String menuId;//角色对应的菜单ID
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getDescrible() {
		return describle;
	}
	public void setDescrible(String describle) {
		this.describle = describle;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	
}
