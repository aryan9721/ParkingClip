// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const Owner = {
    id: 'Owner',
    title: '',
    type: 'group',
    children: [
        {
            id: 'AdminDashboard',
            title: 'Admin Dashboard',
            type: 'item',
            url: '/AdminDashboard',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'CreateBusiness',
            title: 'Create Business',
            type: 'item',
            url: '/CreateBusiness',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'ShowBusiness',
            title: 'Show Business',
            type: 'item',
            url: '/ShowBusiness',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'EnableDisableBusiness',
            title: 'Enable / Disable Business',
            type: 'item',
            url: '/EnableDisableBusiness',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'QrRecord',
            title: 'QR Sticker Data',
            type: 'item',
            url: '/QrRecord',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        }
    ]
};

export default Owner;
