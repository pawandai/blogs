import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-gray-600 dark:text-gray-200 text-normal", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      paragraph: "leading-7 [&:not(:first-child)]:mt-6",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      thead:
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      tdata:
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
      subtitle: "text-lg tablet:text-xl",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      body1: "text-base tablet:text-lg",
      body2: "text-base",
      body3: "text-sm",
    },
  },
  defaultVariants: {
    variant: "body2",
  },
});

interface TypographyProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const elementMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  paragraph: "p",
  inlineCode: "code",
  list: "ul",
  thead: "thead",
  tdata: "td",
  subtitle: "p",
  lead: "p",
  large: "p",
  small: "small",
  blockquote: "blockquote",
  body1: "p",
  body2: "p",
  body3: "p",
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { component, className = "", variant, children, ...props }: TypographyProps,
    ref
  ) => {
    const Comp = component || (variant && elementMapping[variant]) || "p";

    return (
      <Comp
        className={cn(typographyVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
