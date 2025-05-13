import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  CssBaseline,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Divider,
  useMediaQuery,
  CircularProgress,
  alpha,
  FormHelperText,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const suggestion = location.state?.suggestion;
  const token = localStorage.getItem("token");
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(false);
  
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [form, setForm] = useState({
    comments: "",
    decision: "",
    suggestionId: suggestion?.id || "",
    adminid: ""
  });
  
  const [errors, setErrors] = useState({
    comments: false,
    decision: false,
    adminid: false
  });

  // Initialize dark mode based on system preference
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  // Create theme based on dark mode state
  const theme = React.useMemo(() => createTheme({
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
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            padding: '8px 16px',
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: `0 4px 14px 0 ${alpha('#4f46e5', 0.25)}`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: darkMode ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  }), [darkMode, prefersDarkMode]);

  // Status chip colors
  const statusColors = {
    'Pending': 'warning',
    'Approved': 'success',
    'Rejected': 'error',
    'In Review': 'info',
    'Implemented': 'primary'
  };

  useEffect(() => {
    // Set suggestionId from passed suggestion object
    if (suggestion?.id) {
      setForm((prevForm) => ({
        ...prevForm,
        suggestionId: suggestion.id,
      }));
    } else {
      // Redirect back if no suggestion data
      navigate('/');
    }

    // Fetch list of admins
    const fetchAdminList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/admins/readAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAdminList(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error loading admins", error);
        setSnackbar({
          open: true,
          message: 'Failed to load admin list',
          severity: 'error'
        });
        setLoading(false);
      }
    };

    fetchAdminList();
  }, [suggestion, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    const newErrors = {
      comments: !form.comments.trim(),
      decision: !form.decision.trim(),
      adminid: !form.adminid
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/feedback/createFeedback", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      setSnackbar({
        open: true,
        message: 'Feedback submitted successfully!',
        severity: 'success'
      });
      
      // Reset form after successful submission
      setForm({
        comments: "",
        decision: "",
        suggestionId: suggestion.id,
        adminid: ""
      });
      
      // Navigate back to dashboard after short delay
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
      
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Failed to submit feedback',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const decisionOptions = [
    { value: 'Approved', label: 'Approve Suggestion' },
    { value: 'Rejected', label: 'Reject Suggestion' },
    { value: 'In Review', label: 'Keep Under Review' },
    { value: 'Implemented', label: 'Mark as Implemented' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        backgroundImage: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.03)}, transparent 400px), 
                          radial-gradient(circle at bottom left, ${alpha(theme.palette.secondary.main, 0.03)}, transparent 300px)`,
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
        p: { xs: 2, sm: 4 }
      }}>
        <CssBaseline />
        
        <Container maxWidth="md">
          {/* Header with back button and dark mode toggle */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate('/admin')}
            >
              Back to Dashboard
            </Button>
            
            <IconButton 
              onClick={() => setDarkMode(!darkMode)}
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          
          {/* Main content */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: alpha(theme.palette.background.paper, darkMode ? 0.7 : 1),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ 
              background: darkMode 
                ? `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
                : 'inherit',
              WebkitBackgroundClip: darkMode ? 'text' : 'inherit',
              WebkitTextFillColor: darkMode ? 'transparent' : 'inherit',
              fontWeight: 700,
            }}>
              Provide Feedback
            </Typography>
            
            {suggestion ? (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Suggestion details card */}
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 4, 
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.default, darkMode ? 0.4 : 0.5)
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="overline" color="text.secondary">
                          Suggestion Details
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {suggestion.title}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {suggestion.description}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={4} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'flex-start', sm: 'flex-end' },
                        justifyContent: 'flex-start',
                        gap: 1
                      }}>
                        <Chip 
                          label={suggestion.status} 
                          size="small" 
                          color={statusColors[suggestion.status] || 'default'}
                          variant={darkMode ? "outlined" : "filled"}
                          sx={{ 
                            fontWeight: 500,
                            opacity: darkMode ? 0.8 : 1
                          }}
                        />
                        
                        <Typography variant="caption" color="text.secondary">
                          Employee ID: {suggestion.employeeId}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary">
                          Type ID: {suggestion.suggestionTypeId}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    {suggestion.comments && (
                      <>
                        <Divider sx={{ my: 2, opacity: 0.6 }} />
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                          Previous Comments
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          "{suggestion.comments}"
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentTurnedInIcon fontSize="small" color="primary" />
                  Feedback Form
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Decision select */}
                  <Grid item xs={12} md={6}>
                    <FormControl 
                      fullWidth 
                      variant="outlined" 
                      error={errors.decision}
                      required
                    >
                      <InputLabel id="decision-label">Decision</InputLabel>
                      <Select
                        labelId="decision-label"
                        value={form.decision}
                        onChange={(e) => setForm({ ...form, decision: e.target.value })}
                        label="Decision"
                      >
                        <MenuItem value="" disabled>
                          <em>Select a decision</em>
                        </MenuItem>
                        {decisionOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.decision && (
                        <FormHelperText>Decision is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  
                  {/* Admin select */}
                  <Grid item xs={12} md={6}>
                    <FormControl 
                      fullWidth 
                      variant="outlined" 
                      error={errors.adminid}
                      required
                    >
                      <InputLabel id="admin-select-label">Admin</InputLabel>
                      <Select
                        labelId="admin-select-label"
                        value={form.adminid}
                        onChange={(e) => setForm({ ...form, adminid: e.target.value })}
                        label="Admin"
                      >
                        <MenuItem value="" disabled>
                          <em>Select an admin</em>
                        </MenuItem>
                        {Array.isArray(adminList) &&
                          adminList.map((admin) => (
                            <MenuItem key={admin.id} value={admin.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AdminPanelSettingsIcon fontSize="small" sx={{ opacity: 0.7 }} />
                                {admin.name}
                              </Box>
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.adminid && (
                        <FormHelperText>Admin selection is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  
                  {/* Comments field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Feedback Comments"
                      multiline
                      rows={4}
                      value={form.comments}
                      onChange={(e) => setForm({ ...form, comments: e.target.value })}
                      variant="outlined"
                      placeholder="Enter your detailed feedback for this suggestion..."
                      required
                      error={errors.comments}
                      helperText={errors.comments ? "Comments are required" : ""}
                    />
                  </Grid>
                  
                  {/* Hidden suggestion ID field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Suggestion ID"
                      value={form.suggestionId}
                      disabled
                      variant="outlined"
                      sx={{ display: 'none' }}
                    />
                  </Grid>
                </Grid>
                
                {/* Submit button */}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    type="submit"
                    variant="contained" 
                    color="primary"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.25)',
                      '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(79, 70, 229, 0.3)'
                      }
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Typography color="text.secondary">No suggestion data available</Typography>
                )}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      
      {/* Feedback snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
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

export default Feedback;