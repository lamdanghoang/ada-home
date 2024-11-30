import HeroSlider from '@/components/HeroSlider/hero-slider';
import PropertyPaginator from '@/components/PropertyPaginator/property-paginator';

export default function Home() {

    return (
        <div>
            <HeroSlider />
            <div>
                <div className='mt-5 ml-5'>
                    <PropertyPaginator  />
                </div>
                
            </div>
        </div>
    );
}