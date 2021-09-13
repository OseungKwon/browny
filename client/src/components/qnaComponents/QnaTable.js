import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Typography, List, Divider, Grid,
  ListItem, ListItemSecondaryAction, ListItemText, IconButton
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { useRouter } from 'next/router';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// redux
import { useDispatch } from 'react-redux'
import { addViewCount } from 'src/redux/slices/qna';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },

  listItem: {
    display: 'inline-block',
    alignItems: 'center',
    minHeight: '50px',
    lineHeight: '25px',
    
    // marginTop: '10px',
    // backgroundColor: '#f7f7f7'
  },
  listItemText: {
    // maxWidth: '500px',
    fontSize: '20px',
  },
  itemBox: {
    textAlign: 'center',
    fontSize: '1.1rem',
    display: 'block',
    marginTop:'5px'
  }

}));

function InfoItem(name, number) {
  return (
    <Grid item xs={1}>
      <ListItem alignItems="center">
        <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
          {name}
        </Typography>
      </ListItem>
      <ListItem alignItems="center" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        <Typography variant="subtitle1">
          {number}
          {/* {fShortenNumber(number)} */}
        </Typography>
      </ListItem>
    </Grid>
  );
}

export default function QnaTable({ list }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const onListItemClick = (e, qnaId) => {
    e.preventDefault();
    dispatch(addViewCount(qnaId));
    router.push(`${qnaId}`);
  };
  return (
    <>
      <List className={classes.root}>
        {list.map((qnaInfo, index) => {
          const labelId = `qna-${index}`;
          console.log(qnaInfo);;
          return (
            <>
              <Divider />

              <Grid container sx={{ py: 3, textAlign: 'center' }}>
                 
                {InfoItem("조회수", qnaInfo.views)}
                {InfoItem("좋아요", qnaInfo.likeCount)}
                {InfoItem("답변", qnaInfo.commentCnt)}
                <Grid item xs={9}>
                  <ListItem className={classes.listItem} key={index} role={undefined} dense button onClick={e => onListItemClick(e, qnaInfo.qnaId)}>
                    <ListItem>
                      <Typography variant="subtitle1" gutterBottom>
                        {qnaInfo.title}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Avatar style={ {marginRight:10} }alt="Remy Sharp" src={ qnaInfo.avartarUrl }/>
                      <ListItemText primary={ qnaInfo.name } />
                    </ListItem>
                    <ListItem>
                      <ListItemText className={classes.listItemText} id={labelId} primary={qnaInfo.content} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <CommentIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </ListItem>
                </Grid>
              </Grid>
            
                
              <Divider />
            </>
          );
        })}
      </List>
      {/* <Pagination count={10} /> */}
    </>
  );
}
