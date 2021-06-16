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
		
		Map<String, Object> data = new HashMap<>();
		data.put("success", 200);
		String url = loginService.socialLogin(type);
		data.put("url", url);
		return data;
	}
	
	
	@GetMapping(value="/login/{type}/token")
	@ResponseBody
	public Map<String, Object> getToken(@PathVariable(name="type")String type,@RequestParam(name="code")String code) {
		System.out.println("################# [s] GET TOKEN CONTROLLER #####################");
		System.out.println("################# code ::" +code);
		Map<String, Object> data = new HashMap<>();
		data.put("success", 200);
		int result = loginService.socialToken(type,code);
		data.put("result", result);
		return data;
	}

}
