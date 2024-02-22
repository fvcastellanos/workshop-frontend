
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MainMenu from "../MainMenu";
import Login from "../Login";
import { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { userStore } from "@/stores/UserStore";

const MainLayout = ({children} : {
    children: React.ReactNode
}) => {

    const [session, setSession] = useState<Session>();

    const supabase = createClientComponentClient();

    const user = userStore();

    const userId = user.getUser();

    if (userId === '') {

        console.log("User is not logged")
    }

    if (!session) {

        supabase.auth.getSession()
        .then(response => {

            console.log(response);

            if (response.error) {
                console.log(response.error);
                return;
            }

            const data = response.data;

            if (data.session) {

                setSession(data.session);
            }
        });

    }

    if (!session) {
        return (
            <Login />
        );
    }

    return (
        <>
            <MainMenu />
            <main>{children}</main>
        </>
    )
}

export default MainLayout;