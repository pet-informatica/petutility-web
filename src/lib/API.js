import Constants from './Constants';

class API {
  static async request(path, method, body) {
    return await fetch(Constants.apiURL + path, {
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include',
      method: method,
      body: JSON.stringify(body)
    });
  }
}

export default API;
