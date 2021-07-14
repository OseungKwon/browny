import { Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, Link } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//toast-ui editor 선언
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
const PostWrite = () => {
    const isAuthenticated = useSelector(state => state.auth);
    const [form, setForm] = useState({
        title: "",
        contents: "",
        fileUrl: ""
    })
    const dispatch = useDispatch();
    const onChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        await e.preventDefault();
        const { title, contents, fileUrl, category } = form;
    }
    
//     const editor = new Editor({
//         el: document.querySelector('#editor'),
//         height: '500px',
//         initialEditType: 'markdown',
//         previewStyle: 'vertical'
//     });

//    editor.getHtml();


    return (
        <div>
            <div style={{ width: "100%", float:"left"}}>
                <form>
                    <FormGroup>
                        <FormControl>
                            <InputLabel htmlFor="title">제목을 입력하세요.</InputLabel>
                            <Input id="title" aria-describedby="my-helper-text" />
                        </FormControl>

                        <FormControl>
                            태그수정해야함
                            
                        </FormControl>
                    </FormGroup>
                    <Editor
                        previewStyle="vertical"
                        height="75vh"
                        placeholder="내용을 입력해 주세요."
                    />
                </form>
            </div>
            <div className="mt-10">
                <Button onClick={{}}
                    variant="contained"
                    color="secondary"
                >나가기</Button>
               
                <Button
                    variant="contained"
                    color="inherit"
                >임시저장</Button>
                <Button
                    variant="contained"
                    color="primary"
                >저장</Button>
                
            </div>
        </div>
        
    )
};

export default PostWrite;