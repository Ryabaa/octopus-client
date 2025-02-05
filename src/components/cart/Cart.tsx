import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CatalogContainer, ItemHead, ItemInfo, ProductItem, ProductList } from "@components/catalog/styles";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { FaRegHeart } from "react-icons/fa";
import { collapseCatalogNavbar, expandCatalogNavbar } from "@components/catalog-navbar/slice";
import { DeleteButton, Empty, PageName } from "./styles";
import { PiSmileyMeltingLight } from "react-icons/pi";
import { Loader } from "@components/loader/Loader";
import { resetProductItems } from "./slice";

const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.catalog.products);
    const items = useAppSelector((state: RootState) => state.cart.items);

    const [isFilteredProductsFetched, setIsFilteredProductsFetched] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const filtered = products.filter((product: any) => {
            return items.some((item: any) => item.productId === product.id);
        });

        dispatch(collapseCatalogNavbar());
        setFilteredProducts(filtered);
        setIsFilteredProductsFetched(true);

        return () => {
            dispatch(expandCatalogNavbar());
        };
    }, [products, items]);

    const handleNavigateProduct = (event: MouseEvent<HTMLDivElement>) => {
        const productId = event.currentTarget.dataset.productId;
        navigate(`/catalog/item/${productId}`);
    };

    const handleDeleteProduct = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const productId = event.currentTarget.dataset.productId;
        if (productId) {
            dispatch(resetProductItems({ productId }));
        }
    };

    return (
        <CatalogContainer>
            <PageName>Корзина</PageName>
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
                            onClick={handleNavigateProduct}>
                            <ItemHead>
                                <img src={product.image} alt="" />
                                <FaRegHeart size={19} />
                            </ItemHead>
                            <h3>{product.name}</h3>
                            <ItemInfo>
                                <h2>
                                    Выбрано: <span>15 шт</span>
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
                        <h3>Здесь пока ничего нет</h3>
                        <PiSmileyMeltingLight size={50} />
                    </Empty>
                )}
            </ProductList>
        </CatalogContainer>
    );
};

export default Cart;
