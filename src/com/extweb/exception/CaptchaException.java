package com.extweb.exception;

import org.apache.shiro.authc.AuthenticationException;

/**
 * shiro异常重写类.
 * @author huanghuanlai
 *
 */
@SuppressWarnings("all")
public class CaptchaException extends AuthenticationException {

	public CaptchaException() {
		super();
	}

	public CaptchaException(String message, Throwable cause) {
		super(message, cause);
	}

	public CaptchaException(String message) {
		super(message);
	}

	public CaptchaException(Throwable cause) {
		super(cause);
	}
}
