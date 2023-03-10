import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
    Box,
    Divider,
    Typography,
    Stack,
    MenuItem,
    Avatar,
    IconButton,
    Popover,
} from "@mui/material";

const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/assets/images/avatars/avatar_default.jpg",
};

export default function AccountPopover({
    logoutAction,
    imageUrl,
    email,
    firstName,
    lastName,
    homeAction,
    settingsAction,
}) {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = (action) => {
        setOpen(null);
    };

    const MENU_OPTIONS = [
        {
            label: "Home",
            icon: "eva:home-fill",
            action: () => {
                homeAction();
                setOpen(null);
            },
        },
        {
            label: "Settings",
            icon: "eva:settings-2-fill",
            action: () => {
                settingsAction();
                setOpen(null);
            },
        },
    ];

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        "&:before": {
                            zIndex: 1,
                            content: "''",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            position: "absolute",
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={imageUrl} alt="photoURL" />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        "& .MuiMenuItem-root": {
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                    >
                        {email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={option.action}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={logoutAction} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
