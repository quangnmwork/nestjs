import { atom, useAtom, useSetAtom } from 'jotai';
import {
  atomFamily,
  atomWithStorage,
  loadable,
  useHydrateAtoms,
} from 'jotai/utils';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

import ClientOnly from '@/components/custom/ClientOnly';
import { Button } from '@/components/ui';

type Anime = {
  title: string;
  year: number;
  watched: boolean;
};

type Breed = {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
};

interface ImageData {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: Breed[];
}

const animeAtom = atomWithStorage('anime', [
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true,
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false,
  },
]);

/**
 * Async atom
 * If you don't want async atoms to suspend or throw to an error boundary you can use error
 */
const asyncCatAtom = atom(async () => {
  const res = await fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD');
  const data = await (res.json() as Promise<ImageData>);

  return data;
});
const loadableCatAtom = loadable(asyncCatAtom);

/**
 * Atom family
 */
type Todo = {
  id: string;
  title?: string;
  isDone?: boolean;
};
const todosAtom = atom<string[]>([]);
const todoAtomFamily = atomFamily(
  ({ title }: Todo) => atom({ title, isDone: false }),
  (a, b) => a.id === b.id,
);
const filterAtom = atom<'all' | 'completed' | 'incompleted'>('all');
const filteredAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);

  if (filter === 'all') return todos;

  if (filter === 'completed') {
    return todos.filter((id) => get(todoAtomFamily({ id })).isDone);
  }

  return todos.filter((id) => !get(todoAtomFamily({ id })).isDone);
});

const TodoItem = ({
  id,
  remove,
}: {
  id: string;
  remove: (id: string) => void;
}): JSX.Element => {
  const [item, setItem] = useAtom(todoAtomFamily({ id }));

  const toggleCompleted = (): void =>
    setItem({ ...item, isDone: !item.isDone });

  return (
    <div className='flex items-center gap-3 my-2'>
      <Button onClick={toggleCompleted}>
        Toggle State {item.isDone ? 'True' : 'false'}
      </Button>
      <span>{item.title}</span>
      <Button onClick={() => remove(id)}>Remove</Button>
    </div>
  );
};

const Page: NextPage<{ data: Anime[] }> = ({ data }): JSX.Element => {
  useHydrateAtoms([[animeAtom, data]]);
  const [anime, setAnime] = useAtom(animeAtom);
  const [catData] = useAtom(loadableCatAtom);
  const [todos] = useAtom(filteredAtom);
  const setTodos = useSetAtom(todosAtom);

  return (
    <div className='p-4'>
      <div className='my-3 p-2'>
        <h1 className='text-3xl'>Atom family</h1>
        <Button
          onClick={() => {
            const id = Date.now().toString();
            todoAtomFamily({ id, title: 'Todo ' + id });
            setTodos((prev) => [...prev, id]);
          }}
          className='mb-3'
        >
          Add todo
        </Button>
        {todos.map((id) => (
          <TodoItem
            id={id}
            remove={() => {
              setTodos((prev) => prev.filter((prevId) => prevId !== id));
              todoAtomFamily.remove({ id });
            }}
          />
        ))}
      </div>
      <div className='my-3 p-2'>
        <h1 className='text-3xl'>Loadable section atom</h1>
        {catData.state === 'hasData' && (
          <Image src={catData.data.url} alt='cat' width={300} height={300} />
        )}
      </div>
      {/**
       * Note : If you want using SSR please add ClientOnly part on the component dependent on storedValue
       */}
      <ClientOnly>
        <ul className='list-none'>
          {anime.map((item) => (
            <li className='bg-cyan-100 rounded-md my-1 p-2' key={item.title}>
              {item.title}
            </li>
          ))}
        </ul>
      </ClientOnly>
      <Button
        onClick={() => {
          setAnime((anime) => [
            ...anime,
            {
              title: 'Cowboy Bebop',
              year: 1998,
              watched: false,
            },
          ]);
        }}
      >
        Add Cowboy Bebop
      </Button>
    </div>
  );
};

export default Page;

export const getServerSideProps = (async (): Promise<{
  props: { data: Anime[] };
}> => {
  return {
    props: {
      data: [
        {
          title: 'Onizuka',
          watched: false,
          year: 1999,
        },
      ],
    },
  };
}) satisfies GetServerSideProps<{ data: Anime[] }>;
