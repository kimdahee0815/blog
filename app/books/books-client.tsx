'use client'

import { Suspense } from 'react'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import Link from '~/components/ui/Link'
import { PageHeader } from '~/components/ui/page-header'
import { SITE_METADATA } from '~/data/site-metadata'
import type { GoodreadsBook } from '~/types/data'
import { BooksList } from './books-list'
import { ExternalLink } from 'lucide-react'
import { useLanguageStore, getTranslation } from '~/store/language-store'
import parse from 'html-react-parser'

interface Props {
  books: GoodreadsBook[]
}

export function BooksClient({ books }: Props) {
  const { language, translations } = useLanguageStore()
  const t = (key: string) => getTranslation(translations[language], key)

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title={t('books.title')}
        description={
          <>
            {parse(t('books.description1'))}
            <p className="mt-3 flex-none italic lg900:flex">
              {t('books.description2')}
              <Link href={SITE_METADATA.goodreadsBookshelfUrl} className="ml-1 font-medium">
                <GrowingUnderline data-umami-event="goodreads-feed" active>
                  {t('books.description3')}
                </GrowingUnderline>
                {SITE_METADATA.goodreadsBookshelfUrl.startsWith('http') && (
                  <ExternalLink className="ml-2 mt-2" size={18} strokeWidth={1.5} />
                )}
              </Link>
            </p>
          </>
        }
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <Suspense>
        <BooksList books={books} />
      </Suspense>
      {/* <div className="mt-6 border-t border-gray-200 py-5 dark:border-gray-700 md:mt-10 md:py-10">
        <h3 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-100 md:text-3xl">
          FYI
        </h3>
        <div className="space-y-4">
          <p>My real life bookshelf and working space.</p>
          <Zoom>
            <Image
              src="/static/images/working-space.jpg"
              alt="Bookshelf and working space"
              width={1600}
              height={1200}
              className="rounded-2xl object-cover object-center"
            />
          </Zoom>
        </div>
      </div> */}
    </Container>
  )
}
