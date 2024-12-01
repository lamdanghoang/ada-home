import HeroSlider from '@/components/HeroSlider/hero-slider';
import PropertyPaginator from '@/components/PropertyPaginator/property-paginator';
import NewRealEstateModal from '@/components/RealEstateModal/new-real-estate-modal';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Slider - Full Width */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* Content Container with Mobile-First Approach */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Real Estate Modal - Centered and Responsive */}
        <div className="flex justify-center mt-6 sm:mt-10">
          <NewRealEstateModal />
        </div>

        {/* Property Paginator - Full Width on Mobile */}
        <div className='mt-5 mb-5 w-full'>
          <PropertyPaginator />
        </div>
      </div>
    </div>
  );
}