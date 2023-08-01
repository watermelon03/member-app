import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./SideBar";
import Home from "./Home";
import TableUsers from "./TableUsers";
import TopBar from "./TopBar";
import Profile from "./Profile";

const drawerWidth = 200;

function MainPage(props) {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contentState, setContentState] = useState("home");
  const [resultAccount, setResultAccount] = useState({});
  const [resultInfo, setResultInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5050/member-api/admin/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setResultAccount(result.adminAccount);
          setResultInfo(result.adminInfo);
        } else if (result.status === "forbidden") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          }).then((value) => {
            localStorage.removeItem("token");
            navigate("/");
          });
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  var contentBox = null;
  switch (contentState) {
    case "home":
      contentBox = <Home />;
      break;
    case "table-users":
      contentBox = <TableUsers />;
      break;
    case "profile":
      contentBox = <Profile resultInfo={resultInfo} />;
      break;
    default:
      contentBox = <Home />;
      break;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar
        resultAccount={resultAccount}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        setContentState={setContentState}
      />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <SideBar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          setContentState={setContentState}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div>{contentBox}</div>
      </Box>
    </Box>
  );
}

export default MainPage;
