import '@/app/globals.css'
import App from "@/app/components/App";
import {UserContext} from "@/app/context/BaseContext";
import {useState} from "react";

function Application({Component, pageProps}) {
    const [user,setUser] = useState({id:1})

    return <UserContext.Provider value={{ user, setUser }}>
        <App>
            <Component {...pageProps} />
        </App>
    </UserContext.Provider>
}

export default Application

