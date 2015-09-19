package com.extweb.model;

import com.extweb.annotation.FieldInfo;

/**
 * 为Ext的model产生字段专用类
 * @author huanghuanlai
 *
 */
public class ExtField {

	@FieldInfo(name="字段名称")
	private String name;
	@FieldInfo(name="字段类型")
	private String type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ExtField(String name, String type) {
		super();
		this.name = name;
		this.type = type;
	}

}
