import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import TableViewIcon from "@mui/icons-material/TableView";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";

function SideBar(props) {
  const { window } = props;

  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onclick: () => {
        props.setContentState('home')        
        props.setMobileOpen(false)
        console.log("Home");
      },
    },
    {
      text: "Table Users",
      icon: <TableViewIcon />,
      onclick: () => {
        props.setContentState('table-users')
        props.setMobileOpen(false)
        console.log("Table Users")
      },
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onclick: () => console.log("Dashboard"),
    },
    {
      text: "History Usages",
      icon: <HistoryIcon />,
      onclick: () => console.log("History Usages"),
    },
  ];
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        <div>
          <Toolbar />
          <Divider />
          <List>
            {itemsList.map((item, index) => {
              const { text, icon, onclick } = item;
              return (
                <ListItem key={text} onClick={onclick} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        <div>
          <Toolbar />
          <Divider />
          <List>
            {itemsList.map((item, index) => {
              const { text, icon, onclick } = item;
              return (
                <ListItem key={text} onClick={onclick} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
