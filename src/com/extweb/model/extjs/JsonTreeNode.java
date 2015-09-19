package com.extweb.model.extjs;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.extweb.annotation.FieldInfo;

/**
 * @Title: JsonTreeNode.java
 * @Package com.yunguanshi.model
 * @Description: TODO(用一句话描述该文件做什么)
 * @author huanghuanlai
 * @date 2014-08-06 上午9:00:09
 * @version V1.0
 */
public class JsonTreeNode {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@FieldInfo(name = "编号")
	private String id;
	@FieldInfo(name = "名称")
	private String text;
	@FieldInfo(name = "编码")
	private String code;
	@FieldInfo(name = "是否是叶子节点")
	private Boolean leaf;
	@FieldInfo(name = "链接地址")
	private String href;
	@FieldInfo(name = "打开位置")
	private String hrefTarget;
	@FieldInfo(name = "样式信息")
	private String cls;
	@FieldInfo(name = "图标")
	private String icon;
	@FieldInfo(name = "是否展开")
	private Boolean expanded = true;
	@FieldInfo(name = "描述信息")
	private String description;
	@FieldInfo(name = "是否是多选")
	private Boolean checked;
	@FieldInfo(name = "节点信息")
	private String nodeInfo;
	@FieldInfo(name = "父级节点")
	private String parent;
	@FieldInfo(name = "节点类型")
	private String nodeType;
	@FieldInfo(name = "节点信息类型")
	private String nodeInfoType;
	@FieldInfo(name = "排序")
	private Integer orderIndex;
	@FieldInfo(name = "大图标")
	private String bigIcon;
	@FieldInfo(name = "是否可用")
	private Boolean disabled;
	@FieldInfo(name = "子节点")
	private List<JsonTreeNode> children = new ArrayList<JsonTreeNode>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNodeType() {
		return nodeType;
	}

	public String getBigIcon() {
		return bigIcon;
	}

	public void setBigIcon(String bigIcon) {
		this.bigIcon = bigIcon;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getHrefTarget() {
		return hrefTarget;
	}

	public void setHrefTarget(String hrefTarget) {
		this.hrefTarget = hrefTarget;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Boolean getExpanded() {
		return expanded;
	}

	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

	public String getNodeInfo() {
		return nodeInfo;
	}

	public void setNodeInfo(String nodeInfo) {
		this.nodeInfo = nodeInfo;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getNodeInfoType() {
		return nodeInfoType;
	}

	public void setNodeInfoType(String nodeInfoType) {
		this.nodeInfoType = nodeInfoType;
	}

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}

	public Boolean getDisabled() {
		return disabled;
	}

	public void setDisabled(Boolean disabled) {
		this.disabled = disabled;
	}

	public List<JsonTreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<JsonTreeNode> children) {
		this.children = children;
	}
}
