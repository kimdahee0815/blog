import { ExternalLink } from 'lucide-react'
import { Fragment, type ReactElement } from 'react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import Link from '~/components/ui/Link'
import { FOOTER_NAV_LINKS, FOOTER_PERSONAL_STUFF } from '~/data/navigation'

export function FooterNav() {
  return (
    <div className="flex flex-col gap-4 px-1 md:flex-row md:justify-end md:gap-24 md:px-0 md:text-right">
      <div className="space-y-1 md:space-y-4">
        <div className="flex h-11 items-center font-semibold md:justify-end">
          <span>Sitemap</span>
        </div>
        <ul className="flex flex-wrap gap-4 md:flex-col md:gap-3">
          {FOOTER_NAV_LINKS.map((link, idx) => (
            <Fragment key={link.title}>
              <li>
                <FooterLink link={link} />
              </li>
              {idx !== FOOTER_NAV_LINKS.length - 1 && (
                <span className="text-gray-400 md:hidden">/</span>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
      <div className="space-y-1 md:space-y-4">
        <div className="flex h-11 items-center font-semibold">
          <span>Personal stuff</span>
        </div>
        <ul className="flex flex-wrap gap-4 md:flex-col md:gap-3">
          {FOOTER_PERSONAL_STUFF.map((link, idx) => (
            <Fragment key={link.title}>
              <li>
                <FooterLink link={link} />
              </li>
              {idx !== FOOTER_NAV_LINKS.length - 1 && (
                <span className="text-gray-400 md:hidden">/</span>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FooterLink({ link }: { link: (typeof FOOTER_NAV_LINKS)[0] }) {
  let { href, title } = link
  let isExternal = href.startsWith('http')

  return (
     <Link href={href} className={title === "Analytics"? "flex justify-end" :""   }>
      <GrowingUnderline
        data-umami-event={`footer-nav-${href.replace('/', '')}`}
        className="inline-flex items-center"
      >
        {title}
      </GrowingUnderline>
      {isExternal && <ExternalLink className="ml-1" size={18} strokeWidth={1.5} />}
    </Link>
  )
}
