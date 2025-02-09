import { ChangeEvent, FC, FocusEvent, MouseEvent } from "react";

import { updateItemCount } from "@components/cart/slice";

import { FaPlus, FaMinus } from "react-icons/fa";

import { ItemCounter, ItemSide, StyledItemCard } from "./styles";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

interface ItemCardProps {
    item: any;
    localValues?: { [key: string]: string };
    setLocalValues?: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    isOutOfStock: boolean;
}

const ItemCard: FC<ItemCardProps> = ({ item, localValues, setLocalValues, isOutOfStock }) => {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);

    const inputValue = localValues?.[item?.id] ?? (item ? item.count?.toString() : "0");

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (isOutOfStock) return;

        const action = event.currentTarget.dataset.action;
        const actionNumber = action === "increment" ? 1 : -1;

        const currentCount = Number(inputValue);
        const newCount = Math.max(currentCount + actionNumber, 0);
        if (newCount <= item.availability) {
            dispatch(updateItemCount({ productId: product.id, itemId: item.id, count: newCount }));
            setLocalValues!((prev) => ({
                ...prev,
                [item.id]: newCount.toString(),
            }));
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isOutOfStock) return;

        const newValue = event.target.value;
        if (newValue === "" || /^[0-9]+$/.test(newValue)) {
            setLocalValues!((prev) => ({
                ...prev,
                [item.id]: newValue,
            }));
        }
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (isOutOfStock) return;

        const value = event.target.value;
        const newCount = Number(value);

        if (value !== "") {
            const validatedCount = Math.min(newCount, item.availability);
            dispatch(updateItemCount({ productId: product.id, itemId: item.id, count: validatedCount }));
            setLocalValues!((prev) => ({
                ...prev,
                [item.id]: validatedCount.toString(),
            }));
        } else {
            const fallbackCount = item.count;
            setLocalValues!((prev) => ({
                ...prev,
                [item.id]: fallbackCount.toString(),
            }));
        }
    };

    const handleInputFocus = () => {
        if (setLocalValues) {
            setLocalValues((prev) => ({
                ...prev,
                [item.id]: "",
            }));
        }
    };

    if (isOutOfStock) {
        return (
            <StyledItemCard isOutOfStock={true}>
                <h3>{item.name}</h3>
                <p>Нет в наличии</p>
                <ItemCounter>
                    <button>
                        <FaMinus size={18} />
                    </button>
                    <input value="0" readOnly />
                    <button>
                        <FaPlus size={18} />
                    </button>
                </ItemCounter>
            </StyledItemCard>
        );
    }

    return (
        <StyledItemCard isOutOfStock={false}>
            <h3>{item.name}</h3>
            <p>
                В наличии: <span>{item.availability}</span>
            </p>
            <ItemCounter>
                <button>
                    <FaMinus size={18} />
                </button>
                <input
                    type="number"
                    min="0"
                    max={item.availability}
                    value={inputValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                />
                <button>
                    <FaPlus size={18} />
                </button>
            </ItemCounter>
            <ItemSide>
                <button data-action="decrement" onClick={handleButtonClick} className="left"></button>
                <button data-action="increment" onClick={handleButtonClick} className="right"></button>
            </ItemSide>
        </StyledItemCard>
    );
};

export default ItemCard;
