import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingCart, SportsBar } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const pages = [{ name: "Menu", slug: "/menu" }, { name: "About Us", slug: "/#about" }, { name: "Book Table", slug: "/bookings" }];
  const settings = [{ name: 'Profile', slug: "/profile" }, { name: 'Orders', slug: "orders"}, { name: 'Dashboard', slug: "/dashboard" }];


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#111111',
      },
    },
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pageNav = (slug) => {
    handleCloseNavMenu();
    navigate(slug);
  };
  const settingNav = (slug) => {
    handleCloseUserMenu();
    navigate(slug);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SportsBar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "#ffca28" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Quicksand',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: "#ffca28",
                textDecoration: 'none',
              }}
            >
              IGNYT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => { pageNav(page.slug) }}>
                    <Typography textAlign="center" >{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SportsBar sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: "#ffca28" }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Quicksand',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: "#ffca28",
                textDecoration: 'none',
              }}
            >
              IGNYT
            </Typography>
            <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => { pageNav(page.slug) }}
                  sx={{ my: 2, color: 'white', display: 'block', margin: "0px 25px" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            {!user || !user.isAdmin ? (
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/cart')}>
                <ShoppingCart />
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Button>
            ) : null}
            {user ? (<Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={() => { settingNav(setting.slug) }}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>) : (
              <MenuItem onClick={() => { navigate('/login') }}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            )
            }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
