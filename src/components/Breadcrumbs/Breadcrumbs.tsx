import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Link as ReactLink, Typography } from '@material-ui/core'
import Link from 'next/link'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles(theme => ({
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  link: {
    fontSize: theme.spacing(1.5),
    color: '#6F6C6B',
    fontWeight: 400,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600,
  },
}))

interface PageInfo{
  name: string
  url: string
}

interface BreadcrumbsProps {
  path?: PageInfo[]
  className?: string
  page: string
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { className, path, page, ...rest } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(className, classes.history)}>
      <ReactLink>
        <Link href='/' >
          <Typography className={classes.link}>Home</Typography>
        </Link>
      </ReactLink>
      <ArrowForwardIosIcon className={classes.arrowIcon} />
      {path && path.map((page, i) => (
        <React.Fragment key={i} >
          <ReactLink>
            <Link href={page.url} >
              <Typography className={classes.link}>{page.name}</Typography>
            </Link>
          </ReactLink>
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        </React.Fragment>
      ))}
      <Typography color='textPrimary' className={classes.prod}>
        {page}
      </Typography>
    </div>
  )
}

export default Breadcrumbs
