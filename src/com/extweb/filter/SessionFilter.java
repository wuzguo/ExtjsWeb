package com.extweb.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.extweb.util.AjaxOut;

/**
 * sessionfilter
 * @author hanxs
 * 
 */
public class SessionFilter implements Filter {
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		if(request instanceof HttpServletRequest) {
			HttpServletRequest httpServletRequest = (HttpServletRequest) request;
			String url = httpServletRequest.getRequestURI();// 得到请求URL
			System.out.println(url);
			if (!SessionUtil.ifFlagExistInSession(httpServletRequest) 
					&& !url.endsWith(SessionUtil.AuthTest)
					&& !url.endsWith(SessionUtil.NoResource)
					&& !url.endsWith(SessionUtil.Index)
					&& !url.endsWith(SessionUtil.Index_JSP) 
					&& !url.endsWith(SessionUtil.Validate)
					&& !url.endsWith(SessionUtil.Error) 
					&& !url.endsWith(SessionUtil.Login) 
					&& !url.endsWith(SessionUtil.Redirect) 
					&& !url.endsWith(SessionUtil.LoginAction) 
					&& !url.endsWith(SessionUtil.LogOutAction) 
					&& !url.endsWith(SessionUtil.JS) 
					&& !url.endsWith(SessionUtil.GZIPFILE)
					&& !url.endsWith(SessionUtil.CSS)
					&& !url.endsWith(SessionUtil.ICO)
					&& !url.endsWith(SessionUtil.IsTransCodeAtion)
					&& !url.contains(SessionUtil.WEBSERVICE)
					&& !url.endsWith(SessionUtil.JPG) && !url.endsWith(SessionUtil.GIF) && !url.endsWith(SessionUtil.PNG)) {
				if (response instanceof HttpServletResponse) {
					HttpServletResponse httpServletResponse = (HttpServletResponse) response;
					
					String extAjaxTag = ((HttpServletRequest) request).getHeader("Request-By");
					if(extAjaxTag != null && extAjaxTag.equals("Ext")) {
						JSONObject obj = new JSONObject();
						obj.put("success",true);
						obj.put("result","timeout");  
						obj.put("info","登录超时！请重新登录！");
						obj.put("redirectURL", httpServletRequest.getContextPath() + "/index.jsp");   
						AjaxOut.responseText(httpServletResponse, obj.toString());
						return;
					}
					else {
						httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/index.jsp");
						return;
					}
				}
			}
		}
		
		try {
			chain.doFilter(request, response);
		}
		catch (Exception e) {
		}
	}

	public void destroy() {
	}

}