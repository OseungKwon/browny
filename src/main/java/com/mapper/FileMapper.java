package com.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper{
	
	public int saveFile(Map<String, Object> data);
	
}