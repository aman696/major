import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideFadeSection from '../components/SideFadeSection';

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

// Base list of 50 providers
const baseProviders = [
  { id: 1, name: 'Alice Johnson', rating: 4.5, experience: '5 years', expertise: 'Deep Cleaning', description: 'Specializes in deep cleaning for homes.' },
  { id: 2, name: 'Bob Stone', rating: 4.3, experience: '3 years', expertise: 'Office Cleaning', description: 'Reliable office cleaning solutions.' },
  { id: 3, name: 'Carla Black', rating: 4.6, experience: '6 years', expertise: 'Carpet Cleaning', description: 'Expert in carpet and upholstery cleaning.' },
  { id: 4, name: 'Derek White', rating: 4.8, experience: '4 years', expertise: 'Window Cleaning', description: 'High-quality window cleaning.' },
  { id: 5, name: 'Eva Gold', rating: 4.2, experience: '2 years', expertise: 'Commercial Cleaning', description: 'Efficient commercial cleaning services.' },
  { id: 6, name: 'Frank Silver', rating: 4.9, experience: '8 years', expertise: 'Residential Cleaning', description: 'Specialist in residential cleaning.' },
  { id: 7, name: 'Gina Gray', rating: 4.3, experience: '7 years', expertise: 'Post-Construction Cleaning', description: 'Expert post-construction cleaning services.' },
  { id: 8, name: 'Harry Green', rating: 4.7, experience: '6 years', expertise: 'Eco-friendly Cleaning', description: 'Eco-friendly cleaning options.' },
  { id: 9, name: 'Ivy Brown', rating: 4.4, experience: '4 years', expertise: 'Pet-friendly Cleaning', description: 'Pet-safe cleaning products.' },
  { id: 10, name: 'Jack White', rating: 4.1, experience: '3 years', expertise: 'Move-out Cleaning', description: 'Specializes in move-out cleaning.' },
  { id: 11, name: 'Liam James', rating: 4.0, experience: '5 years', expertise: 'Leak Repair', description: 'Reliable leak repair services.' },
  { id: 12, name: 'Mason Clark', rating: 4.2, experience: '7 years', expertise: 'Pipe Installation', description: 'Expert in pipe installation and repairs.' },
  { id: 13, name: 'Nina Walker', rating: 4.6, experience: '6 years', expertise: 'Drain Cleaning', description: 'Specialist in drain cleaning services.' },
  { id: 14, name: 'Oliver King', rating: 4.7, experience: '8 years', expertise: 'Water Heater Repair', description: 'Expert water heater repairs.' },
  { id: 15, name: 'Pia Bell', rating: 4.1, experience: '2 years', expertise: 'Fixture Installation', description: 'Quality fixture installation.' },
  { id: 16, name: 'Quincy Lee', rating: 4.3, experience: '4 years', expertise: 'Emergency Plumbing', description: '24/7 emergency plumbing services.' },
  { id: 17, name: 'Rachel Fox', rating: 4.5, experience: '5 years', expertise: 'Bathroom Plumbing', description: 'Bathroom plumbing specialist.' },
  { id: 18, name: 'Sam Young', rating: 4.9, experience: '10 years', expertise: 'Sewer Line Services', description: 'Expert in sewer line repair.' },
  { id: 19, name: 'Tina Black', rating: 4.4, experience: '6 years', expertise: 'Backflow Prevention', description: 'Backflow prevention solutions.' },
  { id: 20, name: 'Uma Brown', rating: 4.2, experience: '3 years', expertise: 'Water Line Installation', description: 'Water line installation expert.' },
  { id: 21, name: 'Victor Young', rating: 4.5, experience: '10 years', expertise: 'Residential Wiring', description: 'Experienced in residential wiring.' },
  { id: 22, name: 'Wendy Lin', rating: 4.6, experience: '4 years', expertise: 'Commercial Wiring', description: 'Handles large commercial projects.' },
  { id: 23, name: 'Xander Lopez', rating: 4.3, experience: '6 years', expertise: 'Circuit Breaker Repair', description: 'Specialist in circuit breaker repairs.' },
  { id: 24, name: 'Yara Stone', rating: 4.9, experience: '8 years', expertise: 'Surge Protection', description: 'Provides surge protection solutions.' },
  { id: 25, name: 'Zack Lee', rating: 4.0, experience: '2 years', expertise: 'Lighting Installation', description: 'Indoor and outdoor lighting installation.' },
  { id: 26, name: 'Amy White', rating: 4.4, experience: '3 years', expertise: 'Electrical Troubleshooting', description: 'Electrical issue diagnosis and repair.' },
  { id: 27, name: 'Boris Scott', rating: 4.5, experience: '5 years', expertise: 'Generator Installation', description: 'Experienced in generator setups.' },
  { id: 28, name: 'Cara Bell', rating: 4.7, experience: '7 years', expertise: 'Panel Upgrades', description: 'Specializes in panel upgrades.' },
  { id: 29, name: 'Dylan Gray', rating: 4.8, experience: '6 years', expertise: 'Ceiling Fan Installation', description: 'Ceiling fan installations.' },
  { id: 30, name: 'Ella Black', rating: 4.1, experience: '5 years', expertise: 'Outdoor Electrical', description: 'Outdoor wiring and setups.' },
  { id: 31, name: 'Finn Harper', rating: 4.8, experience: '6 years', expertise: 'Lawn Care', description: 'Specializes in lawn maintenance and care.' },
  { id: 32, name: 'George Kim', rating: 4.4, experience: '8 years', expertise: 'Garden Design', description: 'Provides custom garden designs.' },
  { id: 33, name: 'Hazel Brown', rating: 4.7, experience: '10 years', expertise: 'Tree Trimming', description: 'Expert in tree care and trimming.' },
  { id: 34, name: 'Ivy Smith', rating: 4.6, experience: '3 years', expertise: 'Shrub Pruning', description: 'Shrub pruning specialist.' },
  { id: 35, name: 'James White', rating: 4.5, experience: '2 years', expertise: 'Mulching', description: 'Experienced in mulching.' },
  { id: 36, name: 'Katie Black', rating: 4.9, experience: '7 years', expertise: 'Landscape Lighting', description: 'Provides lighting for landscapes.' },
  { id: 37, name: 'Lily Young', rating: 4.3, experience: '5 years', expertise: 'Irrigation Systems', description: 'Irrigation system installation and maintenance.' },
  { id: 38, name: 'Mike Brown', rating: 4.2, experience: '4 years', expertise: 'Hardscaping', description: 'Hardscaping and patio setup.' },
  { id: 39, name: 'Nina Scott', rating: 4.4, experience: '6 years', expertise: 'Water Features', description: 'Water feature installations.' },
  { id: 40, name: 'Oscar Lee', rating: 4.6, experience: '9 years', expertise: 'Fertilization', description: 'Provides fertilization services.' },
  { id: 41, name: 'Paul King', rating: 4.6, experience: '8 years', expertise: 'Exterior Painting', description: 'Specializes in exterior painting projects.' },
  { id: 42, name: 'Quinn Black', rating: 4.3, experience: '4 years', expertise: 'Interior Painting', description: 'Expert in detailed interior painting.' },
  { id: 43, name: 'Rachel Tan', rating: 4.8, experience: '6 years', expertise: 'Furniture Painting', description: 'Furniture painting specialist.' },
  { id: 44, name: 'Sam Lee', rating: 4.7, experience: '9 years', expertise: 'Custom Murals', description: 'Creates custom wall murals.' },
  { id: 45, name: 'Tina Smith', rating: 4.4, experience: '5 years', expertise: 'Decorative Painting', description: 'Decorative painting expert.' },
  { id: 46, name: 'Uma Patel', rating: 4.6, experience: '3 years', expertise: 'Wallpapering', description: 'Wallpaper application and removal.' },
  { id: 47, name: 'Vera Young', rating: 4.9, experience: '10 years', expertise: 'Specialty Finishes', description: 'Provides specialty finishes.' },
  { id: 48, name: 'Walter Green', rating: 4.2, experience: '6 years', expertise: 'Textured Walls', description: 'Creates textured wall finishes.' },
  { id: 49, name: 'Xena Brown', rating: 4.1, experience: '7 years', expertise: 'Stenciling', description: 'Stenciling and artistic designs.' },
  { id: 50, name: 'Yara Lopez', rating: 4.5, experience: '8 years', expertise: 'Protective Coatings', description: 'Protective coatings for exterior.' },
];

