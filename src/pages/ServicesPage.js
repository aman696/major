import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import SideFadeSection from '../components/SideFadeSection';

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: 'Cleaning', description: 'Professional home and office cleaning services.', iconUrl: 'https://cdn.prod.website-files.com/60ff934f6ded2d17563ab9dd/61392d693cf1ac14070ad5b8_starting-a-cleaning-business.jpeg' },
    { id: 2, name: 'Plumbing', description: 'Reliable plumbing repairs and installations.', iconUrl: 'https://westmoreland.edu/academics/programs/program-pics/plumbing-640x427.jpg' },
    { id: 3, name: 'Electrical', description: 'Expert electrical services for all your needs.', iconUrl: 'https://www.vatsat.hr/wp-content/uploads/Elektroinstalacije.webp' },
    { id: 4, name: 'Landscaping', description: 'Beautiful landscaping solutions for your garden.', iconUrl: 'https://updates.doorplants.com/uploads/tenant/doorplants/3a11afb053a2b33d3cb1b093960f27b5.jpg' },
    { id: 5, name: 'Painting', description: 'Interior and exterior painting services.', iconUrl: 'https://nobili-design.com/storage/gallery/1663/lg/online_interior_design_service.webp' },
    { id: 6, name: 'Carpentry', description: 'Custom carpentry and furniture solutions.', iconUrl: 'https://professnow.com/blog/wp-content/uploads/2021/06/top-best-carpenter.png' },
    { id: 7, name: 'Pest Control', description: 'Safe and effective pest control services.', iconUrl: 'https://jcspest.com/blog/wp-content/uploads/2023/12/role-of-pest-control-services.jpg' },
    { id: 8, name: 'Home Repair', description: 'General home repair and handyman services.', iconUrl: 'https://www.goldycontractor.com/wp-content/uploads/2021/08/Home-repair-services-in-Panchkula.png' },
    { id: 9, name: 'Moving', description: 'Efficient and secure moving services.', iconUrl: 'https://imageio.forbes.com/specials-images/imageserve/660944abd7c790b7d9b90087/Moving-boxes-and-potted-plants-showing-importance-of-job-relocation-/960x0.jpg?format=jpg&width=1440' },
    { id: 10, name: 'Appliance Repair', description: 'Expert appliance repair services.', iconUrl: 'https://wilshirerefrigeration.com/wp-content/uploads/2020/05/Service-technician-refrigerator-appliance-repair.jpg' }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="container p-5 md:p-10 bg-gray-900 min-h-screen">
      <SideFadeSection direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Services</h1>
      </SideFadeSection>
      <SideFadeSection direction="left">
        <section id="services" className="services p-5 md:p-10 bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map(service => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="bg-gray-700 shadow rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition transform hover:scale-105"
              >
                <div className="relative h-32 md:h-40">
                  <img src={service.iconUrl} alt={`${service.name} Icon`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-md md:text-lg text-white">{service.name}</h4>
                  <p className="text-sm md:text-base text-gray-300 mt-2">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </SideFadeSection>
    </div>
  );
}

export default ServicesPage;
