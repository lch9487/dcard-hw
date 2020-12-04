import React, { Suspense } from 'react';
import RepositoryPage from './pages/RepositoryPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RepositoryPage />
    </Suspense>
  );
}

export default App;
