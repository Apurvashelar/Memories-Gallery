import axios from 'axios';

const API = axios.create({ baseURL: 'https://memories-app-project-final.herokuapp.com/posts' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/${id}`);
export const fetchPosts = (page) => API.get(`?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('', newPost);
export const likePost = (id) => API.patch(`/${id}/likePost`);
export const comment = (value, id) => API.post(`/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
