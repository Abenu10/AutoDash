import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar sx={{ minHeight: "48px !important", px: 2 }}>
        {/* Logo and Title */}
        <Box
          sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1 }}
        >
          <Box
            component="img"
            src={logo}
            alt="AutoDash"
            sx={{ height: 44, width: 44 }}
          />
          <Typography
            variant="body1"
            component="div"
            sx={{
              fontWeight: 500,
              color: "#111827",
              fontSize: "14px",
            }}
          >
            Admin Console
          </Typography>
        </Box>

        {/* Right side items */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Support Button */}
          <Button
            startIcon={<HelpOutlineIcon sx={{ fontSize: 20 }} />}
            sx={{
              color: "#4B5563",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Support
          </Button>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: "#E5E7EB",
                color: "#4B5563",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              J
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                color: "#4B5563",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Jane
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: "#4B5563", fontSize: 20 }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
