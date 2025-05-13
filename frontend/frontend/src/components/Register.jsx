import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Typography, Box, CircularProgress,
  Paper, useTheme, useMediaQuery, CssBaseline, ThemeProvider, createTheme,
  alpha, IconButton, InputAdornment, Card, Divider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import PinIcon from '@mui/icons-material/Pin';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import KeyIcon from '@mui/icons-material/Key';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode] = useState('light');
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4f46e5' : '#6366f1',
      },
      secondary: {
        main: mode === 'light' ? '#ec4899' : '#f471b5',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      info: {
        main: '#3b82f6',
      },
      success: {
        main: '#10b981',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 22px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: `0 6px 20px 0 ${alpha('#4f46e5', 0.3)}`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.025)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  useEffect(() => {
    if (timer > 0 && otpSent) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, otpSent]);

  const handleRegister = async () => {
    if (form.password !== form.cpassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!form.name || !form.email || !form.password || !form.cpassword) {
      setError('All fields are required');
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/employees/create', form);
      setOtpSent(true);
      setSuccess(res.data);
      setError('');
      setTimer(60);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateRegister = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8080/api/employees/validateEmployeeRegister?email=${form.email}&otpCode=${otp}`);
      setSuccess(res.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'OTP validation failed');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: mode === 'light'
            ? `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.secondary.main, 0.07)} 0%, ${alpha(theme.palette.background.default, 0.5)} 90%),
               radial-gradient(circle at 70% 80%, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.5)} 90%)`
            : `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.background.default, 0.6)} 90%),
               radial-gradient(circle at 70% 80%, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.default, 0.7)} 90%)`,
          position: 'relative',
        }}
      >
        <IconButton 
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
            },
          }}
          onClick={toggleTheme}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        
        <Container maxWidth="xs">
          <Card
            elevation={5}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: alpha(theme.palette.background.paper, mode === 'light' ? 0.9 : 0.8),
              backdropFilter: 'blur(12px)',
              border: `1px solid ${alpha(mode === 'light' ? '#fff' : '#000', 0.1)}`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
              py: 3,
              px: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                  }}
                >
                  Create Account
                </Typography>
              </Box>

              {otpSent ? (
                <>
                  <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    Enter the OTP sent to <Box component="span" sx={{ fontWeight: 'bold' }}>{form.email}</Box>
                  </Typography>
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleValidateRegister}
                    disabled={loading}
                    sx={{
                      mt: 2,
                      mb: 2,
                      borderRadius: 2,
                      py: 1.5,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
                  </Button>
                  <Box sx={{ mt: 1, width: '100%', textAlign: 'center' }}>
                    {timer > 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Resend OTP in <Box component="span" sx={{ fontWeight: 'bold' }}>{timer}s</Box>
                      </Typography>
                    ) : (
                      <Button 
                        onClick={handleRegister}
                        variant="text"
                        sx={{ textDecoration: 'underline' }}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.cpassword}
                    onChange={(e) => setForm({ ...form, cpassword: e.target.value })}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleRegister}
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: 2,
                      py: 1.5,
                      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                  </Button>
                </>
              )}

              {error && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 1.5, 
                    borderRadius: 2, 
                    width: '100%',
                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  }}
                >
                  <Typography color="error" variant="body2" align="center">
                    {error}
                  </Typography>
                </Box>
              )}
              
              {success && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 1.5, 
                    borderRadius: 2, 
                    width: '100%',
                    backgroundColor: alpha(theme.palette.success.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  }}
                >
                  <Typography color="success.main" variant="body2" align="center">
                    {success}
                  </Typography>
                </Box>
              )}

              {!otpSent && (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <Divider sx={{ 
                    my: 2,
                    '&::before, &::after': {
                      borderColor: alpha(theme.palette.text.primary, 0.1),
                    },
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      or
                    </Typography>
                  </Divider>
                  
                  <Button 
                    onClick={() => navigate("/login")} 
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{ 
                      mt: 1,
                      borderColor: alpha(theme.palette.secondary.main, 0.5),
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        backgroundColor: alpha(theme.palette.secondary.main, 0.04),
                      },
                    }}
                  >
                    Already have an account? Login
                  </Button>
                </Box>
              )}
            </Box>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Register;