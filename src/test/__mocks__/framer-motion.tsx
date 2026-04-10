import React, { forwardRef } from 'react';

type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

const createMotionComponent = (tag: string) =>
  forwardRef<HTMLElement, AnyProps>(({ children, ...props }, ref) => {
    const filtered = Object.fromEntries(
      Object.entries(props).filter(
        ([k]) => !['initial', 'animate', 'exit', 'transition', 'whileInView', 'viewport', 'whileHover', 'whileTap', 'variants', 'style'].includes(k)
      )
    );
    return React.createElement(tag, { ...filtered, ref }, children);
  });

export const motion = new Proxy({} as Record<string, ReturnType<typeof createMotionComponent>>, {
  get: (_, prop: string) => createMotionComponent(prop),
});

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const useAnimation = () => ({ start: () => {}, stop: () => {} });
export const useInView = () => true;
export const useScroll = () => ({ scrollY: { get: () => 0 } });
export const useTransform = (_: unknown, __: unknown, output: unknown[]) => output[0];
