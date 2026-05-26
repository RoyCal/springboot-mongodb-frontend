'use client';

import { useEffect, useState } from 'react';
import { deletePost, findAllPosts, findAllUsers } from '@/actions/handle-api';
import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from '../../../components/ui/table';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import AddPostForm from './add-post-form';
import { toast } from 'sonner';

interface Post {
    id: string;
    title: string;
    body: string;
    author: {
        id: string
        name: string
    };
}

interface User {
    id: string;
    name: string;
    email: string
}

export default function ListPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const getUserName = (authorId: string) => {
        const user = users.find((u) => u.id === authorId);
        return user?.name || 'Desconhecido';
    };

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

    const fetchUsers = async () => {
        try {
            const data = await findAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    return (
        <div className="h-full bg-linear-to-br from-slate-950 via-slate-800 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Gestão de Posts
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Visualize e gerencie todos os posts do sistema
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 overflow-hidden">
                    <Table>
                        <TableCaption className="text-slate-400 py-4 px-6 border-t border-slate-800">
                            Listagem completa de posts cadastrados no sistema
                        </TableCaption>
                        <TableCaption className="text-slate-400 py-4 px-6 border-t border-slate-800">
                            <Dialog
                                open={isAddDialogOpen}
                                onOpenChange={setIsAddDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        <Plus />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Adicionar post
                                        </DialogTitle>
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
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-slate-800/50 hover:bg-slate-800/50 border-b-2 border-slate-800">
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Título
                                </TableHead>
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Conteúdo
                                </TableHead>
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Autor
                                </TableHead>
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-12"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="animate-spin h-5 w-5 text-blue-500 border-2 border-blue-500/30 rounded-full"></div>
                                            <span className="text-slate-300 font-medium">
                                                Carregando posts...
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : posts.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-12"
                                    >
                                        <p className="text-slate-400 text-lg">
                                            Nenhum post encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow
                                        key={post.id}
                                        className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <TableCell className="font-semibold text-slate-100 py-4 max-w-xs truncate">
                                            {post.title}
                                        </TableCell>
                                        <TableCell className="text-slate-300 py-4 max-w-md truncate">
                                            {post.body}
                                        </TableCell>
                                        <TableCell className="text-slate-300 py-4">
                                            {getUserName(post.author.id)}
                                        </TableCell>
                                        <TableCell className="text-slate-400 text-sm font-mono py-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-red-900 hover:bg-red-950">
                                                        <Trash2 />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Deletar post
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Tem certeza que
                                                            deseja deletar este
                                                            post?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button
                                                            className="bg-red-900 hover:bg-red-950"
                                                            onClick={() => {
                                                                handleDeletePost(
                                                                    post.id,
                                                                );
                                                            }}
                                                        >
                                                            Deletar
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
