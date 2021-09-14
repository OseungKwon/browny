import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------
const API_URL = "http://localhost:8080";
const initialState = {
  isLoading: false,
  error: false,
  qnaList: [],
  qna: null,
  recentQnas: [],
  hasMore: true,
  index: 0,
  step: 11,
};

const slice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET qnaS
    getQnasSuccess(state, action) {
      state.isLoading = false;
      state.qnaList = action.payload;
    },

    // GET qna INFINITE
    getQnasInitial(state, action) {
      state.isLoading = false;
      state.qnaList = action.payload;
    },

    getMoreqnas(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET qna
    getQnaSuccess(state, action) {
      state.isLoading = false;
      state.qna = action.payload;
    },

    // GET RECENT qna
    getRecentQnasSuccess(state, action) {
      state.isLoading = false;
      state.recentQnas = action.payload;
    },

     // ADD qna
    addQnaSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.qnas.push(action.payload)
      // state.qna = action.payload;
    },
    // EDIT qna
    editQnaSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.qna = action.payload;
      // state.qna = action.payload;
    },
    // ADD VIEW COUNT
    addViewCountSuccess(state, action) {
      state.isLoading = false;
      
      // state.qna = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getMoreqnas } = slice.actions;

// ----------------------------------------------------------------------

export function getAllqnas() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/qna/list`);
      //const response = await axios.get('/api/blog/qnas/all');
      dispatch(slice.actions.getQnasSuccess(response.data.qnas));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getQnasInitial(index, step) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/qna/list`, {
        params: { index, step },
      });
      //console.log(response.data.data)
      // const response = await axios.get('/api/blog/qnas', {
      //   params: { index, step },
      // });
      const results = response.data.data.length;
      const { maxLength } = response.data;

      dispatch(slice.actions.getQnasInitial(response.data.data));
      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getQna(qnaId, user) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${API_URL}/qna/view`,
        user?.user,
        {
          params: {
            qnaId: qnaId,
            email: user?.email
          },
      });
      console.log(response, "response");
      dispatch(slice.actions.getQnaSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addQna(qna) {
  qna.email = "korea4127@gmail.com";
  qna.token = "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  qna.category = qna.tags.join(",");
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.qna(`${API_URL}/qna/insert`, qna, {
        params: {
          email: "korea4127@gmail.com",
          token: "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu"
        }
      });
      //console.log(response);
      // const response = await axios.qna(`${API_URL}/qna/insert`, null, {
      //   params: qna ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.addQnaSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};


export function editQna(qna) {
  console.log(qna);
  qna.email = "korea4127@gmail.com";
  qna.token = "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  qna.category = qna.tags.join(",");
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.qna(`${API_URL}/qna/update`, qna, {
        params: {
          email: "korea4127@gmail.com",
          token: "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"
        }
      });
      //console.log(response);
      // const response = await axios.qna(`${API_URL}/qna/insert`, null, {
      //   params: qna ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.editQnaSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

// ----------------------------------------------------------------------

export function getRecentQnas(title) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/qnas/recent', {
        params: { title },
      });

      dispatch(slice.actions.getRecentQnasSuccess(response.data.recentQnas));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addViewCount(qnaId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`${API_URL}/qna/updateViews`,
        { qnaId: qnaId },
        {
          params: { qnaId: qnaId },
        }
      );
      dispatch(slice.actions.addViewCountSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

