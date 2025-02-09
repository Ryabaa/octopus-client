import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";

import {
    ItemInfoContainer,
    ItemInfo,
    ItemWrapper,
    ItemPrice,
    Line,
    ItemCatalogWrapper,
    Favorite,
    ActionMenu,
} from "./styles";

import { Loader } from "@components/loader/Loader";
import Items from "./Items";
import MixCounter from "./MixCounter";

import { FaRegHeart } from "react-icons/fa6";

import { resetProductItems, updateProductCount } from "@components/cart/slice";
import { collapseCatalogNavbar, expandCatalogNavbar } from "@components/catalog-navbar/slice";
import { closeCurrentProduct, getCurrentProduct } from "@components/catalog/slice";

type ProductProps = {
    isFromCart?: boolean;
};

const Product: FC<ProductProps> = ({ isFromCart }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);
    const productCount = useAppSelector((state: RootState) => state.cart.productCount);

    const [isCurrentProductFetched, setIsCurrentProductFetched] = useState(false);
    const [localValues, setLocalValues] = useState<{ [itemId: string]: string }>({});
    const [isCounterOpened, setIsCounterOpened] = useState<boolean>(false);
    const [mixCount, setMixCount] = useState<string>("0");

    useEffect(() => {
        if (id) {
            if (isFromCart && productCount[id] === 0) {
                navigate("/cart");
                return;
            }
            dispatch(collapseCatalogNavbar());
            dispatch(getCurrentProduct(Number(id)));
            setIsCurrentProductFetched(true);
        }

        return () => {
            dispatch(expandCatalogNavbar());
            dispatch(closeCurrentProduct());
        };
    }, [id, productCount]);

    useEffect(() => {
        if (isCurrentProductFetched && product) {
            dispatch(updateProductCount({ productId: product.id }));
        }
    }, [mixCount, localValues]);

    const handleResetItems = () => {
        setLocalValues({});
        setMixCount("0");
        dispatch(resetProductItems({ productId: product.id }));
    };

    const handleToggleCounter = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsCounterOpened((prev) => !prev);
    };

    return isCurrentProductFetched && product ? (
        <ItemWrapper>
            <ItemInfo>
                <ItemInfoContainer>
                    <img src={product.image} alt="" />
                    <Favorite>
                        <FaRegHeart size={20} />
                        <p>В избранное</p>
                    </Favorite>
                </ItemInfoContainer>
                <ItemInfoContainer>
                    <h2>{product.name}</h2>
                    <h3>
                        Выбрано: <span>{productCount[product.id] || 0} шт.</span>
                    </h3>
                    <Line width={"120px"} color={"#4b4b4b"} />
                    <ItemPrice>
                        <p>От 5 - 9р/шт</p>
                        <p>От 10 - 8.5р/шт</p>
                        <p>От 20 - 8.1р/шт</p>
                        <p>От 50 - 7.8р/шт</p>
                        <p>От 100 - 7.5р/шт</p>
                    </ItemPrice>
                </ItemInfoContainer>
            </ItemInfo>
            <ItemCatalogWrapper>
                <Line width={"90px"} color={"#cecece"} />
                <ActionMenu isActive={isCounterOpened} isExpanded={isFromCart}>
                    {!isFromCart && <button onClick={handleToggleCounter}>Микс вкусов</button>}
                    <button onClick={handleResetItems}>
                        {isFromCart ? "Удалить товар" : "Сбросить выбор"}
                    </button>
                    {!isFromCart && (
                        <MixCounter
                            product={product}
                            mixCount={mixCount}
                            setMixCount={setMixCount}
                            isCounterOpened={isCounterOpened}
                            setIsCounterOpened={setIsCounterOpened}
                            handleResetItems={handleResetItems}
                        />
                    )}
                </ActionMenu>
                <Items localValues={localValues} setLocalValues={setLocalValues} isFromCart={isFromCart} />
            </ItemCatalogWrapper>
        </ItemWrapper>
    ) : (
        <Loader size={80} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
    );
};

export default Product;
