
export function getAllApplications(){
    return _request(`applications`,'GET');
}


export function registration(data){
  return _request(`auth/register`,'POST',data)
}

export function login(data){
  return _request(`auth/login`,'POST',data)
}

export function getUserData(token) {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request('auth/me', 'GET', null, headers);
}

async function _request(path, method, body = null, headers = {}) {
  const url = 'http://localhost:5000/' + path;
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
  };


  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    if (url.includes('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('is_admin');
      window.location.reload();
    }
    throw error; // перебрасываем ошибку дальше
  }
}