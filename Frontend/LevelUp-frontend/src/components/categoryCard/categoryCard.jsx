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
      {/* Gradient Background */}
      <div 
        className="category-gradient" 
        style={{ background: category.gradient }}
      />

      {/* Content */}
      <div className="category-content">
        {/* Icon */}
        <div className="category-icon">{category.icon}</div>

        {/* Name */}
        <h3 className="category-name">{category.name}</h3>

        {/* Description */}
        <p className="category-description">{category.description}</p>

        {/* Button */}
        <button className="category-btn">Ver Productos</button>
      </div>

      {/* Hover Indicator */}
      <div 
        className="category-indicator" 
        style={{ background: category.gradient }}
      />
    </div>
  );
}