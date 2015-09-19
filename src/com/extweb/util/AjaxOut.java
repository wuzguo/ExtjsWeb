package com.extweb.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AjaxOut {
	
	private static Logger logger = LoggerFactory.getLogger(AjaxOut.class);

	/**
	 * AJAX���ҳ��
	 * 
	 * @param response
	 * @param s
	 */
	public static void responseText(HttpServletResponse response, String s) {
		// ָ����������
		response.setContentType("text/html;charset=utf-8");
		// ��ֹ����
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		try {
			PrintWriter out = response.getWriter();
			out.print(s);
			out.close();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
}
