package com.extweb.model.extjs;

import javax.persistence.MappedSuperclass;

import com.extweb.annotation.NodeType;
import com.extweb.constant.TreeNodeType;

@MappedSuperclass
public class TreeBaseEntity {

	@NodeType(type = TreeNodeType.LAYER)
	private Integer layer;
	@NodeType(type = TreeNodeType.NODEINFO)
	private String nodeInfo;
	@NodeType(type = TreeNodeType.LEAF)
	private String nodeType;
	@NodeType(type = TreeNodeType.NODEINFOTYPE)
	private String nodeInfoType;
	private Integer orderIndex=0;

	public Integer getLayer() {
		return layer;
	}

	public void setLayer(Integer layer) {
		this.layer = layer;
	}

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}

	public String getNodeInfo() {
		return nodeInfo;
	}

	public void setNodeInfo(String nodeInfo) {
		this.nodeInfo = nodeInfo;
	}

	public String getNodeType() {
		return nodeType;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public String getNodeInfoType() {
		return nodeInfoType;
	}

	public void setNodeInfoType(String nodeInfoType) {
		this.nodeInfoType = nodeInfoType;
	}

}
