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
            <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0">
                    <div className="flex space-x-3 items-start md:items-center">
                        <Avatar className="size-8 md:size-10 flex-shrink-0">
                            <AvatarFallback className="text-xs md:text-base">
                                {authorInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                            <span className="text-accent text-xs md:text-sm break-all">
                                {author.email}
                            </span>
                            <span className="text-base md:text-lg font-semibold">
                                {author.name}
                            </span>
                        </div>
                    </div>
                    <div className="text-xs md:text-base text-purple-300/70 flex-shrink-0">
                        <span>{formattedDate}</span>
                    </div>
                </div>
                <span className="mt-3 text-base md:text-lg font-bold block break-words">
                    {title}
                </span>
            </CardHeader>
            <CardContent className="bg-black/30 py-4 md:py-5 rounded-3xl mx-4 md:mx-5 whitespace-pre-line text-sm md:text-base overflow-hidden">
                <span className="break-words">{body}</span>
            </CardContent>
            <CardFooter className="p-4 md:p-6">
                <Collapsible className="w-full">
                    <div className="flex justify-between gap-2">
                        <CollapsibleTrigger asChild>
                            <Button className="bg-transparent hover:bg-black/60 py-2 md:py-5 flex-1 md:flex-none">
                                <MessageCircle className="size-5 md:size-6" />
                                <span className="ml-2 text-xs md:text-sm md:hidden">
                                    Comentários
                                </span>
                            </Button>
                        </CollapsibleTrigger>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-red-900 hover:bg-red-950 p-2 md:p-2">
                                    <Trash2 className="size-4 md:size-5" />
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

                    <CollapsibleContent className="space-y-3 md:space-y-4 pt-3 md:pt-4 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up duration-300">
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
                            <div className="text-center py-3 md:py-4">
                                <span className="text-xs md:text-sm text-white/50 block mb-2 md:mb-3">
                                    Adicionar comentário
                                </span>
                                <DialogTrigger asChild>
                                    <Button className="mx-auto flex w-32 md:w-40 gap-2">
                                        <Plus className="h-4 w-4" />
                                        <span className="md:hidden">
                                            Comentar
                                        </span>
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-lg md:text-xl">
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
