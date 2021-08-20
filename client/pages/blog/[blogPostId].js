import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
//import { useParams } from 'react-router-dom';
// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getPost, getRecentPosts } from 'src/redux/slices/blog';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import Page from 'src/components/Page';
// import Markdown from 'src/components/Markdown';
// import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from 'src/components/blog';
// ----------------------------------------------------------------------


const Viewer = dynamic(
  () => import('src/components/editor/TuiViewer'),
  { ssr: false }
)


const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function BlogPost() {
  const router = useRouter();
    const postId = router.query.blogPostId;
  //console.log(postId);
  const dispatch = useDispatch();
  //const { title } = useParams();
  const { post, error, recentPosts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getPost(postId));
    // dispatch(getRecentPosts(postId));
  }, [dispatch, postId]);
  console.log(post)
  return (
    <Page title="Blog: Post Details | Minimal-UI">
      <Container>
        {/* <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title) }
          ]}
        /> */}

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.title}
              </Typography>
                          
                          
                          <Viewer
                            initialValue="hello111 react editor world!"
                          />
              {/* <Markdown children={post.body} /> */}

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  {/* ({post.comments.length}) */}
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )}

        {/* {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}

        {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
      </Container>
    </Page>
  );
}
