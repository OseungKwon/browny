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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.mapper.LoginMapper;

@Service
@Transactional
public class KakaoLoginService{
	@Autowired
	private LoginMapper loginMapper;
	private HttpServletResponse response;
	
	//구글 상수
    @Value("${sns.kakao.url}")
	private String KAKAO_SNS_BASE_URL;
    @Value("${sns.kakao.url.token}")
    private String KAKAO_SNS_TOKEN_BASE_URL;
	@Value("${sns.kakao.client.id}")
	private String KAKAO_SNS_CLIENT_ID;
	@Value("${sns.kakao.callback.url}")
	private String KAKAO_SNS_CALLBACK_URL;
	@Value("${sns.kakao.client.secret}")
	private String KAKAO_SNS_CLIENT_SECRET;
	//로그인 요청
	public String socialLogin() {
		String url="";
		Map<String, Object> params = new HashMap<>();
		params.put("response_type", "code");
		params.put("client_id", KAKAO_SNS_CLIENT_ID);
		params.put("redirect_uri", KAKAO_SNS_CALLBACK_URL);
		String parameterString = params.entrySet().stream()
			.map(x -> x.getKey() + "=" + x.getValue())
			.collect(Collectors.joining("&"));
		 
		url = KAKAO_SNS_BASE_URL + "?" + parameterString;
		return url;
	}
	//토큰 요청
	public Map<String, Object> socialToken(String code) {
		String url="";
		RestTemplate restTemplate = new RestTemplate();
		 
//        Map<String, Object> params = new HashMap<>();
//        params.put("code", code.replaceAll("%2F","/"));
//        params.put("client_id", KAKAO_SNS_CLIENT_ID);
//        params.put("client_secret", KAKAO_SNS_CLIENT_SECRET);
//        params.put("redirect_uri", KAKAO_SNS_CALLBACK_URL);
//        params.put("grant_type", "authorization_code");
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code.replaceAll("%2F","/"));
        params.add("client_id", KAKAO_SNS_CLIENT_ID);
        params.add("client_secret", KAKAO_SNS_CLIENT_SECRET);
        params.add("redirect_uri", KAKAO_SNS_CALLBACK_URL);
        params.add("grant_type", "authorization_code");
	        
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        try {

	        ResponseEntity<String> responseEntity =
	                restTemplate.postForEntity(KAKAO_SNS_TOKEN_BASE_URL, entity, String.class);
	 
	        if (responseEntity.getStatusCode() == HttpStatus.OK) {
	        	String accessToken=responseEntity.getBody().split("\"access_token\":\"")[1].split("\"")[0];
	            return kakaoInfo(accessToken);
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
	public Map<String, Object> kakaoInfo(String accessToken) {
		Map<String, Object> data = new HashMap<>();
		int result=0;
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+accessToken);
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		try {
			ResponseEntity<String> responseEntity = restTemplate.exchange(
				"https://kapi.kakao.com/v2/user/me", HttpMethod.GET, entity,String.class);
			System.out.println("#############"+responseEntity.getBody());
			String email = responseEntity.getBody().split("\"email\":\"")[1].split("\"")[0];
            result = loginMapper.kakaoInsert(email, accessToken);
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