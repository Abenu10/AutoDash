import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="AutoDash"
              sx={{ height: 32, width: 32 }}
            />
            Admin Console
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{
              ml: 2,
              textTransform: 'none',
              borderColor: '#e0e0e0',
              color: '#666',
              '&:hover': {
                borderColor: '#bdbdbd'
              }
            }}
          >
            ACCESS LEVEL
          </Button>
        </Box>

        {/* Right side items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            size="small"
            sx={{ color: '#666' }}
          >
            <HelpIcon /> Support
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>J</Avatar>
            <Typography variant="body2" color="text.secondary">
              Jane
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
