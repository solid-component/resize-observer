import {
  ParentProps,
  children,
  For,
  splitProps,
} from "solid-js";
import SingleObserver from "./SingleObserver";
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

const ResizeObserver = (p: ParentProps<ResizeObserverProps>) => {
  const [local, props] = splitProps(p, ["children"]);
  const resolvedJSXElement = children(() => local.children).toArray;
  return (
    <For each={resolvedJSXElement()}>
      {(element) => {
        return <SingleObserver {...props}>{element}</SingleObserver>;
      }}
    </For>
  );
};

export * from './Collection'

export default ResizeObserver;
