/// <reference types="vite/client" />

declare module 'miaoda-sc-plugin' {
  import type { Plugin } from 'vite';
  const plugin: {
    miaodaDevPlugin: () => Plugin;
    makeTagger: () => Plugin;
    injectedGuiListenerPlugin: (options?: { path: string }) => Plugin;
    injectOnErrorPlugin: () => Plugin;
    monitorPlugin: (options?: { scriptSrc: string; sentryDsn: string; environment: string; appId: string }) => Plugin;
  };
  export = plugin;
}
