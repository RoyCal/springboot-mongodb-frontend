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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface CommentCardProps {
    text: string;
    date: string;

    author: {
        id: string;
        name: string;
    };

    handleDeleteComment: () => void;
}

const CommentCard = ({
    text,
    date,
    author,
    handleDeleteComment,
}: CommentCardProps) => {
    return (
        <Card className="bg-black/30 border-purple-900/40">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <span>{author.name}</span>
                        <span className="ml-4 text-xs text-white/50">
                            {new Date(date).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-900/20"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Deletar comentário?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDeleteComment()}
                                    className="bg-red-900 hover:bg-red-950"
                                >
                                    Deletar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="mt-4 bg-black/30 rounded-xl p-4 whitespace-pre-line">
                    {text}
                </div>
            </div>
        </Card>
    );
};

export default CommentCard;
