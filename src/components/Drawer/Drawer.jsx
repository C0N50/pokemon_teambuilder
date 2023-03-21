import { Link } from "react-router-dom";

import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import BiotechIcon from '@mui/icons-material/Biotech';

export const MuiDrawer = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' textAlign='center' role='presentation'>
                    <Typography variant='h6' component='div'>
                        Navigation
                    </Typography>

                    <List>
                        <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Build"} />
                            </ListItem>
                        </Link>


                        <Link to="/analyze" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <BiotechIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Analyze"} />
                            </ListItem>
                        </Link>



                        <Link to="/about" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <QuestionMarkIcon />
                                </ListItemIcon>
                                <ListItemText primary={"About"} />
                            </ListItem>
                        </Link>


                        <Link to="/info" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Info"} />
                            </ListItem>
                        </Link>
                    </List>

                </Box>
            </Drawer>
        </>
    )
}


