package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.LoginService;


@Controller
public class LoignController {
	@Autowired
	private LoginService loginService;
	
	@GetMapping(value="/login")
	public String loginPage() {
		
		return "login/login";
	}
	@GetMapping(value="/login/{type}/callback")
	public String loginCallback(Model model,@PathVariable(name="type")String type,
			@RequestParam(name="code")String code
		) {
		return "login/callback";
	}
	
	
	
	@GetMapping(value="/login/{type}")
	@ResponseBody
	public Map<String, Object> getUrl(@PathVariable(name="type")String type) {
		
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		json.put("success", 200);
		String url = loginService.socialLogin(type);
		data.put("url", url);
		json.put("data", data);
		return json;
	}
	
	
	@GetMapping(value="/login/{type}/token")
	@ResponseBody
	public Map<String, Object> getToken(@PathVariable(name="type")String type,@RequestParam(name="code")String code) {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = loginService.socialToken(type,code);
		if((int)data.get("result")<0) {
			json.put("error", 500);
			json.put("msg", "server connection error");
		}else {
			json.put("success", 200);
		}
		json.put("data", data);
		return json;
	}

}
