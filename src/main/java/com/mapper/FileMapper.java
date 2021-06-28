package com.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.model.PostDto;

@Mapper
public interface FileMapper{
	
	public int saveFile(Map<String, Object> data);
	
}