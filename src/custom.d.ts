// src/custom.d.ts 或 src/typings.d.ts
import * as echarts from 'echarts';

declare global {
  interface Window {
    echarts: typeof echarts;
  }
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

