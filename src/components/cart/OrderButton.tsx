import { FC } from "react";

import { useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { PlacingButton } from "./styles";

import { getLocalStorage } from "@utils/localStorage";

type OrderButtonProps = {
    hasFilteredProducts: boolean;
};

const OrderButton: FC<OrderButtonProps> = ({ hasFilteredProducts }) => {
    const { cartCount, cartPrice } = useAppSelector((state: RootState) => state.cart);

    const isAuthorized = getLocalStorage("isAuthorized");

    const handleOrder = () => {
        if (hasFilteredProducts) {
            console.log(1);
        }
    };
    return (
        <PlacingButton isActive={hasFilteredProducts} onClick={handleOrder}>
            <h3>К оформлению</h3>
            {hasFilteredProducts ? (
                isAuthorized ? (
                    <p>{`${cartCount} шт., ${cartPrice} BYN`}</p>
                ) : (
                    <p>Войдите в аккаунт, чтобы оформить заказ</p>
                )
            ) : (
                <p>Нет товара</p>
            )}
        </PlacingButton>
    );
};

export default OrderButton;
