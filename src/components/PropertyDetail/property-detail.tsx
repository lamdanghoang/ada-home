import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { FileText } from 'lucide-react'
import { InvestmentSimulator } from "@/components/InvestmentSimulator/investment-simulator"
import { TokenInteractions } from '@/utils/contract';
import { useEffect, useState } from "react";
import { TokenParticipationModal } from './TokenCreate';

export default function PropertyDetails() {
  const token = 'COP';
  const [account, setAccount] = useState('');
  const propertyID = 1234;

  useEffect(() => {
    let wallet = sessionStorage.getItem('address') as string;
    console.log(wallet);
    setAccount(wallet);
  }, [])
  // Buy tokens handler
  const handleBuyTokens = async () => {
    try {
      const txReceipt = await TokenInteractions.transfer(
        account,
        '0x5cd31958780C1fD6C2325aB7CD75112cDbae10E6',
        '1000000'
      );

      console.log(txReceipt);

      // Update balance after buying
      // const newBalance = await TokenInteractions.getBalance(account);
      // console.log('New balance:', newBalance);

      //alert('Tokens purchased successfully!');
    }
    catch (error) {
      console.error('Token purchase failed:', error);
    }
  };

  const handleSellTokens = async () => {
    try {
      const txReceipt = await TokenInteractions.transfer(
        account,
        '0x5cd31958780C1fD6C2325aB7CD75112cDbae10E6',
        '1000000'
      );

      console.log(txReceipt);

      // Update balance after buying
      // const newBalance = await TokenInteractions.getBalance(account);
      // console.log('New balance:', newBalance);

      //alert('Tokens purchased successfully!');
    }
    catch (error) {
      console.error('Token purchase failed:', error);
    }
  };

  const handleTokenParticipation = async (details: {
    id: number, 
    tokenName: string, 
    tokenSymbol: string, 
    totalSupply: string
  }) => {
    try {
      // Here you would typically interact with a smart contract 
      // or backend to create or register the token
      //console.log('Token Details Submitted:', details);
      
      // Example: Call a method to create token
      // await TokenInteractions.createToken(details);

      //alert('Token details submitted successfully!');
    } catch (error) {
      //console.error('Token submission failed:', error);
      //alert('Failed to submit token details');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Banner Image */}
      <div className="relative w-full h-[280px] mb-6">
        <Image
          src="/real1.png"
          alt="Hashtag98 Hotel"
          fill
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-transparent rounded-lg">
          <div className="h-full flex flex-col justify-center p-8">
            <h1 className="text-5xl font-serif text-white mb-2" style={{ fontFamily: 'serif' }}>
              Hashtag
              <br />
              98
            </h1>
            <p className="text-white text-xl tracking-wider">HOTEL</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="space-y-2 mb-8">
              <h1 className="text-4xl font-serif italic">Hashtag98-1(M)</h1>
              <div className="flex items-center gap-2 text-sm">
                <span>Cra. 41 # 10 - 23</span>
                <span>•</span>
                <span className="text-blue-600">Poblado, Medellin</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="financials"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Financials
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="simulator"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Investment Simulator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-8">
                {/* Details Content */}
                <section className="space-y-6">
                  <div className="prose max-w-none">
                    <p>
                      Discover an unparalleled investment opportunity in the dynamic heart of Medellin with the innovative property Hashtag98!
                    </p>
                    <p>
                      Are you looking for an investment that breaks with traditional schemes? Hashtag98 is the answer! This exceptional property offers an M-type room, with approximately 20m2 of well-utilized space and equipped with all the necessary amenities to attract high-discerning guests. From air conditioning to a well-appointed bathroom, every detail has been carefully designed to ensure customer satisfaction and, therefore, the return on your investment.
                    </p>
                    <p>
                      But what truly distinguishes Hashtag98 is its privileged location in the coveted Zona Rosa of Medellin. With a constant demand from travelers seeking an authentic experience, this property promises a steady flow of income thanks to its proximity to a wide range of gastronomic, commercial, and entertainment options.
                    </p>
                  </div>

                  {/* Project Availability */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Project Availability</h2>
                      <div className="space-y-2">
                        <p>The project will only be available until <span className="font-semibold">8/07/2024</span>.</p>

                        If this project does not reach breakeven before this date, the project will be considered{" "}
                        <Badge variant="destructive">unmet goal</Badge>
                        {" "}and will proceed with its cancellation. After cancellation, actions will be taken as the contract stipulates in such cases.

                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Structure */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Project structure</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Project type:</h3>
                        <p>
                          The project is developed through a joint venture contract. For more information on how this model works, you can learn from our{" "}
                          <a href="#" className="text-blue-600 hover:underline">FAQ</a>
                          {" "}or from the property's FAQ.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Traveler's Fund:</h3>
                        <p>
                          This project participates in the "Traveler's Fund" program. This means that LaProp puts part of its commission into a smart fund, which can be used by investors each expired year for exclusive discounts when using any type of service in this property.
                        </p>
                        <p className="mt-2">
                          In the case of this property, the traveler's fund is <span className="font-semibold">10%</span> of the commission obtained in rents by LaProp. This commission can be changed each year and must be announced at least 1 month in advance before the change is implemented.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="financials">
                <div className="space-y-8">
                  {/* Investment Section */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Investment</h2>
                    <Table>
                      <TableBody>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Cost of property</TableCell>
                          <TableCell className="text-right">{token} 490,000,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">LaProp fee</TableCell>
                          <TableCell className="text-right">{token} 14,700,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Notary fees</TableCell>
                          <TableCell className="text-right">{token} 9,200,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Exchange & transactions fees</TableCell>
                          <TableCell className="text-right">{token} 1,049,400.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Maintanance reserve</TableCell>
                          <TableCell className="text-right">{token} 0.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50 font-semibold">
                          <TableCell>Total funds needed</TableCell>
                          <TableCell className="text-right">{token} 514,500,000.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Cash Payout Section */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Cash Payout</h2>
                    <Table>
                      <TableBody>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Gross rent per month</TableCell>
                          <TableCell className="text-right">{token} 2,200,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Gross rent per year</TableCell>
                          <TableCell className="text-right">{token} 26,400,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Monthly costs</TableCell>
                          <TableCell className="text-right">{token} 220,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Net rent per month</TableCell>
                          <TableCell className="text-right">{token} 1,900,800.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Net rent per year</TableCell>
                          <TableCell className="text-right">{token} 22,809,600.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Monthly Costs Breakdown Section */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Monthly Costs Breakdown</h2>
                    <Table>
                      <TableBody>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Insurance</TableCell>
                          <TableCell className="text-right">{token} 0.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">LaProp rent commission</TableCell>
                          <TableCell className="text-right">{token} 220,000.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Property taxes</TableCell>
                          <TableCell className="text-right">{token} 0.00</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="font-medium">Property management</TableCell>
                          <TableCell className="text-right">{token} 0.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Documentos</h2>
                  <div className="space-y-4">
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <FileText className="h-5 w-5" />
                      My first document
                    </a>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <FileText className="h-5 w-5" />
                      My second document
                    </a>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="simulator">
                <InvestmentSimulator />
              </TabsContent>
            </Tabs>
          </div>

          {/* Investment Form */}
          <div className="lg:w-[400px] text-white">
            <div className="sticky top-4 space-y-6 bg-gray-800 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Starting from</span>
                  <span className="font-semibold">1{token}</span>
                </div>
                <Progress value={33} className="h-2 bg-[#E5F4D4]" />
                <div className="text-xs text-right">
                  <span>0.00%</span>
                  <span className="float-right">$15M fractions</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Projected Annual Return</span>
                  <span className="font-semibold text-lg">8.72%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Projected Rental Yield</span>
                  <span className="font-semibold text-lg">4.43%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="fractions" className="text-sm text-muted-foreground">
                    fractions quantity
                  </label>
                  <Input
                    type="number"
                    id="fractions"
                    min="1"
                    defaultValue="1"
                    className="bg-black text-white h-12"
                  />
                </div>
                <TokenParticipationModal
                  onSubmit={handleTokenParticipation}
                  token={propertyID}
                />

                <div className="flex space-x-2">
                  <Button className="w-full bg-black text-white h-12 hover:bg-black/90" onClick={()=>handleBuyTokens()}>
                    BUY
                  </Button>
                  <Button className="w-full bg-black text-white h-12 hover:bg-black/90" onClick={()=>handleSellTokens()}>
                    SELL
                  </Button>
                </div>

                <Button className="w-full bg-black text-white h-12 hover:bg-black/90">
                  CLAIM
                </Button>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span>Total({token})</span>
                <span className="font-semibold">$1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}