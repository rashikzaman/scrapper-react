import Cookies from 'universal-cookie';

const cookie = (() => {
    const accessTokenCookieName = 'access_token';
    const reactCookie = new Cookies()

    function getApplicationCookie(ctx, name) {
        if (ctx) {
            let cookie = ctx.req ? ctx.req.headers.cookie : null
            var decodedCookie = decodeURIComponent(cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        }
        return null;
    }

    function getAccessTokenCookieAtRequest(ctx) {
        let name = accessTokenCookieName + "=";
        const cookie = getApplicationCookie(ctx, name)
        return cookie
    }

    function removeAccessTokenCookieAtRequest(ctx) {
        if (ctx.res)
            ctx.res.setHeader('Set-Cookie', `${accessTokenCookieName}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    }


    const setAccessTokenCookie = (token) => {
        const expiration = getExpiration()
        reactCookie.set(accessTokenCookieName, token.toString(), { path: '/', expires: expiration })
    }

    const getAccessTokenCookie = () => {
        return reactCookie.get(accessTokenCookieName) ?? null
    }

    const removeAccessTokenCookie = () => {
        reactCookie.remove(accessTokenCookieName, { path: '/' })
    }

    const getExpiration = (day = null) => {
        const timestamp = new Date().getTime(); // current time
        let expiryDay = 1
        const exp = timestamp + (60 * 60 * 24 * 1000 * expiryDay)
        return new Date(exp)
    }

    return {
        getAccessTokenCookieAtRequest,
        removeAccessTokenCookieAtRequest,
        setAccessTokenCookie,
        getAccessTokenCookie,
        removeAccessTokenCookie,
    }
})()


export default cookie 