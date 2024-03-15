import { atom, useAtom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React from 'react';

import { Button } from '@/components/ui';

type Person = {
  name: {
    first: string;
    last: string;
  };
  birth: {
    year: number;
    month: string;
    day: number;
    time: {
      hour: number;
      minute: number;
    };
  };
};
const defaultPerson = {
  name: {
    first: 'Jane',
    last: 'Doe',
  },
  birth: {
    year: 2000,
    month: 'Jan',
    day: 1,
    time: {
      hour: 1,
      minute: 1,
    },
  },
};

const personAtom = atom(defaultPerson);
const nameAtom = selectAtom(personAtom, (person: Person) => person.name);
const birthAtom = selectAtom(personAtom, (person: Person) => person.birth);

const RenderName = (): JSX.Element => {
  const name = useAtomValue(nameAtom);

  console.log('Rerender');

  return (
    <p className='text-3xl text-blue-400'>
      My name is {name.first} {name.last}
    </p>
  );
};

const Page = (): JSX.Element => {
  const [_, setPerson] = useAtom(personAtom);
  const birth = useAtomValue(birthAtom);

  return (
    <>
      <RenderName />
      <p className='text-2xl text-green-500'>
        Birth : {birth.day}-{birth.month}-{birth.year}
      </p>
      <Button
        onClick={() => {
          setPerson((prev) => {
            prev.birth.day = prev.birth.day + 1;
            return { ...prev };
          });
        }}
      >
        Set Birth
      </Button>
      <Button
        onClick={() => {
          setPerson((prev) => {
            prev.name.last = 'David';
            return { ...prev };
          });
        }}
      >
        Random name
      </Button>
    </>
  );
};

export default Page;
