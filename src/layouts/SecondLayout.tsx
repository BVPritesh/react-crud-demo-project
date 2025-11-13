import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function SecondLayout() {
    return (
        <>
            <Header/>
                <main className="site-wrapper">
                    <Outlet />
                </main>
            <Footer/>
        </>
    );
}