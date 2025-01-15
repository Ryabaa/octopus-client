import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuButton, MenuContainer, NavbarWrapper, NavLogo, Search } from "./styles";

import logo from "@assets/Logo.png";
import vapeIcon from "@assets/vape.png";
import atomizerIcon from "@assets/atomizer.png";
import liquidIcon from "@assets/liquid.png";
import disposableIcon from "@assets/disposable.png";
import soundFile from "@assets/sound.mp3";

import { MenuItem } from "./types";

import { PiCardsLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

const menuItems: MenuItem[] = [
    { id: 1, icon: <PiCardsLight size={23} />, label: "Все товары", url: "all" },
    { id: 2, icon: <img src={liquidIcon} />, label: "Жидкости", url: "liquids" },
    { id: 3, icon: <img src={vapeIcon} />, label: "Вейпы", url: "vapes" },
    { id: 4, icon: <img src={atomizerIcon} />, label: "Расходники", url: "accessories" },
    { id: 5, icon: <img src={disposableIcon} />, label: "Одноразки", url: "disposable" },
];

const CatalogNavbar: FC = () => {
    const audio = new Audio(soundFile);
    const navigate = useNavigate();

    const [clickCount, setClickCount] = useState<number>(0);
    const [timer, setTimer] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState<number>(1);
    const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (clickCount === 10) {
            audio.play();
        }
    }, [clickCount]);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsAnimating(false);
        if (timer) {
            window.clearTimeout(timer);
        }
        setClickCount((prevCount: number) => prevCount + 1);

        const newTimer = window.setTimeout(() => {
            setIsAnimating(true);
            setClickCount(0);
        }, 600);

        setTimer(newTimer);

        window.setTimeout(() => {
            setIsAnimating(true);
        }, 0);
    };

    const handleInputOpen = () => {
        setIsInputOpen(!isInputOpen);
    };

    const handleSetQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectItem = (itemId: number, itemUrl: string) => {
        setActiveItem(itemId);
        setTimeout(() => {
            navigate(`/catalog/${itemUrl}`);
        }, 300);
    };

    return (
        <NavbarWrapper>
            <NavLogo isAnimating={isAnimating} onClick={handleClick} src={logo} alt="Logo" />
            <MenuContainer>
                {menuItems.map((item) => (
                    <MenuButton
                        key={item.id}
                        isActive={item.id === activeItem}
                        onClick={() => handleSelectItem(item.id, item.url)}>
                        <span className="icon">{item.icon}</span>
                        {item.id === activeItem && <span className="label">{item.label}</span>}
                    </MenuButton>
                ))}
            </MenuContainer>
            <Search isOpen={isInputOpen}>
                <button onClick={handleInputOpen}>
                    <CiSearch size={23} />
                </button>
                <input type="text" placeholder="Поиск товара" onChange={handleSetQuery} />
            </Search>
        </NavbarWrapper>
    );
};

export default CatalogNavbar;
