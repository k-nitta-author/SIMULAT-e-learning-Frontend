export interface quiz{
    id: number;
    content_id: number;
    description: string;
    is_published: boolean;
    grade: string;
    quiz_title: string;
    time_limit: number;
    status: string;
    [key: string]: string | number | boolean; // Index signature allowing string and number keys
}