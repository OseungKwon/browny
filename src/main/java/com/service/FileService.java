package com.service;



import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.mapper.FileMapper;

@Service
@Transactional
public class FileService{
	@Autowired
	private FileMapper fileMapper;
	@Value("${file.upload.dir}")
	private Path UPLOAD_DIR;
	
	public String uploadImage(MultipartFile file, String email) throws Exception {
		Map<String, Object> data=new HashMap<>();
		String originFileName=StringUtils.cleanPath(file.getOriginalFilename());
		String ext=FilenameUtils.getExtension(file.getOriginalFilename());
		try {
			//정상적이지 않은 파일네임 확인
			if(originFileName.contains("..")) {
				throw new Exception("invalid file name : "+originFileName);
			}
			//허용된 확장자인지 확인
			if(!"gif,jpg,jpeg,png".contains(ext)) {
				throw new Exception("unallowed file extention : "+originFileName);
			}
			//용량 확인 5메가 이상 안받음
			if(file.getSize()>5*1024*1024) {
				throw new Exception("big size image : "+originFileName);
			}
			//파일 저장 위치 디렉토리 없을 시 생성
			Files.createDirectories(this.UPLOAD_DIR);
			
			//파일 업로드
			Path targetLocation = this.UPLOAD_DIR.resolve(originFileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			
			//파일 이름 변경
			String serverFileName=(new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()))+(new Random()).nextInt(100)+"."+ext;
			File serverFile = new File(targetLocation.toAbsolutePath().toString());
			File renameFile = new File(this.UPLOAD_DIR.resolve(serverFileName).toAbsolutePath().toString());
			serverFile.renameTo(renameFile);
			//파일을 DB에 저장
			data.put("fileExt",ext);
			data.put("fileType","image");
			data.put("fileSize",file.getSize());
			data.put("originFileName",originFileName);
			data.put("serverFilePath",renameFile.getAbsolutePath());
			data.put("serverFileName",serverFileName);
			int result = fileMapper.saveFile(data);
			if(result<=0) {
				throw new Exception("server error : "+originFileName);
			}
			
			return renameFile.getAbsolutePath();
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
}