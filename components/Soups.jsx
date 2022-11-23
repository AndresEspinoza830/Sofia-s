
import Link from 'next/link'
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';

const Soups = () => {

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
                    if (dish.Categories == "Appetizers") {
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


    // console.log(smoothies);



    return (
        <>
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {fetchError && (<p>{fetchError}</p>)}
                    {smoothies && (

                        <>
                            {smoothies.map(smoothie => (
                                // if(smoothie.category== "Fish"){


                                <div className="my-1 px-1 md:w-1/2 lg:px-2 lg:w-1/3" key={smoothie.ID} >
                                    <div className="flex flex-row">


                                        <div className="flex justify-center">
                                            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                                <a href="#!">
                                                    <img className="rounded-t-lg" src={smoothie.Images} alt="Dish" />
                                                </a>
                                                <div className="p-6">
                                                    <span className="text-gray-400 mr-3 uppercase text-xs">{smoothie.Categories}</span>
                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{smoothie.Name}</h5>
                                                    <p className="text-gray-700 text-base mb-4">
                                                        {smoothie.description}
                                                    </p>

                                                    <p className="text-lg font-semibold text-black cursor-auto my-3">${smoothie.Regular_price}</p>
                                                    <Link href={`/component/${smoothie.Name}`}>
                                                        Link
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </>)}
                </div>
            </div>

        </>




    )
}
export default Soups