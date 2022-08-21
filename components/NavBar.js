import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'

const navigation = [
    {name: 'Sell your music', href: '/upload-music', current: false},
    {name: 'Pricing', href: '/pricing', current: false},
    {name: 'About Miuu', href: '/about', current: false},
    {name: 'Profile', href: '/public-profile', current: false},
    {name: 'Login', href: '/login', current: false},
    {name: 'Sign Up', href: '/signup', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    return (
        <Disclosure as="nav" className="bg-gray-100 fixed z-50 w-full top-0">
            {({open}) => (
                <div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <a href="/">
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src="http://localhost:3000/logos/MIUU-20220730-LOGO-OK.svg"
                                            alt="Workflow"
                                        />
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src="http://localhost:3000/logos/MIUU-20220730-LOGO-OK.svg"
                                            alt="Workflow"
                                        />
                                    </a>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-gray-800' : 'text-black hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )
}