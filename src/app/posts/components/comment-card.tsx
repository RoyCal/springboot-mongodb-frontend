import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface CommentCardProps {
    text: string;
    date: string;

    author: {
        id: string;
        name: string;
    };
}

const CommentCard = ({text, date, author}: CommentCardProps) => {
    const formattedDate = new Date(date).toLocaleDateString("pt-BR");

    return (
        <Card className="w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex space-x-3 items-center">
                        <div className="flex flex-col">
                            <span>{author.name}</span>
                        </div>
                    </div>
                    <div>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="bg-black/30 py-5 rounded-3xl mx-5">
                <span>{text}</span>
            </CardContent>
        </Card>
    );
};

export default CommentCard;
