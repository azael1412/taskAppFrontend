import { Link } from '@mui/material'
import { createLink } from '@tanstack/react-router'
import { forwardRef } from 'react'
import type { LinkProps } from '@mui/material'

export const RouterLink = createLink(
  forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link {...props} ref={ref} />
  )),
)
