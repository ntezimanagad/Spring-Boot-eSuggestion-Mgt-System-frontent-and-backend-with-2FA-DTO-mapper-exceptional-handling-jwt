import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  CssBaseline, 
  Box, 
  Button, 
  Paper,
  Container,
  useMediaQuery,
  createTheme, 
  ThemeProvider,
  Fade,
  Grow,
  GlobalStyles,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
  Chip,
  alpha
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  Logout, 
  Login, 
  School,
  Comment,
  ArrowForward,
  LightbulbOutlined,
  TrackChanges,
  Notifications
} from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#6366f1' : '#4f46e5', // Modern indigo
      },
      secondary: {
        main: darkMode ? '#f471b5' : '#ec4899', // Modern pink
      },
      background: {
        default: darkMode ? '#0f172a' : '#f8fafc', // Dark blue-gray / Light gray
        paper: darkMode ? '#1e293b' : '#ffffff',   // Lighter blue-gray / White
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
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
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
            borderRadius: 12,
            padding: '10px 20px',
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode 
              ? alpha('#1e293b', 0.8) 
              : alpha('#ffffff', 0.8),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            overflow: 'visible',
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.25)' 
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: darkMode 
                ? '0 20px 30px rgba(0, 0, 0, 0.3)' 
                : '0 20px 30px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: darkMode 
              ? alpha('#fff', 0.1) 
              : alpha('#000', 0.06),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
    setTimeout(() => setLoading(false), 500); // Slight delay for smoother animations
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate(user ? '/user' : '/login');
  };

  // Feature card data
  const features = [
    {
      title: 'Submit Ideas',
      description: 'Share your innovative suggestions for campus improvements with ease and get community feedback.',
      icon: <LightbulbOutlined fontSize="large" color="primary" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Track Progress',
      description: 'Monitor your submissions in real-time as they move through review and implementation stages.',
      icon: <TrackChanges fontSize="large" color="info" />,
      color: theme.palette.info.main
    },
    {
      title: 'Get Responses',
      description: 'Receive official feedback and status updates from campus administration on your suggestions.',
      icon: <Notifications fontSize="large" color="secondary" />,
      color: theme.palette.secondary.main
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '@import': 'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap")',
          'html, body': {
            margin: 0,
            padding: 0,
            overflow: 'auto',
            height: '100%',
            width: '100%',
            scrollBehavior: 'smooth',
          },
          '#root': {
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            overflow: 'auto'
          },
          '::selection': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100vw',
          maxWidth: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header */}
        <AppBar 
          position="fixed" 
          color="inherit" 
          elevation={0}
          sx={{
            width: '100%',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mr: 2,
                    p: 0.5
                  }}
                >
                  <School fontSize="small" />
                </Avatar>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Campus Connect
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {user && (
                <Chip
                  label={`Welcome, ${user.sub || 'User'}`}
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ 
                    mr: 2, 
                    display: { xs: 'none', sm: 'flex' },
                    fontWeight: 500,
                    borderWidth: 1.5,
                    height: 32
                  }}
                />
              )}

              <IconButton 
                color="primary" 
                onClick={() => setDarkMode(!darkMode)} 
                sx={{ 
                  mr: { xs: 1, sm: 2 },
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  }
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {user ? (
                <Button 
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  color="error"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 6,
                    height: 38
                  }}
                >
                  {isMobile ? "" : "Logout"}
                </Button>
              ) : (
                <Button 
                  startIcon={<Login />}
                  onClick={handleLogin}
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 6,
                    height: 38
                  }}
                >
                  {isMobile ? "" : "Login"}
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 10, sm: 12 },
            pb: { xs: 6, sm: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: darkMode 
              ? `radial-gradient(circle at 25% 110%, ${alpha('#6366f1', 0.2)}, transparent 25%), 
                 radial-gradient(circle at 75% 10%, ${alpha('#f471b5', 0.1)}, transparent 35%)`
              : `radial-gradient(circle at 25% 110%, ${alpha('#4f46e5', 0.08)}, transparent 25%), 
                 radial-gradient(circle at 75% 10%, ${alpha('#ec4899', 0.05)}, transparent 35%)`,
          }}
        >
          {/* Background shapes - modern abstract design elements */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: '5%',
              left: '10%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.03)}, transparent 70%)`,
              zIndex: 0
            }} 
          />
          
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.04)}, transparent 70%)`,
              zIndex: 0
            }} 
          />

          <Container 
            maxWidth="lg" 
            sx={{ 
              position: 'relative',
              zIndex: 2,
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 4, sm: 6, md: 8 }
            }}
          >
            <Fade in={!loading} timeout={800}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip 
                  label="Student Empowerment Platform" 
                  color="primary" 
                  size="small"
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600, 
                    borderRadius: 6,
                    px: 1.5,
                    py: 2.5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }} 
                />
                
                <Grow in={!loading} timeout={1000}>
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{ 
                      mb: 3,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.05em',
                      background: `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${alpha(theme.palette.text.primary, 0.65)})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                    }}
                  >
                    Transform Your Campus <br /> With Great Ideas
                  </Typography>
                </Grow>
                
                <Grow in={!loading} timeout={1200}>
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{ 
                      mb: 5,
                      maxWidth: '700px',
                      mx: 'auto',
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 400,
                      opacity: 0.85
                    }}
                  >
                    Share, collaborate, and see your ideas come to life. Our platform empowers 
                    students to contribute meaningfully to campus improvement through a streamlined 
                    suggestion system.
                  </Typography>
                </Grow>
                
                <Grow in={!loading} timeout={1400}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={3} 
                    justifyContent="center"
                    sx={{ mb: 8 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleDashboard}
                      endIcon={<ArrowForward />}
                      sx={{ 
                        py: 1.5,
                        px: 4,
                        fontSize: '1rem',
                        borderRadius: 8,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                      }}
                    >
                      {user ? 'My Dashboard' : 'Get Started'}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Comment />}
                      sx={{ 
                        py: 1.5,
                        px: 4,
                        fontSize: '1rem',
                        borderRadius: 8,
                        borderWidth: 2,
                      }}
                      onClick={() => navigate('/about')}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Grow>
                
                {/* Modern Stats/Metrics Section */}
                <Fade in={!loading} timeout={1600}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: 4,
                      backgroundColor: alpha(
                        theme.palette.background.paper, 
                        darkMode ? 0.6 : 0.7
                      ),
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${alpha(
                        theme.palette.mode === 'dark' ? '#fff' : '#000',
                        0.05
                      )}`,
                      mt: 4,
                      mb: 4,
                      boxShadow: darkMode
                        ? `0 8px 32px ${alpha('#000', 0.2)}`
                        : `0 8px 32px ${alpha('#000', 0.05)}`,
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      divider={
                        <Divider orientation="vertical" flexItem />
                      }
                      spacing={3}
                      justifyContent="space-around"
                      alignItems="center"
                      sx={{ py: 1 }}
                    >
                      {[
                        { value: '500+', label: 'Suggestions Submitted' },
                        { value: '83%', label: 'Implementation Rate' },
                        { value: '2,400+', label: 'Active Students' }
                      ].map((stat, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            py: 2, 
                            px: 3, 
                            textAlign: 'center',
                            flex: 1 
                          }}
                        >
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              mb: 1, 
                              fontWeight: 700,
                              color: index === 0 
                                ? theme.palette.primary.main 
                                : index === 1 
                                  ? theme.palette.success.main 
                                  : theme.palette.info.main
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Fade>
              </Box>
            </Fade>
          </Container>
        </Box>
          
        {/* Feature Cards Section */}
        <Box
          sx={{ 
            py: { xs: 8, md: 12 },
            px: { xs: 2, sm: 4 },
            backgroundColor: darkMode 
              ? alpha(theme.palette.background.default, 0.5)
              : alpha(theme.palette.background.default, 0.7),
            position: 'relative',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  fontWeight: 700
                }}
              >
                How It Works
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  maxWidth: '650px',
                  mx: 'auto',
                  opacity: 0.8
                }}
              >
                Our platform makes it easy to contribute to campus improvement 
                through a simple and effective process
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              {features.map((feature, index) => (
                <Grow 
                  in={!loading} 
                  style={{ transformOrigin: '0 0 0' }}
                  timeout={1000 + (index * 300)}
                  key={index}
                >
                  <Card
                    sx={{ 
                      height: '100%',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'visible',
                      p: 0,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -15,
                        left: -15,
                        width: 70,
                        height: 70,
                        borderRadius: '16px',
                        backgroundColor: alpha(feature.color, darkMode ? 0.15 : 0.1),
                        transform: 'rotate(-5deg)',
                        zIndex: 0,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h3"
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.7
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: { xs: 10, md: 14 },
            px: { xs: 2, sm: 4 },
            backgroundColor: darkMode 
              ? alpha(theme.palette.primary.main, 0.07)
              : alpha(theme.palette.primary.main, 0.03),
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Abstract design element */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '-5%',
              width: '30%',
              height: '60%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`,
              zIndex: 0,
            }}
          />
          
          <Container maxWidth="md">
            <Fade in={!loading} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  textAlign: 'center',
                  backgroundColor: alpha(
                    theme.palette.background.paper, 
                    darkMode ? 0.8 : 0.9
                  ),
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${alpha(
                    theme.palette.mode === 'dark' ? '#fff' : '#000',
                    0.05
                  )}`,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: darkMode
                    ? `0 20px 70px ${alpha('#000', 0.2)}`
                    : `0 20px 70px ${alpha('#000', 0.07)}`,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                  }}
                >
                  Ready to Make a Difference?
                </Typography>
                
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ 
                    mb: 4,
                    mx: 'auto',
                    maxWidth: '600px',
                    lineHeight: 1.8
                  }}
                >
                  Join our community of forward-thinking students and staff who are actively
                  shaping the future of our campus. Your ideas matter, and we're here to help
                  bring them to life.
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleDashboard}
                  endIcon={<ArrowForward />}
                  sx={{ 
                    py: 1.5,
                    px: 5,
                    fontSize: '1.1rem',
                    borderRadius: 8,
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                  }}
                >
                  {user ? 'View My Dashboard' : 'Start Contributing'}
                </Button>
              </Paper>
            </Fade>
          </Container>
        </Box>

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 5, 
            px: 2, 
            backgroundColor: darkMode 
              ? alpha(theme.palette.background.paper, 0.5)
              : alpha(theme.palette.background.paper, 0.7),
            borderTop: `1px solid ${alpha(
              theme.palette.mode === 'dark' ? '#fff' : '#000',
              0.08
            )}`,
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography 
                variant="body2" 
                color="text.secondary" 
              >
                © {new Date().getFullYear()} Campus Connect • All Rights Reserved
              </Typography>
              
              <Stack 
                direction="row" 
                spacing={3}
                sx={{
                  '& button': {
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }
                }}
              >
                <Button size="small" onClick={() => navigate('/privacy')}>
                  Privacy
                </Button>
                <Button size="small" onClick={() => navigate('/terms')}>
                  Terms
                </Button>
                <Button size="small" onClick={() => navigate('/contact')}>
                  Contact
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;