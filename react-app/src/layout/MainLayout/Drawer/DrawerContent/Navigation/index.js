// material-ui
import { Box, Typography } from '@mui/material';
import Attendant from '../../../../../menu-items/Attendant';
import Business from '../../../../../menu-items/Business';
import Owner from '../../../../../menu-items/Owner';
import { useState , useEffect } from 'react';
// project import
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //
const getMenuItems = (role) => {
    let items = [];
  
    if (role === 'ATTENDANT') {
      items = [Attendant];
    } else if (role === 'BUSINESS_OWNER') {
      items = [Business];
    } else if (role === 'ADMIN') {
      items = [Owner];
    }
  
    return { items };
  };

const Navigation = () => {
    const [menuItems, setMenuItems] = useState({ items: [] });

    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      if (userdata) {
        setMenuItems(getMenuItems(userdata.role));
      }
    }, []);
  
    const navGroups = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
