import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import React, { memo } from 'react';
import Loader from 'react-loader-spinner';

export default memo(() => (
  <Loader type="Watch" color="#00BFFF" height={100} width={100} />
));
