import { Autocomplete } from '@react-google-maps/api'
import axios from 'axios'
import { FC, useEffect, useRef } from 'react'

interface LocationProps {
    value: string
    onChange: (newLocation: string) => void
    hide?: boolean
}
const LocationField: FC<LocationProps> = ({ value, onChange, hide }) => {
    const autocompleteRef = useRef<any>(null)
    // const [inputValue, setInputValue] = useState<string>('')

    // useEffect(() => {
    //     setInputValue(value)
    // }, [value])

    const fetchPlaceDetails = async (lat: number, lng: number) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
            )

            const data = response.data
            if (data?.results && data?.results?.length > 0) {
                const formattedAddress = data.results[0].formatted_address
                onChange(formattedAddress)
                // Handle the fetched address data as needed
            }
        } catch (error) {
            throw error
        }
    }

    const handlePlaceSelect = (place: any) => {
        console.log('place: ', place)
        const lat = place?.geometry?.location?.lat()
        const lng = place?.geometry?.location?.lng()
        fetchPlaceDetails(lat, lng)
    }

    useEffect(() => {
        const autocomplete = autocompleteRef.current
        if (autocomplete) {
            autocomplete.setFields([
                'address_components',
                'geometry',
                'icon',
                'name',
            ])
        }
    }, [])

    return (
        <Autocomplete
            className={hide ? 'hidden' : ''}
            onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete
            }}
            onPlaceChanged={() => {
                const place = autocompleteRef.current.getPlace()
                handlePlaceSelect(place)
            }}
        >
            <input
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='pl-6 px-2 w-full py-[10px] border border-gray-200 rounded-lg outline:none font-light text-md'
                placeholder='Search for a place'
            />
        </Autocomplete>
    )
}

export default LocationField
