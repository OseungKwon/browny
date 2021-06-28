package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.PostDto;
import com.service.LoginService;
import com.service.PostService;


@Controller
public class PostController {
	@Autowired
	private PostService postService;
	@Autowired
	private LoginService loginService;
	
	@PostMapping(value="/post/list")
	@ResponseBody
	public Map<String, Object> getPostListJson() {
		Map<String, Object> data = new HashMap<>();
		List<PostDto> list = postService.getList(new PostDto());
		data.put("data", list);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트뷰
	@GetMapping(value="/post/view")
	@ResponseBody
	public Map<String, Object> view(PostDto post) {
		Map<String, Object> data = new HashMap<>();
		//등록
		post = postService.select(post);
		//성공 출력
		data.put("data", post);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트 등록
	@PostMapping(value="/post/insert")
	@ResponseBody
	public Map<String, Object> insert(@RequestParam(name="email")String email,@RequestParam(name="token")String token,PostDto post) {
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//필수값 체크
		if(post.getCategory().equals("")||post.getTitle().equals("")||post.getContent().equals("")) {
			data.put("status", 404);
			data.put("msg", "bad request");
			return data;
		}
		//등록
		Integer result = postService.insert(post);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", post);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트 수정
	@PostMapping(value="/post/update")
	@ResponseBody
	public Map<String, Object> update(@RequestParam(name="email")String email,@RequestParam(name="token")String token, PostDto post) {
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//작성자 체크
		if(!postService.confirmCreate(email,post.getPostId())) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//필수값 체크
		if(post.getCategory().equals("")||post.getTitle().equals("")||post.getContent().equals("")) {
			data.put("status", 404);
			data.put("msg", "required resource not available");
			return data;
		}
		//등록
		Integer result = postService.update(post);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", post);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트 삭제
	@PostMapping(value="/post/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam(name="email")String email,@RequestParam(name="token")String token, PostDto post) {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			json.put("status", 403);
			json.put("msg", "no permission");
			return json;
		}
		//작성자 체크
		if(!postService.confirmCreate(email,post.getPostId())) {
			json.put("status", 403);
			json.put("msg", "no permission");
			return json;
		}
		//등록
		Integer result = postService.delete(post);
		//등록 성공 여부 체크
		if(result<=0) {
			json.put("status", 500);
			json.put("msg", "server error");
		}
		//성공 출력
		data.put("postId",post.getPostId());
		json.put("data", data);
		json.put("status", 200);
		json.put("msg", "success");
		return json;
	}

}
