import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo/lewa część */}
            <div className="navbar-logo">Moje Logo</div>

            {/* Przycisk hamburgera */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="navbar-toggle"
                aria-label="Toggle menu"
            >
                ☰
            </button>

            {/* Menu, które pokazuje się/ukrywa w zależności od stanu isOpen */}
            {isOpen && (
                <ul className="navbar-menu">
                    <li>
                        <a href="#sekcja1">Sekcja 1</a>
                    </li>
                    <li>
                        <a href="#sekcja2">Sekcja 2</a>
                    </li>
                    <li>
                        <a href="#sekcja3">Sekcja 3</a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;