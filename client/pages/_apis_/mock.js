import AxiosMockAdapter from 'axios-mock-adapter';
// utils
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0,
});

export default axiosMockAdapter;
