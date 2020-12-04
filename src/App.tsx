import React, { Suspense } from 'react';
import RepositoryListPage from './pages/RepositoryListPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RepositoryListPage />
    </Suspense>
  );
}

export default App;
