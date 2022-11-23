import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='max-w-[1360px] w-full mx-auto xl:px-12 '>
                {children}
            </main>
            <Footer />
        </>

    )
}

export default Layout