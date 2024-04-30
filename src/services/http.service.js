export function getAllApplications(){
    return _request(`applications`,'GET');
}


async function _request(path, method, body = null) {
    const url = 'http://localhost:5000/' + path;
    const options = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data)
      .catch(error => {
        console.error(error);
        if (url.includes('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('is_admin');
          window.location.reload();
        }
      });
  }