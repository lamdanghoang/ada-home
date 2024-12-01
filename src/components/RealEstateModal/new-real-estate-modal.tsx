import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RealEstateData {
  images: string[];
  title: string;
  location: string;
  tokenPrice: number;
  apy: number;
}

export default function NewRealEstateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<RealEstateData>({
    images: [],
    title: '',
    location: '',
    tokenPrice: 0,
    apy: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'images' 
        ? value.split(',').map(img => img.trim()) 
        : (name === 'tokenPrice' || name === 'apy' 
          ? Number(value) 
          : value)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => 
        URL.createObjectURL(file)
      );
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API submission
      console.log('Submitted Real Estate Data:', formData);
      
      setIsLoading(false);
      setIsOpen(false);

      // Show success toast
      toast({
        title: "Success!",
        description: "Real estate property has been added successfully."
      });

      // Reset form after success
      setFormData({
        images: [],
        title: '',
        location: '',
        tokenPrice: 0,
        apy: 0
      });
    } catch (error) {
      setIsLoading(false);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add property. Please try again."
      });

      console.error('Submission failed', error);
    }
  };


  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 
                     text-white transition-all duration-200 
                     transform hover:scale-105 active:scale-95"
          onClick={() => setIsOpen(true)}
        >
          New Real Estate
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[600px] bg-gray-800 text-white 
                    border-none shadow-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-white">Add New Real Estate Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-white border-gray-600 
                         focus:ring-purple-500 focus:border-purple-500"
              placeholder="Property Name"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right text-white">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-white border-gray-600 
                         focus:ring-purple-500 focus:border-purple-500"
              placeholder="Property Location"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tokenPrice" className="text-right text-white">
              Token Price
            </Label>
            <Input
              id="tokenPrice"
              name="tokenPrice"
              type="number"
              value={formData.tokenPrice}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-white border-gray-600 
                         focus:ring-purple-500 focus:border-purple-500"
              placeholder="Price per Token"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apy" className="text-right text-white">
              APY
            </Label>
            <Input
              id="apy"
              name="apy"
              type="number"
              value={formData.apy}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-white border-gray-600 
                         focus:ring-purple-500 focus:border-purple-500"
              placeholder="Annual Percentage Yield"
              required
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right text-white">
              Images
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              onChange={handleImageUpload}
              className="col-span-3 text-white file:bg-purple-500 
                         file:text-white file:border-none file:rounded 
                         file:px-4 "
              multiple
              accept="image/*"
            />
          </div>
          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-white">Preview</Label>
              <div className="col-span-3 flex space-x-2">
                {formData.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Preview ${index + 1}`} 
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Adding Property...
                  </>
                ) : (
                  'Add Property'
                )}
              </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
   </>
  );
}