# sc-resize-observer

Resize observer for Solidjs.

## Install

[![rc-resize-observer](https://nodei.co/npm/solid-resize-observer.png)](https://npmjs.org/package/solid-resize-observer)

## Usage

```js
import ResizeObserver from "sc-resize-observer";
import { render } from "solid-js/web";

const root = document.getElementById("root");

render(
  <ResizeObserver
    onResize={() => {
      console.log("resized!");
    }}
  >
    <textarea />
  </ResizeObserver>,
  root
);
```

## API

| Property | Type                        | Default | Description                     |
| -------- | --------------------------- | ------- | ------------------------------- |
| disabled | boolean                     | false   |                                 |
| onResize | ({ width, height }) => void | -       | Trigger when child node resized |
