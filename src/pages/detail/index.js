'use client'

import PropertyDetails from '@/components/PropertyDetail/property-detail';

export default function Home() {

    return (
        <div className='text-white'>
            <PropertyDetails
                images={['/house1.jpg', '/house2.jpg', '/house3.png']}
                title="Luxury Apartment 1"
                location="Dubai, UAE"
                tokenPrice={50}
                apy={9.09}
                bedrooms={1}
                bathrooms={1}
                size={50}
                amenities={['Swimming Pool', 'Gym', 'Balcony', 'Parking']}
                built="2020"
                status="available"
            />
        </div>
    );
}