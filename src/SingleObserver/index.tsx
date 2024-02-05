import {
  ParentProps,
  children,
  createEffect,
  onCleanup,
} from "solid-js";
import { ResizeObserverProps } from "..";
import { observe, unobserve } from "../utils/observerUtil";

export interface SingleObserverProps extends ResizeObserverProps {}

const SingleObserver = (props: ParentProps<SingleObserverProps>) => {
  let sizeRef = {
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1,
  };
  const resolved = children(() => props.children);

  const onInternalResize = (target: HTMLElement) => {
    const { width, height } = target.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = target;
    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (
      sizeRef.width !== fixedWidth ||
      sizeRef.height !== fixedHeight ||
      sizeRef.offsetWidth !== offsetWidth ||
      sizeRef.offsetHeight !== offsetHeight
    ) {
      const size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight,
      };
      sizeRef = size;
      // IE is strange, right?
      const mergedOffsetWidth =
        offsetWidth === Math.round(width) ? width : offsetWidth;
      const mergedOffsetHeight =
        offsetHeight === Math.round(height) ? height : offsetHeight;
      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight,
      };
      if (props.onResize) {
        Promise.resolve().then(() => {
          props.onResize(sizeInfo, target);
        });
      }
    }
  };

  createEffect(() => {
    if (props.disabled) {
      unobserve(resolved() as HTMLElement, onInternalResize);
    }
    onCleanup(() => {
      unobserve(resolved() as HTMLElement, onInternalResize);
    });
  });

  onCleanup(() => {
    unobserve(resolved() as HTMLElement, onInternalResize);
  });

  return resolved();
};

export default SingleObserver;
