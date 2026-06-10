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
            <div className="p-3 md:p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                    <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-sm md:text-base font-medium break-words">
                            {author.name}
                        </span>
                        <span className="text-xs text-white/50">
                            {new Date(date).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-900/20 w-fit"
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

                <div className="mt-3 md:mt-4 bg-black/30 rounded-xl p-3 md:p-4 whitespace-pre-line text-sm md:text-base overflow-hidden break-words">
                    {text}
                </div>
            </div>
        </Card>
    );
};

export default CommentCard;
