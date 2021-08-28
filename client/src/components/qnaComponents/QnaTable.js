import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import CommentIcon from '@material-ui/icons/Comment';
import { useRouter } from 'next/router';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    minHeight: '50px',
    lineHeight: '25px',
  },
  listItemText: {
    maxWidth: '500px',
    fontSize: '20px',
  },
}));

export default function QnaTable({ list }) {
  const router = useRouter();
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const onListItemClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <List className={classes.root}>
        {list.map((qnaInfo, index) => {
          const labelId = `qna-${index}`;

          return (
            <ListItem className={classes.listItem} key={index} role={undefined} href={qnaInfo.id} dense button onClick={onListItemClick}>
              <ListItemText className={classes.listItemText} id={labelId} primary={qnaInfo.title} />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Pagination count={10} />
    </>
  );
}
