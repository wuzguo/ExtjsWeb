package com.extweb.constant;


/**
 * 树形节点类型
 * @author huanghuanlai
 *
 */
public enum TreeNodeType {
	ID,
	TEXT,
	CODE,
	LEAF,
	HREF,
	HREFTARGET,
	CLS,
	ICON,
	EXPANDABLE,
	EXPANDED,
	DESCRIPTION,
	CHECKED,
	NODEINFO,
	LAYER,
	PARENT,
	BIGICON,
	NODEINFOTYPE,
	ORDERINDEX,
	DISABLED;
	public Boolean equalsType(TreeNodeType other){
		int cc = this.compareTo(other);
		if(cc!=0){
			return false;
		}
		return true;
	}
}
