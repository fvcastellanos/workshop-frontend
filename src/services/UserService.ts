import { useContext } from "react";
import { AbstractSupaBaseClient } from "./AbstractSupaBaseClient";

export class UserService extends AbstractSupaBaseClient {

    constructor() {
        super();
    }

    async login(email: string, password: string): Promise<void> {

        const { data, error } = await this.supabase.auth.signInWithPassword({ 
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }

        if (data) {

            console.log(data);
        }
    }

    async logout(): Promise<void> {

        const { error } = await this.supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }
    }

    // function async login(): Promise<void> {

    //     await 

    //     supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     }).then(response => {
    
    //         if (response.error) {
    //             setError(new ErrorView(true, response.error.message));
    //             return;
    //         }
    
    //         router.refresh();
    
    //     }).catch(error => {
    
    //         const message = error.message ? error.message : 'Error desconocido';
    //         setError(new ErrorView(true, message));
    //     });      
    //   }    
}