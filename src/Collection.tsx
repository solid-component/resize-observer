import {
  JSX,
  JSXElement,
  ParentProps,
  createContext,
  useContext,
} from "solid-js";
import { SizeInfo } from ".";

type onCollectionResize = (
  size: SizeInfo,
  element: HTMLElement,
  data: any
) => void;

export const CollectionContext = createContext<onCollectionResize>(() => {});

export interface ResizeInfo {
  size: SizeInfo;
  data: any;
  element: HTMLElement;
}

export interface CollectionProps {
  /** Trigger when some children ResizeObserver changed. Collect by frame render level */
  onBatchResize?: (resizeInfo: ResizeInfo[]) => void;
}

export const Collection = (props: ParentProps<CollectionProps>) => {
  let resizeId = 0;
  let resizeInfos: ResizeInfo[] = [];
  const onCollectionResize = useContext(CollectionContext);

  const onResize: onCollectionResize = (size, element, data) => {
    resizeId += 1;
    const currentId = resizeId;
    resizeInfos.push({
      size,
      element,
      data,
    });
    Promise.resolve().then(() => {
      if (currentId === resizeId) {
        props.onBatchResize?.(resizeInfos);
        resizeInfos = [];
      }
    });
    // Continue bubbling if parent exist
    onCollectionResize(size, element, data);
  };

  return (
    <CollectionContext.Provider value={onResize}>
      {props.children}
    </CollectionContext.Provider>
  );
};
