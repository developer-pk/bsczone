import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'
import JwtRegisterNextStep from './register/JwtRegisterNextStep'
import Blank from './Blank'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'

const sessionRoutes = [
    {
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/home',
        component: Blank,
    },
    {
        path: '/contact-us',
        component: ContactUs,
    },
    {
        path: '/about-us',
        component: AboutUs,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
