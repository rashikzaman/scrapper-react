import '../styles/globals.css'
import Cookie from '../utils/cookie'
import axios from 'axios'
import { DataProvider } from '../contexts/DataContext';

function MyApp({ Component, pageProps, }) {
  return <DataProvider me={pageProps.user}><Component {...pageProps} /></DataProvider>
}


MyApp.getInitialProps = async ({ Component, ctx }) => {
  let token = Cookie.getAccessTokenCookieAtRequest(ctx)
  let me = null
  if (token) {
    me = await api(`user`, token)
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
  console.log("me", me)
  return { pageProps: { user: me } };
};


export const api = async (url, token = null) => {
  const baseUrl = "http://localhost:8080/api";
  try {
    const response = await axios(`${baseUrl}/${url}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json',
        "Accept": "*/*"
      }
    })
    return response.data
  } catch (e) {
    return null
  }
}


export default MyApp
