import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import FilterComponent from "../components/Filters";
import Footer from "../components/Footer";

export default function CatalogPage() {
    return (
        <>
            <Navbar />
            <SidebarMenu />
            <FilterComponent />          
            <Footer />
        </>
    );  
}