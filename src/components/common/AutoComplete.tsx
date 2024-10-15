'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface ListItem {
    value: string
    label: string
}

interface AutoCompleteProps {
    list: ListItem[]
    value?: string
    onChange: (item: ListItem) => void
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
    list,
    value = '',
    onChange,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value)
    const [searchQuery, setSearchQuery] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const filteredList = list.filter((listItem) =>
        listItem.value.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const labelValue =
        list.find((listItem) => listItem.value === selectedValue)?.label ||
        '-- Select Option --'

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSelectItem = (item: ListItem) => {
        setIsDropdownOpen(false)
        setSelectedValue(item.value)
        onChange(item)
    }

    return (
        <div
            ref={dropdownRef}
            className='relative'
        >
            <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='border bg-white cursor-pointer flex items-center rounded-lg  mt-3 outline-none border-gray-200 border-opacity-40  h-10 w-full border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            >
                <label className='w-full truncate'>{labelValue}</label>
                <div className='ml-auto'>
                    {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>
            {isDropdownOpen && list.length > 0 && (
                <div
                    className={`absolute ${
                        filteredList.length >= 8 ? 'h-96' : 'h-auto'
                    } overflow-auto border z-40 border-black border-opacity-10 p-2 mt-2 rounded-xl left-0 w-full bg-white shadow-md`}
                >
                    {(searchQuery || filteredList.length > 3) && (
                        <input
                            type='text'
                            placeholder='Search...'
                            className='w-full p-2 text-sm mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary'
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    )}
                    {filteredList.map((listItem) => (
                        <div
                            key={listItem.value}
                            role='button'
                            onClick={() => handleSelectItem(listItem)}
                            className='p-2 select-none text-sm rounded-lg hover:bg-primary hover:text-white'
                        >
                            {listItem.value}
                        </div>
                    ))}
                </div>
            )}
            <input
                type='text'
                value={selectedValue}
                readOnly
                className='absolute opacity-0 pointer-events-none'
            />
        </div>
    )
}

export default AutoComplete
