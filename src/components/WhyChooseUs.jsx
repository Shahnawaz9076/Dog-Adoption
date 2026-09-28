import React from "react";
import "../css/WhyChooseUs.css";

const WhyChooseUs = () => {

  const features = [
    {
      icon: "❤️",
      title: "Loving Homes",
      description:
        "We help dogs find caring families where they can live happily and safely."
    },
    {
      icon: "🛡️",
      title: "Trusted & Safe",
      description:
        "We focus on responsible adoption and making the process safe for everyone."
    },
    {
      icon: "🐾",
      title: "Happy Families",
      description:
        "Our goal is to create beautiful connections between dogs and their new families."
    }
  ];

  return (
    <section className="why-section">

      <div className="why-heading">

        <p>WHY PAWFINDER?</p>

        <h2>More Than Just Adoption</h2>

        <span>
          We believe every dog deserves love, care and a forever home.
        </span>

      </div>

      <div className="feature-grid">

        {features.map((feature) => (

          <div className="feature-card" key={feature.title}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default WhyChooseUs;