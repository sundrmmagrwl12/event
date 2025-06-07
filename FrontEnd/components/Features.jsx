import React, { useState, useEffect, useRef } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const sectionRef = useRef(null);

  const featuresList = [
    {
      icon: "📅",
      title: "Event Creation",
      description:
        "Create and customize events in minutes with our intuitive dashboard. Drag-and-drop tools make planning effortless.",
      color: "indigo",
    },
    {
      icon: "🎤",
      title: "Keynote Speeches",
      description:
        "Hear from industry leaders about the latest trends and innovations. Schedule and manage speakers easily.",
      color: "purple",
    },
    {
      icon: "🚀",
      title: "Exhibition of Technologies",
      description:
        "Explore cutting-edge technologies and solutions from exhibitors. Virtual and in-person booth management.",
      color: "blue",
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description:
        "Manage your events on the go with our responsive platform. Native apps for iOS and Android devices.",
      color: "green",
    },
    {
      icon: "🛠️",
      title: "Hands-on Workshops",
      description:
        "Participate in interactive workshops to enhance your skills. Tools for breakout rooms and collaboration.",
      color: "red",
    },
    {
      icon: "🤝",
      title: "Networking Opportunities",
      description:
        "Connect with like-minded professionals and expand your network. AI-powered matching for meaningful connections.",
      color: "yellow",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Function to get color classes based on color name
  const getColorClasses = (colorName) => {
    const colorMap = {
      indigo: {
        bg: "bg-indigo-50",
        iconBg: "bg-indigo-100",
        textColor: "text-indigo-600",
        hoverBg: "hover:bg-indigo-100",
        gradientFrom: "from-indigo-500",
        gradientTo: "to-indigo-600",
      },
      purple: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        textColor: "text-purple-600",
        hoverBg: "hover:bg-purple-100",
        gradientFrom: "from-purple-500",
        gradientTo: "to-purple-600",
      },
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        textColor: "text-blue-600",
        hoverBg: "hover:bg-blue-100",
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-600",
      },
      green: {
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        textColor: "text-green-600",
        hoverBg: "hover:bg-green-100",
        gradientFrom: "from-green-500",
        gradientTo: "to-green-600",
      },
      red: {
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        textColor: "text-red-600",
        hoverBg: "hover:bg-red-100",
        gradientFrom: "from-red-500",
        gradientTo: "to-red-600",
      },
      yellow: {
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        textColor: "text-yellow-600",
        hoverBg: "hover:bg-yellow-100",
        gradientFrom: "from-yellow-500",
        gradientTo: "to-yellow-600",
      },
    };

    return colorMap[colorName] || colorMap.indigo;
  };

  return (
    <section
      className="py-20 px-4 bg-white relative overflow-hidden"
      id="feature"
      ref={sectionRef}>
      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scaleIn {
            from { 
              opacity: 0;
              transform: scale(0.9);
            }
            to { 
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.7s ease-out forwards;
          }
          
          .scale-in {
            opacity: 0;
            animation: scaleIn 0.5s ease-out forwards;
          }
          
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          
          .feature-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backface-visibility: hidden;
          }
          
          .feature-card:hover {
            transform: translateY(-8px);
          }
          
          .feature-icon-wrapper {
            transition: transform 0.5s ease;
          }
          
          .feature-card:hover .feature-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
          }
          
          .background-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            z-index: 0;
            opacity: 0.04;
            animation: pulse 15s infinite alternate ease-in-out;
          }
          
          .floating-shape {
            position: absolute;
            z-index: 0;
            opacity: 0.03;
            animation: float 6s infinite ease-in-out;
          }
        `}
      </style>

      {/* Background decorative elements */}
      <div className="background-blob bg-indigo-300 w-96 h-96 top-0 right-0"></div>
      <div className="background-blob bg-blue-300 w-96 h-96 bottom-20 left-0 animation-delay-3000"></div>

      <div className="floating-shape top-20 left-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4F46E5"
            d="M40.8,-62.1C52.3,-55.7,60.7,-42.8,65.5,-29.1C70.3,-15.5,71.5,-1.1,69.9,12.9C68.2,26.9,63.8,40.5,54.8,50.9C45.7,61.3,32.1,68.5,17.1,73.1C2,77.7,-14.5,79.8,-29.5,75.2C-44.5,70.6,-58.1,59.4,-65.8,45.3C-73.5,31.2,-75.4,14.1,-74.9,-2.8C-74.4,-19.7,-71.5,-36.5,-62.6,-48.4C-53.6,-60.3,-38.7,-67.3,-24.1,-71.3C-9.5,-75.3,4.9,-76.4,18.7,-73C32.5,-69.6,45.7,-61.7,40.8,-62.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="floating-shape bottom-10 right-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4F46E5"
            d="M46.3,-71.5C60.9,-64.5,74.2,-52.6,81.6,-37.9C89,-23.2,90.6,-5.6,87.8,11.2C85,28,77.9,44.1,66.6,56.3C55.2,68.6,39.7,77.1,23.4,81.1C7.1,85.1,-10,84.7,-24.3,78.5C-38.7,72.3,-50.3,60.4,-58.9,47.1C-67.5,33.8,-73.2,19.1,-74.6,3.8C-76,-11.6,-73.2,-27.6,-65.4,-40.1C-57.5,-52.6,-44.6,-61.5,-31.1,-68.8C-17.5,-76.2,-3.4,-81.9,9.9,-79.5C23.2,-77.1,31.7,-78.6,46.3,-71.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 scroll-mt-20">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : ""}`}>
          <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            Event Management Features
          </span>
          <h2 id="features" className="text-4xl font-bold text-gray-800 mb-3">
            Powerful Features for Event Planners
          </h2>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            Everything you need to create successful events and deliver
            exceptional experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className={`feature-card ${
                  colorClasses.bg
                } p-8 rounded-2xl shadow-sm border border-gray-100 ${
                  colorClasses.hoverBg
                } 
                  ${isVisible ? "scale-in" : ""} delay-${(index % 6) * 100}`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}>
                <div
                  className={`feature-icon-wrapper ${colorClasses.iconBg} w-16 h-16 flex items-center justify-center rounded-2xl mb-6`}>
                  <div className="text-4xl">{feature.icon}</div>
                </div>
                <h3
                  className={`text-xl font-semibold ${colorClasses.textColor} mb-3`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
                <div
                  className={`mt-4 flex items-center ${
                    colorClasses.textColor
                  } font-medium transition-all duration-300 opacity-0 ${
                    activeFeature === index ? "opacity-100" : ""
                  }`}>
                  <span>Learn more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional call to action */}
        <div
          className={`mt-16 text-center ${
            isVisible ? "fade-in-up delay-600" : ""
          }`}>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to elevate your event management?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Join thousands of event planners who use our platform to create
              memorable experiences
            </p>
            <button
              onClick={() => {
                window.location.href = "/Login";
              }}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
