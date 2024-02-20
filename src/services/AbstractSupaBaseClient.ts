import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export abstract class AbstractSupaBaseClient {

    protected supabase: any;

    constructor() {
        this.supabase = createClientComponentClient();
    }

}
