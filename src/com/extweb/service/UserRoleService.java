package com.extweb.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.extweb.dao.UserDao;

@Service(value = "UserRoleService")
@Scope(value = "singleton")
public class UserRoleService {

	@Autowired
	private UserDao userDao;

	/**
	 * 配置角色用户
	 * 
	 * @param userId
	 * @param roleIds
	 */
	@Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = java.lang.Exception.class)
	public void saveUserRole(Integer userId, String roleIds) {

		userDao.deleteRole(userId);
		if (null != roleIds || roleIds.length() > 0) {
			String[] roleList = roleIds.split(",");
			Map<String, Integer> userMap = new HashMap<String, Integer>();
			userMap.put("userId", userId);
			for (int i = 0; i < roleList.length; i++) {
				if (null != roleList[i] || roleList[i].length() > 0) {
					userMap.put("roleId", Integer.parseInt(roleList[i]));
					userDao.insertRole(userMap);
				}
			}
		}

	}
}
