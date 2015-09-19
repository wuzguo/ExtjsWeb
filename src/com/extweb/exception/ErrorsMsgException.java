package com.extweb.exception;

public class ErrorsMsgException extends Exception {
	

	/**
	 * 实体验证异常
	 */
	private static final long serialVersionUID = -6671835373630413932L;

	public ErrorsMsgException(String msg){
		super(msg);
	}
}
