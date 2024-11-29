import { useEffect, useState } from 'react';
import Post from '../Post';

const IndexPage = () => {
  const url = 'https://citify.onrender.com';
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/post`);

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const fetchedPosts = await response.json();
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default IndexPage;
