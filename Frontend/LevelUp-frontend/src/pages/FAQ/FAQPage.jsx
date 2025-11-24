import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./faq.css";

export default function FAQPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: '📋' },
    { id: 'productos', name: 'Productos', icon: '🛒' },
    { id: 'garantia', name: 'Garantía', icon: '🔒' },
    { id: 'envios', name: 'Envíos', icon: '📦' },
    { id: 'pagos', name: 'Pagos', icon: '💳' },
    { id: 'soporte', name: 'Soporte', icon: '🛠️' }
  ];

  const faqs = [
    {
      category: 'productos',
      question: "¿Todos los productos son nuevos y originales?",
      answer: "Sí, todos nuestros productos son 100% nuevos, originales y cuentan con garantía del fabricante. Trabajamos directamente con distribuidores autorizados para garantizar la autenticidad de cada componente."
    },
    {
      category: 'productos',
      question: "¿Puedo armar mi PC personalizada con ustedes?",
      answer: "Por supuesto. Ofrecemos servicio de ensamblaje personalizado donde puedes elegir cada componente según tus necesidades y presupuesto. Nuestros técnicos ensamblan, prueban y optimizan tu PC antes de entregártela."
    },
    {
      category: 'productos',
      question: "¿Verifican la compatibilidad entre componentes?",
      answer: "Sí, nuestro equipo técnico verifica la compatibilidad de todos los componentes antes de procesar cualquier pedido. Si detectamos algún problema de compatibilidad, te contactamos para sugerir alternativas."
    },
    {
      category: 'productos',
      question: "¿Tienen stock de todos los productos publicados?",
      answer: "Mantenemos actualizado nuestro inventario en tiempo real. Si un producto aparece disponible en el sitio web, significa que tenemos stock. Para productos de alta demanda, recomendamos contactarnos antes para confirmar disponibilidad."
    },
    {
      category: 'garantia',
      question: "¿Qué cubre la garantía?",
      answer: "La garantía cubre defectos de fabricación, fallas de componentes originales y mal funcionamiento sin intervención del usuario. Ofrecemos garantía LevelUP de 30 días para DOA y cambios directos, más la garantía del fabricante que varía entre 1-3 años según el producto."
    },
    {
      category: 'garantia',
      question: "¿Qué necesito para hacer válida la garantía?",
      answer: "Necesitas presentar la factura original de compra, el producto debe tener el número de serie legible, estar en su empaque original (preferiblemente) y los sellos de garantía intactos. Es importante no haber manipulado o modificado el producto."
    },
    {
      category: 'garantia',
      question: "¿Cuánto tarda el proceso de garantía?",
      answer: "Nuestra garantía LevelUP de 30 días ofrece cambio inmediato en tienda. Las garantías del fabricante pueden tardar de 15 a 45 días hábiles dependiendo del tipo de producto, disponibilidad y el fabricante específico."
    },
    {
      category: 'garantia',
      question: "¿La garantía cubre daños físicos?",
      answer: "No, la garantía no cubre daños físicos, golpes, exposición a líquidos, sobre-voltaje, modificaciones no autorizadas, mal uso o negligencia. Solo cubre defectos de fabricación y fallas de funcionamiento sin intervención del usuario."
    },
    {
      category: 'envios',
      question: "¿Cuánto cuesta el envío?",
      answer: "El costo de envío varía según tu ubicación. En San Salvador y área metropolitana es gratis en compras mayores a $50 (de lo contrario $5). Para otras zonas del país, envío gratis desde $75-$100 dependiendo de la zona, con costos regulares de $6-$8."
    },
    {
      category: 'envios',
      question: "¿Cuánto tarda el envío?",
      answer: "En San Salvador y área metropolitana: 24-48 horas. Zona Occidental y Oriental: 2-3 días hábiles. Zona Paracentral: 2-3 días hábiles. Los pedidos antes de las 2:00 PM se procesan el mismo día."
    },
    {
      category: 'envios',
      question: "¿Puedo rastrear mi pedido?",
      answer: "Sí, una vez procesado tu pedido recibirás un código de rastreo por email que te permitirá seguir tu envío en tiempo real hasta que llegue a tu dirección."
    },
    {
      category: 'envios',
      question: "¿Qué pasa si no hay nadie para recibir el pedido?",
      answer: "Si no hay nadie disponible para recibir el pedido, el mensajero dejará un aviso de visita y contactaremos contigo para reagendar la entrega en un horario conveniente."
    },
    {
      category: 'pagos',
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos efectivo en tienda, tarjetas de crédito/débito (Visa, Mastercard, American Express), transferencias bancarias y pagos en línea a través de nuestra plataforma web segura."
    },
    {
      category: 'pagos',
      question: "¿Puedo pagar en cuotas?",
      answer: "Sí, trabajamos con varias entidades bancarias que ofrecen planes de financiamiento. Los detalles y condiciones dependen de tu banco emisor. Consulta con tu banco sobre planes de cuotas disponibles."
    },
    {
      category: 'pagos',
      question: "¿Es seguro pagar en línea?",
      answer: "Absolutamente. Utilizamos conexiones cifradas SSL y procesadores de pago certificados PCI-DSS. Nunca almacenamos información completa de tarjetas de crédito en nuestros servidores."
    },
    {
      category: 'pagos',
      question: "¿Puedo cancelar o modificar mi pedido?",
      answer: "Puedes cancelar o modificar tu pedido mientras no haya sido procesado y enviado. Contáctanos lo antes posible. Una vez enviado, aplican las políticas de devolución estándar."
    },
    {
      category: 'soporte',
      question: "¿Ofrecen asesoría para elegir componentes?",
      answer: "Sí, nuestro equipo técnico está disponible para asesorarte en la selección de componentes según tus necesidades, presupuesto y tipo de uso (gaming, trabajo, edición, etc.). Puedes contactarnos por teléfono, email o visitarnos en tienda."
    },
    {
      category: 'soporte',
      question: "¿Realizan instalación de componentes?",
      answer: "Sí, ofrecemos servicio de instalación de componentes tanto en nuestras tiendas como a domicilio (en área metropolitana). El costo varía según la complejidad de la instalación."
    },
    {
      category: 'soporte',
      question: "¿Ofrecen servicio de mantenimiento?",
      answer: "Sí, tenemos varios planes de mantenimiento: Limpieza Básica ($15), Mantenimiento Preventivo ($35), Mantenimiento Premium ($60) y Mantenimiento de Sistema Líquido ($80). Cada uno incluye diferentes servicios según tus necesidades."
    },
    {
      category: 'soporte',
      question: "¿Tienen servicio técnico de reparación?",
      answer: "Sí, contamos con técnicos especializados para diagnóstico y reparación de PCs. Evaluamos el problema sin costo y te brindamos un presupuesto antes de realizar cualquier reparación."
    },
    {
      category: 'soporte',
      question: "¿Puedo devolver un producto si no me gusta?",
      answer: "Dentro de los 30 días de compra, aceptamos devoluciones si el producto está en condiciones originales, sin uso, con empaque completo y sellos intactos. Se aplica una verificación técnica. No aplica para productos personalizados o con software instalado."
    },
    {
      category: 'soporte',
      question: "¿Tienen tienda física donde puedo ver los productos?",
      answer: "Sí, tenemos tres sucursales: San Salvador (Multiplaza), Santa Tecla (Plaza Merliot) y San Miguel (Metrocentro). Puedes visitar nuestro showroom para ver productos físicamente y recibir asesoría personalizada."
    }
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="faq-page">
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="faq-hero-overlay"></div>
          <div className="faq-hero-content">
            <h1>Preguntas Frecuentes</h1>
            <p>Encuentra respuestas rápidas a tus dudas</p>
          </div>
        </section>

        {/* Intro */}
        <section className="faq-intro">
          <div className="faq-container">
            <div className="intro-content">
              <span className="section-label">Centro de Ayuda</span>
              <h2>¿Tienes alguna pregunta?</h2>
              <p>
                Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros productos, 
                servicios, garantías, envíos y más. Si no encuentras lo que buscas, no dudes en 
                contactarnos directamente.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="faq-categories">
          <div className="faq-container">
            <div className="categories-list">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-name">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="faq-questions">
          <div className="faq-container">
            <div className="questions-count">
              Mostrando {filteredFaqs.length} {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'}
            </div>

            <div className="questions-list">
              {filteredFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`question-item ${openQuestion === index ? 'open' : ''}`}
                >
                  <button 
                    className="question-header"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="question-text">{faq.question}</span>
                    <span className="question-icon">
                      {openQuestion === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  <div className="question-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="faq-contact">
          <div className="faq-container">
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h2>¿No encontraste lo que buscabas?</h2>
              <p>Nuestro equipo está disponible para ayudarte con cualquier otra consulta</p>
              <div className="contact-buttons">
                <a href="/nosotros/contacto" className="contact-btn primary">
                  Contactar Soporte
                </a>
                <a href="https://wa.me/50377778888" className="contact-btn secondary" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}