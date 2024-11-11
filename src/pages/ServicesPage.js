import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideFadeSection from '../components/SideFadeSection';

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: 'Cleaning', description: 'Professional home and office cleaning services.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Plumbing', description: 'Reliable plumbing repairs and installations.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Electrical', description: 'Expert electrical services for all your needs.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Landscaping', description: 'Beautiful landscaping solutions for your garden.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Painting', description: 'Interior and exterior painting services.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Carpentry', description: 'Custom carpentry and furniture solutions.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 7, name: 'Pest Control', description: 'Safe and effective pest control services.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 8, name: 'Home Repair', description: 'General home repair and handyman services.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 9, name: 'Moving', description: 'Efficient and secure moving services.', iconUrl: 'https://via.placeholder.com/100' },
    { id: 10, name: 'Appliance Repair', description: 'Expert appliance repair services.', iconUrl: 'https://via.placeholder.com/100' }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="container p-5 md:p-10 bg-gray-900 min-h-screen">
      <SideFadeSection direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Services</h1>
      </SideFadeSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <SideFadeSection key={service.id} direction={index % 2 === 0 ? 'left' : 'right'}>
            <div
              className="p-4 bg-gray-800 shadow rounded text-center cursor-pointer hover:bg-gray-700"
              onClick={() => handleServiceClick(service.id)}
            >
              <img src={service.iconUrl} alt={`${service.name} Icon`} className="mx-auto mb-3 md:mb-4 w-20 h-20 object-cover"/>
              <h4 className="font-bold text-md md:text-lg text-white">{service.name}</h4>
              <p className="text-sm md:text-base text-gray-300">{service.description}</p>
            </div>
          </SideFadeSection>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
