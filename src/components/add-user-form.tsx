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
import { addUser } from '@/actions/handle-api';

const userFormSchema = z.object({
    name: z.string().trim().min(1, { message: 'Nome é obrigatório' }),
    email: z.email({ message: 'Email é obrigatório' }),
});

const UserForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    async function onSubmit(data: z.infer<typeof userFormSchema>) {
        const added = await addUser(data.name, data.email);

        if (added) {
            toast.success('Usuário adicionado com sucesso');
            onSuccess();
        } else {
            toast.error('Erro ao adicionar usuário');
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">
                                    Nome
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="text-sm md:text-base"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="text-sm md:text-base"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <DialogFooter className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full md:w-auto"
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    {' '}
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2 md:hidden">
                                        Adicionar
                                    </span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    );
};

export default UserForm;
