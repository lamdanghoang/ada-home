import HeroSlider from '@/components/HeroSlider/hero-slider';
import PropertyPaginator from '@/components/PropertyPaginator/property-paginator';
import NewRealEstateModal from '@/components/RealEstateModal/new-real-estate-modal';


export default function Home() {

    return (
        <div>
            <HeroSlider />
            <div>
                <div className="flex justify-center mt-10">
                    <NewRealEstateModal />
                </div>
                <div className='mt-5 ml-5'>
                    <PropertyPaginator />
                </div>
            </div>
        </div>
    );
}