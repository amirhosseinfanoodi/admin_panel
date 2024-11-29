import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ onLogin }) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',  // افزودن نام
    lastName: ''    // افزودن نام خانوادگی
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // برای هدایت به صفحات دیگر

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://paneladminmui-default-rtdb.firebaseio.com/user.json'; // URL مشترک برای ورود و ثبت‌نام
    
    // ساخت داده‌ها برای ارسال در صورت ثبت‌نام
    const dataToSend = {
      ...formData,
      created_at: new Date().toISOString(),  // اضافه کردن تاریخ ایجاد
    };
  
    try {
      // برای ورود از متد GET استفاده می‌کنیم
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
      
      const users = await response.json();
      
      // بررسی وجود کاربر
      const existingUser = Object.values(users).find(user => user.email === formData.email);
      
      if (activeTab === 0) { // اگر در تب ورود هستیم
        if (existingUser && existingUser.password === formData.password) {
          // کاربر وارد شده است
          setSuccess('Logged in successfully!');
          onLogin(); // اگر کاربر وارد شد
          navigate('/Article'); // هدایت به صفحه اصلی پس از ورود
        } else {
          // کاربر وجود ندارد یا رمز عبور اشتباه است
          setError('Invalid email or password. Redirecting to Sign Up.');
          setTimeout(() => {
            setActiveTab(1); // تغییر به تب ثبت‌نام
            setError('');
          }, 2000);
        }
      } else {
        // برای ثبت‌نام
        if (!existingUser) {
          // اگر کاربر وجود نداشته باشد، ثبت‌نام انجام شود
          await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          });
          
          setSuccess('Signed up successfully!');
          navigate('/'); // هدایت به داشبورد پس از ثبت‌نام
        } else {
          setError('User already exists. Please log in.');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ width: '300px', margin: 'auto', mt: 5 }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        {activeTab === 1 && (  // نمایش فیلدهای نام فقط در ثبت‌نام
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
          </>
        )}
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
            {success}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {activeTab === 0 ? 'Login' : 'Sign Up'}
        </Button>
      </Box>
    </Box>
  );
}
