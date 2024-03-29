import Cookie from "js-cookie";

function getcookiesInServer(req){
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}

export default function ({ isHMR, app, store, route, params, error, redirect, req }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const locale = params.lang || defaultLocale;
  if (store.state.modules.locales.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  const {language} = getcookiesInServer(req);
  store.commit('modules/locales/setLanguage', language);


  app.i18n.locale = store.state.modules.locales.locale;
  // If route is /<defaultLocale>/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '');
    const re = new RegExp(toReplace);
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
