import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";

type LoaderProps = {
    size?: number;
    top?: string;
    left?: string;
    transform?: string;
};

type Position = "absolute" | "relative" | "fixed" | "sticky";

export const Loader: FC<LoaderProps & { position?: Position }> = ({
    size = 60,
    position = "relative",
    top,
    left,
    transform,
}) => (
    <div style={{ position, top, left, transform }}>
        <ThreeDots color="#787878" height={size} width={size} ariaLabel="loading" />
    </div>
);
