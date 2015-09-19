package com.extweb.model;

import java.util.List;

public class MenuEty {
	private Integer id;// ID
	private String menuName;// 菜单名称
	private Integer parantMenuID;// 父节点菜单ID
	private String icon;// 图标地址
	private String openIcon;// 大图标地址
	private String type;// 类型 jsClassFile actionPath firstMenu [js类 html路径
						// 一级级菜单]
	private Integer isValiDate;// 是否可用
	private String description;// 菜单描述
	private String jsCtrlClassFile; // controller
	private String jsPanelClassFile; // panel

	private String actionPath;// 引入界面的url的路径
	private String menuIds;// 存放查出的用户子节点ID
	private boolean leaf;// 是否为子节点
	private List<MenuEty> children;// 子节点

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Integer getParantMenuID() {
		return parantMenuID;
	}

	public void setParantMenuID(Integer parantMenuID) {
		this.parantMenuID = parantMenuID;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getOpenIcon() {
		return openIcon;
	}

	public void setOpenIcon(String openIcon) {
		this.openIcon = openIcon;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getJsCtrlClassFile() {
		return jsCtrlClassFile;
	}

	public void setJsCtrlClassFile(String jsCtrlClassFile) {
		this.jsCtrlClassFile = jsCtrlClassFile;
	}

	public String getJsPanelClassFile() {
		return jsPanelClassFile;
	}

	public void setJsPanelClassFile(String jsPanelClassFile) {
		this.jsPanelClassFile = jsPanelClassFile;
	}

	public Integer getIsValiDate() {
		return isValiDate;
	}

	public void setIsValiDate(Integer isValiDate) {
		this.isValiDate = isValiDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getActionPath() {
		return actionPath;
	}

	public void setActionPath(String actionPath) {
		this.actionPath = actionPath;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public List<MenuEty> getChildren() {
		return children;
	}

	public void setChildren(List<MenuEty> children) {
		this.children = children;
	}

	public String getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(String menuIds) {
		this.menuIds = menuIds;
	}

}
