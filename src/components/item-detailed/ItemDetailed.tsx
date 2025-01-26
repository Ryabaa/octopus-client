import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { closeItemDetailed, getItemDetailed } from "@components/catalog/slice";
import {
    ItemCatalog,
    ItemInfoContainer,
    ItemInfo,
    ItemWrapper,
    ItemPrice,
    Line,
    ItemCounter,
    ItemCard,
    ItemCatalogWrapper,
    Favorite,
    ActionMenu,
    ItemSide,
} from "./styles";

import { Loader } from "@components/loader/Loader";

import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";

const ItemDetailed: FC = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const { itemDetailed } = useAppSelector((state: RootState) => state.catalog);

    const [isItemDetailedFetched, setIsItemDetailedFetched] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getItemDetailed(Number(id)));
            setIsItemDetailedFetched(true);
        }

        return () => {
            dispatch(closeItemDetailed());
        };
    }, [id]);

    const handlePress = (side: "left" | "right") => {
        if (side === "left") {
            console.log("Минус");
        } else {
            console.log("Плюс");
        }
    };

    return isItemDetailedFetched ? (
        <ItemWrapper>
            <ItemInfo>
                <ItemInfoContainer>
                    <img src={itemDetailed.image} alt="" />
                    <Favorite>
                        <FaRegHeart size={20} />
                        <p>В избранное</p>
                    </Favorite>
                </ItemInfoContainer>
                <ItemInfoContainer>
                    <h2>{itemDetailed.name}</h2>
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
                    <button>Сбросить выбор</button>
                </ActionMenu>
                <ItemCatalog>
                    {itemDetailed.cards.map((card: any) => (
                        <ItemCard key={card.id}>
                            <h3>{card.name}</h3>
                            <p>В наличии: {card.amount}</p>
                            <ItemCounter>
                                <button>
                                    <FaMinus size={18} />
                                </button>
                                <p>{card.count} шт</p>
                                <button>
                                    <FaPlus size={18} />
                                </button>
                            </ItemCounter>
                            <ItemSide>
                                <button onClick={() => handlePress("left")} className="left"></button>
                                <button onClick={() => handlePress("right")} className="right"></button>
                            </ItemSide>
                        </ItemCard>
                    ))}
                </ItemCatalog>
            </ItemCatalogWrapper>
        </ItemWrapper>
    ) : (
        <Loader />
    );
};

export default ItemDetailed;
