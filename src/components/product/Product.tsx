import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { closeCurrentProduct, getCurrentProduct } from "@components/catalog/slice";
import {
    ItemCatalog,
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

const Product: FC = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);

    const [isCurrentProductFetched, setIsCurrentProductFetched] = useState(false);
    const [inputCounts, setInputCounts] = useState<{ [itemId: string]: string }>({});

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
        setInputCounts({});
        dispatch(resetProductItems({ productId: product.id }));
    };

    return isCurrentProductFetched ? (
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
                    <p>Выбрано: 56 шт.</p>
                    <Line width={120} color={"#c0c0c0"} />
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
                <Line width={90} color={"#e3e3e3"} />
                <ActionMenu>
                    <button>Микс вкусов</button>
                    <button onClick={handleResetItems}>Сбросить выбор</button>
                </ActionMenu>
                <ItemCatalog>
                    <Items inputCounts={inputCounts} setInputCounts={setInputCounts} />{" "}
                </ItemCatalog>
            </ItemCatalogWrapper>
        </ItemWrapper>
    ) : (
        <Loader />
    );
};

export default Product;
