import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { insertComment } from '@/actions/handle-api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface User {
    id: string;
    name: string;
}

interface AddCommentFormProps {
    postId: string;
    users: User[];
    onSuccess: () => void;
}

const commentFormSchema = z.object({
    text: z.string().trim().min(1, { message: 'Comentário é obrigatório' }),
    authorId: z.string().min(1, { message: 'Autor é obrigatório' }),
});

const AddCommentForm = ({ postId, users, onSuccess }: AddCommentFormProps) => {
    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            text: '',
            authorId: '',
        },
    });

    async function onSubmit(data: z.infer<typeof commentFormSchema>) {
        const added = await insertComment(postId, data.authorId, data.text);

        if (added) {
            toast.success('Comentário adicionado com sucesso');
            form.reset();
            onSuccess();
        } else {
            toast.error('Erro ao adicionar comentário');
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">
                                    Comentário
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Digite seu comentário"
                                        className="min-h-20 w-full rounded-md border border-purple-700 bg-slate-950 px-3 py-2 text-sm md:text-base text-purple-100 placeholder-purple-500 focus:border-pink-500 focus:outline-none"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="authorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">
                                    Autor
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="text-sm md:text-base">
                                            <SelectValue placeholder="Selecione um autor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    );
};

export default AddCommentForm;
