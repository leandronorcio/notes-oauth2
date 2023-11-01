import { cn } from '@/lib/utils';

interface Container extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function Container({ children, className, ...props }: Container) {
  return (
    <div
      className={cn('mx-auto w-full lg:w-[600px] p-3 md:p-5', className)}
      {...props}
    >
      {children}
    </div>
  );
}
