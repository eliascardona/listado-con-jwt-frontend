import { Book } from "lucide-react";

export function BookCard({ name }: { name: string }) {
    return (
        <div className="p-4 border border-neutral-400 rounded-md">
            <div className="flex justify-content-between">
                <Book className="size-6" />
                <div>{name}</div>
            </div>
        </div>
    );
}
