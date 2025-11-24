import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./categoryCard.css";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(category.path);
  };

  return (
    <div
      className={`category-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="category-gradient"
        style={{ background: category.gradient }}
      />

      <div className="category-content">
        <div className="category-icon">{category.icon}</div>
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <button className="category-btn">Ver Productos</button>
      </div>

      <div
        className="category-indicator"
        style={{ background: category.gradient }}
      />
    </div>
  );
}