import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'
import JwtRegisterNextStep from './register/JwtRegisterNextStep'
import Blank from './Blank'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import TermsAndCondition from './TermsAndCondition'
import PrivacyPolicy from './PrivacyPolicy'
import Otp from './otp/Otp'
import ResetPassword from './ResetPassword'

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
        path: '/terms-and-conditions',
        component: TermsAndCondition,
    },
    {
        path: '/privacy-policy',
        component: PrivacyPolicy,
    },
    {
        path: '/otp-verify',
        component: Otp,
    },
    {
        path: '/resend-otp',
        component: Otp,
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
    {
        path: '/reset-password/?token:token',
        component: ResetPassword,
    },
]

export default sessionRoutes
