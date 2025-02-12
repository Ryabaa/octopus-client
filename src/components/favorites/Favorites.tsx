import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    CatalogContainer,
    ProductList,
    ProductItem,
    Line,
    ItemHead,
    ItemInfo,
} from "@components/catalog/styles";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { PiSmileyMeltingLight } from "react-icons/pi";

import { Loader } from "@components/loader/Loader";

import getAvailableLength from "@utils/getAvailableLength";
import { formatPrices } from "@utils/formatPrice";

import { collapseCatalogNavbar, expandCatalogNavbar } from "@components/catalog-navbar/slice";
import { Empty } from "@components/cart/styles";
import { toggleFavorite } from "./slice";

const Favorites: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state: RootState) => state.catalog);
    const favorites = useAppSelector((state: RootState) => state.favorites.favorites);

    const [isFilteredProductsFetched, setIsFilteredProductsFetched] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const filtered = products.filter((product: any) => {
            return favorites.some((productId: any) => productId === product.id);
        });

        dispatch(collapseCatalogNavbar());

        setFilteredProducts(filtered);
        setIsFilteredProductsFetched(true);

        return () => {
            dispatch(expandCatalogNavbar());
        };
    }, [products, favorites]);

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
        <CatalogContainer>
            <ProductList>
                {!isFilteredProductsFetched ? (
                    <Loader
                        size={80}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                    />
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product: any) => {
                        const prices = formatPrices(product.price);
                        const [minPrice, maxPrice] = [prices[0].value, prices[prices.length - 1].value];
                        return (
                            <ProductItem
                                key={product.id}
                                data-product-id={product.id}
                                onClick={handleNavigate}>
                                <ItemHead isFavorite={true}>
                                    <img src={product.image} alt="" />
                                    <button data-product-id={product.id} onClick={handleToggleFavorite}>
                                        <FaHeart size={19} />
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
                    <Empty>
                        <h3>В избранном пусто</h3>
                        <PiSmileyMeltingLight size={50} />
                    </Empty>
                )}
            </ProductList>
        </CatalogContainer>
    );
};

export default Favorites;
