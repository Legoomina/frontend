import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import UserContext, { defaultUser } from "../context/UserContext";

import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";

import SchoolIcon from "@mui/icons-material/School";

import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import MyActivities from "../containers/MyActivites";
import { Stack } from "@mui/system";
import AccountPopover from "../components/AccountPopover/AccountPopover";
import { faker } from "@faker-js/faker";

import logo from "../../src/sh_logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Menu({ children }) {
    const { user, setUser } = React.useContext(UserContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setOpen(false);
        setUser(defaultUser);
        navigate("/login");
    };

    const handleAddActivites = () => {
        setOpen(true);
        navigate("/add_activites");
    };

    const handleMyActivites = () => {
        setOpen(true);
        navigate("/myactivs");
    };

    const ListItems = {
        home: {
            text: "Home",
            icon: <HomeIcon />,
            onClick: () => navigate("/"),
        },
        register: {
            text: "Register",
            icon: <PersonAddIcon />,
            onClick: () => navigate("/register"),
        },
        login: {
            text: "Login",
            icon: <LoginIcon />,
            onClick: () => navigate("/login"),
        },
        logout: {
            text: "Logout",
            icon: <LogoutIcon />,
            onClick: () => handleLogout(),
        },
        myActivities: {
            text: "My activities",
            icon: <AssignmentIcon />,
            onClick: () => handleMyActivites(),
        },
        findActivities: {
            text: "Find activities",
            icon: <SearchIcon />,
            onClick: () => navigate("/find-activities"),
        },
        createActivities: {
            text: "Create activities",
            icon: <CreateIcon />,
            onClick: () => handleAddActivites(),
        },
        settings: {
            text: "Settings",
            icon: <SettingsIcon />,
            onClick: () => navigate("/settings"),
        },
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <Toolbar style={{ marginLeft: "auto" }}> */}
                    <Toolbar>
                        {/* <SchoolIcon
                            sx={{
                                mr: 2,
                            }}
                        /> */}

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={logo}
                                alt=""
                                style={{
                                    height: "48px",
                                    marginRight: "16px",
                                }}
                            />
                            ShareKnow
                        </Typography>
                    </Toolbar>

                    <AccountPopover
                        imageUrl={faker.image.avatar()}
                        email={user.email}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        marginRight={12}
                        homeAction={() => navigate("/")}
                        settingsAction={() => navigate("/settings")}
                        logoutAction={handleLogout}
                    />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        ListItems.home,
                        ...(user.isLoggedIn
                            ? [
                                //   ListItems.createActivities,
                                  ListItems.myActivities,
                                  ListItems.findActivities,
                              ]
                            : []),
                    ].map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                                onClick={item.onClick}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {(user.isLoggedIn
                        ? [ListItems.settings, ListItems.logout]
                        : [ListItems.login, ListItems.register]
                    ).map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                                onClick={item.onClick}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: 12 }}>
                {children}
            </Box>
        </Box>
    );
}
