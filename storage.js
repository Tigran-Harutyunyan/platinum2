const storage = {

  getLocale() {
    let locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en';
    return locale;
  },

  setLocale(locale) {
    localStorage.setItem('locale', locale);
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : {};
  },

  removeUser() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  },

  deleteToken() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  },

};

export default storage;
