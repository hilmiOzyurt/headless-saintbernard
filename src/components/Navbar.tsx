/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            MyHeadlessStore
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600">
                            <UserCircleIcon className="h-6 w-6 mr-1" />
                            <span className="hidden sm:block">My Account</span>
                        </Link>
                        <Link href="/cart" className="flex items-center text-gray-600 hover:text-indigo-600 relative">
                            <ShoppingBagIcon className="h-6 w-6 mr-1" />
                            <span className="hidden sm:block">My Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;