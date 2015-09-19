package com.extweb.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.extweb.dao.MenuDao;
import com.extweb.dao.UserDao;
import com.extweb.model.MenuEty;
import com.extweb.model.UserEty;

/**
 * 单点登录控制
 * 
 * @author User
 * 
 */
@Controller
@RequestMapping("/basic/LoginController/")
public class LoginController {

	private Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private UserDao userDao;

	@Autowired
	private MenuDao menuDao;

	/**
	 * CAS登入预留接口
	 * 
	 * @param request
	 * @param response
	 * @param user
	 * @throws Exception
	 */
	@RequestMapping("CASLogin.sdo")
	public void CASLogin(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		// 用户名称为空直接返回
		if (StringUtils.isEmpty(user.getUsername())) {
			response.sendRedirect(request.getContextPath() + "/login.html");
			return;
		}
	}

	/**
	 * Web用户登入
	 * 
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("login.sdo")
	public @ResponseBody
	String login(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		List<UserEty> list = userDao.selectUserByName(user.getName());
		if (list.size() == 1) {
			UserEty userEty = list.get(0);
			request.getSession().setAttribute("name", userEty.getName());
			request.getSession().setAttribute("userId", userEty.getId());
			obj.put("result", "success");
		} else {
			obj.put("result", "fail");
			obj.put("info", "用户名或者密码错误！");
		}
		return obj.toString();
	}

	/**
	 * 根据用户ID 获得用户所属的角色对应的菜单树
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getUserTree.sdo")
	public @ResponseBody
	String getUserTree(@RequestParam("userId") int userId) throws Exception {
		JSONArray dataArray = new JSONArray();

		logger.info("----" + userId);

		List<MenuEty> menuList = userDao.selectUserMenuMap(userId);
		for (int i = 0; i < menuList.size(); i++) {
			MenuEty menuEty = menuDao.selectById(menuList.get(i).getParantMenuID());
			menuEty.setIcon("images/menu/" + menuEty.getIcon());
			menuEty.setOpenIcon("images/menu/32/" + menuEty.getOpenIcon());
			String[] menuIds = menuList.get(i).getMenuIds().split(",");
			List<MenuEty> childrenList = new ArrayList<MenuEty>();
			for (int j = 0; j < menuIds.length; j++) {
				MenuEty secondMenuEty = menuDao.selectById(Integer.parseInt(menuIds[j]));
				secondMenuEty.setIcon("images/menu/" + secondMenuEty.getIcon());
				secondMenuEty.setOpenIcon("images/menu/32/" + secondMenuEty.getOpenIcon());
				childrenList.add(secondMenuEty);
			}
			menuEty.setChildren(childrenList);
			dataArray.add(menuEty);
		}

		logger.info("----------------" + dataArray.toString() + "------------------");
		return dataArray.toString();
	}

	/**
	 * 用户登出
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("logout.sdo")
	public @ResponseBody
	String logout(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		request.getSession().removeAttribute("UserName");
		request.getSession().removeAttribute("UserTree");
		request.getSession().invalidate();
		obj.put("result", "success");
		return obj.toString();
	}

	@ExceptionHandler
	public @ResponseBody
	String handle(Exception e) {
		logger.error(e.getMessage(), e);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("result", "error");
		obj.put("info", e.getMessage());
		return obj.toString();
	}

}
