"use client"

import Slider from 'rc-slider';
import qs from "query-string"
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import 'rc-slider/assets/index.css';
import { Button } from '../ui/button';


export const FilterPrice = () => {
    const [priceRange, setPriceRange] = useState([50, 5000]);

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const onSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setPriceRange(value);
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    minPrice: value[0],
                    maxPrice: value[1],
                    sort: searchParams.get("sort"),
                    brand: searchParams.get("brand"),
                    category: searchParams.get("category"),
                    search: searchParams.get("search"),
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    const hanldeReset = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                minPrice: "",
                maxPrice: ""
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
        setPriceRange([50, 5000])
    }

    return (
        <div className="grid">
            <h3 className="font-semibold text-lg">Price Range</h3>
            <div className="grid gap-2">
                <Slider
                    range
                    min={50}
                    max={5000}
                    value={priceRange}
                    onChange={onSliderChange}
                />
                <div className='flex items-center justify-between gap-x-3'>
                    <p>
                        ৳{priceRange[0]} - ৳{priceRange[1]}
                    </p>
                    <Button variant="ghost" className='text-rose-500' onClick={hanldeReset}>Reset</Button>
                </div>
            </div>
        </div>
    )
}

