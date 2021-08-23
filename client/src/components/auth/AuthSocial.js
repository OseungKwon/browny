import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import GitHubIcon from '@material-ui/icons/GitHub';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';
import { signIn, callback , signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

// hooks
//import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthSocials() {
  // const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      signIn("google");
      // await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      signIn("github");
      // await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      // await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          SNS로 로그인하기
        </Typography>
      </Divider>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginGoogle}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginFaceBook}>
          <GitHubIcon height={24} />
          {/* <Icon icon={facebookFill} color="#1877F2" height={24} /> */}
        </Button>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginTwitter}>
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      
    </>
  );
}
