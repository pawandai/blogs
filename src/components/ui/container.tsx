import { ReactNode, forwardRef } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col max-w-7xl mx-auto ${className}`}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
