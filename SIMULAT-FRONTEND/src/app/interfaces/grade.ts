export interface grade_info{
        ID: string;
        grade: string;
        name: string;
        status: string;
        [key: string]: string; // Index signature allowing string keys
}