import Constants from './Constants';

class API {
  static async request(path, method, body, headers) {
    return await fetch(Constants.apiURL + path, {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      method: method,
      body: JSON.stringify(body)
    });
  }

  static async upload(path, method, data) {
    return await fetch(Constants.apiURL + path, {
      credentials: 'include',
      method: method,
      body: data
    });
  }
}

export default API;
