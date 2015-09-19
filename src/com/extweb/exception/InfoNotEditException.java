package com.extweb.exception;

public class InfoNotEditException extends Exception {

	/**
	 * 信息未修改提交异常
	 */
	private static final long serialVersionUID = -3404093835008220246L;

	public InfoNotEditException(String msg){
		super(msg);
	}
}
