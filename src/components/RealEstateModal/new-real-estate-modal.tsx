import React, { useState, useRef, useEffect } from 'react';
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
import { Loader2Icon, XIcon, ImagePlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

interface RealEstateData {
  images: string[];
  title: string;
  location: string;
  tokenPrice: number;
  apy: number;
  description: string;
  avaiability: string;
  type: string;
  fund: string;
  costOfProperty: number;
  laPropFee: number;
  notaryFees: number;
  exchangeAndTransactionFees: number;
  maintenanceReserve: number;
  totalFundsNeeded: number;
  grossRentPerMonth: number;
  grossRentPerYear: number;
  monthlyCosts: number;
  netRentPerMonth: number;
  netRentPerYear: number;
}


// Define accepted file types
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

// Define file validation interface
interface FileValidationResult {
  file: File;
  isValid: boolean;
  errorMessage?: string;
}

export default function NewRealEstateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [formData, setFormData] = useState<RealEstateData>({
    images: [],
    title: '',
    location: '',
    tokenPrice: 0,
    apy: 0,
    description: '',
    avaiability: '',
    type: '',
    fund: '',
    costOfProperty: 0,
    laPropFee: 0,
    notaryFees: 0,
    exchangeAndTransactionFees: 0,
    maintenanceReserve: 0,
    totalFundsNeeded: 0,
    grossRentPerMonth: 0,
    grossRentPerYear: 0,
    monthlyCosts: 0,
    netRentPerMonth: 0,
    netRentPerYear: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tokenPrice' || name === 'apy'
        ? value
        : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files)
        .map(file => URL.createObjectURL(file))
        .filter(url => !formData.images.includes(url));

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImageUrls]
      }));
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one image is uploaded
    if (formData.images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive"
      });
      return;
    }

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
        description: "Real estate property has been added successfully.",
      });

      // Reset form after success
      setFormData({
        images: [],
        title: '',
        location: '',
        tokenPrice: 0,
        apy: 0,
        description: '',
        avaiability: '',
        type: '',
        fund: '',
        costOfProperty: 0,
        laPropFee: 0,
        notaryFees: 0,
        exchangeAndTransactionFees: 0,
        maintenanceReserve: 0,
        totalFundsNeeded: 0,
        grossRentPerMonth: 0,
        grossRentPerYear: 0,
        monthlyCosts: 0,
        netRentPerMonth: 0,
        netRentPerYear: 0,
      });
    } catch (error) {
      setIsLoading(false);

      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive"
      });

      console.error('Submission failed', error);
    }
  };

  // Validate individual file
  const validateFile = (file: File): FileValidationResult => {
    const isValidType = ACCEPTED_FILE_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 < 5; // 5MB limit

    return {
      file,
      isValid: isValidType && isValidSize,
      errorMessage: !isValidType
        ? "Invalid file type"
        : !isValidSize
          ? "File exceeds 5MB limit"
          : undefined
    };
  };

  // Handle file selection and validation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const validationResults = files.map(validateFile);

    // Show error toasts for invalid files
    validationResults.forEach(result => {
      if (!result.isValid && result.errorMessage) {
        toast({
          title: "File Upload Error",
          description: `${result.file.name}: ${result.errorMessage}`,
          variant: "destructive"
        });
      }
    });

    // Add only valid files to the list
    const validFiles = validationResults
      .filter(result => result.isValid)
      .map(result => result.file);

    setFileList(prevFiles => [...prevFiles, ...validFiles]);
  };

  // Remove a specific file from the list
  const removeFile = (fileToRemove: File) => {
    setFileList(prevFiles =>
      prevFiles.filter(file => file !== fileToRemove)
    );
  };


  return (
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
        className="sm:max-w-full w-full bg-gray-800 text-white 
        border-none shadow-2xl dialog-content 
        transition-all duration-300 ease-in-out 
        h-full flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-white">Add New Real Estate Property</DialogTitle>
        </DialogHeader>


        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Tabs defaultValue="details" className="flex flex-col flex-grow overflow-hidden">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Financial
              </TabsTrigger>
              <TabsTrigger
                value="documentation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Documents
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[600px] pr-4">
              <TabsContent value="details" className="py-4">
                <div className="grid gap-4 py-4">
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

                  {/* Image Upload Section */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right text-white">Images</Label>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      {/* Image Preview Tiles */}
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Property preview ${index + 1}`}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Add Image Button */}
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="w-24 h-24 border-2 border-dashed border-gray-600 
                            flex items-center justify-center rounded 
                            hover:border-purple-500 transition-colors"
                      >
                        <ImagePlusIcon className="w-8 h-8 text-gray-500" />
                      </button>

                      {/* Hidden File Input */}
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description" className="py-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right text-white">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Description"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avaiability" className="text-right text-white">
                      Project Availability
                    </Label>
                    <Input
                      id="avaiability"
                      name="avaiability"
                      value={formData.avaiability}
                      onChange={handleInputChange}
                      className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Project Availability"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right text-white">
                      Project type
                    </Label>
                    <Input
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Project type"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fund" className="text-right text-white">
                      Project fund
                    </Label>
                    <Input
                      id="fund"
                      name="fund"
                      value={formData.fund}
                      onChange={handleInputChange}
                      className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Project fund"
                      required
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financial" className="py-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="costOfProperty" className="text-right text-white">
                        Cost of Property:
                      </Label>
                      <Input
                        id="costOfProperty"
                        name="costOfProperty"
                        type="number"
                        value={formData.costOfProperty}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="costOfProperty"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="laPropFee" className="text-right text-white">
                        LaProp Fee:
                      </Label>
                      <Input
                        id="laPropFee"
                        name="laPropFee"
                        type="number"
                        value={formData.laPropFee}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="laPropFee"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notaryFees" className="text-right text-white">
                        Notary Fees:
                      </Label>
                      <Input
                        id="notaryFees"
                        name="notaryFees"
                        type="number"
                        value={formData.notaryFees}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="notaryFees"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="exchangeAndTransactionFees" className="text-right text-white">
                        Exchange & Transactions Fees:
                      </Label>
                      <Input
                        id="exchangeAndTransactionFees"
                        name="exchangeAndTransactionFees"
                        type="number"
                        value={formData.exchangeAndTransactionFees}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="exchangeAndTransactionFees"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maintenanceReserve" className="text-right text-white">
                        Maintenance Reserve:
                      </Label>
                      <Input
                        id="maintenanceReserve"
                        name="maintenanceReserve"
                        type="number"
                        value={formData.maintenanceReserve}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="maintenanceReserve"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalFundsNeeded" className="text-right text-white">
                        Total Funds Needed:
                      </Label>
                      <Input
                        id="totalFundsNeeded"
                        name="totalFundsNeeded"
                        type="number"
                        value={formData.totalFundsNeeded}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="totalFundsNeeded"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="grossRentPerMonth" className="text-right text-white">
                        Gross Rent per Month:
                      </Label>
                      <Input
                        id="grossRentPerMonth"
                        name="grossRentPerMonth"
                        type="number"
                        value={formData.grossRentPerMonth}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="grossRentPerMonth"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="grossRentPerYear" className="text-right text-white">
                        Gross Rent per Year:
                      </Label>
                      <Input
                        id="grossRentPerYear"
                        name="grossRentPerYear"
                        type="number"
                        value={formData.grossRentPerYear}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="grossRentPerYear"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="monthlyCosts" className="text-right text-white">
                        Monthly Costs:
                      </Label>
                      <Input
                        id="monthlyCosts"
                        name="monthlyCosts"
                        type="number"
                        value={formData.monthlyCosts}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="monthlyCosts"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="netRentPerMonth" className="text-right text-white">
                        Net Rent per Month:
                      </Label>
                      <Input
                        id="netRentPerMonth"
                        name="netRentPerMonth"
                        type="number"
                        value={formData.netRentPerMonth}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="netRentPerMonth"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="netRentPerYear" className="text-right text-white">
                        Net Rent per Year:
                      </Label>
                      <Input
                        id="netRentPerYear"
                        name="netRentPerYear"
                        type="number"
                        value={formData.netRentPerYear}
                        onChange={handleInputChange}
                        className="col-span-3 bg-gray-700 text-white border-gray-600 
                          focus:ring-purple-500 focus:border-purple-500"
                        placeholder="netRentPerYear"
                        required
                      />
                    </div>
                  </div>
              </TabsContent>
              <TabsContent value="documentation" className="py-4">
                <div className="grid w-full max-w-sm items-center gap-4">
                  <Label htmlFor="documents">Documents</Label>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />

                  {fileList.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Selected Files ({fileList.length}):
                      </h4>
                      <ul className="space-y-2">
                        {fileList.map((file, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center bg-gray-800 text-white p-2 rounded"
                          >
                            <span className="truncate mr-2">{file.name}</span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeFile(file)}
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>


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
  );
}