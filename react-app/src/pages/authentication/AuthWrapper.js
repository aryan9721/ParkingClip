import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import logo from '../../assets/images/business/Logo.png';
// import AuthFooter from 'components/cards/AuthFooter';

// assets
// import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ minHeight: '100vh', flex: 1, justifyContent: 'center' }}>
        {/* <AuthBackground /> */}
        {/* <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '100vh'
            }}
        > */}
        {/* <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        </Grid> */}
        {/* <img style={{ height: 35, width: 140, alignSelf: 'center', paddingTop: 5 }} src={Logo} alt="" /> */}

        <Grid item xs={12}>
            <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ minHeight: { xs: '100vh', md: '100vh' } }}>
                <Grid item>
                    <div>
                        <img src={logo} alt="" style={{width: 150, marginLeft: "35%", alignItems: 'center'}} />
                        <AuthCard>{children}</AuthCard>
                    </div>
                </Grid>
            </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid> */}
        {/* </Grid> */}
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};
export default AuthWrapper;
