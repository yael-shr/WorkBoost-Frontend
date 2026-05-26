import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Shop() {
  const [gifts, setGifts] = useState([]); 
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const giftsResponse = await axios.get('http://localhost:8080/api/gifts');
        setGifts(giftsResponse.data);

        if (currentUser && currentUser.email) {
          const userResponse = await axios.get(`http://localhost:8080/api/employees/by-email/${currentUser.email}`);
          const freshUserData = userResponse.data;
          
          localStorage.setItem('user', JSON.stringify(freshUserData));
          setCurrentUser(freshUserData);
        }
      } catch (error) {
        console.error("שגיאה בטעינת נתוני החנות והמשתמש:", error);
        setErrorMessage("שגיאת תקשורת: לא ניתן לטעון את נתוני החנות העדכניים.");
      }
    };

    fetchShopData();
  }, []);

  const handleBuyGift = async (giftId) => {
    setErrorMessage('');
    setMessage('');

    if (!currentUser || !currentUser.id) {
      setErrorMessage("Error: Active user not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/gifts/buy', {
        employeeId: currentUser.id,
        giftId: giftId
      });

      setMessage("הקנייה בוצעה בהצלחה! פנק את עצמך! 🎁");

      const serverUpdatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(serverUpdatedUser));
      setCurrentUser(serverUpdatedUser);

      const giftsResponse = await axios.get('http://localhost:8080/api/gifts');
      setGifts(giftsResponse.data);

    } catch (error) {
      console.error("שגיאה שהתקבלה בזמן הרכישה:", error);
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          setErrorMessage(error.response.data.message || "הרכישה נכשלה.");
        } else {
          setErrorMessage(error.response.data.toString());
        }
      } else {
        setErrorMessage("שגיאת תקשורת. לא ניתן לבצע רכישה כרגע.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--sans)', direction: 'rtl' }}>
      
      <div style={{ 
        background: 'linear-gradient(135deg, var(--accent) 0%, #7928ca 100%)', 
        color: 'white', 
        padding: '30px', 
        borderRadius: '16px', 
        boxShadow: 'var(--shadow)', 
        marginBottom: '40px',
        textAlign: 'right',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '32px', fontWeight: '700' }}>חנות הבונוסים של WorkBoost</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>הפוך את ההשקעה והמשימות שביצעת למתנות שוות!</p>
        </div>
        
        {currentUser && (
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', 
            backdropFilter: 'blur(10px)',
            padding: '15px 25px', 
            borderRadius: '12px', 
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span style={{ fontSize: '18px' }}>שלום, <strong>{currentUser.name}</strong></span>
            <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
              🪙 {currentUser.points} נקודות זמינות
            </span>
          </div>
        )}
      </div>

      {message && (
        <div style={{ color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontWeight: 'bold', fontSize: '16px', textAlign: 'right' }}>
          ✅ {message}
        </div>
      )}
      {errorMessage && (
        <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontWeight: 'bold', fontSize: '16px', textAlign: 'right' }}>
          ❌ {errorMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', marginTop: '20px' }}>
        {gifts && gifts.length > 0 ? (
          gifts.map((gift) => (
            <div 
              key={gift.id} 
              style={{ 
                border: '1px solid var(--border)', 
                padding: '24px', 
                borderRadius: '16px', 
                boxShadow: 'var(--shadow)', 
                backgroundColor: 'var(--bg)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
                textAlign: 'right'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'clientY(-5px)';
                e.currentTarget.style.borderColor = 'var(--accent-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ 
                    backgroundColor: 'var(--accent-bg)', 
                    color: 'var(--accent)', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    border: '1px solid var(--accent-border)'
                  }}>
                    🪙 {gift.priceInPoints} נק'
                  </span>
                  
                  <span style={{ fontSize: '13px', color: gift.stock > 0 ? '#28a745' : '#dc3545', fontWeight: '600' }}>
                    {gift.stock > 0 ? `זמין: ${gift.stock} יחידות` : 'אזל מהמלאי'}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: '600', color: 'var(--text-h)' }}>{gift.title}</h3>
                
                {gift.description && (
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--text)', 
                    lineHeight: '150%',
                    height: '65px', 
                    overflow: 'hidden', 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '20px'
                  }}>
                    {gift.description}
                  </p>
                )}
              </div>
              
              <button 
                onClick={() => handleBuyGift(gift.id)}
                disabled={gift.stock <= 0}
                style={{ 
                  width: '100%',
                  padding: '12px', 
                  backgroundColor: gift.stock > 0 ? 'var(--accent)' : 'var(--border)', 
                  color: gift.stock > 0 ? 'white' : 'var(--text)', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: gift.stock > 0 ? 'pointer' : 'not-allowed', 
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'background-color 0.2s',
                  boxShadow: gift.stock > 0 ? '0 4px 6px rgba(170, 59, 255, 0.2)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if(gift.stock > 0) e.currentTarget.style.backgroundColor = '#9326ed';
                }}
                onMouseLeave={(e) => {
                  if(gift.stock > 0) e.currentTarget.style.backgroundColor = 'var(--accent)';
                }}
              >
                {gift.stock > 0 ? 'רכוש מתנה עכשיו 🛒' : 'אזל מהמלאי'}
              </button>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '40px', color: 'var(--text)', backgroundColor: 'var(--code-bg)', borderRadius: '12px' }}>
            ⏳ טוען מוצרים מדליקים מהשרת... ודא שסנכרנת מלאי ב-SQL Server!
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;