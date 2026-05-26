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
} from './ui/form';
import { Input } from './ui/input';
import { DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { addPost } from '@/actions/handle-api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

interface User {
    id: string;
    name: string;
}

const postFormSchema = z.object({
    title: z.string().trim().min(1, { message: 'Título é obrigatório' }),
    body: z.string().trim().min(1, { message: 'Conteúdo é obrigatório' }),
    authorId: z.string().min(1, { message: 'Autor é obrigatório' }),
});

const AddPostForm = ({
    users,
    onSuccess,
}: {
    users: User[];
    onSuccess: () => void;
}) => {
    const form = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            body: '',
            authorId: '',
        },
    });

    async function onSubmit(data: z.infer<typeof postFormSchema>) {
        const added = await addPost(data.title, data.body, data.authorId);

        if (added) {
            toast.success('Post adicionado com sucesso');
            form.reset();
            onSuccess();
        } else {
            toast.error('Erro ao adicionar post');
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Digite o título do post"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Conteúdo</FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        placeholder="Digite o conteúdo do post"
                                        className="min-h-32 w-full rounded-md border border-purple-700 bg-slate-950 px-3 py-2 text-purple-100 placeholder-purple-500 focus:border-pink-500 focus:outline-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="authorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Autor</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
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
                                <Plus />
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    );
};

export default AddPostForm;
