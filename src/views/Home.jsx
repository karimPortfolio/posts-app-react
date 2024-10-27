import { useContext, useEffect } from "react";
import { AuthStore } from "../context/AuthContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { postsStore } from "../context/PostsContext";
import PulseLoader from "react-spinners/PulseLoader";

export default function Home() {
  const { auth } = useContext(AuthStore);
  const { fetchPosts, posts, loading } = useContext(postsStore);
  
  useEffect(() => {
    fetchPosts();
  }, [auth]);

  return (
    <div>
      <section className="pt-10">
        <div className="px-10">
          <h1>All your recent posts:</h1>
          <div className="mt-5">
            {!auth ? (

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>

            ) : loading ? (

              <PulseLoader
                color='#9333ea'
                loading={loading}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

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
        </div>
      </section>
    </div>
  );
}
