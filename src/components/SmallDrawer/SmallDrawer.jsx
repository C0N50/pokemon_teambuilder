import { Link } from "react-router-dom";

import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';




export const SmallDrawer = () => {


    const [isSmallDrawerOpen, setIsSmallDrawerOpen] = useState(false);

    return (
        <>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                onClick={() => setIsSmallDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isSmallDrawerOpen}
                onClose={() => setIsSmallDrawerOpen(false)}>
                <Box p={2} width='200px' textAlign='center' role='presentation'>
                    <Typography variant='h6' component='div'>
                        Info & About
                    </Typography>


                    <List>
                        <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>

                        <Link to="/about" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <QuestionMarkIcon />
                                </ListItemIcon>
                                <ListItemText primary={"About"} />
                            </ListItem>
                        </Link>
                    </List>


                </Box>
            </Drawer>
        </>
    )
}


