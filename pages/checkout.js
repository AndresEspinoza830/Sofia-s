import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { crearOrder } from '../utils/wooCommerceApi'
import Router from 'next/router';

const checkout = ({ carrito, eliminarProducto, order }) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const calculoTotal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.price), 0)
        setTotal(calculoTotal);
    }, [carrito])

    console.log()

    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors.nombre)
    // console.log(order)

    const router = useRouter()
    console.log(router)

    const onSubmit = (data) => {
        console.log(router.query = data)
    }

    return (
        <>
            <Navbar carrito={carrito} eliminarProducto={eliminarProducto} />
            <div className='w-full mx-auto max-w-[1360px] py-10 flex'>
                <div className='w-1/2'>
                    <h2 className=' text-2xl block'>Checkout</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        action=""
                        className='border-2 space-y-4 px-3 py-2'>
                        <div className='w-full flex space-x-6'>
                            <div>
                                <label>Nombre</label>
                                <input type="text" className='block bg-[#f2f2f2] p-2' placeholder='Nombre' {...register('nombre', {
                                    required: true,
                                    maxLength: 16,
                                })} />
                                {errors.nombre?.type === 'required' && <p className='text-red-600 font-medium'>El nombre es obligatorio</p>}

                            </div>
                            <div>
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" className='block bg-[#f2f2f2] p-2' id='apellido' placeholder='Apellido' {...register('apellido', {
                                    required: true,
                                    maxLength: 20
                                })} />
                                {errors.apellido?.type === 'required' && <p className='text-red-600 font-medium'>El apellido es obligatorio</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email">Correo</label>
                            <input type="email" className='block w-full bg-[#f2f2f2] p-2' id='email' placeholder='Email' {...register('email', {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                            })} />
                            {errors.correo?.type === 'pattern' && <p className='text-red-600 font-medium'>El correo no es valido</p>}
                        </div>
                        <div>
                            <label htmlFor="telefono">Telefono</label>
                            <input type="text" className='block w-full bg-[#f2f2f2] p-2' id='telefono' placeholder='Telefono' {...register('telefono', {
                                required: true
                            })} />
                            {errors.correo?.type === 'pattern' && <p className='text-red-600 font-medium'>El telefono no es valido</p>}
                        </div>
                        <div>
                            <label htmlFor="direccion">Direccion</label>
                            <input type="text" className='block w-full bg-[#f2f2f2] p-2' id='direccion' placeholder='Direccion' {...register('direccion', {
                                required: true
                            })} />
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <label htmlFor="city">City</label>
                                <input type="text" className='block w-full bg-[#f2f2f2] p-2' id='city' placeholder='City' {...register('city', {
                                    required: true
                                })} />
                            </div>
                            <div>
                                <label htmlFor="state">State</label>
                                <input type="text" className='block w-full bg-[#f2f2f2] p-2' id='state' placeholder='State' {...register('state', {
                                    required: true
                                })} />
                            </div>
                            <div>
                                <label htmlFor="postcode">PostCode / ZIP</label>
                                <input type="text" className='block w-full bg-[#f2f2f2] p-2' id='postcode' placeholder='Code' {...register('postcode', {
                                    required: true
                                })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="informacion">Additional information</label>
                            <textarea type="text" className='block w-full bg-[#f2f2f2] p-2' id='informacion' placeholder='Maximo 30 caracteres' {...register('mensaje', {
                                required: false,
                                maxLength: 30
                            })} />
                            {errors.mensaje?.type === 'maxLength' && <p className='text-red-600 font-medium'>Limite sobrepasado</p>}
                        </div>
                        <input type="submit" className='bg-black text-white font-bold w-full p-2 cursor-pointer' value="Place Order" />
                    </form>
                </div>
                <div className='w-1/2 ml-7'>
                    <h2>Your order</h2>
                    <div className='w-1/4 border-[1px] px-4 py-4 rounded-md'>
                        <h2 className='text-md mb-4'>RESUMEN DEL PEDIDO</h2>
                        <p className=' font-bold py-1'>Subtotal: ${total}</p>
                        <p className=' font-bold py-1'>Descuento: -0.00</p>
                        <p className='mb-4 font-bold border-y-[1px] py-4'>Total a pagar: ${total}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default checkout

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export async function getServerSideProps(data) {

    console.log(data)
    const info = {
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US",
            email: "andrespinoza@gmail.com",
            phone: "989123821"
        },
        shipping: {
            first_name: "Andres",
            last_name: "Espinoza",
            address_1: "969 Market",
            address_2: "",
            city: "Lima",
            state: "CA",
            postcode: "94103",
            country: "US"
        },
        line_items: [
            {
                product_id: 93,
                quantity: 2
            },
            {
                product_id: 22,
                variation_id: 23,
                quantity: 1
            }
        ],
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "10.00"
            }
        ]
    };

    const order = await crearOrder(info).catch((error) =>
        console.error(error)
    );

    return {
        props: {
            order: order.data,
            // productos: productosWoo.data
        },
        // regenerate page with new data fetch after 60 seconds
    };
}