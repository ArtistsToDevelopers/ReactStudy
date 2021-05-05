import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import User from './User'

function App() {

  const user = {
    id: 1,
    username: 'geniushyeon'
  }

  return (
    <ErrorBoundary>
      <User user={user} />
    </ErrorBoundary>
  );
}

export default App;
