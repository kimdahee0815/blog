'use client'

import { Clock, Github, Map, Star } from 'lucide-react'
import useSWR from 'swr'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import Link from '~/components/ui/Link'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'
import type { GithubRepository } from '~/types/data'
import { fetcher } from '~/utils/misc'

const TIME_IS = 'https://time.is/South_Korea'
const MY_TIMEZONE = 'Asia/Seoul'
const MY_TIMEZONE_OFFSET = 9 * -60 // UTC+9

function getTime() {
  let date = new Date()
  let visitorTimezoneOffset = date.getTimezoneOffset()
  let hoursDiff = (visitorTimezoneOffset - MY_TIMEZONE_OFFSET) / 60
  let diff =
    hoursDiff === 0
      ? 'same time'
      : hoursDiff > 0
        ? `${hoursDiff}h ahead`
        : `${hoursDiff * -1}h behind`

  let time = new Intl.DateTimeFormat('en-US', {
    timeZone: MY_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)

  return { time, diff }
}

export function FooterMeta() {
  let { time, diff } = getTime()
  let siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  let repoName = siteRepo.split('/')[1]
  let { data: repo } = useSWR<GithubRepository>(`/api/github?repo=${siteRepo}`, fetcher)

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-slate-200">
      <div className="flex items-center gap-1 font-medium">
        <Github className="h-5 w-5" />
        <Link href={SITE_METADATA.siteRepo} className="ml-1">
          <GrowingUnderline data-umami-event="view-repo">{repoName}</GrowingUnderline>
        </Link>
        <span>-</span>
        <span className="inline-flex items-center text-gray-500 dark:text-slate-400">
          <Star className="mr-1 h-4 w-4" />
          {repo ? <span>{repo.stargazerCount}</span> : '---'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5" />
        <span className="font-medium">
          Incheon - South Korea <Twemoji emoji="flag-south-korea" className="!h-4.5" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <Link href={TIME_IS}>
          <GrowingUnderline className="font-medium" data-umami-event="footer-time">
            {time} <span className="text-gray-500 dark:text-slate-400">- {diff}</span>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  )
}
