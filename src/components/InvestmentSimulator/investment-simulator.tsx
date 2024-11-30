"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"

export function InvestmentSimulator() {
  const [fractions, setFractions] = useState(1)
  const [appreciation, setAppreciation] = useState(4.29)
  const [cashRent, setCashRent] = useState(4.43)
  useEffect(() =>{

  },[fractions,appreciation,cashRent])
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Investment simulator</h2>
      
      {/* Projections Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]"></TableHead>
            <TableHead className="text-right">Year 1</TableHead>
            <TableHead className="text-right">Year 3</TableHead>
            <TableHead className="text-right">Year 5</TableHead>
            <TableHead className="text-right">Year 10</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Cumulative Rent</TableCell>
            <TableCell className="text-right">COP {0.04 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.13 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.22 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.44 + fractions + appreciation + cashRent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cumulative Appreciation</TableCell>
            <TableCell className="text-right">COP {0.04 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.13 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.21 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {0.43 + fractions + appreciation + cashRent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Your Investment</TableCell>
            <TableCell className="text-right">COP {1.00 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.00 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.00 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.00 + fractions + appreciation + cashRent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Your Total Investment Value</TableCell>
            <TableCell className="text-right">COP {1.09 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.26 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.44 + fractions + appreciation + cashRent}</TableCell>
            <TableCell className="text-right">COP {1.87 + fractions + appreciation + cashRent}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Sliders Section */}
      <div className="space-y-6 border rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Fractions</span>
            <span className="text-sm">{fractions} / COP 1.00</span>
          </div>
          <Slider
            defaultValue={[1]}
            max={515}
            step={1}
            value={[fractions]}
            onValueChange={([value]) => setFractions(value)}
            className="w-full bg-white"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>515M</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Appreciation</span>
            <span className="text-sm">{appreciation.toFixed(2)}%</span>
          </div>
          <Slider
            defaultValue={[4.29]}
            max={100}
            step={0.01}
            value={[appreciation]}
            className="w-full bg-white"
            onValueChange={([value]) => setAppreciation(value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Cash (Rent)</span>
            <span className="text-sm">{cashRent.toFixed(2)}%</span>
          </div>
          <Slider
            defaultValue={[4.43]}
            max={100}
            step={0.01}
            value={[cashRent]}
            onValueChange={([value]) => setCashRent(value)}
            className="w-full bg-white"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  )
}