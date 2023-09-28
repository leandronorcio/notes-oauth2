import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { getAvatarFallback } from '@/lib/getAvatarFallback';

export function ProfileBar() {
  const { logout, user } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-full">
        <div className="flex  items-center hover:bg-accent p-3 rounded-full justify-between">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={user?.avatar!} />
              <AvatarFallback>
                {user?.name ? getAvatarFallback(user.name) : null}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{user?.name}</h3>
          </div>
          <ChevronsUpDown className="block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <LogOut className="mr-2" /> Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
