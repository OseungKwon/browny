import { useState, useRef, useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_AUTH } from '../../routes/paths';
// material
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Box, Card, Stack, Link, Alert, Tooltip, Container, Typography
} from '@material-ui/core';
import LoginForm from './LoginForm';
import AuthSocials from './AuthSocial';
// ----------------------------------------------------------------------

export default function Login() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
    const handleLoginAuth0 = async () => {
        try {
        // await login();
        } catch (error) {
        console.error(error);
        }
    };
    const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'inline',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 0)
    }));

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen('paper')} sx={{ mr: 2 }}>
        로그인
      </Button>

      <Dialog open={open} onClose={handleClose} scroll={scroll}>
        <DialogTitle sx={{ pb: 2 }}>QLICK 로그인</DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                  
            
                <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        QLICK 로그인하기
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>이메일 또는 SNS로 로그인 가능합니다.</Typography>
                    </Box>

                
                </Stack>

                {/* <AuthSocials /> */}

                <Alert severity="info" sx={{ mb: 3 }}>
                    Use email : <strong>demo@minimals.cc</strong> / password :<strong>&nbsp;demo1234</strong>
                </Alert>

             
                    <LoginForm />
             <AuthSocials/>
                    {/* <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
                    Login
                    </Button> */}
             
                    
                </ContentStyle>
        </DialogContent>
              <DialogActions>
                   <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        <Link variant="subtitle2" to="/">
                            QLICK 10초만에 회원가입하기
                        </Link>
                    </Typography>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
