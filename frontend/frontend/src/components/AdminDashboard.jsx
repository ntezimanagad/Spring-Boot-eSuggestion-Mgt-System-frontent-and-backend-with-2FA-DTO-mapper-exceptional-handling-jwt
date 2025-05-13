import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Box, 
  Container,
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Button, 
  IconButton, 
  CssBaseline, 
  Drawer,
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  useMediaQuery,
  InputAdornment,
  Chip,
  Card,
  Pagination,
  Avatar,
  alpha,
  CircularProgress
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Dashboard as DashboardIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Logout as LogoutIcon,
  NotificationsNone as NotificationsNoneIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 260;

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  // State management
  const [suggestionData, setSuggestionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisible, setFilterVisible] = useState(true);
  const [adminInfo, setAdminInfo] = useState("");

  // Search filters
  const [searchFields, setSearchFields] = useState({
    title: '',
    description: '',
    status: '',
    employeeId: '',
    suggestionTypeId: '',
    comments: ''
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
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
          },
          root: {
            borderBottom: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: darkMode 
                ? alpha('#6366f1', 0.08) 
                : alpha('#4f46e5', 0.04),
            },
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
    fetchData();
    fetchAdminInfo();
  }, [page]);

  const fetchData = () => {
    setLoading(true);
    // API page is 0-indexed, but UI is 1-indexed
    const apiPage = page - 1;
    
    axios.get('http://localhost:8080/api/suggestions/paginate', {
      params: { page: apiPage, size },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setSuggestionData(res.data.content);
      setFilteredData(res.data.content);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError("Failed to load suggestions data");
      setLoading(false);
    });
  };

  const fetchAdminInfo = () => {
    axios.get("http://localhost:8080/api/suggestions/userInfo", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setAdminInfo(response.data);
    }).catch((error) => {
      console.error("Failed to fetch admin info:", error);
    });
  };

  const handleSearchChange = (e, field) => {
    const updatedFields = { ...searchFields, [field]: e.target.value };
    setSearchFields(updatedFields);
    filterData(updatedFields);
  };

  const filterData = (fields) => {
    const filtered = suggestionData.filter(item =>
      item.title.toLowerCase().includes(fields.title.toLowerCase()) &&
      item.description.toLowerCase().includes(fields.description.toLowerCase()) &&
      item.status.toLowerCase().includes(fields.status.toLowerCase()) &&
      item.employeeId.toString().includes(fields.employeeId) &&
      item.suggestionTypeId.toString().includes(fields.suggestionTypeId) &&
      (item.comments || '').toLowerCase().includes(fields.comments.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRespond = (suggestion) => {
    navigate('/feedback', { state: { suggestion } });
  };

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      if (token) {
        await axios.post("http://localhost:8080/api/employees/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
      setLoading(false);
    }
  };

  const clearAllFilters = () => {
    const emptyFields = {
      title: '',
      description: '',
      status: '',
      employeeId: '',
      suggestionTypeId: '',
      comments: ''
    };
    setSearchFields(emptyFields);
    setFilteredData(suggestionData);
  };

  // Handle drawer toggle for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          sx={{
            mb: 1,
            borderRadius: theme.shape.borderRadius,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.15),
            }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItem>
        
        <ListItem button 
          onClick={() => navigate("/")}
          sx={{
            mb: 1,
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        
        <Box sx={{ 
          mt: 3, 
          mx: 2, 
          p: 2, 
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.08), 
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Welcome, {adminInfo || "Admin"}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            You have {filteredData.length} suggestions to review
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2, opacity: 0.1 }} />
        
        <ListItem button 
          onClick={handleLogout}
          sx={{
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
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
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        
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
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4, 
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h4" gutterBottom sx={{ 
              background: darkMode 
                ? `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
                : 'inherit',
              WebkitBackgroundClip: darkMode ? 'text' : 'inherit',
              WebkitTextFillColor: darkMode ? 'transparent' : 'inherit',
              fontWeight: 700,
              mb: 0
            }}>
              Suggestions Management
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={() => setFilterVisible(!filterVisible)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                {filterVisible ? "Hide Filters" : "Show Filters"}
              </Button>
              
              <IconButton 
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                onClick={() => setFilterVisible(!filterVisible)}
              >
                <FilterListIcon />
              </IconButton>
              
              {filterVisible && searchFields.title + searchFields.description + searchFields.status + 
                searchFields.employeeId + searchFields.suggestionTypeId + searchFields.comments !== '' && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<ClearIcon />} 
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </Button>
              )}
            </Box>
          </Box>
          
          {/* Status messages */}
          {success && (
            <Card sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: alpha(theme.palette.success.main, 0.1),
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              borderLeft: `4px solid ${theme.palette.success.main}`,
            }}>
              <Typography color="success.main">{success}</Typography>
            </Card>
          )}
          
          {error && (
            <Card sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: alpha(theme.palette.error.main, 0.1),
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              borderLeft: `4px solid ${theme.palette.error.main}`,
            }}>
              <Typography color="error.main">{error}</Typography>
            </Card>
          )}
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {/* Table */}
          <TableContainer component={Paper} sx={{ 
            mt: 2, 
            overflow: 'hidden',
            borderRadius: 0,
            boxShadow: theme.shadows[1],
            bgcolor: alpha(theme.palette.background.paper, darkMode ? 0.7 : 1),
            backdropFilter: 'blur(8px)',
          }}>
            <Table size="medium">
              <TableHead sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <TableRow>
                  {['Title', 'Description', 'Status', 'Employee ID', 'Type ID', 'Comments', 'Action'].map((col) => (
                    <TableCell key={col} sx={{ py: 2 }}>
                      <Typography variant="subtitle2">{col}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                
                {filterVisible && (
                  <TableRow>
                    <TableCell>
                      <TextField
                        placeholder="Search title"
                        value={searchFields.title}
                        onChange={(e) => handleSearchChange(e, 'title')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Search description"
                        value={searchFields.description}
                        onChange={(e) => handleSearchChange(e, 'description')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Search status"
                        value={searchFields.status}
                        onChange={(e) => handleSearchChange(e, 'status')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Search employee ID"
                        value={searchFields.employeeId}
                        onChange={(e) => handleSearchChange(e, 'employeeId')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Search type ID"
                        value={searchFields.suggestionTypeId}
                        onChange={(e) => handleSearchChange(e, 'suggestionTypeId')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Search comments"
                        value={searchFields.comments}
                        onChange={(e) => handleSearchChange(e, 'comments')}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiInput-underline:before': {
                            borderBottomColor: alpha(theme.palette.divider, 0.3),
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {!loading && filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {row.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          color={statusColors[row.status] || 'default'}
                          variant={darkMode ? "outlined" : "filled"}
                          sx={{ 
                            fontWeight: 500,
                            opacity: darkMode ? 0.8 : 1
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.employeeId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.suggestionTypeId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          maxWidth: 150,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {row.comments || '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          size="small" 
                          onClick={() => handleRespond(row)}
                          startIcon={<VisibilityIcon />}
                          sx={{ 
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.25)',
                            '&:hover': {
                              boxShadow: '0 6px 20px 0 rgba(79, 70, 229, 0.3)'
                            }
                          }}
                        >
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : !loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        py: 6,
                        opacity: 0.7
                      }}>
                        <NotificationsNoneIcon sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                        <Typography align="center" variant="body1" fontWeight={500}>No matching suggestions found</Typography>
                        <Typography align="center" variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                          Try adjusting your search criteria
                        </Typography>
                        {searchFields.title + searchFields.description + searchFields.status + 
                          searchFields.employeeId + searchFields.suggestionTypeId + searchFields.comments !== '' && (
                          <Button 
                            size="small"
                            variant="outlined" 
                            onClick={clearAllFilters}
                            sx={{ mt: 3 }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {!loading && filteredData.length > 0 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              mb: 2
            }}>
              <Pagination 
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    '&.Mui-selected': {
                      fontWeight: 'bold',
                    }
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;