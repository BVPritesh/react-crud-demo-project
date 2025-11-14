import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/header";
import Footer from "@components/footer";

const DefaultLayout = (): React.ReactElement => {
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

export default DefaultLayout;