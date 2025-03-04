import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { useSwipeable } from "react-swipeable";

import {
    CatalogContainer,
    ProductList,
    ProductItem,
    FadeTransition,
    Line,
    ItemHead,
    ItemInfo,
} from "./styles";

import { setCategory } from "./slice";
import { filterProducts } from "./slice";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { Loader } from "@components/loader/Loader";

import getAvailableLength from "@utils/getAvailableLength";

import { toggleFavorite } from "@components/favorites/slice";

const categories = ["all", "liquids", "vapes", "accessories", "disposable", "snus"];

const Catalog: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { category, searchQuery, products, filteredProducts } = useAppSelector(
        (state: RootState) => state.catalog
    );
    const favorites = useAppSelector((state: RootState) => state.favorites.favorites);

    const [isFiltered, setIsFiltered] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        dispatch(filterProducts(products));
        setIsFiltered(true);
    }, [category, searchQuery, products]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            const currentIndex = categories.indexOf(category || "all");
            if (currentIndex < categories.length - 1) {
                const nextCategory = categories[currentIndex + 1];
                setSwipeDirection("left");
                setTimeout(() => {
                    setIsAnimating(true);
                }, 50);
                setTimeout(() => {
                    dispatch(setCategory(nextCategory));
                    navigate(`/catalog/${nextCategory}`);
                    setIsAnimating(false);
                }, 250);
            }
        },
        onSwipedRight: () => {
            const currentIndex = categories.indexOf(category || "all");
            if (currentIndex > 0) {
                const nextCategory = categories[currentIndex - 1];
                setSwipeDirection("right");
                setTimeout(() => {
                    setIsAnimating(true);
                }, 50);
                setTimeout(() => {
                    dispatch(setCategory(nextCategory));
                    navigate(`/catalog/${nextCategory}`);
                    setIsAnimating(false);
                }, 250);
            }
        },
        trackMouse: true,
    });

    const handleNavigate = (event: MouseEvent<HTMLDivElement>) => {
        const productId = event.currentTarget.dataset.productId;
        navigate(`/catalog/item/${productId}`);
    };

    const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const productId = Number(event.currentTarget.dataset.productId);

        dispatch(toggleFavorite(productId));
    };

    return (
        <CatalogContainer {...handlers}>
            <TransitionGroup>
                {!isAnimating && (
                    <FadeTransition key={category} timeout={300} direction={swipeDirection} classNames="fade">
                        <ProductList>
                            {isFiltered ? (
                                filteredProducts.map((product: any) => {
                                    const [minPrice, maxPrice] = [
                                        product.price[0].cost,
                                        product.price[product.price.length - 1].cost,
                                    ];
                                    const isFavorite = favorites.includes(product.id);
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            data-product-id={product.id}
                                            onClick={handleNavigate}>
                                            <ItemHead isFavorite={isFavorite}>
                                                <img src={product.image} alt="" />
                                                <button
                                                    data-product-id={product.id}
                                                    onClick={handleToggleFavorite}>
                                                    {isFavorite ? (
                                                        <FaHeart size={19} />
                                                    ) : (
                                                        <FaRegHeart size={19} />
                                                    )}
                                                </button>
                                            </ItemHead>
                                            <h3>{product.name}</h3>
                                            <ItemInfo>
                                                <h2>
                                                    Видов в наличии:
                                                    <span> {getAvailableLength(product.items)}</span>
                                                </h2>
                                                <p>
                                                    От <span>{minPrice} BYN</span> до
                                                    <span> {maxPrice} BYN</span>
                                                </p>
                                            </ItemInfo>
                                            <Line />
                                        </ProductItem>
                                    );
                                })
                            ) : (
                                <Loader
                                    size={80}
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                />
                            )}
                        </ProductList>
                    </FadeTransition>
                )}
            </TransitionGroup>
        </CatalogContainer>
    );
};

export default Catalog;
