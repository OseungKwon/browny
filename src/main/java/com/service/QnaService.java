package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapper.QnaMapper;
import com.model.QnaDto;

@Service
@Transactional
public class QnaService{
	@Autowired
	private QnaMapper qnaMapper;
	public int insert(QnaDto data) {
		return qnaMapper.insert(data);
	}
	public QnaDto select(QnaDto data) {
		return qnaMapper.select(data);
	}
	public int update(QnaDto data) {
		return qnaMapper.update(data);
	}
	public int delete(QnaDto data) {
		return qnaMapper.delete(data);
	}
	public List<QnaDto> getList(QnaDto data){
		return qnaMapper.getList(data);
	}
	public int getCount(QnaDto data) {
		return qnaMapper.getCount(data);
	}
	public boolean confirmCreate(String email, Integer qnaId) {
		return qnaMapper.confirmCreate(email, qnaId)>0;
	}
	public int getMaxId() {
		return qnaMapper.getMaxId();
	}
	public Integer answer(QnaDto data) {
		return qnaMapper.answer(data);
	}
	
}