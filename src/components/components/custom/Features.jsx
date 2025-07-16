import React from "react";
import './Features.css';


const features = [
  {
    icon: "fa fa-rocket",
    title: "Instant AI Planning",
    text: "Just enter your destination and preferences — our AI builds a full itinerary instantly.",
  },
  {
    icon: "fa fa-map-o",
    title: "Interactive Maps",
    text: "Visualize every location, hotel, and experience directly on the map view.",
  },
  {
    icon: "fa fa-users",
    title: "Group Optimization",
    text: "Traveling with friends or family? We optimize timing and stops for all.",
  },
  {
    icon: "fa fa-star",
    title: "Curated Recommendations",
    text: "Get top-rated hotels, attractions, and dining options based on live data.",
  },
];

const Features = () => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-xs-6 col-md-3">
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
