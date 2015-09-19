package com.extweb.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
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

import com.extweb.dao.MenuDao;
import com.extweb.model.MenuEty;
import com.extweb.model.PictureEty;
import com.extweb.util.JSONGrid;

import com.alibaba.fastjson.JSON;
/**
 * 菜单管理
 * 
 * @author
 */
@Controller
@RequestMapping(value = "/basic/MenuController/")
public class MenuController {

	private Logger logger = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	MenuDao menuDao;

	/**
	 * 全部菜单列成树
	 * 
	 * @param request
	 * 
	 * @param response
	 * 
	 * @return JsonTree
	 * 
	 * @throws Exception
	 */
	@RequestMapping(value = "list.sdo")
	public @ResponseBody
	String list(@RequestParam("id") int id) throws Exception {
		JSONArray dataArray = new JSONArray();
		List<MenuEty> firstList = menuDao.getListByParentId(id);

		for (int i = 0; i < firstList.size(); i++) {
			MenuEty node = firstList.get(i);
			node.setIcon("images/menu/" + node.getIcon());
			node.setOpenIcon("images/menu/32/" + node.getOpenIcon());
			// 是否有子结点
			List<MenuEty> subList = menuDao.getListByParentId(node.getId());
			if (subList.size() > 0) {
				for (int j = 0; j < subList.size(); j++) {
					MenuEty secondNode = subList.get(j);
					secondNode.setIcon("images/menu/" + secondNode.getIcon());
					secondNode.setOpenIcon("images/menu/32/" + secondNode.getOpenIcon());
				}
				node.setLeaf(false);
				node.setChildren(subList);
			} else {
				node.setLeaf(true);
			}
			dataArray.add(node);
		}
		logger.info("----------" + dataArray.toString());
		return dataArray.toString();
	}

	/**
	 * 添加或更改菜单
	 * 
	 * @param request
	 * @param response
	 * @param menuEty
	 * @throws Exception
	 */
	@RequestMapping(value = "add.sdo")
	public @ResponseBody
	String add(HttpServletRequest request, HttpServletResponse response, MenuEty menuEty) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		String json = JSON.toJSONStringWithDateFormat(menuEty, "yyyy-MM-dd HH:mm:sss");
        System.out.println("------------pppp-----" + json);
		if (0 == menuEty.getId()) {
			menuDao.insert(menuEty);
		} else {
			menuDao.updateById(menuEty);
		}
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 根据 id删除菜单
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
		if (menuDao.getUsingMenu(id) > 0) {
			obj.put("result", "error");
			obj.put("info", "该菜单已经被某角色使用，暂时不能删除！");
			return obj.toString();
		}
		menuDao.deleteById(id);
		obj.put("result", "success");
		return obj.toString();
	}

	/**
	 * 查询图表列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("searchPic.sdo")
	public @ResponseBody
	String searchPic(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject data = new JSONObject();
		List<PictureEty> picList = new ArrayList<PictureEty>();
		HttpSession session = request.getSession();
		ServletContext application = session.getServletContext();
		String Path = application.getRealPath("/") + "images/menu/32";
		Path = Path.replace("/", File.separator);
		File folderList = new File(Path);
		File list[] = folderList.listFiles();
		if (list != null && list.length > 0) {
			for (int i = 0; i < list.length; i++) {
				int index = list[i].toString().indexOf("menu");
				String path = list[i].toString().substring(index + 7, list[i].toString().length());
				PictureEty ety = new PictureEty();
				ety.setName(path.substring(1, path.indexOf(".")));

				path = path.replace('\\', '/'); /* 需要进行路径转换，否则前台不能显示图片 */
				ety.setUrl("images/menu/32" + path);
				picList.add(ety);
			}
			data = JSONGrid.toJSon(picList, list.length);
			System.out.println("XTemplate ---:  " + data.toString());
			return data.toString();
		}
		return null;
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
