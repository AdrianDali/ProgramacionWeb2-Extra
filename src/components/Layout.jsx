// src/components/Layout.jsx
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Container, Menu, MenuItem, Avatar, Typography, Tooltip, ThemeProvider } from '@mui/material';
import theme from './theme';

const Layout = ({ children }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
                {/* AppBar */}
                <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                            {/* Left Section (optional, you can add a logo or title here) */}
                            <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
                                Cifrado
                            </Typography>

                            {/* User Avatar and Menu */}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="User Menu">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Content area */}
                <Box sx={{ padding: '20px' }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
