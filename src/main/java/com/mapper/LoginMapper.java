package com.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.model.PostDto;

@Mapper
public interface LoginMapper{
	
	public int googleInsert(String email, String accessToken);
	
}