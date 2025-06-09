import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Fragment } from 'react'
import Link from '~/components/ui/Link'
import { Twemoji } from '~/components/ui/twemoji'

export const SHELVES: {
  label: string
  description: string
  value: ShelfType
  emoji: string
}[] = [
  {
    label: 'All',
    value: 'all',
    description: 'All the books',
    emoji: 'books'
  },
  {
    label: 'Reading',
    value: 'currently-reading',
    description: 'Reading...',
    emoji: 'open-book'
  },
  {
    label: 'Read',
    value: 'read',
    description: 'Complete',
    emoji: 'check-mark-button'
  },
  {
    label: 'Abandoned',
    value: 'abandoned',
    description: 'Abandoned',
    emoji: 'wastebasket'
  },
]

export type ShelfType = 'all' | 'currently-reading' | 'read' | 'abandoned'

export function ShelveSelect({ shelf }: { shelf: ShelfType }) {
  let { label, value: selectedValue } = SHELVES.find(({ value }) => value === shelf) || SHELVES[0]

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          aria-label="More links"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 font-medium dark:border-gray-700"
          data-umami-event="movies-rate-filter"
        >
          <span>{label}</span>
          <ChevronDown strokeWidth={1.5} size={20} />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={clsx([
              'absolute right-0 z-50',
              'mt-2 origin-top-right rounded-md text-right shadow-lg',
              'bg-white dark:bg-black',
              'ring-1 ring-black ring-opacity-5 focus:outline-none',
              'w-[170px]'
            ])}
          >
            <div className="space-y-1 p-1">
              {SHELVES.map(({ label, value, description, emoji }) => (
                <MenuItem key={value} as="div">
                  {({ close }) => (
                    <Link
                      className={clsx([
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5',
                        value === selectedValue
                          ? 'bg-gray-200 dark:bg-gray-800'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-800',
                      ])}
                      href={`/books?shelf=${value}`}
                      onClick={close}
                    >
                      <span data-umami-event="books-shelf-select">{description}</span>
                      <Twemoji emoji={emoji} />
                    </Link>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
