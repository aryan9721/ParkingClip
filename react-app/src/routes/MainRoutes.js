import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));
const BusinessDashboard = Loadable(lazy(() => import('../pages/BusinessDashboard')));
const AdminDashboard = Loadable(lazy(() => import('../pages/AdminDashboard')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));
const GenerateTicket = Loadable(lazy(() => import('../pages/generateTicket/GenerateTicket')));
const CreateAttendant = Loadable(lazy(() => import('../pages/addAttendant/CreateAttendant')));
const VehicleRecord = Loadable(lazy(() => import('../pages/VehicleRecord/VehicleRecord')));
const LocationVehicleRecord = Loadable(lazy(() => import('../pages/LocationVehicleRecord/LocationVehicleRecord')));
const ShowAttendant = Loadable(lazy(() => import('../pages/showAttendants/ShowAttendant')));
const CreateBusiness = Loadable(lazy(() => import('../pages/CreateBusiness/CreateBusiness')));
const ViewBusiness = Loadable(lazy(() => import('../pages/ViewBusiness/ViewBusiness')));
const ViewAttendant = Loadable(lazy(() => import('../pages/ViewAttendant/ViewAttendant')));
const ShowBusiness = Loadable(lazy(() => import('../pages/ShowBusiness/ShowBusiness')));
const QrRecord = Loadable(lazy(() => import('../pages/QrRecord/QrRecord')));
const QRDownload = Loadable(lazy(() => import('../pages/QRDownload/QRDownload')));
const RateStructure = Loadable(lazy(() => import('../pages/rateStructure/RateStructure')));
const ShowRateStructure = Loadable(lazy(() => import('../pages/showRateStructure/ShowRateStructure')));
const ShowLocations = Loadable(lazy(() => import('../pages/ShowLocations/ShowLocations')));
const EnableDisableBusiness = Loadable(lazy(() => import('../pages/EnableDisableBusiness/EnableDisableBusiness')));
const AddLocation = Loadable(lazy(() => import('../pages/addLocation/AddLocation')));
const TestRent = Loadable(lazy(() => import('../pages/TestRent/TestRent')));
const ExitVehicle = Loadable(lazy(() => import('../pages/ExitVehicle/ExitVehicle')));
const ExitVehicleByOCR = Loadable(lazy(() => import('../pages/ExitVehicleByOCR/ExitVehicleByOCR')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: '/GenerateTicket',
            element: <GenerateTicket />
        },
        {
            path: '/ExitVehicle',
            element: <ExitVehicle />
        },
        {
            path: '/ExitVehicleByOCR',
            element: <ExitVehicleByOCR />
        },
        {
            path: 'BusinessDashboard',
            element: <BusinessDashboard />
        },
        {
            path: 'AdminDashboard',
            element: <AdminDashboard />
        },
        {
            path: 'VehicleRecord',
            element: <VehicleRecord />
        },
        {
            path: 'LocationVehicleRecord',
            element: <LocationVehicleRecord />
        },
        {
            path: 'AddLocation',
            element: <AddLocation />
        },        
        // {
        //     path: 'TestRent',
        //     element: <TestRent />
        // },
        {
            path: 'CreateAttendant',
            element: <CreateAttendant />
        },
        {
            path: 'ShowAttendant',
            element: <ShowAttendant />
        },
        {
            path: 'RateStructure',
            element: <RateStructure />
        },
        {
            path: 'ShowLocations',
            element: <ShowLocations />
        },
        {
            path: 'EnableDisableBusiness',
            element: <EnableDisableBusiness />
        },
        {
            path: 'ShowRateStructure',
            element: <ShowRateStructure />
        },
        {
            path: 'CreateBusiness',
            element: <CreateBusiness />
        },
        {
            path: 'ViewBusiness',
            element: <ViewBusiness />
        },
        {
            path: 'ViewAttendant',
            element: <ViewAttendant />
        },
        {
            path: 'ShowBusiness',
            element: <ShowBusiness />
        },
        {
            path: 'QrRecord',
            element: <QrRecord />
        },
        {
            path: 'QRDownload',
            element: <QRDownload />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />

        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
