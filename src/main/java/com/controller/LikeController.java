package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.QnaDto;
import com.service.LikeService;

@Controller
public class LikeController {
	@Autowired
	private LikeService likeService;

	/*
	 * 조회수증가 
	 * */
	@PutMapping(value="/{contentType}/editLikes")
	@ResponseBody
	public Map<String, Object> updateViews(@PathVariable String contentType, @RequestBody Map<String, Object> paramMap) {
		Map<String, Object> data = new HashMap<>();
		//등록	
		Integer result = likeService.editLikes(contentType, paramMap);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", paramMap);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	
}
