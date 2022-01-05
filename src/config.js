export var firebaseConfig = {
    apiKey: 'AIzaSyBoUdiDtzQdC-m4nj9CPY5SvY7uKJGL71k',
    authDomain: 'matx-15ede.firebaseapp.com',
    databaseURL: 'https://matx-15ede.firebaseio.com',
    projectId: 'matx-15ede',
    storageBucket: 'matx-15ede.appspot.com',
    messagingSenderId: '348111707030',
    appId: '1:348111707030:web:70c4ca4eb3f1dbd18e1bb7',
    measurementId: 'G-806629YLNN',
}

 const auth0Config = {
    client_id: 'XmminWIs0S8gR3gIRBydYLWbF58x81vK',
    domain: 'matx.us.auth0.com',
}

const isDev = () =>
  process.env.NODE_ENV === 'development' || window.location.host === 'dev2.nextrope.com';

const config = {
  API_URL: isDev() ? 'https://api.dev2.nextrope.com' : 'https://api-app.tcake.io',
  WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  SUBSCRIPTIONS_CONTRACT_ADDRESS: isDev()
    ? '0x681f67113fd4c93d6a95d415582734ded7e34fff'
    : '0xeb7ae50a56f2f2c3ffa42e81c8fc45bc859fe597',
  T_CAKE_ADDRESS: isDev()
    ? '0x00721f0ec936da8dd2bf1060b96e82a0244232f5'
    : '0x3b831d36ed418e893f42d46ff308c326c239429f',
  T_CAKE_DECIMALS: isDev() ? 18 : 18,
};
console.log(config,'print env');
export default config;

