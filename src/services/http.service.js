
export function getAllApplications(){
    return _request(`applications`,'GET');
}

export function getMeAllApplications(token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`MyApplications`,'GET',null,headers);
}

export function getAllCategory(){
  return _request(`category`,`GET`);
}

export function createCategory(data,token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`category`, 'POST', data, headers);
}

export function deleteCategory(category_id,token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`category/${category_id}`, 'DELETE', null, headers);
}

export function ApplicationDelete(application_id,token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`applications/${application_id}`, 'DELETE', null, headers);
}

export function ApplicationUpdateStatus(application_id,data,token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`applications/${application_id}`, 'PATCH', data, headers);
}

export function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  return _request('upload', 'POST', formData, headers);
}

export function ApplicationCreate(data,token){
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return _request(`applications`, 'POST', data, headers);
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
      ...headers
    },
  };

  if (body && body instanceof FormData) {
    // Если тело запроса является FormData, не добавляем Content-Type и не сериализуем тело
    options.body = body;
  } else if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    // В противном случае, если тело запроса не является FormData, сериализуем его в JSON
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Если ответ содержит JSON, парсим его, иначе возвращаем сам ответ
    return response.json().catch(() => response);
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