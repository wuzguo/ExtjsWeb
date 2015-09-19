package com.extweb.exception;

public class NumberFailureException extends Exception {

	
	/**
	 * 数据转换异常
	 */
	private static final long serialVersionUID = 1499131051749228805L;

	public NumberFailureException(String msg){
		super(msg);
	}

}
