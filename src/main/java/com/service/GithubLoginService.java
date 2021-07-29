package com.service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.mapper.LoginMapper;

@Service
@Transactional
public class GithubLoginService{
	@Autowired
	private LoginMapper loginMapper;
	private HttpServletResponse response;
	
	//깃허브 상수
	@Value("${sns.github.url}")
	private String GITHUB_SNS_BASE_URL;
	@Value("${sns.github.url.token}")
	private String GITHUB_SNS_TOKEN_BASE_URL;
	@Value("${sns.github.client.id}")
	private String GITHUB_SNS_CLIENT_ID;
	@Value("${sns.github.client.secret}")
	private String GITHUB_SNS_CLIENT_SECRET;
	@Value("${sns.github.callback.url}")
	private String GITHUB_SNS_CALLBACK_URL;
	//로그인 요청
	public String socialLogin() {
		String url="";
		Map<String, Object> params = new HashMap<>();
		params.put("scope", "user:email");
		params.put("client_id", GITHUB_SNS_CLIENT_ID);
		params.put("redirect_uri", GITHUB_SNS_CALLBACK_URL);
		String parameterString = params.entrySet().stream()
			.map(x -> x.getKey() + "=" + x.getValue())
			.collect(Collectors.joining("&"));
		 
		url = GITHUB_SNS_BASE_URL + "?" + parameterString;
		return url;
	}
	//토큰 요청
	public Map<String, Object> socialToken(String code) {
		String url="";
		RestTemplate restTemplate = new RestTemplate();
		 
        Map<String, Object> params = new HashMap<>();
        params.put("code", code.replaceAll("%2F","/"));
        params.put("client_id", GITHUB_SNS_CLIENT_ID);
        params.put("client_secret", GITHUB_SNS_CLIENT_SECRET);
        params.put("redirect_uri", GITHUB_SNS_CALLBACK_URL);
        params.put("grant_type", "authorization_code");
        try {

	        ResponseEntity<String> responseEntity =
	                restTemplate.postForEntity(GITHUB_SNS_TOKEN_BASE_URL, params, String.class);
	 
	        if (responseEntity.getStatusCode() == HttpStatus.OK) {
	        	Map<String, Object> data = new HashMap<>();
	        	if(!responseEntity.getBody().contains("access_token")) {
	        		data.put("result", 0);
	        		return data;
	        	}
	        	String accessToken=responseEntity.getBody().split("access_token=")[1].split("&")[0];
//	        	String idToken=responseEntity.getBody().split("\"id_token\": \"")[1].split("\"")[0];
	        	return githubInfo(accessToken);
	        }	
        }catch(Exception e) {
        	e.printStackTrace();
        }
		//통신 실패시
		Map<String, Object> data = new HashMap<>();
		int result=-1;
		data.put("result", result);
		return data;
		
	}
	
	//핵심 정보 가져오기
	public Map<String, Object> githubInfo(String accessToken) {
		Map<String, Object> data = new HashMap<>();
		int result=0;
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "token "+accessToken);
		headers.set("User-Agent", "Login-App");
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		try {
			ResponseEntity<String> responseEntity = restTemplate.exchange(
				"https://api.github.com/user/public_emails", HttpMethod.GET, entity,String.class);
			String email = responseEntity.getBody().split("\"email\":\"")[2].split("\"")[0];
            result = loginMapper.githubInsert(email, accessToken);
			data.put("email", email);
			data.put("token", accessToken);
        }catch(Exception e) {
        	e.printStackTrace();
        }
		data.put("result", result);
		return data;
	}
	public boolean confirmLogin(String email, String token) {
		Map<String, Object> data = new HashMap<>();
		data.put("email",email);
		data.put("token",token);
		Integer result =loginMapper.countEmailAndToken(data); 
		return result!=null&&result>0;
	}
}