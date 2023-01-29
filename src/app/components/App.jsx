import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

function App({children}) {
    return (
        <>
            <Navbar/>
            <>{children}</>
            <Footer/>
        </>
    );
}

export default App;