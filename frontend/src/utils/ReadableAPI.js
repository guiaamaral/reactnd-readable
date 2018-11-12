const api = "http://localhost:3001"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json());
}

export const fetchPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json());
}

export const addPost = (newPost) => {
  return fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPost)
  })
  .then(res => res.json());
}

export const fetchComments = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json());
}