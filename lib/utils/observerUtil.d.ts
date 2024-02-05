export type ResizeListener = (element: Element) => void;
export declare function observe(element: Element, callback: ResizeListener): void;
export declare function unobserve(element: Element, callback: ResizeListener): void;
