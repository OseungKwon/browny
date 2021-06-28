package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapper.PostMapper;
import com.model.PostDto;

@Service
@Transactional
public class PostService{
	@Autowired
	private PostMapper postMapper;
	public int insert(PostDto data) {
		return postMapper.insert(data);
	}
	public PostDto select(PostDto data) {
		return postMapper.select(data);
	}
	public int update(PostDto data) {
		return postMapper.update(data);
	}
	public int delete(PostDto data) {
		return postMapper.delete(data);
	}
	public List<PostDto> getList(PostDto data){
		return postMapper.getList(data);
	}
	public int getCount(PostDto data) {
		return postMapper.getCount(data);
	}
	public boolean confirmCreate(String email, Integer postId) {
		return postMapper.confirmCreate(email, postId)>0;
	}
	
}