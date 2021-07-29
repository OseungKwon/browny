package com.service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.mapper.LoginMapper;

@Service
@Transactional
public class GoogleLoginService{
	@Autowired
	private LoginMapper loginMapper;
	private HttpServletResponse response;
	
	//구글 상수
    @Value("${sns.google.url}")
	private String GOOGLE_SNS_BASE_URL;
    @Value("${sns.google.url.token}")
    private String GOOGLE_SNS_TOKEN_BASE_URL;
	@Value("${sns.google.client.id}")
	private String GOOGLE_SNS_CLIENT_ID;
	@Value("${sns.google.callback.url}")
	private String GOOGLE_SNS_CALLBACK_URL;
	@Value("${sns.google.client.secret}")
	private String GOOGLE_SNS_CLIENT_SECRET;
	//로그인 요청
	public String socialLogin(String type) {
		String url="";
		if(type.equals("google")) {
			Map<String, Object> params = new HashMap<>();
			params.put("scope", "email");
			params.put("response_type", "code");
			params.put("client_id", GOOGLE_SNS_CLIENT_ID);
			params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
			String parameterString = params.entrySet().stream()
				.map(x -> x.getKey() + "=" + x.getValue())
				.collect(Collectors.joining("&"));
			 
			url = GOOGLE_SNS_BASE_URL + "?" + parameterString;
		}
		return url;
	}
	//토큰 요청
	public Map<String, Object> socialToken(String type, String code) {
		String url="";
		if(type.equals("google")) {
			RestTemplate restTemplate = new RestTemplate();
			 
	        Map<String, Object> params = new HashMap<>();
	        params.put("code", code.replaceAll("%2F","/"));
	        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
	        params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
	        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
	        params.put("grant_type", "authorization_code");
//	        System.out.println("######### socialToken :: GOOGLE_SNS_TOKEN_BASE_URL ::"+GOOGLE_SNS_TOKEN_BASE_URL);
//	        System.out.println("######### params :: "+params);
	        try {

		        ResponseEntity<String> responseEntity =
		                restTemplate.postForEntity(GOOGLE_SNS_TOKEN_BASE_URL, params, String.class);
		 
		        if (responseEntity.getStatusCode() == HttpStatus.OK) {
		        	String accessToken=responseEntity.getBody().split("\"access_token\": \"")[1].split("\"")[0];
		        	String idToken=responseEntity.getBody().split("\"id_token\": \"")[1].split("\"")[0];
		            return googleInfo(idToken, accessToken);
		        }	
	        }catch(Exception e) {
	        	e.printStackTrace();
	        }
		}
		//통신 실패시
		Map<String, Object> data = new HashMap<>();
		int result=-1;
		data.put("result", result);
		return data;
		
	}
	
	//핵심 정보 가져오기
	public Map<String, Object> googleInfo(String token, String accessToken) {
		Map<String, Object> data = new HashMap<>();
		int result=0;
		RestTemplate restTemplate = new RestTemplate();
		 
        Map<String, Object> params = new HashMap<>();
        params.put("id_token", token);
        try {

	        ResponseEntity<String> responseEntity =
	                restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo", params, String.class);
	 
	        if (responseEntity.getStatusCode() == HttpStatus.OK) {
	        	String email = responseEntity.getBody().split("\"email\": \"")[1].split("\"")[0];
	            result = loginMapper.googleInsert(email, accessToken);
	            data.put("email", email);
	            data.put("token", accessToken);
	            
	        }	
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