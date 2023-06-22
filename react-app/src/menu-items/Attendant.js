// assets
import { DashboardOutlined } from '@ant-design/icons';
import GenerateTicketIcon from '../assets/images/business/parkingTicket.svg';
import VehicleRecordIcon from '../assets/images/business/VehicleRecordIcon.png';
// import { createSvgIcon } from '@mui/material';

// import SvgIcon from '@material-ui/core/SvgIcon';

// icons
const icons = {
    DashboardOutlined,
    GenerateTicketIcon,
    VehicleRecordIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'GenerateTicket',
            title: 'Generate Ticket',
            type: 'item',
            url: '/GenerateTicket',
            breadcrumbs: false
        },
        {
            id: 'VehicleRecord',
            title: ' Vehicle record',
            type: 'item',
            url: '/VehicleRecord',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        },
        {
            id: 'ExitVehicle',
            title: ' Exit Vehicle By QR Code',
            type: 'item',
            url: '/ExitVehicle',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        },
        {
            id: 'ExitVehicleByOCR',
            title: ' Exit Vehicle By OCR',
            type: 'item',
            url: '/ExitVehicleByOCR',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        },
        {
            id: 'QRDownload',
            title: 'QR Code Sticker Printing',
            type: 'item',
            url: '/QRDownload',
            // icon: icons.VehicleRecordIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
