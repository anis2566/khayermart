"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SIZES } from '@/constant';
import { Checkbox } from '@/components/ui/checkbox';

export const ProductStock = () => {
    // State to keep track of the stock variants
    const [stockVariants, setStockVariants] = useState([{ id: 1, size: 's', stock: '', custom: false }]);
    const [custom, setCustom] = useState<Boolean>(false)

    // Function to add a new stock variant
    const addStockVariant = () => {
        const newVariant = { id: stockVariants.length + 1, size: 's', stock: '', custom: false };
        setStockVariants([...stockVariants, newVariant]);
    };

    // Function to update the stock value of a variant
    const updateStockValue = (id:number, value:string) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, stock: value };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

        const updateSizeValue = (id:number, size:string) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, size: size };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

    const handleCustomChange = (id: number, checked: boolean) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, custom: checked };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

    console.log(stockVariants)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>Provide stock variants</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>Size</TableHead>
                            <TableHead className='text-center'>Custom</TableHead>
                            <TableHead>Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stockVariants.map((variant) => (
                            <TableRow key={variant.id} className='p-0'>
                                    <TableCell>
                                    {variant.custom ? (
                                        <Input
                                            type="text"
                                            onChange={(e) => updateSizeValue(variant.id, e.target.value)}
                                        />
                                    ) : (
                                        <ToggleGroup
                                            type="single"
                                            defaultValue={variant.size}
                                            variant="outline"
                                            
                                        >
                                            {SIZES.map(size => (
                                                <ToggleGroupItem value={size.value} key={size.value} onClick={() => updateSizeValue(variant.id, size.value)}>{size.label}</ToggleGroupItem>
                                            )) }
                                        </ToggleGroup>
                                        )}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <Checkbox onCheckedChange={(checked) => handleCustomChange(variant.id, checked === true)} checked={variant.custom} />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={variant.stock}
                                            onChange={(e) => updateStockValue(variant.id, e.target.value)}
                                        />
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
                <Button onClick={addStockVariant} size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                </Button>
            </CardFooter>
        </Card>
    )
}