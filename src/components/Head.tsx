import { FC, memo } from 'react'

import { BRAND_NAME } from '@/constants'

import { Helmet } from 'react-helmet-async'

export type HeadProps = {
  title: string
  description?: string
}

const Head: FC<HeadProps> = ({ title, description }) => {
  const desc = description || title
  const currentYear = new Date().getFullYear()

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{`${BRAND_NAME} | ${title}`}</title>
      <meta name="description" content={desc} />
      {/* <link rel="canonical" href={window.location.origin} /> */}
      <meta
        name="copyright"
        content={`${currentYear} ${BRAND_NAME} Todos los Derechos Reservados`}
      />
      <meta name="author" content={BRAND_NAME} />
    </Helmet>
  )
}

export default memo(Head)
