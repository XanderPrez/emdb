const BASE_URL = "https://edgemony-backend.herokuapp.com";

const http = (resource, options) =>
  fetch(BASE_URL + resource, options).then((response) => response.json());

const GET = (resource) => http(resource, { method: "GET" });

const POST = (resource, data) =>
  http(resource, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

const DELETE = (resource, id) =>
  http(`${resource}/${id}`, { method: "DELETE" });

const PUT = (resource, id, data) =>
  http(`${resource}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

export { GET, POST, PUT, DELETE };
