package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.model.PostDto;
import com.service.FileService;
import com.service.GoogleLoginService;


@Controller
public class FileController {
	@Autowired
	private FileService fileService;
	@Autowired
	private GoogleLoginService loginService;

	@PostMapping(value="/file/image")
	@ResponseBody
	public Map<String, Object> imageUpload(@RequestParam("file") MultipartFile file, @RequestParam(name="email")String email,@RequestParam(name="token")String token) throws Exception {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			json.put("status", 403);
			json.put("msg", "no permission");
			return json;
		}
		//파일 등록
		data.put("originFileName", StringUtils.cleanPath(file.getOriginalFilename()));
		String url=fileService.uploadImage(file,email);
		//출력
		data.put("url", url);
		json.put("data", data);
		json.put("status", 200);
		json.put("msg", "success");
		return json;
	}
}
