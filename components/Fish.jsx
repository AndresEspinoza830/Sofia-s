import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';

const Fish = () => {

    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from('productos')
                .select()
            if (error) {
                setFetchError('Could not fetch the smoothies')
                setSmoothies(null)
                console.log("error:".error)
            }
            if (data) {
                let temporal = data.filter(dish => {
                    if (dish.Categories == "Fish") {
                        return dish;
                    }

                })
                setSmoothies(temporal)
                // console.log(data)
                console.log("error2:".error)
            }
        }

        fetchSmoothies()

    }, [])

    return (
        <div className='w-full'>
            {smoothies.map(smoothie => (
                <div className='w-1/3' key={smoothie.ID}>
                    <Image
                    />
                </div>
            ))}
        </div>




    )
}
export default Fish