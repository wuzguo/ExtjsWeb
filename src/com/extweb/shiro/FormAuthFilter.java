package com.extweb.shiro;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.extweb.exception.CaptchaException;
import com.extweb.model.UserEty;
import com.extweb.util.PropUtil;

/**
 * shiro表单验证.
 * 
 * @author huanghuanlai
 * 
 */
public class FormAuthFilter extends FormAuthenticationFilter {
	private boolean development;

	private String captchaParam = "checkCode";

	private static Logger logger = LoggerFactory.getLogger(FormAuthFilter.class);

	protected void saveRequestAndRedirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
		redirectToLogin(request, response);
	}

	protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request,
			ServletResponse response) {
		boolean result = super.onLoginFailure(token, e, request, response);
		String errorMessage = "用户名或者密码错误";
		if (e instanceof CaptchaException) {
			errorMessage = "验证码输入错误";
		}
		logger.info(errorMessage);
		request.setAttribute("authenticationErrorMessage", errorMessage);
		return result;
	}

	@Override
	protected CaptchaUsernamePasswordToken createToken(ServletRequest request, ServletResponse response) {

		String username = getUsername(request);
		String password = getPassword(request);
		String captcha = getCaptcha(request);
		boolean rememberMe = isRememberMe(request);
		String host = getHost(request);

		return new CaptchaUsernamePasswordToken(username, password, rememberMe, host, captcha);
	}

	protected void doCaptchaValidate(HttpServletRequest request, CaptchaUsernamePasswordToken token) {

		if (isDevelopment()) {
			logger.info("开发模式,不进行验证");
			return;
		}

		String captcha = (String) request.getSession().getAttribute(captchaParam);
		if (captcha != null && !captcha.equalsIgnoreCase(token.getCaptcha())) {
			String message = String.format("输入的验证码[%s]错误！正确的是[%s]。", token.getCaptcha(), captcha);
			logger.info(message);
			throw new CaptchaException(message);
		}
	}

	@Override
	protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
		CaptchaUsernamePasswordToken token = createToken(request, response);
		try {
			Subject subject = getSubject(request, response);
			doCaptchaValidate((HttpServletRequest) request, token);
			String username = token.getUsername();
			boolean loginSuccess = true;
			try {
				subject.login(token);
			} catch (UnknownAccountException uae) {
				loginSuccess = false;
				logger.info("对用户[" + username + "]验证未通过,未知账户！");
			} catch (IncorrectCredentialsException ice) {
				loginSuccess = false;
				logger.info("对用户[" + username + "]验证未通过,密码不正确！");
			} catch (LockedAccountException lae) {
				loginSuccess = false;
				logger.info("对用户[" + username + "]验证未通过,账户已锁定！");
			} catch (ExcessiveAttemptsException eae) {
				loginSuccess = false;
				logger.info("对用户[" + username + "]验证未通过,错误次数过多！");
			} catch (AuthenticationException e) {
				loginSuccess = false;
				token.clear();
				logger.info("对用户[" + username + "]验证未通过,未知异常！");
			}
			if (!loginSuccess) {
				UserEty user = new UserEty();
				user.setUsername(username);
				request.setAttribute(PropUtil.get("current_user"), user);
				return onLoginFailure(token, new AuthenticationException(), request, response);
			}
			return onLoginSuccess(token, subject, request, response);
		} catch (AuthenticationException e) {
			UserEty user = new UserEty();
			user.setUsername(token.getUsername());
			user.setPassword(new String(token.getPassword()));
			request.setAttribute(PropUtil.get("current_user"), user);
			return onLoginFailure(token, e, request, response);
		}
	}

	public String getCaptchaParam() {
		return captchaParam;
	}

	public void setCaptchaParam(String captchaParam) {
		this.captchaParam = captchaParam;
	}

	protected String getCaptcha(ServletRequest request) {
		return WebUtils.getCleanParam(request, getCaptchaParam());
	}

	public boolean isDevelopment() {
		return development;
	}

	public void setDevelopment(boolean development) {
		this.development = development;
	}

}
