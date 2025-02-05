import { ChangeEvent, FC, FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import {
    IndicatorContainer,
    IndicatorDot,
    MenuButton,
    MenuContainer,
    MenuToggler,
    NavbarWrapper,
    NavLogo,
    Search,
} from "./styles";

import soundFile from "@assets/sound.mp3";

import LogoIcon from "@assets/logo2.svg?react";
import AllAssortimentIcon from "@assets/all-assort.svg?react";
import AccessoriesIcon from "@assets/accessories.svg?react";
import LiquidIcon from "@assets/liquid.svg?react";
import VapeIcon from "@assets/vape.svg?react";
import DisposableIcon from "@assets/disposable.svg?react";
import SnusIcon from "@assets/snus.svg?react";

import { CiSearch } from "react-icons/ci";

import { MenuItem } from "./types";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { setCategory, setSearchQuery } from "@components/catalog/slice";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

const menuItems: MenuItem[] = [
    { id: 1, icon: <AllAssortimentIcon />, label: "все товары", category: "all" },
    { id: 2, icon: <LiquidIcon />, label: "жидкости", category: "liquids" },
    { id: 3, icon: <VapeIcon />, label: "вейпы", category: "vapes" },
    { id: 4, icon: <AccessoriesIcon />, label: "расходники", category: "accessories" },
    { id: 5, icon: <DisposableIcon />, label: "одноразки", category: "disposable" },
    { id: 6, icon: <SnusIcon />, label: "снюсы", category: "snus" },
];

const CatalogNavbar: FC = () => {
    const audio = new Audio(soundFile);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isNavbarExpanded = useAppSelector((state: RootState) => state.catalogNavbar.isExpanded);
    const { category } = useAppSelector((state: RootState) => state.catalog);

    const [clickCount, setClickCount] = useState<number>(0);
    const [timer, setTimer] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState<number>(1);
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);

    useEffect(() => {
        if (clickCount === 10) {
            audio.play();
        }
    }, [clickCount]);

    const handleClick = (event: MouseEvent) => {
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

    const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    }, 300);

    const handleSelectItem = (itemId: number, itemUrl: string) => {
        setActiveItem(itemId);
        setIsMenuExpanded(false);
        dispatch(setCategory(itemUrl));
        setTimeout(() => {
            navigate(`/catalog/${itemUrl}`);
        }, 200);
    };

    useEffect(() => {
        const selectedItem = menuItems.find((item) => item.category === category);
        setActiveItem(selectedItem!.id);
    }, [category]);

    const handleToggle = () => setIsMenuExpanded((prev) => !prev);

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsMenuExpanded(false);
        }
    };

    return (
        <NavbarWrapper tabIndex={0} onBlur={handleBlur} ref={containerRef}>
            <MenuToggler isVisible={!isMenuExpanded} onClick={handleToggle}>
                <BsFillGrid1X2Fill size={23} />
            </MenuToggler>
            <MenuContainer isExpanded={isMenuExpanded}>
                {menuItems.map((item) => (
                    <MenuButton
                        key={item.id}
                        isActive={item.id === activeItem}
                        onClick={() => handleSelectItem(item.id, item.category)}>
                        <span className="icon">{item.icon}</span>
                    </MenuButton>
                ))}
                <MenuButton isActive={true} onClick={handleToggle}>
                    <IoIosArrowBack size={20} />
                </MenuButton>
            </MenuContainer>
            {isNavbarExpanded && (
                <Search isVisible={!isMenuExpanded}>
                    <CiSearch size={23} />
                    <input type="text" placeholder="поиск: жидкости" onChange={handleSearch} />
                </Search>
            )}
            <NavLogo isVisible={!isMenuExpanded} isAnimating={isAnimating} onClick={handleClick}>
                <LogoIcon />
            </NavLogo>
            {isNavbarExpanded && (
                <IndicatorContainer>
                    {menuItems.map((item) => (
                        <IndicatorDot key={item.id} isActive={item.id === activeItem} />
                    ))}
                </IndicatorContainer>
            )}
        </NavbarWrapper>
    );
};

export default CatalogNavbar;
