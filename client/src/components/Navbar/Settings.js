import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { red, blue, orange, green, yellow, purple, brown, grey } from '@mui/material/colors';

import useGetCurrentUser from '../../api/Auth/useGetCurrentUser';
import useLogoutUser from '../../api/Auth/useLogoutUser';

export default function Settings() {

    //GEt current user
    const user = useGetCurrentUser();

    //Logout user
    const {logoutUser} = useLogoutUser();
    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
    }

    const profileColors = [red, blue, orange, green, yellow, purple, brown];
    var profileColor;
    var settings;

    if(user != null)
    {
        profileColor = profileColors[(user.length % 7)];
        settings = {"Profile": `user/${user}`};
    }
    else 
    {
        profileColor = grey;
        settings = {"Login": "/login"};
    }

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                                alt="User Avatar"
                                sx={{
                                    bgcolor: profileColor[500],  
                                    color: '#fff',        
                                    width: 32,            
                                    height: 32            
                                }}
                        >
                            {user != null ? user[0] : ""}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '2.5%' }}
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
                    {Object.keys(settings).map((setting) => (
                        <Link to={settings[setting]}>
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        </Link>
                    ))}
                    {user != null ? 
                        <MenuItem>
                            <Button variant="text" color="error" size="small" onClick={handleLogout}>
                                Logout
                            </Button>
                        </MenuItem>
                    : 
                    null}
                </Menu>
            </Box>
        </>
    )
}