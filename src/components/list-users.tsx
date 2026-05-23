'use client';

import { useEffect, useState } from 'react';
import { findAllUsers } from '@/actions/handle-api';
import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from './ui/table';

interface User {
    id: string;
    name: string;
    email: string;
}

export default function ListUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchUsers();
    }, []);

    return (
        <div className="h-full bg-linear-to-br from-slate-950 via-slate-800 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Gestão de Usuários
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Visualize e gerencie todos os usuários do sistema
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Table>
                        <TableCaption className="text-slate-400 py-4 px-6 border-t border-slate-800">
                            Listagem completa de usuários cadastrados no sistema
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-slate-800/50 hover:bg-slate-800/50 border-b-2 border-slate-800">
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Nome
                                </TableHead>
                                <TableHead className="text-slate-200 font-semibold text-sm">
                                    Email
                                </TableHead>
                                <TableHead className="text-slate-200 font-semibold text-sm">
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
                                            <div className="animate-spin h-5 w-5 text-blue-500 border-2 border-blue-500/30 rounded-full"></div>
                                            <span className="text-slate-300 font-medium">
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
                                        <p className="text-slate-400 text-lg">
                                            Nenhum usuário encontrado
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <TableCell className="font-semibold text-slate-100 py-4">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="text-slate-300 py-4">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="text-slate-400 text-sm font-mono py-4">
                                            {user.id}
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
