
import MainMenu from "../MainMenu";
import Login from "../Login";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector } from "@/app/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const MainLayout = ({children} : {
    children: React.ReactNode
}) => {

    const user = useAppSelector((state) => state.userReducer.user);
    const [ session, setSession ] = useState(null);

    // const supabase = createClientComponentClient();

    // supabase.auth.getSession()
    //     .then((data: any) => {

    //         setSession(data.session);
    //     });

    if (!user) {
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