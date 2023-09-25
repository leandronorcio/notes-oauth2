import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilePlus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Notes() {
  const notes = [
    {
      id: 1,
      title: 'Hello World Hello WorldHello WorldHello WorldHello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 1,
      title: 'Hello World Hello WorldHello WorldHello WorldHello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 1,
      title: 'Hello World Hello WorldHello WorldHello WorldHello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 1,
      title: 'Hello World Hello WorldHello WorldHello WorldHello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 1,
      title: 'Hello World Hello WorldHello WorldHello WorldHello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Hello World',
      content: 'Lorem ipsum dolor sit amet',
    },
  ];
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col sm:w-[300px] border-r-border border-r-[1px]">
        <div className="p-2 w-full">
          <Button className="flex gap-2 w-full">
            <FilePlus /> Create note
          </Button>
        </div>
        <Separator />
        <div className="flex-1 py-2 overflow-y-auto px-2">
          <h1 className="text-2xl font-bold pb-2">Notes</h1>
          <ul className="flex flex-col gap-2">
            {notes.map(({ id, title }) => {
              return (
                <li key={id}>
                  <NavLink
                    to={`${id}`}
                    className="block rounded-lg py-2 px-4 bg-muted cursor-pointer hover:bg-primary truncate"
                  >
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Separator />
          <div className="p-3 flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/32889996?s=400&v=4" />
              <AvatarFallback>LN</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">Leandro Norcio</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
