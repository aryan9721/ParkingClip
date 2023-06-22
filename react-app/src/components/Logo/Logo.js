// material-ui
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/business/Logo.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <>
            <img src={logo} alt="Docuclip" width="200" />
        </>
    );
};

export default Logo;
