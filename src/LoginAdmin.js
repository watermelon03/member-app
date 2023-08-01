import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

function LoginAdmin() {
  const [logInputs, setLogInputs] = useState({});
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitClick = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: logInputs.username,
      password: logInputs.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5050/member-api/admin/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value) => {
            localStorage.setItem('token', result.token)
            navigate('/main-admin')
          })
        }else{
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          })
        }
      })
      .catch((error) => {
        MySwal.fire({
          html: <i>Error connection refused</i>,
          icon: 'error'
        })
        console.log("error", error)
      });
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{
            backgroundImage: "url(wp2504321.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login for Admin
            </Typography>

            <Box component="form" noValidate onSubmit={onSubmitClick} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Adminname"
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={logInputs.username || ""}
                onChange={onValueChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={logInputs.password || ""}
                onChange={onValueChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/register-admin" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginAdmin;
