// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const QnA_Board = '/QnA';

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
