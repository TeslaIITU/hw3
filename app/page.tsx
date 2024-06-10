'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;

}

const fetchData = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/posts');
    return response.data.posts;
  }
  catch (error){
    console.error('Error: ', error);
    return [];
  }
};


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchData();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <>
      <div className='grid  w-4/5 mx-auto'>
        {posts.map(post => (
              <div key={post.id} className="card bg-base-100 shadow-xl border border-black mb-5">
              <div  className="card-body" >
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.body}</p>

                  <div className="card-actions justify-end">
                    <Link href={`/${post.id}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </div>
                  </div>
              </div>
          ))}
      </div>
    
    
    </>
  );
}
