import { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from "react";

export type PolymorphicProps<C extends ElementType, Props = {}> = PropsWithChildren<
  Props & ComponentPropsWithoutRef<C> & { component?: C }
>;
