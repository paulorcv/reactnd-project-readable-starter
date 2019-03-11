import convertPosts from '../util/postHelper';

export function orderPosts(posts, orderBy) {
    
    let filteredPosts = {};
    let valuesPostOrdered
  
    switch (orderBy) {
      case 'score': // Biggest score first
        valuesPostOrdered = Object.values(posts).sort( (a, b) => (b.voteScore - a.voteScore) );
        filteredPosts = convertPosts(valuesPostOrdered);
      return filteredPosts;

      case 'newest': // Most recent posts first
        valuesPostOrdered = Object.values(posts).sort( (a, b) => (b.timestamp - a.timestamp) );
        filteredPosts = convertPosts(valuesPostOrdered);
      return filteredPosts;

      case 'oldest': // Oldest score first
        valuesPostOrdered = Object.values(posts).sort( (a, b) => (a.timestamp - b.timestamp) );
        filteredPosts = convertPosts(valuesPostOrdered);
      return filteredPosts;

      default:
        return filteredPosts;
    }
  }
  