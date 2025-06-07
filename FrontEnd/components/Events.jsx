const Events = () => {
  const eventsList = [
    {
      title: "Tech Conference 2025",
      date: "March 20, 2025",
      location: "San Francisco, CA",
      description:
        "Join top industry leaders for the annual Tech Conference to explore the latest trends in technology and innovation.",
    },
    {
      title: "Design Workshop",
      date: "April 15, 2025",
      location: "New York, NY",
      description:
        "A hands-on workshop focused on cutting-edge design techniques and tools for professionals and enthusiasts alike.",
    },
    {
      title: "Startup Expo",
      date: "June 10, 2025",
      location: "Los Angeles, CA",
      description:
        "Meet top entrepreneurs and explore the next big ideas at the annual Startup Expo.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50" id="event">
      <div className="text-center mb-16">
        <h2 id="events" className="text-4xl font-bold text-gray-800">
          Upcoming Events
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Stay ahead with our exciting events and workshops
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsList.map((event, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transform transition hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-2">
              {event.date} | {event.location}
            </p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
