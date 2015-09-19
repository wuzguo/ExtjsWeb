package com.extweb.dao.base;
import com.extweb.util.JQGridLimit;

public class BaseEntity {
	
	private Integer limit;//显示记录数
	private Integer start;//开始
	private Integer page;//当前页数
	private String sort;//排序列
	private String dir;//排序方式 ASC DESC
	
	private String exp_name;//导出文件名称
	private String exp_type;//导出文件类型
	private String exp_column_names;//导出头信息
	private String exp_column_indexs;//导出列字段
	
	private JQGridLimit jqGridLimit;

	/**
	 * 用于jqGrid的分页对象
	 * @return
	 */
	public JQGridLimit getJqGridLimit() {
		return jqGridLimit;
	}

	/**
	 * 用于jqGrid的分页对象
	 * @param jqGridLimit
	 */
	public void setJqGridLimit(JQGridLimit jqGridLimit) {
		this.jqGridLimit = jqGridLimit;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getExp_name() {
		return exp_name;
	}

	public void setExp_name(String exp_name) {
		this.exp_name = exp_name;
	}

	public String getExp_type() {
		return exp_type;
	}

	public void setExp_type(String exp_type) {
		this.exp_type = exp_type;
	}

	public String getExp_column_names() {
		return exp_column_names;
	}

	public void setExp_column_names(String exp_column_names) {
		this.exp_column_names = exp_column_names;
	}

	public String getExp_column_indexs() {
		return exp_column_indexs;
	}

	public void setExp_column_indexs(String exp_column_indexs) {
		this.exp_column_indexs = exp_column_indexs;
	}
	
}
