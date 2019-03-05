export default function convertComments(comments){
    let commentsConverted = {};

    // console.log('original comments:');
    // console.log(comments);

    Object.keys(comments).map(key => {
        let id = comments[key].id;
        let comment = comments[key];
        // console.log('comment:');
        // console.log(comment);
        commentsConverted = { ...commentsConverted, [id]: comment};
        return (commentsConverted);
    })

 
    // console.log('converted comments:');
    // console.log(commentsConverted);   

    return commentsConverted;

  }