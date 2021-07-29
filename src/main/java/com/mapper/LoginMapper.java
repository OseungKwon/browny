package com.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.model.PostDto;

@Mapper
public interface LoginMapper{
	
	public int googleInsert(String email, String token);

	public Integer countEmailAndToken(Map<String, Object> data);

	public int githubInsert(String email, String token);
	
}