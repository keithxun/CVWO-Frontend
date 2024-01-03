import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import * as React from "react";
interface HeaderProps {
    sections: Array<{ title: string; url: string }>;
    title: string;
    darkMode: boolean;
    toggleDarkMode: () => void;
}
export default function Header(props: HeaderProps) {
    const { sections, title, toggleDarkMode } = props;
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Button size="small" onClick={() => navigate("/new-post-form")}>
                    Create New Post
                </Button>
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
                    {title}
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" onClick={() => navigate("/sign-up")}>
                    Sign up
                </Button>
                <Button variant="outlined" size="small" onClick={() => navigate("/sign-in")}>
                    Have an account? Sign in
                </Button>
                <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between", overflowX: "auto" }}>
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}
