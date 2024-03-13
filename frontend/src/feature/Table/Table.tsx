import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export type Props = React.PropsWithChildren;

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  time: string;
};

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
    time: '2023/12/26 10:31:05',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example2@gmail.com',
    time: '2023/12/26 10:31:05',
  },
  {
    id: '489e1142',
    amount: 1925,
    status: 'processing',
    email: 'example3@gmail.com',
    time: '2023/12/26 10:31:05',
  },
  {
    id: '489e1d22',
    amount: 1235,
    status: 'processing',
    email: 'example4@gmail.com',
    time: '2023/12/26 10:31:05',
  },
];

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'time', header: '入金日時' },
  { accessorKey: 'status', header: 'ステータス' },
  {
    accessorKey: 'email',
    header: 'ユーザー',
    cell: ({ row }) => (
      <span className='text-blue-400'>{row.original.email}</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          入金額（税込
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button
        className='bg-red-500 text-white'
        onClick={() => alert(`Delete ${row.original.id}`)}
      >
        削除
      </Button>
    ),
  },
];

export const TablePayment: React.FC<Props> = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
