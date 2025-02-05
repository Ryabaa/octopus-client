import { ChangeEvent, FC, FocusEvent, MouseEvent, useRef, useEffect } from "react";

import { ActionMenuCounter, ItemCounter, ItemSide } from "./styles";

import { FaMinus, FaPlus } from "react-icons/fa";

import { updateMixCount } from "@components/cart/slice";
import { useAppDispatch } from "@hooks/reduxHooks";

interface MixCounterProps {
    isCounterOpened: boolean;
    itemsSelected: any;
    product: any;
    mixCount: string;
    setMixCount: (value: string) => void;
    setIsCounterOpened: (value: boolean) => void;
    handleResetItems: () => void;
}

const MixCounter: FC<MixCounterProps> = ({
    product,
    mixCount,
    setMixCount,
    isCounterOpened,
    setIsCounterOpened,
    itemsSelected,
    handleResetItems,
}) => {
    const dispatch = useAppDispatch();

    const actionMenuCounterRef = useRef<HTMLDivElement>(null);

    const totalAmount = product ? product.items.reduce((sum: any, item: any) => sum + item.amount, 0) : 0;

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (actionMenuCounterRef.current && !actionMenuCounterRef.current.contains(event.target)) {
                setIsCounterOpened(false);
            }
        };

        if (isCounterOpened) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isCounterOpened]);

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        const action = event.currentTarget.dataset.action;
        const actionNumber = action === "increment" ? 1 : -1;

        const currentCount = Number(mixCount);
        const newCount = Math.max(currentCount + actionNumber, 0);

        if (newCount <= totalAmount) {
            handleResetItems();
            dispatch(updateMixCount({ productId: product.id, items: product.items, desiredTotal: newCount }));
            setMixCount(newCount.toString());
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue === "" || /^[0-9]+$/.test(newValue)) {
            setMixCount(newValue);
        }
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newCount = Number(value);

        if (value !== "") {
            const validatedCount = Math.min(newCount, totalAmount);
            handleResetItems();
            dispatch(
                updateMixCount({ productId: product.id, items: product.items, desiredTotal: validatedCount })
            );
            setMixCount(validatedCount.toString());
        } else {
            setMixCount(itemsSelected.toString());
        }
    };

    const handleInputFocus = () => {
        setMixCount("");
    };

    return (
        <ActionMenuCounter ref={actionMenuCounterRef} isActive={isCounterOpened}>
            <ItemCounter>
                <button>
                    <FaMinus size={18} />
                </button>
                <input
                    type="number"
                    min="0"
                    max={totalAmount}
                    value={mixCount}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                />
                <button>
                    <FaPlus size={18} />
                </button>
                <ItemSide>
                    <button data-action="decrement" onClick={handleButtonClick} className="left"></button>
                    <button data-action="increment" onClick={handleButtonClick} className="right"></button>
                </ItemSide>
            </ItemCounter>
        </ActionMenuCounter>
    );
};

export default MixCounter;
