import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop'; 

function App() {
  const hasUser = localStorage.getItem('user') !== null;
  const [currentPage, setCurrentPage] = useState(hasUser ? 'shop' : 'login');

  return (
    <div>
      {currentPage === 'shop' && (
        <button 
          onClick={() => { localStorage.removeItem('user'); setCurrentPage('login'); }}
          style={{ margin: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', float: 'left' }}
        >
          התנתק ⬅️
        </button>
      )}

      {currentPage === 'login' && (
      <Login 
      onNavigate={() => setCurrentPage('register')} 
      onLoginSuccess={() => setCurrentPage('shop')} 
      />
      )}
      
      {currentPage === 'register' && (
        <Register onNavigate={() => setCurrentPage('login')} />
      )}

      {currentPage === 'shop' && (
        <Shop />
      )}
    </div>
  );
}

export default App;