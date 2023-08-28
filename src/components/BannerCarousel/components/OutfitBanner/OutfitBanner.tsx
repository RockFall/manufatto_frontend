/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { Link, Hidden } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Image from "next/legacy/image"

//import { HighlightBanner } from '../../../../generated/graphql'
import { HighlightBanner } from '../../../../util/custom_types'

const DivRoot = styled("div")(({ theme }) => ({
  boxShadow: "none",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  fontFamily: "Suisse Int\\'l",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "1rem",
  lineHeight: "32px",
  textAlign: "right",
  padding: "10px 0px",
}));

const LinkMobileLink = styled(Link)(({ theme }) => ({
  fontFamily: "Suisse Int\\'l",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "32px",
}));

const DivMobileSlide = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const DivSlide = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "25%",
  left: "60%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const DivCroqui = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "2%",
  left: "30%",
  height: "88%",
  width: "25%",
}));

const DivMobileCroqui = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0.5%",
  left: "17.5%",
  width: "65%",
  height: "80%",
}));

const ArrowForwardIosIconArrowIcon = styled(ArrowForwardIosIcon)(
  ({ theme }) => ({
    color: "#6F6C6B",
    fontSize: theme.spacing(1.2),
    marginLeft: "5px",
  })
);

const DivMobileImages = styled("div")(({ theme }) => ({
  paddingTop: "86.60%",
  width: "100%",
  maxHeight: "478px",
  height: "80%",
}));

const DivMobileCentering = styled("div")(({ theme }) => ({
  width: "100%",
  maxHeight: "100%",
  height: "130vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const DivMobileBackgroundPosition = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  width: "100%",
  height: "auto",
  minHeight: "100%",
  minWidth: "100%",
}));


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  link: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '32px',
    textAlign: 'right',
    padding: '10px 0px',
  },
  mobileLink: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '32px',
  },
  mobileSlide: {
    position: 'absolute',
    bottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    position: 'absolute',
    top: '25%',
    left: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  croqui: {
    position: 'absolute',
    top: '2%',
    left: '30%',
    height: '88%',
    width: '25%',
  },
  mobileCroqui: {
    position: 'absolute',
    top: '0.5%',
    left: '17.5%',
    width: '65%',
    height: '80%',
  },
  arrowIcon: {
    color: '#6F6C6B',
    fontSize: theme.spacing(1.2),
    marginLeft: '5px',
  },
  mobileImages: {
    paddingTop: '86.60%',
    width: '100%',
    maxHeight: '478px',
    height: '80%',
  },
  mobileCentering: {
    width: '100%',
    maxHeight: '100%',
    height: '130vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileBackgroundPosition: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: 'auto',
    minHeight: '100%',
    minWidth: '100%',
  },
}))

interface OutfiBannerProps {
  item: HighlightBanner
  className?: string
}
// `/${item?.background}`
const OutfiBanner = (props: OutfiBannerProps) => {
  const { item, className, ...rest } = props
  const classes = useStyles()



  // TODO: Change Croqui Image back to Webg
  return (
    <DivRoot>
      <Hidden smDown>
        <Image
          src={`/${item.background}`}
          width={1920}
          height={934}
          layout="responsive"
          objectFit="cover"
          alt="Croqui Background"
        />
        <DivCroqui>
          <Image
            src={item.images[0].image.original}
            layout="fill"
            objectFit="contain"
            alt="Croqui image"
          />
        </DivCroqui>
        <DivSlide>
          {item.links.map((link, i) => (
            <StyledLink href={link.url} key={i}>
              {link.text}{" "}
              <ArrowForwardIosIconArrowIcon></ArrowForwardIosIconArrowIcon>{" "}
            </StyledLink>
          ))}
        </DivSlide>
      </Hidden>
      <Hidden smUp>
        <DivMobileCentering>
          <DivMobileImages>
            <DivMobileBackgroundPosition>
              <Image
                src={`/${item.background}`}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </DivMobileBackgroundPosition>
            <DivMobileCroqui>
              <Image
                src={item.images[0].image.original}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </DivMobileCroqui>
          </DivMobileImages>
          <DivMobileSlide>
            {item.links.map((link, _i) => (
              <LinkMobileLink key={_i} href={link.url}>
                {link.text}{" "}
                <ArrowForwardIosIconArrowIcon></ArrowForwardIosIconArrowIcon>{" "}
              </LinkMobileLink>
            ))}
          </DivMobileSlide>
        </DivMobileCentering>
      </Hidden>
    </DivRoot>
  );
}

export default OutfiBanner
