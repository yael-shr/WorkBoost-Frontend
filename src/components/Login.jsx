import React, { useState } from 'react';
import axios from 'axios';

// קבלת ה-onNavigate כחלק מהפרמטרים של הקומפוננטה
function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/employees/login', {
        email: email,
        password: password
      });

      // שמירת אובייקט המשתמש שהתקבל מהג'אווה בזיכרון הדפדפן
      const loggedInEmployee = response.data;
      localStorage.setItem('user', JSON.stringify(loggedInEmployee));
      
      setSuccessMessage(`ברוך הבא, ${loggedInEmployee.name}! התחברת בהצלחה.`);
      
      // 2. 🔥 הפעלת הפונקציה שמחליפה את המסך ל-'shop' ב-App.jsx באופן מיידי!
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "פרטי התחברות שגויים");
      } else {
        setErrorMessage("שגיאת תקשורת עם השרת. ודא שה-Backend רץ!");
      }
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>התחברות ל-WorkBoost</h2>
      
      {successMessage && <div style={{ color: 'green', marginBottom: '15px', fontWeight: 'bold' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{errorMessage}</div>}

      <form onSubmit={handleLogin}>
        {/* שדות הקלט אימייל וסיסמה נשארים אותו דבר... */}
        <div style={{ marginBottom: '15px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>אימייל:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }} />
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>סיסמה:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          התחבר
        </button>
      </form>

      {/* 🔥 כפתור המעבר להרשמה עובדים חדשים */}
      <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
      <p style={{ fontSize: '14px' }}>עובד חדש במערכת?</p>
      <button onClick={onNavigate} style={{ background: 'none', border: 'none', color: '#007BFF', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>
        לחץ כאן כדי לבצע הרשמה
      </button>
    </div>
  );
}

export default Login;