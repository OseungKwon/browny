package com.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.model.PostDto;

@Mapper
public interface PostMapper{
	
	public int insert(PostDto data);
	public PostDto select(PostDto data);
	public int update(PostDto data);
	public int delete(PostDto data);
	public List<PostDto> getList(PostDto data);
	public int getCount(PostDto data);
	
}