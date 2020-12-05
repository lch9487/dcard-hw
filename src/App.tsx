import React, { Suspense } from 'react';
import Loader from './elements/Loader';

import RepositoryListPage from './pages/RepositoryListPage';

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
          <Loader />
        </div>
      }
    >
      <RepositoryListPage />
    </Suspense>
  );
}

export default App;
