import NextLink from 'next/link';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { IconButton } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {
    Grid,
    Paper,
    List,
    Divider,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { MCheckbox } from '../@material-extend';
import Block from '../Block';
// utils
import { fShortenNumber } from '../../utils/formatNumber';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function BlogEtc({ post }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { favorite, tags, favoritePerson } = post;
    const ListWrapperStyle = styled(Paper)(({ theme }) => ({
        width: '100%',
        border: `solid 1px ${theme.palette.divider}`
    }));
    
    return (
        <>
            <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders" >
                    <ListItem button>
                        <Checkbox
                            style={{paddingLeft:'12px'}}
                            color="error" icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <ShareOutlinedIcon/>
                        </IconButton>
                        {/* <ListItemText primary="Inbox" /> */}
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <NextLink href="/blog/blogEditPost" passHref>
                            <IconButton aria-label="add an alarm">
                                <EditOutlinedIcon/>
                            </IconButton>
                        </NextLink>
                        
                        {/* <ListItemText primary="Inbox" /> */}
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <IconButton aria-label="add an alarm">
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                        {/* <ListItemText primary="Inbox" /> */}
                    </ListItem>
                    

                </List>
            </ListWrapperStyle>
            
        </>
                
    )
}

export default BlogEtc
