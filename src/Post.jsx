import { Link } from 'react-router-dom';
import { compareAsc, format, formatISO9075 } from 'date-fns';
import { useEffect, useState } from 'react';
const Post = ({ _id, cover, author, createdAt }) => {
  const [liked, SetLiked] = useState(false);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [support, setSupport] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function likedChanger() {
    console.log('liking');
    SetLiked(!liked);
    if (liked) {
      setSupport((prevSupport) => prevSupport + 1);
    } else if (support > 0) {
      setSupport((prevSupport) => prevSupport - 1);
    }
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', _id);
    data.set('support', support);
    data.set('file', cover);
    await fetch(`https://citify.onrender.com/post/${_id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
  }
  function truncateText(text, limit) {
    const words = text.split(' ');

    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }

    return text;
  }
  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`https://citify.onrender.com/post/${_id}`);
        if (!response.ok) {
          throw new Error('not able to fetch post info');
        }
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setSummary(postInfo.summary);
          setContent(postInfo.content);
          setSupport(postInfo.support);
        });
      } catch (error) {
        console.error('Error fetching post information:', error);
      }
    };
    fetchPostInfo();
  }, [support, liked]);

  return (
    <div>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img
              src={'https://citify.onrender.com/' + cover}
              alt="Post Image"
            />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2> {title}</h2>
          </Link>
          <p className="info">
            <a href="#" className="author" onClick={(e) => e.preventDefault()}>
              {author.username}
            </a>

            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="summary">{truncateText(summary, 30)}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
