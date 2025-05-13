import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Container,
  Paper,
  Divider,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Card,
  CardContent,
  Alert,
  Snackbar,
  useMediaQuery,
  CircularProgress
} from '@mui/material';

import {
  DarkMode,
  LightMode,
  Home,
  Add,
  Logout,
  ArrowBack,
  Save,
  Edit
} from '@mui/icons-material';

import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';

const drawerWidth = 260;

function UpdateSuggestion() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // Form state
  const [title, setTitle] = useState(state?.title || '');
  const [description, setDescription] = useState(state?.description || '');
  const [status, setStatus] = useState(state?.status || '');
  const [suggestionType, setSuggestionType] = useState(state?.suggestionTypeId || '');
  const [employee] = useState(state?.employeeId || '');
  const [suggestionTypes, setSuggestionTypes] = useState([]);
  
  // UI state
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Create modern theme with the provided color palette
  const theme = createTheme({
    palette: darkMode ? {
      mode: 'dark',
      primary: {
        main: '#6366f1', // Lighter indigo for dark mode
      },
      secondary: {
        main: '#f471b5', // Lighter pink for dark mode
      },
      background: {
        default: '#0f172a', // Dark blue-gray
        paper: '#1e293b',   // Lighter blue-gray
      },
      error: {
        main: '#ef4444', // Red
      },
      warning: {
        main: '#f59e0b', // Amber
      },
      info: {
        main: '#3b82f6', // Blue
      },
      success: {
        main: '#10b981', // Green
      }
    } : {
      mode: 'light',
      primary: {
        main: '#4f46e5', // Modern indigo
      },
      secondary: {
        main: '#ec4899', // Modern pink
      },
      background: {
        default: '#f8fafc', // Light gray
        paper: '#ffffff',   // White
      },
      error: {
        main: '#ef4444', // Red
      },
      warning: {
        main: '#f59e0b', // Amber
      },
      info: {
        main: '#3b82f6', // Blue
      },
      success: {
        main: '#10b981', // Green
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            padding: '10px 20px',
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: `0 4px 14px 0 ${alpha('#4f46e5', 0.25)}`,
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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#6366f1' : '#4f46e5',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflow: 'visible',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Initialize dark mode based on system preference
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  // Fetch suggestion types
  useEffect(() => {
    const fetchSuggestionTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/suggestion-types/readSuggestionType", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const types = Array.isArray(response.data) ? response.data : response.data.data || [];
        setSuggestionTypes(types);
      } catch (err) {
        console.error("Failed to load suggestion types:", err.response?.data || err.message);
        setSnackbar({
          open: true,
          message: 'Failed to load suggestion types',
          severity: 'error'
        });
      }
    };

    fetchSuggestionTypes();
  }, [token]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put(`http://localhost:8080/api/suggestions/changeSuggestion/${id}`, {
        title,
        description,
        status,
        suggestionTypeId: suggestionType,
        employeeId: employee,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setSnackbar({
        open: true,
        message: 'Suggestion updated successfully!',
        severity: 'success'
      });
      
      // Delay navigation slightly to show success message
      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Failed to update suggestion',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle drawer toggle for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Sidebar content
  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: darkMode 
        ? `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.05)})`
        : `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.03)})`
    }}>
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        mb: 2
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700, 
          background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Suggestion System
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, px: 2 }}>
        <ListItem button 
          component={Link} 
          to="/user"
          sx={{
            mb: 1,
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Home color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem button 
          component={Link} 
          to="/add-suggestion"
          sx={{
            mb: 1,
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Add color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Suggestion" />
        </ListItem>
        
        <Divider sx={{ my: 2, opacity: 0.1 }} />
        
        <ListItem button 
          component={Link} 
          to="/"
          sx={{
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Logout color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: theme.palette.error.main }} />
        </ListItem>
      </List>
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <IconButton 
          onClick={() => setDarkMode(!darkMode)}
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.15),
            }
          }}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Main content */}
        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 4 },
          backgroundImage: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.03)}, transparent 400px), 
                            radial-gradient(circle at bottom left, ${alpha(theme.palette.secondary.main, 0.03)}, transparent 300px)`,
          backgroundSize: '100% 100%',
          backgroundAttachment: 'fixed'
        }}>
          {/* Header with back button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4, 
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => navigate('/user')}
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" sx={{ 
                background: darkMode 
                  ? `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
                  : 'inherit',
                WebkitBackgroundClip: darkMode ? 'text' : 'inherit',
                WebkitTextFillColor: darkMode ? 'transparent' : 'inherit',
                fontWeight: 700,
              }}>
                Update Suggestion
              </Typography>
            </Box>
          </Box>
          
          {/* Form Card */}
          <Container maxWidth="md" sx={{ p: 0 }}>
            <Card sx={{ 
              position: 'relative', 
              overflow: 'visible',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: 32,
                right: 32,
                height: 16,
                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '8px 8px 0 0',
                zIndex: 0
              }
            }}>
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: <Edit sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />,
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                  />
                  
                  <FormControl fullWidth required sx={{ mb: 3 }}>
                    <InputLabel id="suggestion-type-label">Suggestion Type</InputLabel>
                    <Select
                      labelId="suggestion-type-label"
                      value={suggestionType}
                      label="Suggestion Type"
                      onChange={e => setSuggestionType(e.target.value)}
                    >
                      <MenuItem value="">Select Type</MenuItem>
                      {suggestionTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={employee}
                    margin="normal"
                    InputProps={{ 
                      readOnly: true,
                      sx: { bgcolor: alpha(theme.palette.action.disabledBackground, 0.3) } 
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => navigate('/user')}
                      sx={{ 
                        flex: 1,
                        py: 1.5
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                      sx={{ 
                        flex: 2,
                        py: 1.5,
                        boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
                      }}
                    >
                      {loading ? 'Updating...' : 'Update Suggestion'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
      
      {/* Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default UpdateSuggestion;