import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import FilterComponent from "../components/Filters";
import Footer from "../components/Footer";
import ProductOverview from "../components/ProductOverview";
import "../styles/catalogpage.css";

export default function CatalogPage() {
    return (
        <>
            <Navbar />
            <SidebarMenu />

            <main className="catalog-layout">
                <aside className="catalog-filters">
                    <FilterComponent />
                </aside>

                <section className="catalog-products">
                    <ProductOverview />
                </section>
            </main>

            <Footer />
        </>
    );
}