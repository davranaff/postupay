import '@/app/globals.css'
import App from "@/app/components/App";
import {UserContext} from "@/app/context/BaseContext";

function Application({Component, pageProps}) {

    return <UserContext.Provider value={'default'}>
        <App>
            <Component {...pageProps} />
        </App>
    </UserContext.Provider>
}

export default Application

