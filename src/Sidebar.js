import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Button } from "@material-ui/core";

function Sidebar() {
    return (
        <div className="sidebar">
            <i className="bi bi-stars"></i>
            <SidebarOption Icon={HomeIcon} text="Home" active={true} />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />

            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Send Galaxy
            </Button>
        </div>
    );
}

export default Sidebar;
