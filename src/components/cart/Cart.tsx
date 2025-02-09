import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CatalogContainer, ItemHead, ItemInfo, ProductItem, ProductList } from "@components/catalog/styles";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { FaRegHeart } from "react-icons/fa";
import { collapseCatalogNavbar, expandCatalogNavbar } from "@components/catalog-navbar/slice";
import { DeleteButton, Empty, PlacingButton } from "./styles";
import { PiSmileyMeltingLight } from "react-icons/pi";
import { Loader } from "@components/loader/Loader";
import { resetProductItems, setCartClosed, setCartOpened, updateProductCount } from "./slice";

const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.catalog.products);
    const { items, productCount, cartCount } = useAppSelector((state: RootState) => state.cart);

    const [isFilteredProductsFetched, setIsFilteredProductsFetched] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const filtered = products.filter((product: any) => {
            return items.some((item: any) => item.productId === product.id);
        });

        dispatch(setCartOpened());
        dispatch(collapseCatalogNavbar());

        setFilteredProducts(filtered);
        setIsFilteredProductsFetched(true);

        return () => {
            dispatch(setCartClosed());
            dispatch(expandCatalogNavbar());
        };
    }, [products, items]);

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

    const handlePlacingClick = () => {
        if (filteredProducts.length > 0) {
            console.log(2);
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
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product: any) => (
                            <ProductItem
                                key={product.id}
                                data-product-id={product.id}
                                onClick={handleNavigateProduct}
                                style={{ marginBottom: "40px" }}>
                                <ItemHead>
                                    <img src={product.image} alt="" />
                                    <FaRegHeart size={19} />
                                </ItemHead>
                                <h3>{product.name}</h3>
                                <ItemInfo>
                                    <h2>
                                        Выбрано: <span>{productCount[product.id]} шт</span>
                                    </h2>
                                    <p>
                                        Сумма товара: <span>13 BYN</span>
                                    </p>
                                </ItemInfo>
                                <DeleteButton data-product-id={product.id} onClick={handleDeleteProduct}>
                                    Удалить товар
                                </DeleteButton>
                            </ProductItem>
                        ))
                    ) : (
                        <Empty>
                            <h3>В корзине пусто</h3>
                            <PiSmileyMeltingLight size={50} />
                        </Empty>
                    )}
                </ProductList>
            </CatalogContainer>
            <PlacingButton isActive={filteredProducts.length > 0} onClick={handlePlacingClick}>
                <h3>К оформлению</h3>
                {filteredProducts.length > 0 ? <p>{`${cartCount} шт., ${140} BYN`}</p> : <p>Нет товара</p>}
            </PlacingButton>
        </>
    );
};

export default Cart;
