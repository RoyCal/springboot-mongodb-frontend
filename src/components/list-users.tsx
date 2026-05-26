'use client';

import { useEffect, useState } from 'react';
import { deleteUser, findAllUsers } from '@/actions/handle-api';
import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from './ui/table';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import UserForm from './add-user-form';
import { toast } from 'sonner';
import UserUpdateForm from './update-user-form';

interface User {
    id: string;
    name: string;
    email: string;
}

export default function ListUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);

    const handleDeleteUser = async (userId: string) => {
        deleteUser(userId);

        toast.success('Usuário deletado com sucesso');

        await fetchUsers();
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    return (
        <div className="h-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Gestão de Usuários
                    </h1>
                    <p className="text-purple-300/70 text-lg">
                        Visualize e gerencie todos os usuários do sistema
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-purple-950/40 rounded-lg shadow-2xl border border-purple-900/30 overflow-hidden">
                    <Table>
                        <TableCaption className="text-purple-300/70 py-4 px-6 border-t border-purple-900/30">
                            Listagem completa de usuários cadastrados no sistema
                        </TableCaption>
                        <TableCaption className="text-purple-300/70 py-4 px-6 border-t border-purple-900/30">
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
                                            Adicionar usuário
                                        </DialogTitle>
                                        <DialogDescription></DialogDescription>
                                    </DialogHeader>
                                    <UserForm
                                        onSuccess={async () => {
                                            setIsAddDialogOpen(false);
                                            await fetchUsers();
                                        }}
                                    />
                                </DialogContent>
                            </Dialog>
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-purple-900/30 hover:bg-purple-900/30 border-b-2 border-purple-900/30">
                                <TableHead className="text-purple-200 font-semibold text-sm">
                                    Nome
                                </TableHead>
                                <TableHead className="text-purple-200 font-semibold text-sm">
                                    Email
                                </TableHead>
                                <TableHead className="text-purple-200 font-semibold text-sm">
                                    ID
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center py-12"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="animate-spin h-5 w-5 text-pink-500 border-2 border-pink-500/30 rounded-full"></div>
                                            <span className="text-purple-200 font-medium">
                                                Carregando usuários...
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center py-12"
                                    >
                                        <p className="text-purple-300/70 text-lg">
                                            Nenhum usuário encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="border-b border-purple-900/30 hover:bg-purple-900/20 transition-colors"
                                    >
                                        <TableCell className="font-semibold text-purple-100 py-4">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="text-purple-200 py-4">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="text-purple-400 text-sm font-mono py-4">
                                            {user.id}
                                        </TableCell>
                                        <TableCell className="text-purple-400 text-sm font-mono py-4 flex justify-around">
                                            <Dialog
                                                open={editingUserId === user.id}
                                                onOpenChange={(open) => {
                                                    setEditingUserId(
                                                        open ? user.id : null,
                                                    );
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button>
                                                        <Pencil />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Editar usuário
                                                        </DialogTitle>
                                                        <DialogDescription></DialogDescription>
                                                    </DialogHeader>
                                                    <UserUpdateForm
                                                        userId={user.id}
                                                        name={user.name}
                                                        email={user.email}
                                                        onSuccess={async () => {
                                                            setEditingUserId(
                                                                null,
                                                            );
                                                            await fetchUsers();
                                                        }}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-red-900 hover:bg-red-950">
                                                        <Trash2 />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Tem certeza que
                                                            deseja deletar este
                                                            usuário?
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Essa ação não pode
                                                            ser desfeita. Você
                                                            terá que adicionar o
                                                            usuário novamente!
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.id,
                                                                )
                                                            }
                                                            className="bg-red-900 hover:bg-red-950"
                                                        >
                                                            <Trash2 />
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
