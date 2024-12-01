import React, { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard/property-card';

// Function to generate random property data (same as previous implementation)
const generatePropertyData = () => {
  const locations = ['Dubai, UAE', 'Abu Dhabi, UAE', 'Cairo, Egypt', 'Beirut, Lebanon', 'Doha, Qatar'];
  const titles = [
    'Luxury Apartment', 'Modern Loft', 'Beachfront Villa', 
    'Urban Townhouse', 'Suburban Residence', 'Penthouse Suite'
  ];

  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    images: [
      `/house1.jpg?height=400&width=600`,
      `/house2.jpg?height=400&width=600`,
      `/house3.png?height=400&width=600`
    ],
    title: `${titles[Math.floor(Math.random() * titles.length)]} ${index + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    tokenPrice: Math.floor(Math.random() * 100) + 50,
    apy: Number((Math.random() * 10).toFixed(2)),
    status: Math.random() > 0.3 ? 'available' : 'sold'
  }));
};

const PropertyPaginator = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = {
    desktop: 4,
    tablet: 3,
    mobile: 1
  };
  const [properties, setProperties] = useState([]);
  const [deviceType, setDeviceType] = useState('desktop');

  // Determine device type
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate properties on mount
  useEffect(() => {
    setProperties(generatePropertyData());
  }, []);

  // Calculate pagination based on device type
  const currentPropertiesPerPage = propertiesPerPage[deviceType];
  const indexOfLastProperty = currentPage * currentPropertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - currentPropertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty, 
    indexOfLastProperty
  );

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / currentPropertiesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Responsive Grid Layout */}
      <div className={`
        grid 
        ${deviceType === 'desktop' ? 'grid-cols-4' : 
          deviceType === 'tablet' ? 'grid-cols-3' : 'grid-cols-1'} 
        gap-6
      `}>
        {currentProperties.map(property => (
          <div key={property.id} className="flex justify-center">
            <PropertyCard
              images={property.images}
              title={property.title}
              location={property.location}
              tokenPrice={property.tokenPrice}
              apy={property.apy}
              status={property.status}
            />
          </div>
        ))}
      </div>

      {/* Responsive Pagination */}
      <div className="flex justify-center mt-8 flex-wrap">
        {deviceType === 'mobile' ? (
          // Mobile: Previous/Next buttons
          <>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2 px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2 py-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-2 px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </>
        ) : (
          // Desktop/Tablet: Number buttons
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyPaginator;