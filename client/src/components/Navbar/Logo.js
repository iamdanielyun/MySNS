import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';

export default function Logo() {
    return (
        <>  
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    }
                }}
            >
                MySNS
            </Typography>
        </>
    )
}