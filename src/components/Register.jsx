import React, { useState } from 'react';
import axios from 'axios'; 

function Register({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/employees/register', {
        name: name,
        email: email,
        password: password
      });

      console.log("ההרשמה הצליחה! תשובת השרת:", response.data);
      setMessage("העובד נרשם במערכת בהצלחה! 🎉");
      
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error("שגיאה בתהליך ההרשמה:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "נכשל ברישום העובד. נסה שוב.");
      } else {
        setErrorMessage("שגיאת תקשורת עם השרת. ודא ששרת הג'אווה רץ!");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>הרשמת עובד חדש ל-WorkBoost</h2>
      
      {message && <div style={{ color: 'green', marginBottom: '15px', fontWeight: 'bold' }}>{message}</div>}
      {errorMessage && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{errorMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>שם מלא:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>אימייל:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>סיסמה:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          בצע הרשמה
        </button>
      </form>
      <button onClick={onNavigate} style={{ background: 'none', border: 'none', color: '#007BFF', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>
        כבר רשום במערכת? לחץ כאן להתחברות
     </button>
    </div>
    
  );
}

export default Register;