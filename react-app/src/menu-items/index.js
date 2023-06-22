// import { useState , useEffect } from 'react';
// import Attendant from './Attendant';
// import Business from './Business';
// import Owner from './Owner';

// const getMenuItems = (role) => {
//   let items = [];

//   if (role === 'ATTENDANT') {
//     items = [Attendant];
//   } else if (role === 'BUSINESS_OWNER') {
//     items = [Business];
//   } else if (role === 'ADMIN') {
//     items = [Owner];
//   }

//   return { items };
// };

// const MenuItems = () => {
//   const [menuItems, setMenuItems] = useState({ items: [] });

//   useEffect(() => {
//     const userdata = JSON.parse(localStorage.getItem('userdata'));
//     if (userdata) {
//       setMenuItems(getMenuItems(userdata.role));
//     }
//   }, []);

//   return menuItems;
// };

// export default MenuItems;
