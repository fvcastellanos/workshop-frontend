import { AbstractSupaBaseClient } from "./AbstractSupaBaseClient";

export class UserService extends AbstractSupaBaseClient {

    constructor() {
        super();
    }

    async login(email: string, password: string): Promise<any> {

        const { data, error } = await this.supabase.auth.signInWithPassword({ 
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {

            throw new Error("Unable to retrieve user data");
        }

        return data.user;
    }

    async logout(): Promise<void> {

        const { error } = await this.supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }
    }
}