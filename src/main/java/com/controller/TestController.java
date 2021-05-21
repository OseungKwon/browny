package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.PostDto;
import com.service.PostService;


@Controller
public class TestController {
	@Autowired
	private PostService postservice;
	
	@GetMapping(value="/index")
	@ResponseBody
	public Map<String, Object> test() {
		
		Map<String, Object> test = new HashMap<>();
		test.put("success", 200);
		return test;
	}
	
	@GetMapping(value="/post/list")
	public String getPostList() {
		
		return "abc";
	}
	
	@GetMapping(value="/post/list/json")
	@ResponseBody
	public Map<String, Object> getPostListJson() {
		
		Map<String, Object> data = new HashMap<>();
		data.put("success", 200);
		List<PostDto> list = postservice.getList(new PostDto());
		data.put("data", list);
		return data;
	}

}
