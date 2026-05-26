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
import { Loader2, Pencil} from 'lucide-react';
import { toast } from 'sonner';
import { updateUser } from '@/actions/handle-api';

interface UserUpdateFormProps {
    userId: string;
    name: string;
    email: string;
    onSuccess: () => void;
}

const userUpdateFormSchema = z.object({
    name: z.string().trim().min(1, { message: 'Nome é obrigatório' }),
    email: z.email({ message: 'Email é obrigatório' }),
});

const UserUpdateForm = ({userId, name, email, onSuccess}: UserUpdateFormProps) => {
    const form = useForm<z.infer<typeof userUpdateFormSchema>>({
        resolver: zodResolver(userUpdateFormSchema),
        defaultValues: {
            name: name,
            email: email,
        },
    });

    async function onSubmit(data: z.infer<typeof userUpdateFormSchema>) {
        const updated = await updateUser(userId, data.name, data.email)

        if (updated) {
            toast.success('Usuário atualizado com sucesso');
            onSuccess()
        } else {
            toast.error('Erro ao atualizar usuário');
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
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
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
                                <Pencil />
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    );
};

export default UserUpdateForm;
