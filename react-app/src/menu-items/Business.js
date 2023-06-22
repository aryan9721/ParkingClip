// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const Business = {
    id: 'Business',
    title: '',
    type: 'group',
    children: [
        {
            id: 'BusinessDashboard',
            title: 'Business Dashboard',
            type: 'item',
            url: '/BusinessDashboard',
            // icon: icons.LoginOutlined,
            // target: true
            breadcrumbs: false

        },  
        {
            id: 'CreateAttendant',
            title: 'Create Attendant',
            type: 'item',
            url: '/CreateAttendant',
            // icon: icons.LoginOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'ShowAttendant',
            title: 'Show Attendant',
            type: 'item',
            url: '/ShowAttendant',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'RateStructure',
            title: 'Define Rate Structure',
            type: 'item',
            url: '/RateStructure',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },
        {
            id: 'ShowRateStructure',
            title: 'Show Rate Structure',
            type: 'item',
            url: '/ShowRateStructure',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false

        },
        // {
        //     id: 'TestRent',
        //     title: 'Test Rent (temporary)',
        //     type: 'item',
        //     url: '/TestRent',
        //     // icon: icons.ProfileOutlined,
        //     // target: true
        //     breadcrumbs: false
        // },
        {
            id: 'AddLocation',
            title: 'Add Location',
            type: 'item',
            url: '/AddLocation',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'ShowLocations',
            title: 'Show Locations',
            type: 'item',
            url: '/ShowLocations',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        },
        {
            id: 'LocationVehicleRecord',
            title: 'Location Wise Vehicle Record',
            type: 'item',
            url: '/LocationVehicleRecord',
            // icon: icons.ProfileOutlined,
            // target: true
            breadcrumbs: false
        }
    ]
};

export default Business;
