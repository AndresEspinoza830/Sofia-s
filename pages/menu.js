import Link from 'next/link'
import Layout from '../components/Layout';

const menu = () => {
    return (
        <Layout>
            <nav className='flex space-x-4 py-2'>
                <Link href='/soups'>
                    Soups
                </Link>
                <Link href='/appetizers'>
                    Appetizers
                </Link>
                <Link href='/fish'>
                    Fish & Seafood
                </Link>
            </nav>
        </Layout>
    )
}

export default menu