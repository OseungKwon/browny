package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class TestController {

	@GetMapping(value="/index")
	@ResponseBody
	public Map<String, Object> test() {
		
		Map<String, Object> test = new HashMap<>();
		test.put("success", 200);
		return test;
	}

}
