import { FC, useEffect, useState } from "react";
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

import { FaRegHeart } from "react-icons/fa6";

const categories = ["all", "liquids", "vapes", "accessories", "disposable", "snus"];

const Catalog: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { category, searchQuery, products, filteredProducts } = useAppSelector(
        (state: RootState) => state.catalog
    );

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

    return (
        <CatalogContainer {...handlers}>
            <TransitionGroup>
                {!isAnimating && (
                    <FadeTransition key={category} timeout={300} direction={swipeDirection} classNames="fade">
                        <ProductList>
                            {isFiltered &&
                                filteredProducts.map((product: any) => (
                                    <ProductItem
                                        key={product.id}
                                        onClick={() => navigate(`/catalog/item/${product.id}`)}>
                                        <ItemHead>
                                            <img src={product.image} alt="" />
                                            <FaRegHeart size={19} />
                                        </ItemHead>
                                        <h3>{product.name}</h3>
                                        <ItemInfo>
                                            <h2>
                                                Вкусов в наличии: <span>15</span>
                                            </h2>
                                            <p>
                                                От <span>7.6</span> до <span>9.4 BYN</span>
                                            </p>
                                        </ItemInfo>
                                        <Line />
                                    </ProductItem>
                                ))}
                        </ProductList>
                    </FadeTransition>
                )}
            </TransitionGroup>
        </CatalogContainer>
    );
};

export default Catalog;
