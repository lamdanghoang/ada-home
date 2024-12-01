import HeroSlider from '@/components/HeroSlider/hero-slider';
import PropertyPaginator from '@/components/PropertyPaginator/property-paginator';
import NewRealEstateModal from '@/components/RealEstateModal/new-real-estate-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListAcceptCard from '@/components/ListAcceptCard/list-accept-card';

export default function Home() {

    return (
        <div>
            <HeroSlider />
            <div>
                <div className="flex justify-center mt-10">
                    <NewRealEstateModal />
                </div>
                <Tabs defaultValue="censorship" className="space-y-6 text-white mt-3">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                        <TabsTrigger
                            value="censorship"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                            Censorship
                        </TabsTrigger>
                        <TabsTrigger
                            value="approved"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                            Approved
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="censorship" className="space-y-8">
                        <div className='mt-5 ml-5'>
                            <ListAcceptCard />
                        </div>
                    </TabsContent>
                    <TabsContent value="approved" className="space-y-8">
                        <div className='mt-5 ml-5'>
                            <PropertyPaginator />
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}