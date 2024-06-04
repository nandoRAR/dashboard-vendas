import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthEmailContext } from "../../../contexts/authEmail";

const NavBar = () => {
    const { logout } = useContext(AuthEmailContext);
    const location = useLocation();
    const { pathname } = location;
    const handleLogout = async () => {
        await logout();
    };
    if (pathname === "/login") return <></>;
    return (
        <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
                <div className="h-20 w-20 self-center">
                    <img
                        className="h-20 w-20 self-center"
                        src="/image/logoR.png"
                        alt="logo"
                    />
                </div>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Sair
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:ring-gray-600 focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
                        <li>
                            <Link
                                to="/"
                                className={`block py-2 px-3 md:p-0 rounded 
                ${
                    pathname === "/"
                        ? "text-white bg-blue-700  md:bg-transparent md:text-blue-500"
                        : "text-white  hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 hover:text-white border-gray-700"
                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/addCliente"
                                className={`block py-2 px-3 md:p-0 rounded 
                ${
                    pathname === "/addCliente"
                        ? "text-white bg-blue-700  md:bg-transparent md:text-blue-500"
                        : "text-white  hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 hover:text-white border-gray-700"
                }`}
                            >
                                Adicionar Cliente
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/graficos"
                                className={`block py-2 px-3 md:p-0 rounded 
                ${
                    pathname === "/graficos"
                        ? "text-white bg-blue-700  md:bg-transparent md:text-blue-500"
                        : "text-white  hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 hover:text-white border-gray-700"
                }`}
                            >
                                Gráficos
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
