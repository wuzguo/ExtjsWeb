package com.extweb.util;

import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.extweb.exception.ErrorsMsgException;

/**
 * 字符串处理工具.
 * 
 * @author huanghuanlai
 * 
 */
public class StringUtil {

	/**
	 * 用户名长度
	 */
	public static final Integer USERNAMELENGTH = 1;
	/**
	 * 用户名格式
	 */
	public static final Integer USERNAMEFORMAT = 2;
	/**
	 * 用户名为空
	 */
	public static final Integer USERNAMENULL = 3;

	/**
	 * 验证实体是否已经通过验证
	 * 
	 * @param result
	 * @return
	 * @throws ErrorsMsgException
	 */
	public static void validateErrorsMsg(BindingResult result) throws ErrorsMsgException {
		if (result.hasErrors()) {
			List<ObjectError> errors = result.getAllErrors();
			StringBuffer sb = new StringBuffer();
			int length = errors.size();
			for (int i = 0; i < length; i++) {
				sb.append((i + 1) + "：" + errors.get(i).getDefaultMessage() + "<br/>");
			}
			throw new ErrorsMsgException(sb.toString());
		}
	}

	/**
	 * 判断字符串是否是整数
	 */
	public static boolean isInteger(String number) {
		boolean isNumber = false;
		if (isNotEmpty(number)) {
			isNumber = number.matches("^([1-9]\\d*)|(0)$");
		}
		return isNumber;
	}

	/**
	 * 判断是否是汉语
	 * 
	 * @param hanyu
	 * @return
	 */
	public static boolean isHanYu(String hanyu) {
		boolean isHanYu = false;
		if (isNotEmpty(hanyu)) {
			isHanYu = hanyu.matches("^[\\u4e00-\\u9fa5]*$");
		}
		return isHanYu;
	}

	/**
	 * 判断用户名是否合法
	 * 
	 * @param username
	 * @return 1:代表长度不合法 2:用户名格式不合法 3:长度不能为空
	 */
	public static int isPassUserName(String username) {
		if (isNotEmpty(username)) {
			if (username.trim().length() > 18 || username.trim().length() < 4) {
				return 1;
			} else {
				if (!username.matches("^([a-zA-Z].+\\d*)|([\\u4e00-\\u9fa5]{3,8})$")) {
					return 2;
				}
			}
			return 0;
		}
		return 3;
	}

	/**
	 * 判断用户名是否合法
	 * 
	 * @param username
	 * @return 1:代表长度不合法 2:用户名格式不合法 3:长度不能为空
	 */
	public static int isPassPassword(String password) {
		if (isNotEmpty(password)) {
			if (password.trim().length() > 16 || password.trim().length() < 6) {
				return 1;
			} else {
				if (!password.matches("^([a-zA-Z].+(\\d*)|(([.]|[+]|[=]|[-]|[/])*))$")) {
					return 2;
				}
			}
			return 0;
		}
		return 3;
	}

	/**
	 * 判断字符串是否不为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(Object str) {
		boolean isEmpty = false;
		if (str != null) {
			if (str instanceof String) {
				String ss = str.toString();
				if (!ss.trim().equals("")) {
					isEmpty = true;
				}
			}
		}

		return isEmpty;
	}

	/**
	 * 将数组转成SQL认识的字符串 123,321 id in ('123','321')
	 * 
	 * @param ids
	 * @return
	 */
	public static String fromArrayToStr(String[] ids) {
		StringBuilder stringBuilder = new StringBuilder();
		int length = ids.length;
		for (String id : ids) {
			stringBuilder.append("'" + id + "',");
		}
		if (length > 0) {
			stringBuilder.deleteCharAt(length - 1);
		}
		return stringBuilder.toString();
	}
}
