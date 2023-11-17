export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UserState {
    currentUser: User | null | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}