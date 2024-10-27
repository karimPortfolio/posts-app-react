import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FiPlus, FiX } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { postsStore } from '../../context/PostsContext'
import { categoriesStore } from '../../context/CategoryContext'


export default function CreatePostModal() {

    const [post, setPost] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const {
        createPost,
        loading: loadingPosts
    } = useContext(postsStore);
    const {
        categories,
        loading: loadingCategories,
        fetchCategories
    } = useContext(categoriesStore);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClick = async () => {
        await createPost(post);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} >
            <DialogTrigger>
                <Button onClick={() => setIsOpen(true)}>
                    <FiPlus />
                    Create New Post
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new Post</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col my-5">
                            <Label className="mb-2" htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter post title"
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label className="mb-2" htmlFor="content">Content</Label>
                            <Textarea id="content"
                                placeholder="Enter post content"
                                onChange={(e) => setPost({ ...post, content: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mb-5">
                            <Label className="mb-2" htmlFor="content">Category</Label>
                            <Select
                                onOpenChange={() => fetchCategories()}
                                loading={loadingCategories}
                                onValueChange={(value) => setPost({ ...post, category: value })} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {categories.map((category) => {
                                            return <SelectItem key={category?.id} value={category.id}>{category.name}</SelectItem>
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex justify-end gap-2 pt-5'>
                            <Button disabled={loadingPosts} onClick={handleClick} >
                                <FiPlus />
                                Create
                            </Button>
                            <Button variant="ghost" onClick={() => setIsOpen(false)} >Cancel</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    )
}
