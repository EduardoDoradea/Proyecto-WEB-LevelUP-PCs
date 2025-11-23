import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import CategoryCard from "../../components/categoryCard/categoryCard";
import "../../components/categoryCard/categorycard.css";
export default function CategoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Procesadores",
      icon: "🔲",
      description: "Intel, AMD y más",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      path: "/catalogo/procesadores"
    },
    {
      id: 2,
      name: "Tarjetas Gráficas",
      icon: "🎮",
      description: "NVIDIA, AMD Radeon",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/catalogo/tarjetas-graficas"
    },
    {
      id: 3,
      name: "Memoria RAM",
      icon: "💾",
      description: "DDR4, DDR5",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      path: "/catalogo/memoria-ram"
    },
    {
      id: 4,
      name: "Almacenamiento",
      icon: "💿",
      description: "SSD, HDD, NVMe",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      path: "/catalogo/almacenamiento"
    },
    {
      id: 5,
      name: "Placas Madre",
      icon: "⚡",
      description: "Intel, AMD Socket",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      path: "/catalogo/placas-madre"
    },
    {
      id: 6,
      name: "Fuentes de Poder",
      icon: "🔌",
      description: "Modular, 80+ Certified",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      path: "/catalogo/fuentes-poder"
    },
    {
      id: 7,
      name: "Gabinetes",
      icon: "📦",
      description: "ATX, Micro-ATX, Mini-ITX",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      path: "/catalogo/gabinetes"
    },
    {
      id: 8,
      name: "Refrigeración",
      icon: "❄️",
      description: "Aire, Líquida, Ventiladores",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      path: "/catalogo/refrigeracion"
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="categories-page">
        {/* Hero Section */}
        <section className="categories-hero">
          <h1>Explora Nuestras Categorías</h1>
          <p>Encuentra los mejores componentes para tu PC</p>
        </section>

        {/* Categories Grid */}
        <section className="categories-section">
          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="categories-cta">
          <h2>¿No sabes qué elegir?</h2>
          <p>Nuestros expertos pueden ayudarte a armar el PC perfecto para tus necesidades</p>
          <button className="cta-btn">Contactar Asesor</button>
        </section>
      </main>

      <Footer />
    </>
  );
}