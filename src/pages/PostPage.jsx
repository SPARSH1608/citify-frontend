import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
const PostPage = () => {
  const url = 'https://citify.onrender.com';
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`${url}/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post information');
        }

        const postData = await response.json();
        setPostInfo(postData);
        console.log(postData); // Log inside the async function to see the correct value
      } catch (error) {
        console.error('Error fetching post information:', error);
      }
    };

    fetchPostInfo();
  }, [id]);

  if (!postInfo) return <div>No Post yet</div>;

  return (
    <div className="post-page">
      <h1 style={{ textAlign: 'center' }}>{postInfo.title}</h1>
      <div className="post-box">
        {' '}
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">By {postInfo.author.username}</div>
        {/* <p style={{ textAlign: 'center' }}>4 Observers</p> */}
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit this Post
          </Link>
        </div>
      )}

      <div className="image">
        <img
          src={`${url}/${postInfo.cover}`}
          alt={`Cover for ${postInfo.title}`}
        />
      </div>
      {/* Render other post details here */}

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
};

export default PostPage;
