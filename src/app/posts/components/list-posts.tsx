'use client';

import { deletePost, findAllPosts, findAllUsers } from '@/actions/handle-api';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PostCard } from './post-card';
import { PostSkeleton } from './post-skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AddPostForm from './add-post-form';

interface Post {
    id: string;
    date: string;
    title: string;
    body: string;
    author: {
        id: string;
        name: string;
    };
    comments: {
        id: string;
        text: string;
        date: string;

        author: {
            id: string;
            name: string;
        };
    }[];
}

interface User {
    id: string;
    name: string;
    email: string;
}

export default function ListPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleDeletePost = async (postId: string) => {
        deletePost(postId);

        toast.success('Post deletado com sucesso');

        await fetchPosts();
    };

    const fetchPosts = async () => {
        try {
            const data = await findAllPosts();
            setPosts(data);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function loadData() {
            try {
                const [postsData, usersData] = await Promise.all([
                    findAllPosts(),
                    findAllUsers(),
                ]);

                setPosts(postsData);
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div className="h-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-5">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Gestão de Posts
                    </h1>
                    <p className="text-purple-300/70 text-lg">
                        Visualize e gerencie todos os posts do sistema
                    </p>
                </div>

                {/* Scroll Container */}
                <ScrollArea className="h-250 rounded-t-3xl">
                    {loading ? (
                        <PostSkeleton />
                    ) : (
                        <div className="space-y-10">
                            {posts.map((post) => (
                                <PostCard
                                    title={post.title}
                                    user={
                                        users.find(
                                            (u) => u.id === post.author.id,
                                        )!
                                    }
                                    body={post.body}
                                    date={post.date}
                                    comments={post.comments}
                                    handleDelete={() =>
                                        handleDeletePost(post.id)
                                    }
                                    key={post.id}
                                />
                            ))}
                        </div>
                    )}
                    <ScrollBar orientation="vertical" />
                </ScrollArea>

                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <div className='text-center'>
                        <span className="text-sm text-white/50">Adicionar post</span>
                        <DialogTrigger asChild>
                            <Button className="mx-auto flex w-40">
                                <Plus />
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar post</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <AddPostForm
                            users={users}
                            onSuccess={async () => {
                                setIsAddDialogOpen(false);
                                await fetchPosts();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
