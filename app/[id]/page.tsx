'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchData = async (id: number) => {
  try {
    const response = await axios.get(`https://dummyjson.com/posts/${id}`);
    return response.data;
  }
  catch (error){
    console.error('Error: ', error);
    return null;
  }
};


const PostDetail = () => {
  const params = useParams()
  const { id } = params
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        const postId = parseInt(id as string, 10);
        const fetchedPost = await fetchData(postId);
        setPost(fetchedPost);
      }
    };

    getPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail w-4/5 mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.body}</p>
    </div>
  );
};

export default PostDetail;
