import React from "react";
import SidebarMenu from "../components/SidebarMenu";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import ShoppingCart from "../components/ShoppingCart";
import "../styles/CartPage.css";

export default function CartPage() {
    return (
        <>
            <Navbar onMenuToggle={() => setMenuOpen(true)} />
            <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            
            <Footer />
        </>
    );
}
