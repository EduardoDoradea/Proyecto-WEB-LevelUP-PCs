import "./flashdeals.css";
import { useState, useEffect } from "react";

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: "RTX 4070 Ti SUPER",
      originalPrice: "$899.99",
      salePrice: "$749.99",
      discount: "17%",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Intel Core i7-14700K",
      originalPrice: "$449.99",
      salePrice: "$399.99",
      discount: "11%",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Monitor 4K 144Hz",
      originalPrice: "$699.99",
      salePrice: "$549.99",
      discount: "21%",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="flash-deals">
      <div className="deals-container">
        <div className="deals-header">
          <h2>Ofertas Flash</h2>
          <div className="countdown">
            <span className="countdown-label">Termina en:</span>
            <div className="countdown-timer">
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Horas</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Min</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-unit">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Seg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card">
              <div className="deal-badge">-{deal.discount}</div>
              <div className="deal-image" style={{ backgroundImage: `url(${deal.image})` }}></div>
              <div className="deal-info">
                <h3>{deal.name}</h3>
                <div className="deal-prices">
                  <span className="original-price">{deal.originalPrice}</span>
                  <span className="sale-price">{deal.salePrice}</span>
                </div>
                <button className="deal-btn">Comprar Ahora</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}