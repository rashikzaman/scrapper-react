import '../styles/globals.css'
import Cookie from '../utils/cookie'
import axios from 'axios'
import { DataProvider } from '../contexts/DataContext';
import { api } from '../utils/api';

function MyApp({ Component, pageProps, }) {
  return <DataProvider me={pageProps.user}><Component {...pageProps} /></DataProvider>
}


MyApp.getInitialProps = async ({ Component, ctx }) => {
  let token = Cookie.getAccessTokenCookieAtRequest(ctx)
  let me = null
  if (token) {
    me = await api("user", token)
    if (!me) {
      Cookie.removeAccessTokenCookieAtRequest(ctx)
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
  } else {
    if (ctx.pathname !== "/login" && ctx.res !== undefined) {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
  }
  return { pageProps: { user: me } };
};



export default MyApp
