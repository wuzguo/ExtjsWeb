package com.extweb.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
	
	public static final String Index = "index.html";
	public static final String Validate = "Validate.jsp";
	public static final String Login = "loginstat123.html";
	public static final String Index_JSP = "index.jsp";
	public static final String NoResource = "noresource.html";
	public static final String AuthTest = "loginAuthTest.action";
	public static final String Error = "error.html";
	public static final String Redirect="/admin/redirect.jsp";
	public static final String LoginAction = "login.action";
	public static final String LogOutAction = "logout.action";
	
	public static final String WEBSERVICE = "webservice";
	
	public static final String IsTransCodeAtion = "IsTransCodeAtion.action";
	public static final String JS = ".js";
	public static final String GZIPFILE = ".gzipfile";
	public static final String CSS = ".css";
	public static final String ICO = ".ico";
	public static final String JPG = ".jpg";
	public static final String GIF = ".gif";
	public static final String PNG = ".png";

	/**
	 * 判断session是否过期
	 * @param HttpServletRequest
	 * @return 如果session有效，则返回true，否则返回false
	 */
	public static boolean ifFlagExistInSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute("UserEty") != null) {
			return true;
		}
		return false;
	}
}
