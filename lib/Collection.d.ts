import { JSX, ParentProps } from "solid-js";
import { SizeInfo } from ".";
type onCollectionResize = (size: SizeInfo, element: HTMLElement, data: any) => void;
export declare const CollectionContext: import("solid-js").Context<onCollectionResize>;
export interface ResizeInfo {
    size: SizeInfo;
    data: any;
    element: HTMLElement;
}
export interface CollectionProps {
    /** Trigger when some children ResizeObserver changed. Collect by frame render level */
    onBatchResize?: (resizeInfo: ResizeInfo[]) => void;
}
export declare const Collection: (props: ParentProps<CollectionProps>) => JSX.Element;
export {};
