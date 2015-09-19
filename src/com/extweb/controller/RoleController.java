package com.extweb.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.extweb.dao.RoleDao;
import com.extweb.model.RoleEty;
import com.extweb.util.JSONGrid;

/**
 * 角色管理
 * 
 * @author
 */
@Controller
@RequestMapping(value = "/basic/RoleController/")
public class RoleController {
	private Logger logger = LoggerFactory.getLogger(RoleController.class);

	@Autowired
	RoleDao roleDao;

	/**
	 * 角色列表
	 * 
	 * @param request
	 * @param response
	 * @param roleEty
	 * @return roleEty
	 * @throws Exception
	 * */
	@RequestMapping(value = "list.sdo")
	public @ResponseBody
	String list(HttpServletRequest request, HttpServletResponse response, RoleEty roleEty) throws Exception {
		int count = roleDao.selectLimitCount(roleEty);
		List<RoleEty> list = roleDao.selectByLimit(roleEty);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd"));
		return retObj.toString();
	}

	/**
	 * 角色查询
	 */

	/**
	 * 角色添加 或修改
	 * 
	 * @param request
	 * 
	 * @param response
	 * 
	 * @param roleEty
	 * 
	 * @throws Exception
	 */
	@RequestMapping(value = "add.sdo")
	public @ResponseBody
	String add(HttpServletRequest request, HttpServletResponse response, RoleEty roleEty) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		if (roleEty.getId() == null) {
			roleDao.insert(roleEty);
		} else {
			roleDao.updateById(roleEty);
		}
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 根据 id删除角色
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
		if (roleDao.getUsingRole(id) > 0) {
			obj.put("result", "error");
			obj.put("info", "该角色已经被用户指定，暂时不能删除！");
			return obj.toString();
		}
		roleDao.deleteById(id);
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 
	 * 根据id menuId 配置菜单
	 * 
	 * @param request
	 * @param roleId
	 *            menuId
	 * */
	@RequestMapping(value = "setMenu.sdo")
	public @ResponseBody
	String setRole(@RequestParam("roleId") Integer roleId, @RequestParam("menuId") String menuId) {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		roleDao.deleteMenu(roleId);
		if (!menuId.equals("") && !menuId.equals(null)) {
			String[] roleList = menuId.split(",");
			Map<String, Integer> roleMap = new HashMap<String, Integer>();
			roleMap.put("roleId", roleId);
			for (int i = 0; i < roleList.length; i++) {
				roleMap.put("menuId", Integer.parseInt(roleList[i]));
				roleDao.insertMenu(roleMap);
			}
		}
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