// Utility to get a random subset of providers
const getRandomSubset = (size) => {
  const shuffled = [...baseProviders].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = services[serviceId];
  const providers = getRandomSubset(5); // Random subset of 5 providers for each service

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

  return (
    <div className="container p-5 md:p-10 bg-gray-900 min-h-screen">
      <SideFadeSection direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{service.name} Services</h1>
      </SideFadeSection>
      <SideFadeSection direction="right">
        <p className="text-md md:text-lg text-gray-300 mb-8">{service.description}</p>
      </SideFadeSection>

      <SideFadeSection direction="left">
        <h2 className="text-2xl font-bold text-white mb-4">Available Providers</h2>
      </SideFadeSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider, index) => (
          <SideFadeSection key={provider.id} direction={index % 2 === 0 ? 'left' : 'right'}>
            <div className="p-4 bg-gray-800 shadow rounded">
              <h3 className="font-bold text-md md:text-lg text-white">{provider.name}</h3>
              <p className="text-sm text-gray-400">
                Rating: <span className="text-yellow-400 font-bold">{provider.rating} ★</span>
              </p>
              <p className="text-sm text-gray-400">
                Experience: <span className="text-gray-200">{provider.experience}</span>
              </p>
              <p className="text-sm text-gray-400">
                Expertise: <span className="text-gray-200">{provider.expertise}</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span className="text-gray-300">{provider.description}</span>
              </p>
            </div>
          </SideFadeSection>
        ))}
        {providers.length === 0 && (
          <div className="text-center text-gray-400 col-span-full">
            No providers are available for this service at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailsPage;
