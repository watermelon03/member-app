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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function RegisterAdmin() {
  const [regInputs, setRegInputs] = useState({});
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const initialRoleId = 1;
  const initialSex = "Male";

  const onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegInputs((values) => ({ ...values, [name]: value }));
  };

  const onBirthdayChange = (value) => {
    const formattedValue = dayjs(value).format("YYYY-MM-DD"); // แปลงวันที่เป็น string ในรูปแบบ 'YYYY-MM-DD'
    setRegInputs((values) => ({ ...values, birthday: formattedValue }));
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
    if (regInputs.password !== regInputs.conpassword) {
      MySwal.fire({
        html: <i>{'Confirm password not correct'}</i>,
        icon: 'error'
      })
      return
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: regInputs.username,
      password: regInputs.password,
      roleid: regInputs.roleid,
      firstname: regInputs.firstname,
      lastname: regInputs.lastname,
      sex: regInputs.sex,
      birthday: regInputs.birthday,
      tel: regInputs.tel,
      email: regInputs.email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5050/member-api/admin/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value) => {
            localStorage.setItem('token', result.token)
            navigate('/')
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
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
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
              Register for Admin
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={onSubmitClick}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Admin Name"
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={regInputs.username || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Firstname"
                    id="firstname"
                    name="firstname"
                    autoComplete="given-name"
                    value={regInputs.firstname || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Lastname"
                    id="lastname"
                    name="lastname"
                    autoComplete="family-name"
                    value={regInputs.lastname || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                      name="roleid"
                      value={regInputs.roleid || initialRoleId}
                      onChange={onValueChange}
                    >
                      <MenuItem value={1}>Manager</MenuItem>
                      <MenuItem value={2}>Staff</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Sex"
                      name="sex"
                      value={regInputs.sex || initialSex}
                      onChange={onValueChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Birthday"
                        format="YYYY-MM-DD"
                        disableFuture
                        onChange={onBirthdayChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Telephone"
                    type="tel"
                    id="tel"
                    name="tel"
                    autoComplete="off"
                    value={regInputs.tel || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={regInputs.email || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={regInputs.password || ""}
                    onChange={onValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="conpassword"
                    name="conpassword"
                    autoComplete="off"
                    value={regInputs.conpassword || ""}
                    onChange={onValueChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login-admin" variant="body2">
                    {"Back to Login"}
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

export default RegisterAdmin;
