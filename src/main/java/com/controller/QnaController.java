package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.QnaDto;
import com.service.GoogleLoginService;
import com.service.QnaService;


@RestController
public class QnaController {
	@Autowired
	private QnaService qnaService;
	@Autowired
	private GoogleLoginService loginService;
	
	@GetMapping(value="/qna/list")
	public Map<String, Object> getQnaListJson() {
		Map<String, Object> data = new HashMap<>();
		List<QnaDto> list = qnaService.getList(new QnaDto());
		data.put("data", list);
		data.put("status", 200);
		data.put("msg", "success");
		return data; 
	}
	//포스트뷰
	@PostMapping(value="/qna/view")
	public Map<String, Object> view(QnaDto param, @RequestParam(name="email") String email) {
		Map<String, Object> data = new HashMap<>();
		//읽어오기
		param = qnaService.select(param);
		//삭제되었을 경우
		if(param.getDeleteYn().equals("Y")) {
			data.put("status", 404);
			data.put("msg", "deleted qna");
			return data;
		}
		//성공 출력
		data.put("data", param);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	
	/*
	 * 조회수증가 
	 * */
	@PutMapping(value="/qna/updateViews")
	public Map<String, Object> updateViews(@RequestParam(name="qnaId") String qnaId ,@RequestBody QnaDto param) {
		Map<String, Object> data = new HashMap<>();
		//등록
		Integer result = qnaService.updateViews(param);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", param);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	
	//포스트 등록
	@PostMapping(value="/qna/insert")
	public Map<String, Object> insert(@RequestParam(name="email")String email,@RequestParam(name="token")String token,QnaDto param) {
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//필수값 체크
		if(param.getCategory().equals("")||param.getTitle().equals("")||param.getContent().equals("")) {
			data.put("status", 404);
			data.put("msg", "bad request");
			return data;
		}
		//등록
		Integer result = qnaService.insert(param);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", param);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트 수정
	@PostMapping(value="/qna/update")
	public Map<String, Object> update(@RequestParam(name="email")String email,@RequestParam(name="token")String token, QnaDto qna) {
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//작성자 체크
		if(!qnaService.confirmCreate(email,qna.getQnaId())) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//필수값 체크
		if(qna.getCategory().equals("")||qna.getTitle().equals("")||qna.getContent().equals("")) {
			data.put("status", 404);
			data.put("msg", "required resource not available");
			return data;
		}
		//등록
		Integer result = qnaService.update(qna);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", qna);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//답변 등록 /수정
	@PostMapping(value="/qna/answer")
	public Map<String, Object> answer(@RequestParam(name="email")String email,@RequestParam(name="token")String token, QnaDto qna) {
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//작성자가 아닌지 체크
		if(qnaService.confirmCreate(email,qna.getQnaId())) {
			data.put("status", 403);
			data.put("msg", "no permission");
			return data;
		}
		//필수값 체크
		if(qna.getAnswerTitle().equals("")||qna.getAnswerContent().equals("")) {
			data.put("status", 404);
			data.put("msg", "required resource not available");
			return data;
		}
		//등록
		Integer result = qnaService.answer(qna);
		//등록 성공 여부 체크
		if(result<=0) {
			data.put("status", 500);
			data.put("msg", "server error");
		}
		//성공 출력
		data.put("data", qna);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//포스트 삭제
	@PostMapping(value="/qna/delete")
	public Map<String, Object> delete(@RequestParam(name="email")String email,@RequestParam(name="token")String token, QnaDto qna) {
		Map<String, Object> json = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		//로그인 체크
		if(!loginService.confirmLogin(email,token)) {
			json.put("status", 403);
			json.put("msg", "no permission");
			return json;
		}
		//작성자 체크
		if(!qnaService.confirmCreate(email,qna.getQnaId())) {
			json.put("status", 403);
			json.put("msg", "no permission");
			return json;
		}
		//등록
		Integer result = qnaService.delete(qna);
		//등록 성공 여부 체크
		if(result<=0) {
			json.put("status", 500);
			json.put("msg", "server error");
		}
		//성공 출력
		data.put("qnaId",qna.getQnaId());
		json.put("data", data);
		json.put("status", 200);
		json.put("msg", "success");
		return json;
	}
	//이전 글 보기
	@GetMapping(value="/qna/view/prev")
	public Map<String, Object> viewPrev(QnaDto qna) {
		Map<String, Object> data = new HashMap<>();
		//없으면 그 이전으로
		while(qna.getDeleteYn().equals("Y")) {
			qna.setQnaId(qna.getQnaId()-1);
			//첫번째 글일 경우
			if(qna.getQnaId()<=0) {
				data.put("status", 404);
				data.put("msg", "previous qna not exist");
				return data;
			}
			qna = qnaService.select(qna);
			//너무 큰값을 넣었다면
			if(qna==null) {
				data.put("status", 404);
				data.put("msg", "previous qna not exist");
				return data;
			}
		}
		//성공 출력
		data.put("data", qna);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}
	//이전 글 보기
	@GetMapping(value="/qna/view/next")
	public Map<String, Object> viewNext(QnaDto param) {
		Map<String, Object> data = new HashMap<>();
		//최대값을 구함
		int maximum=qnaService.getMaxId();
		//최대값일 경우
		if(param.getQnaId()>=maximum) {
			data.put("status", 404);
			data.put("msg", "next qna not exist");
			return data;
		}
		while(maximum>param.getQnaId()) {
			param.setQnaId(param.getQnaId()+1);
			param = qnaService.select(param);
			//너무 작은 값을 넣었다면
			if(param==null) {
				data.put("status", 404);
				data.put("msg", "next qna not exist");
				return data;
			}
		}
		//성공 출력
		data.put("data", param);
		data.put("status", 200);
		data.put("msg", "success");
		return data;
	}

}
