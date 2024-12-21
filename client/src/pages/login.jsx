import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, verifyToken } from '../services/api.js';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';


const customTheme = extendTheme({ defaultColorScheme: 'dark' });

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        verifyToken(token)
            .then((data) => {
                if (data === "No token provided") {
                    console.log("No token provided");
                } else {
                    console.log("Logged in as admin");
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        login(email, password)
            .then((response) => {
                localStorage.setItem('token', response.token);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                console.log("Login failed");
            });
    };

    return (
        <CssVarsProvider theme={customTheme} disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Transition-duration': '0.4s',
                    },
                    'html, body': {
                        overflow: 'hidden', // Prevent scroll
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                    
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="main"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '100%',
                            maxWidth: 500,
                            borderRadius: 'sm',
                            boxShadow: '0px 4px 100px rgba(255, 217, 217, 0.1)', // Added some shadow for visual appeal
                            padding: 3,
                        }}
                    >
                        <Stack sx={{ gap: 4, mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography component="h1" level="h3">
                                    Admin Log In
                                </Typography>
                                <Typography level="body-sm">
                                    Please log in with your credentials.
                                </Typography>
                            </Stack>
                        </Stack>
                        {/* Removed the Divider (or text) */}
                        <Stack sx={{  mt: 2 }}>
                            <form onSubmit={handleSubmit} >
                                <FormControl required >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Stack sx={{ gap: 4, mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            borderRadius: '24px',
                                            padding: '10px 16px',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            marginTop: 2,
                                            transition: 'all 0.3s ease',  // Add smooth transition
                                            '&:hover': {
                                                backgroundColor: 'white',  // Change background to white on hover
                                                color: 'black',            // Change text color to black on hover (optional)
                                            },
                                        }}
                                    >
                                        Log In
                                    </Button>


                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
};

export default Login;
