package com.extweb.dao.base;

/**
 * ibatis基本语句配置
 * @author yanghanguang
 *
 */
public class IbatisMethodMapping {
	private String domainName;
	
	private String insertMethod = "insert";
	private String updateByIdMethod = "updateById";
	private String deleteByIdMethod = "deleteById";
	private String selectByIdMethod = "selectById";
	private String selectByEntityMethod = "selectByEntity";
	private String selectByLimitMethod = "selectByLimit";
	private String selectLimitCountMethod = "selectLimitCount";
	
	public String getInsertMethod() {
		return domainName + "." + insertMethod;
	}
	
	public String getUpdateByIdMethod() {
		return domainName + "." + updateByIdMethod;
	}
	
	public String getDeleteByIdMethod() {
		return domainName + "." + deleteByIdMethod;
	}
	
	public String getSelectByIdMethod() {
		return domainName + "." + selectByIdMethod;
	}
	
	public String getSelectByEntityMethod() {
		return domainName + "." + selectByEntityMethod;
	}
	
	public String getSelectByLimitMethod() {
		return domainName + "." + selectByLimitMethod;
	}
	
	public String getSelectLimitCountMethod() {
		return domainName + "." + selectLimitCountMethod;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public void setInsertMethod(String insertMethod) {
		this.insertMethod = insertMethod;
	}

	public void setUpdateByIdMethod(String updateByIdMethod) {
		this.updateByIdMethod = updateByIdMethod;
	}

	public void setDeleteByIdMethod(String deleteByIdMethod) {
		this.deleteByIdMethod = deleteByIdMethod;
	}

	public void setSelectByIdMethod(String selectByIdMethod) {
		this.selectByIdMethod = selectByIdMethod;
	}

	public void setSelectByEntityMethod(String selectByEntityMethod) {
		this.selectByEntityMethod = selectByEntityMethod;
	}

	public void setSelectByLimitMethod(String selectByLimitMethod) {
		this.selectByLimitMethod = selectByLimitMethod;
	}

	public void setSelectLimitCountMethod(String selectLimitCountMethod) {
		this.selectLimitCountMethod = selectLimitCountMethod;
	}
}
