import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import CategoryCard from "../../components/categoryCard/categoryCard";
import "./categoriespage.css";

export default function CategoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Procesadores",
      icon: "🔲",
      description: "Intel, AMD y más",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      path: "/componentes/procesadores"
    },
    {
      id: 2,
      name: "Tarjetas Gráficas",
      icon: "🎮",
      description: "NVIDIA, AMD Radeon",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/componentes/tarjetas-graficas"
    },
    {
      id: 3,
      name: "Memoria RAM",
      icon: "💾",
      description: "DDR4, DDR5",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      path: "/componentes/memoria-ram"
    },
    {
      id: 4,
      name: "Almacenamiento",
      icon: "💿",
      description: "SSD, HDD, NVMe",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      path: "/componentes/almacenamiento"
    },
    {
      id: 5,
      name: "Placas Madre",
      icon: "⚡",
      description: "Intel, AMD Socket",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      path: "/componentes/placas-madre"
    },
    {
      id: 6,
      name: "Fuentes de Poder",
      icon: "🔌",
      description: "Modular, 80+ Certified",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      path: "/componentes/fuentes-poder"
    },
    {
      id: 7,
      name: "Gabinetes",
      icon: "📦",
      description: "ATX, Micro-ATX, Mini-ITX",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      path: "/componentes/gabinetes"
    },
    {
      id: 8,
      name: "Refrigeración",
      icon: "❄️",
      description: "Aire, Líquida, Ventiladores",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      path: "/componentes/refrigeracion"
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="categories-page">
        <section className="categories-hero">
          <h1>Explora Nuestros Productos</h1>
          <p>Encuentra los mejores componentes para tu PC</p>
        </section>

        <section className="categories-section">
          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section className="categories-cta">
          <h2>¿No sabes qué elegir?</h2>
          <p>Nuestros expertos pueden ayudarte a armar el PC perfecto para tus necesidades</p>
          <button className="cta-btn"> Contactar Asesor</button>
        </section>
      </main>

      <Footer />
    </>
  );
}