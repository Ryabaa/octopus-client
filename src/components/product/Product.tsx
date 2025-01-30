import { FC, MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { closeCurrentProduct, getCurrentProduct } from "@components/catalog/slice";
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

import { FaRegHeart } from "react-icons/fa6";
import { resetProductItems } from "@components/cart/slice";

import MixCounter from "./MixCounter";

const Product: FC = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);
    const items = useAppSelector((state: RootState) => state.cart.items);

    const [isCurrentProductFetched, setIsCurrentProductFetched] = useState(false);
    const [localValues, setLocalValues] = useState<{ [itemId: string]: string }>({});
    const [isCounterOpened, setIsCounterOpened] = useState<boolean>(false);
    const [mixCount, setMixCount] = useState<string>("0");

    const itemsSelected =
        items && isCurrentProductFetched
            ? items
                  .filter((item) => item.productId === product.id)
                  .reduce((total, item) => total + item.count, 0)
            : 0;

    useEffect(() => {
        if (id) {
            dispatch(getCurrentProduct(Number(id)));
            setIsCurrentProductFetched(true);
        }

        return () => {
            dispatch(closeCurrentProduct());
        };
    }, [id]);

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
                        Выбрано: <span>{itemsSelected} шт.</span>
                    </h3>
                    <Line width={"120px"} color={"#c0c0c0"} />
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
                <Line width={"90px"} color={"#e3e3e3"} />
                <ActionMenu isActive={isCounterOpened}>
                    <button onClick={handleToggleCounter}>Микс вкусов</button>
                    <button onClick={handleResetItems}>Сбросить выбор</button>
                    <MixCounter
                        product={product}
                        mixCount={mixCount}
                        setMixCount={setMixCount}
                        isCounterOpened={isCounterOpened}
                        setIsCounterOpened={setIsCounterOpened}
                        itemsSelected={itemsSelected}
                        handleResetItems={handleResetItems}
                    />
                </ActionMenu>
                <Items localValues={localValues} setLocalValues={setLocalValues} />
            </ItemCatalogWrapper>
        </ItemWrapper>
    ) : (
        <Loader />
    );
};

export default Product;
