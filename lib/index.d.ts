import { ParentProps } from "solid-js";
export interface SizeInfo {
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
}
export type OnResize = (size: SizeInfo, element: HTMLElement) => void;
export interface ResizeObserverProps {
    /** Pass to ResizeObserver.Collection with additional data */
    data?: any;
    disabled?: boolean;
    /** Trigger if element resized. Will always trigger when first time render. */
    onResize?: OnResize;
}
declare const ResizeObserver: (p: ParentProps<ResizeObserverProps>) => import("solid-js").JSX.Element;
export * from './Collection';
export default ResizeObserver;
