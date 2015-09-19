package com.extweb.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.extweb.dao.UserDao;
import com.extweb.model.UserEty;
import com.extweb.service.UserRoleService;
import com.extweb.util.JSONGrid;

/**
 * 用户管理
 * 
 * @author
 */
@Controller
@RequestMapping(value = "/basic/UserController/")
public class UserController {

	private Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserDao userDao;

	@Resource(name = "UserRoleService")
	private UserRoleService userRoleService;

	@InitBinder
	public void initBibder(WebDataBinder binder) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		df.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	}

	/**
	 * 查询全部用户
	 * 
	 * @param request
	 * @param response
	 * @param userEty
	 * @return userEty
	 * @throws Exception
	 */
	@RequestMapping(value = "list.sdo")
	public @ResponseBody
	String list(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		int count = userDao.selectLimitCount(user);
		List<UserEty> list = userDao.selectByLimit(user);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd"));
		logger.info("-----------" + retObj.toString());

		return retObj.toString();
	}

	/**
	 * 添加或更改用户
	 * 
	 * @param request
	 * @param response
	 * @param userEty
	 * @throws Exception
	 */
	@RequestMapping(value = "add.sdo")
	public @ResponseBody
	String add(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		if (userEty.getId() == null) {
			userEty.setInsert_date(new Date());
			userDao.insert(userEty);
		} else {
			userDao.updateById(userEty);
		}
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 根据 id删除用户
	 * 
	 * @param request
	 *            id
	 * @throws Exception
	 */
	@RequestMapping(value = "delete.sdo", method = RequestMethod.POST)
	public @ResponseBody
	String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		userDao.deleteById(id);
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 
	 * 根据id 配置用户的角色
	 * 
	 * */
	@RequestMapping(value = "setRole.sdo")
	public @ResponseBody
	String setRole(@RequestParam("userid") Integer userId, @RequestParam("roleid") String roleIds) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		userRoleService.saveUserRole(userId, roleIds);
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
