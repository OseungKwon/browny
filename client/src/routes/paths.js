// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_BLOG = '/blog';
const QnA_Board = '/QnA';
const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageTwo: path(ROOTS_DASHBOARD, '/two'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    pageFour: path(ROOTS_DASHBOARD, '/app/four'),
    pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    pageSix: path(ROOTS_DASHBOARD, '/app/six'),
  },
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  general: {
    list: path(ROOTS_BLOG, '/blogList'),
    post: path(ROOTS_BLOG, '/blogPost'),
    newPost: path(ROOTS_BLOG, '/blogNewPost'),
  },
  app: {
    root: path(QnA_Board, '/app'),
    // pageFour: path(QnA_Board, '/app/post'),
  },
};

export const QnA = {
  root: QnA_Board,
  general: {
    list: path(QnA_Board, '/qnaList'),
    post: path(QnA_Board, '/qnaPost'),
  },
  app: {
    root: path(QnA_Board, '/app'),
    // pageFour: path(QnA_Board, '/app/post'),
  },
};
