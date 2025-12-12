import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useContext } from 'react'
import { loginContext } from '../../App'
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [passwordRules, setPasswordRules] = useState({
        lower: false,
        upper: false,
        number: false,
        length: false,
        symbol: false,
    });

    const { setIsLogin } = useContext(loginContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "password") {
            setPasswordRules({
                lower: /[a-z]/.test(value),
                upper: /[A-Z]/.test(value),
                number: /[0-9]/.test(value),
                length: value.length >= 8,
                symbol: /[\W_]/.test(value),
            });
        }
    }

    useEffect(() => {
        const alreadyUser = localStorage.getItem("login-info");
        if (alreadyUser) navigate("/");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.postLogin(formData);
            // while login take all the localstorage 'guest-cart' and then api.addGuestCart which will be having the ids all and store in the user cart add 
            localStorage.setItem(
                "login-info",
                JSON.stringify(
                    res.data.exist
                )
            );

            const cardIds = JSON.parse(localStorage.getItem('guest-cart'));
            const user = JSON.parse(localStorage.getItem('login-info'));
            const userId = user._id;
            if (cardIds) {
                await api.addGuestCart({ ids: cardIds, userId })
                localStorage.removeItem('guest-cart')
            }
            navigate("/");
        } catch (err) {
            if (err.response?.status == "404") {
                navigate("/signup");
            } else {
                alert(err.response?.data?.message || "Login failed!");
            }
        }
    };
    useEffect(() => {
        const info = localStorage.getItem("login-info");
        if (info) {
            setIsLogin(true);
        }
    }, []);

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper elevation={3} sx={{ padding: 4, width: "350px" }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <h4>Password must contains :- </h4>
                    <ul style={{ fontSize: "13px", marginTop: "5px", paddingLeft: "15px" }}>
                        <li style={{ color: passwordRules.lower ? "green" : "red", listStyle: 'none' }}>
                            {passwordRules.lower ? "✔" : "✖"} At least one lowercase letter
                        </li>
                        <li style={{ color: passwordRules.upper ? "green" : "red", listStyle: 'none' }}>
                            {passwordRules.upper ? "✔" : "✖"} At least one uppercase letter
                        </li>
                        <li style={{ color: passwordRules.number ? "green" : "red", listStyle: 'none' }}>
                            {passwordRules.number ? "✔" : "✖"} At least one number
                        </li>
                        <li style={{ color: passwordRules.symbol ? "green" : "red", listStyle: 'none' }}>
                            {passwordRules.symbol ? "✔" : "✖"} At least one special character (# @ % $ ! & *)
                        </li>
                        <li style={{ color: passwordRules.length ? "green" : "red", listStyle: 'none' }}>
                            {passwordRules.length ? "✔" : "✖"} Minimum 8 characters
                        </li>
                    </ul>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>

                <Typography mt={2} textAlign="center">
                    Don’t have an account? <Link to="/signup">Signup</Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;