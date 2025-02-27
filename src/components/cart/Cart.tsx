import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CatalogContainer, ItemHead, ItemInfo, ProductItem, ProductList } from "@components/catalog/styles";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { PiSmileyMeltingLight } from "react-icons/pi";

import { collapseCatalogNavbar, expandCatalogNavbar } from "@components/catalog-navbar/slice";
import { resetProductItems, setCartClosed, setCartOpened, updateProductCount } from "./slice";

import { DeleteButton, Empty } from "./styles";

import { Loader } from "@components/loader/Loader";
import { toggleFavorite } from "@components/favorites/slice";
import OrderButton from "./OrderButton";

const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.catalog.products);
    const favorites = useAppSelector((state: RootState) => state.favorites.favorites);
    const { items, productCount, insufficientProducts } = useAppSelector((state: RootState) => state.cart);

    const [isFilteredProductsFetched, setIsFilteredProductsFetched] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    const hasFilteredProducts = Boolean(filteredProducts.length);

    useEffect(() => {
        const filtered = products.filter((product: any) => {
            return items.some((item: any) => item.productId === product.id);
        });

        dispatch(setCartOpened());
        dispatch(collapseCatalogNavbar());

        setFilteredProducts(filtered);
        setIsFilteredProductsFetched(true);
    }, [products, items]);

    useEffect(() => {
        return () => {
            dispatch(setCartClosed());
            dispatch(expandCatalogNavbar());
        };
    }, []);

    const handleNavigateProduct = (event: MouseEvent<HTMLDivElement>) => {
        const productId = event.currentTarget.dataset.productId;
        navigate(`/cart/item/${productId}`);
    };

    const handleDeleteProduct = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const productId = Number(event.currentTarget.dataset.productId);
        if (productId) {
            dispatch(resetProductItems({ productId }));
            dispatch(updateProductCount({ productId: productId.toString() }));
        }
    };

    const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const productId = Number(event.currentTarget.dataset.productId);

        dispatch(toggleFavorite(productId));
    };

    const handleGetMinCount = (productId: any) => {
        if (insufficientProducts) {
            const item = insufficientProducts.find((item: any) => item.productId === productId);
            const minCount = item ? item.minCount : false;

            return minCount;
        }
    };

    return (
        <>
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
                    ) : hasFilteredProducts ? (
                        filteredProducts.map((product: any) => {
                            const isFavorite = favorites.includes(product.id);
                            const minCount = handleGetMinCount(product.id);

                            return (
                                <ProductItem
                                    key={product.id}
                                    data-product-id={product.id}
                                    onClick={handleNavigateProduct}
                                    style={{ marginBottom: "40px" }}>
                                    <ItemHead isFavorite={isFavorite}>
                                        <img src={product.image} alt="" />
                                        <button data-product-id={product.id} onClick={handleToggleFavorite}>
                                            {isFavorite ? <FaHeart size={19} /> : <FaRegHeart size={19} />}
                                        </button>
                                    </ItemHead>
                                    <h3>{product.name}</h3>
                                    <ItemInfo>
                                        <h2 style={{ marginBottom: "20px" }}>
                                            Выбрано: <span>{productCount[product.id]} шт</span>
                                        </h2>
                                        <p style={{ color: "#c48282" }}>
                                            {minCount ? `( Минимально: ${minCount} шт )` : "⠀"}
                                        </p>
                                    </ItemInfo>
                                    <DeleteButton data-product-id={product.id} onClick={handleDeleteProduct}>
                                        Удалить товар
                                    </DeleteButton>
                                </ProductItem>
                            );
                        })
                    ) : (
                        <Empty>
                            <h3>В корзине пусто</h3>
                            <PiSmileyMeltingLight size={50} />
                        </Empty>
                    )}
                </ProductList>
            </CatalogContainer>
            <OrderButton hasFilteredProducts={hasFilteredProducts} />
        </>
    );
};

export default Cart;
