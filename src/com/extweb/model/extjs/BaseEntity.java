package com.extweb.model.extjs;


import javax.persistence.MappedSuperclass;

import com.extweb.annotation.FieldInfo;

/**
 * 基础实体的model
 * @author huanghuanlai
 *
 */
@MappedSuperclass
public class BaseEntity {
	@FieldInfo(name="创建时间")
	private String createTime;
	@FieldInfo(name="创建人")
	private String createUser;
	@FieldInfo(name="创建人名称")
	private String createUserName;
	@FieldInfo(name="创建部门")
	private String createDept;
	@FieldInfo(name="创建部门名称")
	private String  createDeptName;
	@FieldInfo(name="排序字段")
	private Integer orderIndex;
	@FieldInfo(name="数据状态")
	private String  status;
	@FieldInfo(name="修改部门")
	private String  modifyDept;
	@FieldInfo(name="修改部门名称")
	private String modifyDeptName;
	@FieldInfo(name="修改时间")
	private String modifyTime;
	@FieldInfo(name="修改人")
	private String  modifyUser;
	@FieldInfo(name="修改人名称")
	private String  modifyUserName;
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getCreateDept() {
		return createDept;
	}
	public void setCreateDept(String createDept) {
		this.createDept = createDept;
	}
	public String getCreateDeptName() {
		return createDeptName;
	}
	public void setCreateDeptName(String createDeptName) {
		this.createDeptName = createDeptName;
	}
	
	public Integer getOrderIndex() {
		return orderIndex;
	}
	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getModifyDept() {
		return modifyDept;
	}
	public void setModifyDept(String modifyDept) {
		this.modifyDept = modifyDept;
	}
	public String getModifyDeptName() {
		return modifyDeptName;
	}
	public void setModifyDeptName(String modifyDeptName) {
		this.modifyDeptName = modifyDeptName;
	}
	public String getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	public String getModifyUser() {
		return modifyUser;
	}
	public void setModifyUser(String modifyUser) {
		this.modifyUser = modifyUser;
	}
	public String getModifyUserName() {
		return modifyUserName;
	}
	public void setModifyUserName(String modifyUserName) {
		this.modifyUserName = modifyUserName;
	}
	

}
