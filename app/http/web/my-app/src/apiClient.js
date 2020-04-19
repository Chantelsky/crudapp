import axios from 'axios';

const BASE_URI = 'http://localhost:4433';

const client = axios.create({
  baseURL: BASE_URI,
  json: true
});

const APIClient = (accessToken) => {
  const createKudo = (repo) => {
    return perform('post', '/kudos', repo);
  };

  const deleteKudo = (repo) => {
    return perform('delete', '/kudos/${repo.id}');
  };

  const getKudos = () => {
    return perform('get', '/kudos');
  };

  const perform = async (method, resource, data) => {
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((resp) => {
      return resp.data ? resp.data : [];
    });
  };
};

export default APIClient;
