
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState, useRef, forwardRef} from 'react';
// redux
import { useDispatch } from 'src/redux/store';

import { addPost } from 'src/redux/slices/blog';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from '@material-ui/core';
// utils
import fakeRequest from '../../utils/fakeRequest';
//import { QuillEditor } from '../editor';
import UploadSingleFile from '../upload/UploadSingleFile';
//
import React from 'react';

// ----------------------------------------------------------------------

const Editor = dynamic(() => import('../editor/TuiEditor'), { ssr: false })
// 2. Pass down to child components using forwardRef
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
))
// const Editor = dynamic(
//   () => import('../editor/TuiEditor'),
//   { ssr: false }
// )

const TAGS_OPTION = [
  'Javascript',
  'Java',
  'React',
  'Vue',
  'Angular',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm({ post }) {
  const router = useRouter();
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  //const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  console.log(post);
  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요'),
    //description: Yup.string().required('설명을 입력하세요'),
    //content: Yup.string().min(1000).required('내용을 입력해 주세요.'),
    //cover: Yup.mixed().required('Cover is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: null,
      tags: [],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
    },
    validationSchema: NewBlogSchema,

    //글쓰기
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const instance = editorRef.current.getInstance();
        values.content = instance.getMarkdown();
        const res = await dispatch(addPost(values));
        router.push(`/blog/${res.postId}`)
        // blog/blogNewPost
        // resetForm();
        // handleClosePreview();
        // setSubmitting(false);
        //enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue],
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="제목"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  {/* <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="설명"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  /> */}

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip key={option} size="small" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => <TextField {...params} label="태그" />}
                  />

                  <div>
                    <LabelStyle>내용</LabelStyle>
                    <EditorWithForwardedRef
                      placeholder="필수 입력사항 입니다."
                      initialValue="# 내용..."
                      previewStyle="vertical"
                      height="600px"
                      initialEditType="markdown"
                      useCommandShortcut={true}
                      ref={editorRef}
                    />

                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <LabelStyle>썸네일</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="공개여부"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="댓글여부"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                
                  <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                    작성하기
                  </LoadingButton>
                  <Button
                    fullWidth
                    type="button"
                    color="inherit"
                    variant="outlined"
                    size="large"
                    onClick={() => router.back()}
                    sx={{ ml: 1.5 }}
                  >
                    나가기
                  </Button>
                </Stack>
              </Card>
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip key={option} size="small" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField fullWidth multiline minRows={3} maxRows={5} label="Meta description" {...getFieldProps('metaDescription')} />
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  작성하기
                </LoadingButton>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ ml: 1.5 }}
                >
                  나가기
                </Button>
              </Stack>
            </Grid> */}
          </Grid>
        </Form>
      </FormikProvider>

      
    </>
  );
}
