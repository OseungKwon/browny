package com.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.model.PostDto;

@Mapper
public interface LikeMapper {
	public int insertUserLike(Map<String, Object> data);
	public int updateUserLike(Map<String, Object> data);
	
}
