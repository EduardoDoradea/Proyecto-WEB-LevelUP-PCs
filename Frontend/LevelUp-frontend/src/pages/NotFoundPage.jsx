import NotFoundPage from "../components/shared/NotFound/NotFound";
import SidebarMenu from "../components/layout/SidebarMenu/SidebarMenu";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { useState } from "react";

export default function NotFound() {    
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState(0);
    
    return (
        <>
            <Navbar onMenuToggle={() => setMenuOpen(true)} cartCount={cartItems} />
            <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
                <div className="notfound-page-container">
                    <NotFoundPage />
                </div>
            <Footer />
        </>
    );
}
