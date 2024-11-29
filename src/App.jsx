import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import './App.css';

import Menu from './component/Menu/menu';
import Home from './component/Home/Home';
import User from './component/user/user';
import Login from './component/login/login'; // صفحه لاگین

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // مدیریت وضعیت ورود

  // تابع برای مدیریت لاگین موفقیت‌آمیز
  const handleLogin = () => {
    setIsAuthenticated(true);  // تغییر وضعیت ورود به true
  };

  return (
    <Router>
      <Grid container style={{ height: '100vh' }}>
        {/* اگر کاربر لاگین نشده، بدون منو فقط صفحه لاگین نمایش داده می‌شود */}
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/*" element={<Navigate to="/login" />} />  {/* هدایت کاربر به لاگین اگر مسیر اشتباه وارد کند */}
          </Routes>
        ) : (
          <>
            {/* Sidebar Menu */}
            <Grid item xs={12} sm={2} style={{ backgroundColor: '#f4f4f4' }}>
              <Paper elevation={3} style={{ height: '100%', padding: '16px' }}>
                <Menu />
              </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sm={10}>
              <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/User" element={<User />} />
                  <Route path="/Article" element={<h1>Article</h1>} />
                  <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Router>
  );
}

export default App;
