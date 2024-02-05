import { ParentProps } from "solid-js";
import { ResizeObserverProps } from "..";
export interface SingleObserverProps extends ResizeObserverProps {
}
declare const SingleObserver: (props: ParentProps<SingleObserverProps>) => import("solid-js").ResolvedChildren;
export default SingleObserver;
