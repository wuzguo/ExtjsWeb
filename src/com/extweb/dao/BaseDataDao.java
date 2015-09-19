package com.extweb.dao;

import java.util.List;

import com.extweb.dao.base.BaseDao;
import com.extweb.model.BaseData;

public interface BaseDataDao extends BaseDao<BaseData>{

	public List<BaseData> getBaseDataListByType(BaseData baseData);
}
