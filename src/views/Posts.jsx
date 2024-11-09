import React, { useContext, useEffect, useState } from 'react'
import CreatePostModal from '../components/posts/CreatePostModal';
import { postsStore } from '../context/PostsContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PulseLoader from "react-spinners/PulseLoader";
import { AuthStore } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { FaRegEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from '../components/ConfirmModal';


export default function Posts() {

  const { auth } = useContext(AuthStore);
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  const {
    posts,
    fetchPosts,
    loading,
    deletePost
  } = useContext(postsStore);

  const confirmOpenDeletePost = (item) => {
    setIsOpen(true);
    setItemToDelete(item);
  };

  const handleDeletePost = async () => {
    await deletePost(itemToDelete?.id);
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [auth]);

  return (
    <section className='px-10 mt-10'>
      <ConfirmModal
      title="Are you sure"
      message={`Are you sure you want to delete ${itemToDelete?.title ?? ''} post?`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      action={handleDeletePost}
      type="error"
      />
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
            {/* ===== POSTS CARDS ===== */}
            {posts.map((post) => {
              return (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex flex-nowrap justify-between items-center">
                      <CardTitle>{post.title}</CardTitle>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-fit h-fit p-1">
                            <BiDotsVerticalRounded />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-fit">
                          <DropdownMenuItem>
                            <FaRegEye />
                            Show
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FaRegEdit />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmOpenDeletePost(post)}
                            className="focus:bg-red-100 focus:text-red-500" >
                            <FaRegTrashAlt />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                    <p className='mt-2 '>Category: {post.category?.name} </p>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="text-sm text-purple-600">
                        Created by: @{post.User?.name}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

        ) : (
          // IF THERE'S NO POSTS
          <Alert variant="default">
            <AlertDescription>You don't have any posts.</AlertDescription>
          </Alert>

        )}
      </div>
    </section>
  )
}
