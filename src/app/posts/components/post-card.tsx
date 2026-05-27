import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
import { MessageCircle, Trash2 } from 'lucide-react';

interface PostCardProps {
    date: string;
    title: string;
    body: string;
    user: {
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
}

export function PostCard({
    date,
    title,
    body,
    user,
    comments,
    handleDelete,
}: PostCardProps) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');

    const authorInitials = user.name
        .split(' ')
        .map((word) => word[0])
        .join('');

    return (
        <Card className="w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex space-x-3 items-center">
                        <Avatar className='size-10'>
                            <AvatarFallback>{authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className='text-accent'>{user.email}</span>
                            <span className='text-lg'>{user.name}</span>
                        </div>
                    </div>
                    <div>
                        <span>{formattedDate}</span>
                    </div>
                </div>
                <span className="mt-3 text-lg font-bold">{title}</span>
            </CardHeader>
            <CardContent className="bg-black/30 py-5 rounded-3xl mx-5">
                <span>{body}</span>
            </CardContent>
            <CardFooter>
                <Collapsible className="w-full">
                    <div className="flex justify-between">
                        <CollapsibleTrigger asChild>
                            <Button className="bg-transparent hover:bg-black/60 py-5">
                                <MessageCircle className='size-6'/>
                            </Button>
                        </CollapsibleTrigger>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="bg-red-900 hover:bg-red-950 p-2"
                                >
                                    <Trash2 />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Tem certeza que quer deletar esse post?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Essa ação não pode ser desfeita. Você terá que postar novamente!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete()}>
                                        Deletar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <CollapsibleContent className="space-y-4 pt-4">
                        {comments.map((comment) => (
                            <Card
                                key={comment.id}
                                className="bg-black/30 border-purple-900/40"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <span>{comment.author.name}</span>

                                        <span>
                                            {new Date(
                                                comment.date,
                                            ).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>

                                    <div className="mt-4 bg-black/30 rounded-xl p-4">
                                        {comment.text}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    );
}
