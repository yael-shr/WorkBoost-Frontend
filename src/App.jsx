import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register'; // נוודא שקובץ הרישום קיים בשם זה

function App() {
  // משתנה מצב שמנהל איזה דף מוצג כרגע (ברירת המחדל היא דף הלוגין)
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      {currentPage === 'login' ? (
        // אם הדף הנוכחי הוא לוגין, נציג אותו ונעביר לו פונקציה למעבר להרשמה
        <Login onNavigate={() => setCurrentPage('register')} />
      ) : (
        // אם הדף הנוכחי הוא הרשמה, נציג אותו ונעביר לו פונקציה למעבר חזרה ללוגין
        <Register onNavigate={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;