'use client'

import { clsx } from 'clsx'
import type { Blog, Snippet } from 'contentlayer/generated'
import { useState } from 'react'
import { PostCardGridView } from '~/components/blog/post-card-grid-view'
import { Tag } from '~/components/blog/tags'
import { SnippetCard } from '~/components/cards/snippet'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import tagData from '~/json/tag-data.json'
import type { CoreContent } from '~/types/data'
import { useLanguageStore, getTranslation } from '~/store/language-store'

interface ListLayoutProps {
  title: string
  description: React.ReactNode
  posts: CoreContent<Blog>[]
  snippets: CoreContent<Snippet>[]
}

export function ListLayoutWithTags({ title, description, posts, snippets }: ListLayoutProps) {
  const { language, translations } = useLanguageStore()

  const t = (key: string) => getTranslation(translations[language], key)
  let hasBlogs = posts.length > 0
  let hasSnippets = snippets.length > 0
  let [view, setView] = useState<'blogs' | 'snippets'>(hasBlogs ? 'blogs' : 'snippets')

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title={title}
        description={description}
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="flex gap-x-12">
        <TagsList />
        <div className="w-[90%] py-5 md:py-10">
          <div className="mb-6 flex items-center gap-2 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-100 md:mb-10 md:justify-end md:text-3xl">
            {hasBlogs && (
              <button
                className={clsx(
                  'underline-offset-4',
                  view === 'blogs'
                    ? 'underline'
                    : 'text-gray-400 hover:text-gray-900 dark:text-slate-400 dark:hover:text-gray-100'
                )}
                onClick={() => setView('blogs')}
              >
                {t('tags.blogs')}
              </button>
            )}
            {hasBlogs && hasSnippets ? <span>/</span> : null}
            {hasSnippets && (
              <button
                className={clsx(
                  'underline-offset-4',
                  view === 'snippets'
                    ? 'underline'
                    : 'text-gray-400 hover:text-gray-900 dark:text-slate-400 dark:hover:text-gray-100'
                )}
                onClick={() => setView('snippets')}
              >
                {t('tags.snippets')}
              </button>
            )}
          </div>
          {view === 'blogs' ? (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
              {posts.map((post) => (
                <li key={post.path}>
                  <PostCardGridView post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-10">
              {snippets.map((snippet) => (
                <SnippetCard snippet={snippet} key={snippet.path} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

function TagsList() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => a.localeCompare(b))

  const groupedTags: Record<string, string[]> = {}
  sortedTags.forEach((tag) => {
    const firstLetter = tag[0].toUpperCase()
    if (!groupedTags[firstLetter]) {
      groupedTags[firstLetter] = []
    }
    groupedTags[firstLetter].push(tag)
  })

  return (
    <div className="hidden max-h-screen w-[300px] shrink-0 py-5 md:flex md:py-10">
      <div className="h-full overflow-auto rounded bg-gray-50 px-6 py-4 dark:bg-gray-900/70 dark:shadow-gray-800/40">
        {Object.keys(groupedTags)
          .sort()
          .map((letter) => (
            <div key={letter} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-slate-200">
                {letter}
              </h3>
              <ul className="space-y-1">
                {groupedTags[letter].map((tag) => (
                  <li key={tag} className="flex items-center gap-0.5">
                    <Tag text={tag} size="md" />
                    <span className="text-gray-600 dark:text-slate-300">({tagCounts[tag]})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  )
}
