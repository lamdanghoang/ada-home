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
  const propertiesPerPage = 4;
  const [properties, setProperties] = useState([]);
  useEffect(()=>{
    setProperties(generatePropertyData());
  },[]) 

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty, 
    indexOfLastProperty
  );

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 gap-6">
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
      
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
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
        ))}
      </div>
    </div>
  );
};

export default PropertyPaginator;