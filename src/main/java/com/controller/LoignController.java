package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.GithubLoginService;
import com.service.GoogleLoginService;


@Controller
public class LoignController {
	@Autowired
	private GoogleLoginService googleService;
	@Autowired
	private GithubLoginService githubService;
	
	@GetMapping(value="/login")
	public String loginPage() {
		
		return "login/login";
	}
	
	/**
	 * 구글 로그인
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/google")
	@ResponseBody
	public Map<String, Object> getUrl() {
		String type="google";
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		json.put("status", 200);
		json.put("msg", "success");
		String url = googleService.socialLogin(type);
		data.put("url", url);
		json.put("data", data);
		return json;
	}

	/**
	 * 구글 로그인 콜백
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/google/callback")
	public String loginCallback(Model model,
			@RequestParam(name="code")String code
		) {
		return "login/callback";
	}
	
	/**
	 * 구글 로그인 토큰
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/google/token")
	@ResponseBody
	public Map<String, Object> getToken(@RequestParam(name="code")String code) {
		String type="google";
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = googleService.socialToken(type,code);
		if((int)data.get("result")<0) {
			json.put("status", 500);
			json.put("msg", "server error");
		}else {
			json.put("status", 200);
			json.put("msg", "success");
		}
		json.put("data", data);
		return json;
	}
	
	/**
	 * 깃허브 로그인
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/github")
	@ResponseBody
	public Map<String, Object> getGithubUrl() {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		json.put("status", 200);
		json.put("msg", "success");
		String url = githubService.socialLogin();
		data.put("url", url);
		json.put("data", data);
		return json;
	}
	
	/**
	 * 깃허브 로그인 콜백
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/github/callback")
	public String loginGithubCallback(Model model,
			@RequestParam(name="code")String code
		) {
		return "login/callback";
	}
	
	/**
	 * 구글 로그인 토큰
	 * @param model
	 * @param type
	 * @param code
	 * @return
	 */
	@GetMapping(value="/login/github/token")
	@ResponseBody
	public Map<String, Object> getGithubToken(@RequestParam(name="code")String code) {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = githubService.socialToken(code);
		if((int)data.get("result")<0) {
			json.put("status", 500);
			json.put("msg", "server error");
		}else {
			json.put("status", 200);
			json.put("msg", "success");
		}
		json.put("data", data);
		return json;
	}

}
