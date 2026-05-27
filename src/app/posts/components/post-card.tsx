import { deleteComment } from '@/actions/handle-api';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MessageCircle, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddCommentForm from './add-comment-form';
import CommentCard from './comment-card';
import { toast } from 'sonner';

interface PostCardProps {
    id: string;
    date: string;
    title: string;
    body: string;
    author: {
        id: string;
        name: string;
        email: string;
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
    handleDelete: () => void;
    onCommentAdded: () => void;
    users: {
        id: string;
        name: string;
        email: string;
    }[];
}

export function PostCard({
    id,
    date,
    title,
    body,
    author,
    comments,
    handleDelete,
    onCommentAdded,
    users,
}: PostCardProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleDeleteComment = async (commentId: string) => {
        const deleted = await deleteComment(id, commentId);
        if (deleted) {
            toast.success('Comentário deletado com sucesso');
            onCommentAdded();
        }
    };

    const formattedDate = new Date(date).toLocaleDateString('pt-BR');

    const authorInitials = author.name
        .split(' ')
        .map((word) => word[0])
        .join('');

    return (
        <Card className="w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex space-x-3 items-center">
                        <Avatar className="size-10">
                            <AvatarFallback>{authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-accent">{author.email}</span>
                            <span className="text-lg">{author.name}</span>
                        </div>
                    </div>
                    <div>
                        <span>{formattedDate}</span>
                    </div>
                </div>
                <span className="mt-3 text-lg font-bold">{title}</span>
            </CardHeader>
            <CardContent className="bg-black/30 py-5 rounded-3xl mx-5 whitespace-pre-line">
                <span>{body}</span>
            </CardContent>
            <CardFooter>
                <Collapsible className="w-full">
                    <div className="flex justify-between">
                        <CollapsibleTrigger asChild>
                            <Button className="bg-transparent hover:bg-black/60 py-5">
                                <MessageCircle className="size-6" />
                            </Button>
                        </CollapsibleTrigger>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-red-900 hover:bg-red-950 p-2">
                                    <Trash2 />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Tem certeza que quer deletar esse post?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Essa ação não pode ser desfeita. Você
                                        terá que postar novamente!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete()}
                                    >
                                        Deletar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <CollapsibleContent className="space-y-4 pt-4 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up duration-300">
                        {comments.map((comment) => (
                            <CommentCard
                                author={comment.author}
                                date={comment.date}
                                text={comment.text}
                                key={comment.id}
                                handleDeleteComment={() =>
                                    handleDeleteComment(comment.id)
                                }
                            />
                        ))}

                        <Dialog
                            open={isAddDialogOpen}
                            onOpenChange={setIsAddDialogOpen}
                        >
                            <div className="text-center">
                                <span className="text-sm text-white/50">
                                    Adicionar comentário
                                </span>
                                <DialogTrigger asChild>
                                    <Button className="mx-auto flex w-40">
                                        <Plus />
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Adicionar comentário
                                    </DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <AddCommentForm
                                    postId={id}
                                    users={users}
                                    onSuccess={async () => {
                                        setIsAddDialogOpen(false);
                                        onCommentAdded();
                                    }}
                                />
                            </DialogContent>
                        </Dialog>
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    );
}
