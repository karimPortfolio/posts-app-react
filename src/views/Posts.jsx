import React, { useContext, useEffect } from 'react'
import { FiPlus } from "react-icons/fi";
import CreatePostModal from '../components/posts/CreatePostModal';
import { postsStore } from '../context/PostsContext';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthStore } from '../context/AuthContext';


export default function Posts() {

  const { auth } = useContext(AuthStore);

  const {
    posts,
    fetchPosts,
    loading,
  } = useContext(postsStore);

  useEffect(() => {
    fetchPosts();
  }, [auth]);

  return (
    <section className='px-10 mt-10'>
      <div className="flex justify-between items-center rounded-md bg-gray-100 shadow-sm p-4">
        <div>
          <h5 className='text-3xl text-purple-600' >All posts</h5>
        </div>
        <div>
          <CreatePostModal />
        </div>
      </div>
      <div className="mt-10">
        {loading ? (

          <div className="flex justify-center items-center">
            <PulseLoader
              color='#9333ea'
              loading={loading}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

        ) : Array.isArray(posts) && posts.length > 0 ? (

          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => {
              return (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{post.content}</CardContent>
                  <CardFooter>
                    <div>
                      <p className="text-sm">
                        Created by: {post.User?.name}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

        ) : (

          <Alert variant="default">
            <AlertDescription>You don't have any posts.</AlertDescription>
          </Alert>

        )}
      </div>
    </section>
  )
}
