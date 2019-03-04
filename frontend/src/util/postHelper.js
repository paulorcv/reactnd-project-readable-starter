export default function convertPosts(posts){
    let postsConverted = {};

    Object.keys(posts).map(key => {
        let id = posts[key].id;
        let post = posts[key];
        postsConverted = { ...postsConverted, [id]: post};
        return (postsConverted);
    })

    return postsConverted;

  }