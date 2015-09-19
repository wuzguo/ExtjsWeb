package com.extweb.util;

public class JQGridLimit {
	private String sord;// 排序方式
	private String sidx;// 排序列

	private String searchField;// 查询列名
	private String searchOper;// 查询关键字，如>:gt, =:eq , <:lt等
	private String searchString;// 查询值，既用户输入的值
	private String page;// 当前页数
	private String nd;//

	private String rows;// 每页显示记录数
	private String _search;// 是否查询，true, false

	private int start;
	private int totalPageCount;

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void resetLimit(int recordsCount) {
		totalPageCount = recordsCount / getRowsValue();
		if (recordsCount % getRowsValue() > 0)
			totalPageCount++;
		start = (getPageValue() - 1) * getRowsValue();
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	/**
	 * 排序方式
	 * 
	 * @return
	 */
	public String getSord() {
		return sord;
	}

	/**
	 * 排序方式
	 * 
	 * @param sord
	 */
	public void setSord(String sord) {
		this.sord = sord;
	}

	/**
	 * 排序列
	 * 
	 * @return
	 */
	public String getSidx() {
		return sidx;
	}

	/**
	 * 排序列
	 * 
	 * @param sidx
	 */
	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	/**
	 * 查询列名
	 * 
	 * @return
	 */
	public String getSearchField() {
		return searchField;
	}

	/**
	 * 查询列名
	 * 
	 * @param searchField
	 */
	public void setSearchField(String searchField) {
		this.searchField = searchField;
	}

	/**
	 * 查询关键字，如>:gt, =:eq , <:lt等
	 * 
	 * @return
	 */
	public String getSearchOper() {
		if (searchOper == null)
			return null;
		else if (searchOper.equals("eq"))
			return "=";
		else if (searchOper.equals("ne"))
			return "<>";
		else if (searchOper.equals("lt"))
			return "<";
		else if (searchOper.equals("gt"))
			return ">";
		else if (searchOper.equals("le"))
			return "<=";
		else if (searchOper.equals("ge"))
			return ">=";
		else
			return "=";
	}

	/**
	 * 查询关键字，如>:gt, =:eq , <:lt等
	 * 
	 * @param searchOper
	 */
	public void setSearchOper(String searchOper) {
		this.searchOper = searchOper;
	}

	/**
	 * 查询值，既用户输入的值
	 * 
	 * @return
	 */
	public String getSearchString() {
		return searchString;
	}

	/**
	 * 查询值，既用户输入的值
	 * 
	 * @param searchString
	 */
	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	/**
	 * 当前页数
	 * 
	 * @return
	 */
	public String getPage() {
		return page;
	}

	public int getPageValue() {
		try {
			return Integer.parseInt(page);
		} catch (Exception e) {
			return 0;
		}
	}

	/**
	 * 当前页数
	 * 
	 * @param page
	 */
	public void setPage(String page) {
		this.page = page;
	}

	public String getNd() {
		return nd;
	}

	public void setNd(String nd) {
		this.nd = nd;
	}

	/**
	 * 每页显示记录数
	 * 
	 * @return
	 */
	public String getRows() {
		return rows;
	}

	public int getRowsValue() {
		try {
			return Integer.parseInt(rows);
		} catch (Exception e) {
			return 0;
		}
	}

	public int getTotalPages(int allRowCount) {
		try {
			int c = allRowCount / getRowsValue();
			int m = allRowCount % getRowsValue();
			if (m == 0)
				return c;
			else
				return c + 1;
		} catch (Exception e) {
			return 1;
		}
	}

	/**
	 * 每页显示记录数
	 * 
	 * @param rows
	 */
	public void setRows(String rows) {
		this.rows = rows;
	}

	/**
	 * 是否查询，true, false
	 * 
	 * @return
	 */
	public String get_search() {
		return _search;
	}

	/**
	 * 是否查询，true, false
	 * 
	 * @param search
	 */
	public void set_search(String search) {
		_search = search;
	}
}
