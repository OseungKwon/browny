import { orderBy } from 'lodash';

//import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { getPostsInitial, getMorePosts } from 'src/redux/slices/blog';
// routes
import { PATH_BLOG } from 'src/routes/paths';
// components
import Page from "src/components/Page";
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from 'src/components/blog';
// layouts
import MainLayout from 'src/layouts/main';
import React from 'react';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default function BlogPosts() {
  const ContentStyle = styled('div')(({ theme }) => ({
      overflow: 'hidden',
      position: 'flex',
      paddingTop: 100,
      backgroundColor: theme.palette.background.default,
    }));
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('latest');
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);
      console.log(posts)
  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <MainLayout>
        <ContentStyle>
            <Page title="Page One | Minimal-UI">
            <Container>
                {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                
                
                </Stack> */}

                
{/*               
                <Grid container spacing={3}>
                    BlogPostCard
                </Grid> */}

            
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <BlogPostsSearch/>
              <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
            </Stack>

        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: 'inherit' }}
        >
          <Grid container spacing={3}>
            {sortedPosts.map((post, index) => (
              <BlogPostCard key={index} post={post} index={index} />
            ))}
          </Grid>
        </InfiniteScroll>
            </Container>
            </Page>
        </ContentStyle>
    </MainLayout>
  );
}
