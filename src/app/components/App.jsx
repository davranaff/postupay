import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

function App({children}) {
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);
    const router = useRouter()
    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);


    if (!initialRenderComplete) return <></>;


    return (
        <div style={{minHeight: '100vh'}}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
            {router.pathname.includes('/test') ? ' ' : <Navbar/>}
            <div style={{minHeight: '72vh'}}>{children}</div>
            {router.pathname.includes('/test') ? ' ' : <Footer/>}
        </div>
    );
}

export default App;