const api = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = generateKey()
  //token = localStorage.token = Math.random().toString(36).substr(-8)

function generateKey(){
  return Math.random().toString(36).substr(-8)
}

function generateTimestamp(){
  let dateTime = new Date().getTime();
  return dateTime;
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function getInitialData(){
    return Promise.all([
        getCategories(),
        getPosts()                
    ]).then(([categories, posts])=> ({
        categories,
        posts
    }))
}

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    
export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
      .then(res => res.json())

export const getPostsByCategory = (category) =>
fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
        

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const updatePost = post => fetch(`${api}/posts/${post.id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post),
}).then(res => res.json());


export const createPost = post => fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  // body: JSON.stringify(post),
  body: JSON.stringify({
    id: generateKey(),
    timestamp: generateTimestamp(),
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category,
    voteScore: 0,
    deleted: false,
    commentCount: 0 
  })
}).then(res => res.json());

export const deletePost = postId => fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
.then(res => res.json());
  
export const votePost = (postId, option) => fetch(`${api}/posts/${postId}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ option }),
}).then(res => res.json());    

export const getComments = postId => fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json());

export const getComment = commentId => fetch(`${api}/comments/${commentId}`, { headers })
  .then(res => res.json());

export const createComment = comment => fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  // body: JSON.stringify(comment),
  body: JSON.stringify({
    id: generateKey(),
    parentId: comment.parentId,
    timestamp: generateTimestamp(),
    body: comment.body,
    author: comment.author,
    voteScore: 0,
    deleted: false,
    parentDeleted: false 
  })
}).then(res => res.json());

export const updateComment = comment => fetch(`${api}/comments/${comment.id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(comment),
}).then(res => res.json());

export const deleteComment = commentId => fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
  .then(res => res.json());

export const voteComment = (commentId, option) => fetch(`${api}/comments/${commentId}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ option }),
}).then(res => res.json());