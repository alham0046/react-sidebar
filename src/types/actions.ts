import { MouseEvent } from "react";

export interface OnClickArgs {
    routePath: string;
    routeName: string;
    e: MouseEvent<HTMLDivElement>;
}

export type OnClick = (args: OnClickArgs) => void