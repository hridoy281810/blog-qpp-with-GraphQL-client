
import PostCard from './PostCard';
import { gql, useQuery } from '@apollo/client';
const GET_POSTS = gql`
query GetPosts {
  posts {
    id
    title
    content
    author {
      email
      name
      id
    }
    createdAt
    published
  }
}
`
const Posts = () => {
    const { loading, error, data:postData } = useQuery(GET_POSTS);

    if(loading){
        return <p>Loading....</p>
    }
    if(error){
        return <p>error: {error.message}</p>
    }
    return (
        <div>
            <h1 className='text-center font-bold text-5xl my-4 pb-4'>Posts</h1>
            <hr />
           <div className='flex flex-wrap'>
           { postData?.posts?.map((post)=> <PostCard key={post?.id} post={post}/>)}
           </div>
        </div>
    );
};

export default Posts;