// src/pages/ServiceDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import SideFadeSection from '../components/SideFadeSection';

// Define Leaflet icon (default icon might not appear without this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
// Service definitions
const services = {
  1: { name: 'Cleaning', description: 'Professional cleaning services for home and office.' },
  2: { name: 'Plumbing', description: 'Reliable plumbing repairs and installations.' },
  3: { name: 'Electrical', description: 'Expert electrical services for all your needs.' },
  4: { name: 'Landscaping', description: 'Beautiful landscaping solutions for your garden.' },
  5: { name: 'Painting', description: 'Interior and exterior painting services.' },
  6: { name: 'Carpentry', description: 'Custom carpentry and furniture solutions.' },
  7: { name: 'Pest Control', description: 'Safe and effective pest control services.' },
  8: { name: 'Home Repair', description: 'General home repair and handyman services.' },
  9: { name: 'Moving', description: 'Efficient and secure moving services.' },
  10: { name: 'Appliance Repair', description: 'Expert appliance repair services.' },
};

// Providers organized by category
const providers = {
  'Cleaning': [
    { id: 1, name: 'Alice Johnson', rating: 4.5, experience: '5 years', expertise: 'Deep Cleaning', description: 'Specializes in deep cleaning for homes.', location: '421301' },
    { id: 2, name: 'Bob Stone', rating: 4.3, experience: '3 years', expertise: 'Office Cleaning', description: 'Reliable office cleaning solutions.', location: '421301' },
    { id: 3, name: 'Carla Black', rating: 4.6, experience: '6 years', expertise: 'Carpet Cleaning', description: 'Expert in carpet and upholstery cleaning.', location: '421301' },
    { id: 4, name: 'Derek White', rating: 4.8, experience: '4 years', expertise: 'Window Cleaning', description: 'High-quality window cleaning.', location: '421301' },
    { id: 5, name: 'Eva Gold', rating: 4.2, experience: '2 years', expertise: 'Commercial Cleaning', description: 'Efficient commercial cleaning services.', location: '421301' },
  ],
  'Plumbing': [
    { id: 6, name: 'Liam James', rating: 4.0, experience: '5 years', expertise: 'Leak Repair', description: 'Reliable leak repair services.', location: '421301' },
    { id: 7, name: 'Mason Clark', rating: 4.2, experience: '7 years', expertise: 'Pipe Installation', description: 'Expert in pipe installation and repairs.', location: '421301' },
    { id: 8, name: 'Nina Walker', rating: 4.6, experience: '6 years', expertise: 'Drain Cleaning', description: 'Specialist in drain cleaning services.', location: '451010' },
    { id: 9, name: 'Oliver King', rating: 4.7, experience: '8 years', expertise: 'Water Heater Repair', description: 'Expert water heater repairs.', location: '451010' },
    { id: 10, name: 'Pia Bell', rating: 4.1, experience: '2 years', expertise: 'Fixture Installation', description: 'Quality fixture installation.', location: '451010' },
  ],
  'Electrical': [
    { id: 11, name: 'Victor Young', rating: 4.5, experience: '10 years', expertise: 'Residential Wiring', description: 'Experienced in residential wiring.', location: '451010' },
    { id: 12, name: 'Wendy Lin', rating: 4.6, experience: '4 years', expertise: 'Commercial Wiring', description: 'Handles large commercial projects.', location: '451010' },
    { id: 13, name: 'Xander Lopez', rating: 4.3, experience: '6 years', expertise: 'Circuit Breaker Repair', description: 'Specialist in circuit breaker repairs.', location: '451010' },
    { id: 14, name: 'Yara Stone', rating: 4.9, experience: '8 years', expertise: 'Surge Protection', description: 'Provides surge protection solutions.', location: '451010' },
    { id: 15, name: 'Zack Lee', rating: 4.0, experience: '2 years', expertise: 'Lighting Installation', description: 'Indoor and outdoor lighting installation.', location: '451010' },
  ],
  'Landscaping': [
    { id: 16, name: 'Finn Harper', rating: 4.8, experience: '6 years', expertise: 'Lawn Care', description: 'Specializes in lawn maintenance and care.', location: '451010' },
    { id: 17, name: 'George Kim', rating: 4.4, experience: '8 years', expertise: 'Garden Design', description: 'Provides custom garden designs.', location: '451010' },
    { id: 18, name: 'Hazel Brown', rating: 4.7, experience: '10 years', expertise: 'Tree Trimming', description: 'Expert in tree care and trimming.', location: '451010' },
    { id: 19, name: 'Ivy Smith', rating: 4.6, experience: '3 years', expertise: 'Shrub Pruning', description: 'Shrub pruning specialist.', location: '451010' },
    { id: 20, name: 'James White', rating: 4.5, experience: '2 years', expertise: 'Mulching', description: 'Experienced in mulching.', location: '451010' },
  ],
  'Painting': [
    { id: 21, name: 'Paul King', rating: 4.6, experience: '8 years', expertise: 'Exterior Painting', description: 'Specializes in exterior painting projects.', location: '451010' },
    { id: 22, name: 'Quinn Black', rating: 4.3, experience: '4 years', expertise: 'Interior Painting', description: 'Expert in detailed interior painting.', location: '451010' },
    { id: 23, name: 'Rachel Tan', rating: 4.8, experience: '6 years', expertise: 'Furniture Painting', description: 'Furniture painting specialist.', location: '451010' },
    { id: 24, name: 'Sam Lee', rating: 4.7, experience: '9 years', expertise: 'Custom Murals', description: 'Creates custom wall murals.', location: '451010' },
    { id: 25, name: 'Tina Smith', rating: 4.4, experience: '5 years', expertise: 'Decorative Painting', description: 'Decorative painting expert.', location: '451010' },
  ],
  'Carpentry': [
    { id: 26, name: 'Katie Black', rating: 4.9, experience: '7 years', expertise: 'Cabinet Making', description: 'Expert in custom cabinetry.', location: '421301' },
    { id: 27, name: 'Vera Young', rating: 4.9, experience: '10 years', expertise: 'Furniture Building', description: 'Experienced in custom furniture.', location: '421301' },
    { id: 28, name: 'Mike Brown', rating: 4.2, experience: '4 years', expertise: 'Woodworking', description: 'General woodworking specialist.', location: '421301' },
    { id: 29, name: 'Walter Green', rating: 4.2, experience: '6 years', expertise: 'Deck Building', description: 'Deck and patio specialist.', location: '421301' },
    { id: 30, name: 'Xena Brown', rating: 4.1, experience: '7 years', expertise: 'Stenciling', description: 'Stenciling and artistic designs.', location: '451010' },
  ],
  'Pest Control': [
    { id: 31, name: 'George Kim', rating: 4.7, experience: '5 years', expertise: 'Termite Control', description: 'Expert in termite eradication.', location: '421301' },
    { id: 32, name: 'Harold Smith', rating: 4.8, experience: '8 years', expertise: 'Rodent Control', description: 'Specializes in rodent control for residential and commercial spaces.', location: '421301' },
    { id: 33, name: 'Isabella Stone', rating: 4.5, experience: '6 years', expertise: 'Insect Removal', description: 'Expert in removing common household insects.', location: '421301' },
    { id: 34, name: 'Jake Blue', rating: 4.3, experience: '3 years', expertise: 'Mosquito Control', description: 'Specializes in mosquito control treatments.', location: '421301' },
    { id: 35, name: 'Karen Lee', rating: 4.6, experience: '7 years', expertise: 'Bed Bug Extermination', description: 'Offers bed bug eradication services.', location: '451010' },
  ],
  'Home Repair': [
    { id: 36, name: 'Leo White', rating: 4.7, experience: '9 years', expertise: 'Roof Repair', description: 'Expert in roof leak repairs and maintenance.', location: '421301' },
    { id: 37, name: 'Maggie Jones', rating: 4.4, experience: '6 years', expertise: 'Wall Repair', description: 'Provides drywall and wall repairs.', location: '421301' },
    { id: 38, name: 'Nathan Clark', rating: 4.5, experience: '7 years', expertise: 'Plastering', description: 'Specialist in plaster and skim coating.', location: '451010' },
    { id: 39, name: 'Olivia Scott', rating: 4.9, experience: '10 years', expertise: 'Home Renovation', description: 'Experienced in complete home renovation.', location: '451010' },
    { id: 40, name: 'Pauline Green', rating: 4.6, experience: '4 years', expertise: 'Tile Installation', description: 'Expert in floor and wall tiling.', location: '451010' },
  ],
  'Moving': [
    { id: 41, name: 'Quinn Black', rating: 4.8, experience: '5 years', expertise: 'Residential Moving', description: 'Specializes in safe and efficient home moves.', location: '421301' },
    { id: 42, name: 'Ryan Adams', rating: 4.7, experience: '8 years', expertise: 'Commercial Relocation', description: 'Expert in moving offices and commercial spaces.', location: '421301' },
    { id: 43, name: 'Sophia Ray', rating: 4.5, experience: '6 years', expertise: 'Furniture Disassembly', description: 'Provides furniture assembly and disassembly services.', location: '451010' },
    { id: 44, name: 'Tyler Brown', rating: 4.4, experience: '4 years', expertise: 'Packing Services', description: 'Professional in packing and organizing for moves.', location: '451010' },
    { id: 45, name: 'Uma Patel', rating: 4.3, experience: '3 years', expertise: 'Storage Solutions', description: 'Assists with short-term and long-term storage options.', location: '421301' },
  ],
  'Appliance Repair': [
    { id: 46, name: 'Victor Young', rating: 4.8, experience: '9 years', expertise: 'Refrigerator Repair', description: 'Specializes in all types of refrigerator repairs.', location: '421301' },
    { id: 47, name: 'Wendy Lane', rating: 4.5, experience: '5 years', expertise: 'Washing Machine Repair', description: 'Experienced in washing machine diagnostics and repairs.', location: '421301' },
    { id: 48, name: 'Xavier Kim', rating: 4.7, experience: '7 years', expertise: 'Air Conditioner Repair', description: 'Expert in AC servicing and repair.', location: '451010' },
    { id: 49, name: 'Yasmine Brown', rating: 4.4, experience: '6 years', expertise: 'Microwave Repair', description: 'Specializes in microwave and small appliance repairs.', location: '451010' },
    { id: 50, name: 'Zachary Green', rating: 4.6, experience: '8 years', expertise: 'Dishwasher Repair', description: 'Provides comprehensive dishwasher servicing.', location: '421301' },
  ]
};
const GEOCODING_API_KEY = 'YOUR_OPENCAGE_API_KEY';
function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [fetchedProviders, setFetchedProviders] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const service = services[serviceId];
  const hardcodedProviders = providers[service?.name] || [];

  useEffect(() => {
    const fetchProviders = async () => {
      if (!service) return;

      try {
        const q = query(
          collection(db, 'serviceProviders'),
          where('serviceCategory', '==', service.name)
        );
        const querySnapshot = await getDocs(q);
        const providersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().displayName,
          expertise: doc.data().serviceCategory,
          experience: parseInt(doc.data().experience),
          rating: doc.data().rating || 'No reviews yet',
          description: doc.data().description,
          location: doc.data().location,
        }));
        setFetchedProviders(providersData);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, [service]);

  const filteredProviders = [...fetchedProviders, ...hardcodedProviders].filter(provider => {
    const providerRating = typeof provider.rating === 'number' ? provider.rating : 0;
    const providerExperience = parseInt(provider.experience);
    return providerRating >= minRating && providerExperience >= minExperience;
  });

  if (!service) {
    return (
      <div className="container p-5 md:p-10 bg-gray-900 min-h-screen text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Service Not Found</h1>
        <button
          onClick={() => navigate('/services')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Go Back to Services
        </button>
      </div>
    );
  }

  // Function to navigate to booking page
  const handleBooking = (providerId) => {
    navigate(`/booking/${providerId}`);
  };

  return (
    <div className="container p-5 md:p-10 bg-gray-900 min-h-screen">
      <SideFadeSection direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{service.name} Services</h1>
      </SideFadeSection>
      <SideFadeSection direction="right">
        <p className="text-md md:text-lg text-gray-300 mb-8">{service.description}</p>
      </SideFadeSection>

      <div className="mb-6 flex justify-between">
        <label className="text-gray-200">
          Min Rating:
          <select
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="ml-2 p-2 bg-gray-700 text-white rounded"
          >
            <option value="0">All</option>
            <option value="3">3 ★ & up</option>
            <option value="4">4 ★ & up</option>
            <option value="4.5">4.5 ★ & up</option>
          </select>
        </label>
        <label className="text-gray-200">
          Min Experience (Years):
          <select
            value={minExperience}
            onChange={(e) => setMinExperience(parseInt(e.target.value))}
            className="ml-2 p-2 bg-gray-700 text-white rounded"
          >
            <option value="0">All</option>
            <option value="1">1+ years</option>
            <option value="3">3+ years</option>
            <option value="5">5+ years</option>
            <option value="7">7+ years</option>
          </select>
        </label>
      </div>

      <SideFadeSection direction="left">
        <h2 className="text-2xl font-bold text-white mb-4">Available Providers</h2>
      </SideFadeSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProviders.map((provider, index) => (
          <SideFadeSection key={provider.id} direction={index % 2 === 0 ? 'left' : 'right'}>
            <div className="p-4 bg-gray-800 shadow rounded">
              <h3 className="font-bold text-md md:text-lg text-white">{provider.name}</h3>
              <p className="text-sm text-gray-400">
                Rating: <span className="text-yellow-400 font-bold">{provider.rating} ★</span>
              </p>
              <p className="text-sm text-gray-400">
                Experience: <span className="text-gray-200">{provider.experience} years</span>
              </p>
              <p className="text-sm text-gray-400">
                Expertise: <span className="text-gray-200">{provider.expertise}</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span className="text-gray-300">{provider.description}</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Location: <span className="text-gray-300">{provider.location}</span>
              </p>
              <button
  onClick={() => navigate('/booking', { state: { provider } })}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
>
  Book Now
</button>
            </div>
          </SideFadeSection>
        ))}

        {filteredProviders.length === 0 && (
          <div className="text-center text-gray-400 col-span-full">
            No providers are available for this service with the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailsPage;