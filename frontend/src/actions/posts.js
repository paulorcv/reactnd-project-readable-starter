export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_POSTS_FROM_CATEGORIES_FILTER = 'SET_POSTS_FROM_CATEGORIES_FILTER';

export function receivePosts(posts){
    return{
        type: RECEIVE_POSTS,
        posts
    }
}

export function setPostsFromCategoryFilter(filter){
    return{
        type : SET_POSTS_FROM_CATEGORIES_FILTER,
        filter
    }
}