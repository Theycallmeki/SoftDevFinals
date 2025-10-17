import React from 'react';

function HomePage() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Kian’s Marketplace 🏪</h1>
      <p>Manage your store’s items efficiently with our simple CRUD system.</p>
      <p>Click “Manage Items” on the top menu to get started.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '60px',
  },
};

export default HomePage;
