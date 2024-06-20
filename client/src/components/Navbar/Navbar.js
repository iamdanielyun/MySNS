import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ShrinkedNavbar from './ShrinkedNavbar';
import Settings from './Settings';
import Routes from './Routes';
import Logo from './Logo';

export default function Navbar() {
    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* Logo */}
                        <Logo />

                        {/* Navbar when the screen size reduces */}
                        <ShrinkedNavbar />

                        {/* Routes */}
                        <Routes />
                        
                        {/* User and settings */}
                        <Settings />

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
