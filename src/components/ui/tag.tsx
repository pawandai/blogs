import { cn } from "@/lib/utils";
import Typography from "./typography";
import { forwardRef } from "react";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ label, className, ...props }: TagProps, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-xl bg-card border px-5 py-1",
          className
        )}
        {...props}
      >
        <Typography
          variant="body3"
          className="font-medium bg-card text-card-foreground"
        >
          {label}
        </Typography>
      </div>
    );
  }
);

Tag.displayName = "Tag";

export default Tag;
