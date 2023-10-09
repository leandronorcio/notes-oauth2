import { PencilLine } from 'lucide-react';

export function LogoWithText() {
  return (
    <div className="flex items-center gap-2">
      <PencilLine />
      <h1 className="text-xl font-semibold p-0 m-0 text-foreground">Notes</h1>
    </div>
  );
}
