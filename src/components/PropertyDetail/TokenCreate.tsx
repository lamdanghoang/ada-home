import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TokenInteractions } from '@/utils/contract';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react"

export function TokenParticipationModal({ 
  onSubmit, 
  token 
}: { 
  onSubmit: (details: { id: number, tokenName: string, tokenSymbol: string, totalSupply: string }) => void, 
  token: number 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tokenDetails, setTokenDetails] = useState({
    id: token,
    tokenName: '',
    tokenSymbol: '',
    totalSupply: ''
  })

  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let wallet = sessionStorage.getItem('address') as string;
    console.log(wallet);
    setAccount(wallet);
  }, [])

  const handleSubmit = async() => {
    // Validate inputs before submitting
    if (tokenDetails.id && tokenDetails.tokenName && tokenDetails.tokenSymbol && tokenDetails.totalSupply) {
      setIsLoading(true);
      try {
        // Ensure account is defined and is a valid address
        if (!account) {
          toast({
            title: "Error",
            description: "No account connected",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
      
        const txReceipt = await TokenInteractions.tokenizeRealEstate(
          account,
          tokenDetails.id,
          tokenDetails.tokenName,
          tokenDetails.tokenSymbol,
          tokenDetails.totalSupply
        );
        console.log('Transaction receipt:', txReceipt);

        // Call onSubmit if needed
        onSubmit(tokenDetails);

        toast({
          title: "Success",
          description: "Token details submitted successfully",
        });

        setIsOpen(false);
      } catch (error:any) {
        console.log(error);
        toast({
          title: "Error creating",
          description: error.message || "An error occurred",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTokenDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-black text-white h-12 hover:bg-black/90"
          onClick={() => setIsOpen(true)}
        >
          PARTICIPATE →
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Token Participation Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tokenName" className="text-right">
              Token Name
            </Label>
            <Input
              id="tokenName"
              name="tokenName"
              placeholder="Enter Token Name"
              className="col-span-3"
              value={tokenDetails.tokenName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tokenSymbol" className="text-right">
              Token Symbol
            </Label>
            <Input
              id="tokenSymbol"
              name="tokenSymbol"
              placeholder="Enter Token Symbol"
              className="col-span-3"
              value={tokenDetails.tokenSymbol}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalSupply" className="text-right">
              Total Supply
            </Label>
            <Input
              id="totalSupply"
              name="totalSupply"
              type="number"
              placeholder="Enter Total Supply"
              className="col-span-3"
              value={tokenDetails.totalSupply}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Token Details"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}