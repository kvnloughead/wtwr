class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  signup = ({ name, avatar, email, password }) =>
    fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, avatar, email, password }),
    }).then((res) => res.json());

  signin = ({ email, password }) =>
    fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

  getCurrentUser = (token) =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  getItems = () =>
    fetch(`${this._baseUrl}/items`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  createItem = (token, values) =>
    fetch(`${this._baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    }).then((res) => res.json());

  updateLike = (token, id, isLiked) =>
    fetch(`${this._baseUrl}/items/${id}/likes`, {
      method: `${isLiked ? 'PATCH' : 'DELETE'}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
}

const api = new Api('http://localhost:3001');
export default api;
