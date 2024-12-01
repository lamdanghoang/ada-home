import React, { useEffect, useState } from 'react';
import AcceptCard from '@/components/AcceptCard/accept-card';

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
  }));
};

const ListAcceptCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 2; // Adjust properties per page for mobile
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(generatePropertyData());
  }, []);

  async function handleApprove(id) {
    "use server";
    // Implement your approval logic here
    console.log(`Approved item ${id}`);
  }

  async function handleDeny(id) {
    "use server";
    // Implement your denial logic here
    console.log(`Denied item ${id}`);
  }

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
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentProperties.map(property => (
          <div key={property.id} className="flex justify-center">
            <AcceptCard
              images={property.images}
              title={property.title}
              location={property.location}
              tokenPrice={property.tokenPrice}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          </div>
        ))}
      </div>

      {/* Responsive Pagination */}
      <div className="flex justify-center mt-8 flex-wrap">
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
      </div>
    </div>
  );
};

export default ListAcceptCard;