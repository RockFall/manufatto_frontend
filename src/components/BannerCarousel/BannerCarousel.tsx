/* eslint-disable no-unused-vars */
import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import { HighlightBanner } from '../../generated/graphql'
import { OutfitBanner, MosaicBanner } from './components'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  carousel: {
    marginLeft: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '100vw',
  },
}))

const indicatorStyles: CSSProperties = {
  background: '#C1BBA7',
  width: 8,
  height: 8,
  borderRadius: '50%',
  display: 'inline-block',
  margin: '0 8px',
}

interface BannerCarouselProps {
  items: HighlightBanner[]
  className?: string
}

const BannerCarousel = (props: BannerCarouselProps) => {
  const { items, className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <div className='carousel-background'>
        <Carousel className={classes.carousel} showArrows={true} showThumbs={false} autoPlay={true} showStatus={false} onChange={() => { }} onClickItem={() => { }} onClickThumb={() => { }} renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: '#000' }}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role='button'
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            )
          }
          return (
            <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
            />
          )
        }}>
          {items.map((item, i) => {
            if (item.type == 'MOSAIC') return <MosaicBanner item={item} key={i}/>
            else return <OutfitBanner item={item} key={i}/>
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default BannerCarousel
