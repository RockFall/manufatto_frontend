import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/core'
//import { Product as ProductType, ProductImagePath } from '../../generated/graphql'
import { Product as ProductType } from '../../generated/graphql'

import { formatMoney } from '../../mixins/formatter'
import clsx from 'clsx'

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteBorder'

import Util from '../../util/custom_formatter'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 14,
    textAlign: 'center',
  },
  productCard: {
    display: 'block',
    //flexDirection: 'column',
    //alignItems: 'center',
  },
  mediaCard: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '125%',
    '& img': {
      maxWidth: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
    },
  },


  brand: {
    margin: '6px 0px 0px 0px',
    padding: '2px',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
  name: {
    margin: '0px 0px 2px',
    color: '#1D1D1F',
    fontWeight: 500,
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    margin: '3px 0px 0px',
    padding: '0px',
    height: 'auto',
    fontWeight: 600,
  },
  creditCardPayment: {
    margin: '0px',
    fontWeight: 'normal',
    color: '#C1BBA7',
  },
  discountBadgeContainer: {
    float: 'right',
    position: 'relative'
  },
  discountBadge: {
    backgroundColor: '#1D1D1F',
    color: 'white',
    padding: '15px 9px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    position: 'absolute',
    right: 16,
    top: 16
  },
  favoriteShortcutContainer: {
    float: 'left',
    position: 'relative'
  },
  favoriteIcon: {
    position: 'absolute',
    top: 30,
    left: 30
  }
}))

interface ProductProp {
  product: ProductType
  className?: string
}

const Product = (props: ProductProp) => {
  const { className, product, ...rest } = props
  const classes = useStyles()

  // Links
  const productLink = `/produtos/${encodeURIComponent(Util.handleFromVendor(product?.vendor))}/${encodeURIComponent(product?.handle)}`
  const shopLink = `/marcas/${encodeURIComponent(Util.handleFromVendor(product?.vendor))}`

  // Prices
  const price = parseFloat(product?.contextualPricing?.maxVariantPricing.price.amount)
  const compareAtPrice = parseFloat(product?.contextualPricing?.maxVariantPricing.compareAtPrice?.amount)
  const priceInstallments = price && parseFloat((price / 4).toFixed(2))
  const discount = compareAtPrice? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : undefined

  //const imagePath: ProductImagePath = product.images && product.images.length ? (
    console.log(product.images.edges[0].node);
  const imagePath = product?.images.edges[0].node ? (
    
    {
      
      original: (product.images.edges[0].node as any).original,
      originalWbp: (product.images.edges[0].node as any).originalWbp
    }
  ) : (
    {
      zoomedWbp: `https://loremflickr.com/1024/1280/pants?random=${product.id}`,
      zoomed: `https://loremflickr.com/1024/1280/pants?random=${product.id}`,
      //originalWbp: `https://loremflickr.com/732/915/pants?random=${product.id}`,
      originalWbp: `https://th.bing.com/th/id/R.0c476ec6929b91b3aa07af13b9428df8?rik=pGl702WvbHCuvA&pid=ImgRaw&r=0`,
      //original: `https://loremflickr.com/732/915/pants?random=${product.id}`,
      original: `https://th.bing.com/th/id/R.0c476ec6929b91b3aa07af13b9428df8?rik=pGl702WvbHCuvA&pid=ImgRaw&r=0`,
      thumbnailWbp: `https://loremflickr.com/365/445/pants?random=${product.id}`,
      thumbnail: `https://loremflickr.com/365/445/pants?random=${product.id}`,
      // zoomedWbp: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_zoomed.webp',
      // zoomed: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_zoomed.png',
      // originalWbp: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_original.webp',
      // original: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_original.png',
      // thumbnailWbp: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_thumbnail.webp',
      // thumbnail: 'https://manufatto-files.s3-sa-east-1.amazonaws.com/default/placeholder_thumbnail.png',
    }
  )

  return (
    <div {...rest} className={clsx(classes.root, className)}>

      <div className={classes.productCard}>
        <Link href={productLink} underline='none'>
          <div className={classes.favoriteShortcutContainer}>
            <FavoriteOutlinedIcon className={classes.favoriteIcon} color="disabled" />
          </div>

          {discount && (
            <div className={classes.discountBadgeContainer}>
              <div className={classes.discountBadge}> {discount}% </div>
            </div>
          )}

          <div className={classes.mediaCard}>
            <picture>
              <source srcSet={imagePath.originalWbp} type="image/webp" />
              <img 
              width={product?.images.edges[0].node?.width}
              height={product?.images.edges[0].node?.height}
              src={imagePath.original} 
              alt={`Imagem do produto ${product.title}`} />
            </picture>
          </div>
        </Link>

        <Link href={shopLink}>
          <h5 className={classes.brand}> {product.vendor} </h5>
        </Link>

        <Link href={productLink}>
          <p className={classes.name}> {product.title} </p>
        </Link>

        <div className={classes.price}>
          <p className={classes.value}> {formatMoney(price*100)} </p>
          <p className={classes.creditCardPayment}>
            ou 4x de R$ {formatMoney(priceInstallments*100)} no cartão
          </p>
        </div>
      </div>
    </div>
  )
}

export default Product
