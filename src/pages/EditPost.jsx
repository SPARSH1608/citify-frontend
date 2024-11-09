import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [support, setSupport] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`https://citify.onrender.com/post/${id}`);
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
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    data.set('support', support);
    if (files?.[0]) data.set('file', files?.[0]);
    const response = await fetch(`https://citify.onrender.com/post/${id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: '5px' }}>Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
