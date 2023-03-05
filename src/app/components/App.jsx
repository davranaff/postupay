import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({children}) {
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
            <Navbar/>
            <>{children}</>
            <Footer/>
        </div>
    );
}

export default App;