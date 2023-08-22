import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Typography, Link, Hidden, Divider } from '@mui/material'
import SelectionMenu from './components/SelectionMenu'
import {Breadcrumbs} from '../../components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '16px 188px',
    marginTop: theme.spacing(10),
    display: 'flex',
    marginLeft: '10%',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      margin: '16px 28px',
      flexDirection: 'column',
    }
  },
  subtitle: {
    fontFamily: "DM Sans",
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32px',
    maxWidth: theme.spacing(160),
    marginBottom: theme.spacing(3),
    fontSize: '32px',
  },
  title: {
    fontFamily: "DM Sans",
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '48px',
    maxWidth: theme.spacing(160),
    marginBottom: theme.spacing(3),
    fontSize: '40px',
  },
  infoText: {
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    maxWidth: theme.spacing(160),
    marginBottom: theme.spacing(3),
    fontFamily: "DM Sans",
    fontSize: '16px',
    color: '#000000'
  },
  
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
    position: 'relative',
    marginLeft: '10%',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
    }
  },
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  container: {
    padding: theme.spacing(3),
  },
  textContainer: {
      marginLeft: theme.spacing(10),
      width: '90%',
      [theme.breakpoints.down('md')]: {
        margin: `${theme.spacing(2)} 28px`,
      },
  },
  divider: {
    borderBottom: '1px solid #E0E0E0',
    margin: `${theme.spacing(2)} 10%`,
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(2)} 28px`,
    }
  },
}))

const texts = [{
  title: 'Termos de uso',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. Maecenas consectetur tellus aliquam nunc et cursus. Ultrices maecenas imperdiet facilisis viverra. Ut tellus sit quis aenean diam neque, commodo tempor, libero. Sem turpis eget lorem et.

  Non viverra quam ornare facilisis. Iaculis tincidunt porttitor lacus lacus habitant leo. Mauris metus, aliquam mus aliquam est pellentesque lacus. Etiam enim egestas nunc mi sagittis adipiscing. Nec eget sit consequat massa ut leo nisi sit. Et, elementum amet quam risus felis id enim egestas pellentesque. Eu fames vivamus sit leo sagittis. Cursus posuere massa velit arcu urna, pellentesque. Tempor, et volutpat condimentum venenatis eget. Magnis nisl in quis quisque facilisi orci sed et, faucibus. `,
  subtexts: [
    {
      subtitle: '1 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '2 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.
      `,
    },
    {
      subtitle: '3 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '4 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.`,
    },
  ]
},{
  title: 'Política de Privacidade',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. Maecenas consectetur tellus aliquam nunc et cursus. Ultrices maecenas imperdiet facilisis viverra. Ut tellus sit quis aenean diam neque, commodo tempor, libero. Sem turpis eget lorem et.

  Non viverra quam ornare facilisis. Iaculis tincidunt porttitor lacus lacus habitant leo. Mauris metus, aliquam mus aliquam est pellentesque lacus. Etiam enim egestas nunc mi sagittis adipiscing. Nec eget sit consequat massa ut leo nisi sit. Et, elementum amet quam risus felis id enim egestas pellentesque. Eu fames vivamus sit leo sagittis. Cursus posuere massa velit arcu urna, pellentesque. Tempor, et volutpat condimentum venenatis eget. Magnis nisl in quis quisque facilisi orci sed et, faucibus. `,
  subtexts: [
    {
      subtitle: '1 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '2 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.
      `,
    },
    {
      subtitle: '3 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '4 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.`,
    },
  ]
},
{
  title: 'Trocas e devoluções',
  text: `Lorem 3 dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. Maecenas consectetur tellus aliquam nunc et cursus. Ultrices maecenas imperdiet facilisis viverra. Ut tellus sit quis aenean diam neque, commodo tempor, libero. Sem turpis eget lorem et.

  Non viverra quam ornare facilisis. Iaculis tincidunt porttitor lacus lacus habitant leo. Mauris metus, aliquam mus aliquam est pellentesque lacus. Etiam enim egestas nunc mi sagittis adipiscing. Nec eget sit consequat massa ut leo nisi sit. Et, elementum amet quam risus felis id enim egestas pellentesque. Eu fames vivamus sit leo sagittis. Cursus posuere massa velit arcu urna, pellentesque. Tempor, et volutpat condimentum venenatis eget. Magnis nisl in quis quisque facilisi orci sed et, faucibus. `,
  subtexts: [
    {
      subtitle: '1 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '2 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.
      `,
    },
    {
      subtitle: '3 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '4 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.`,
    },
  ]
},{
  title: 'Regras de Customização',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. Maecenas consectetur tellus aliquam nunc et cursus. Ultrices maecenas imperdiet facilisis viverra. Ut tellus sit quis aenean diam neque, commodo tempor, libero. Sem turpis eget lorem et.

  Non viverra quam ornare facilisis. Iaculis tincidunt porttitor lacus lacus habitant leo. Mauris metus, aliquam mus aliquam est pellentesque lacus. Etiam enim egestas nunc mi sagittis adipiscing. Nec eget sit consequat massa ut leo nisi sit. Et, elementum amet quam risus felis id enim egestas pellentesque. Eu fames vivamus sit leo sagittis. Cursus posuere massa velit arcu urna, pellentesque. Tempor, et volutpat condimentum venenatis eget. Magnis nisl in quis quisque facilisi orci sed et, faucibus. `,
  subtexts: [
    {
      subtitle: '1 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '2 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.
      `,
    },
    {
      subtitle: '3 - Pulvinar tempor nec enim, tortor ',
      text: `Non id nullam pellentesque est porttitor eget sollicitudin purus mauris. Fringilla at integer id arcu non. Lacinia eget mi erat enim erat cursus ultrices. Nisl, ac molestie tempus posuere a, malesuada vel id proin. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.

      Faucibus sollicitudin tempus ut egestas ut. Nunc ut scelerisque rhoncus, venenatis aliquam euismod tincidunt. Vitae ut egestas aliquet at est. Vitae euismod tempor a, non quis. Odio enim risus arcu, proin praesent purus cras. Malesuada nunc, id lectus odio nec etiam.
      
      Sed urna enim fringilla orci blandit aliquet bibendum arcu egestas. Purus arcu pulvinar nunc sed congue nulla duis. Nisi sed condimentum orci quis neque etiam viverra. Fermentum, consectetur ut lectus dictum id. Fames risus phasellus mattis interdum faucibus lectus mus. Aenean dui phasellus id arcu.
      `,
    },
    {
      subtitle: '4 - Massa neque, morbi vitae nunc',
      text: `Sit rhoncus nibh mauris sed morbi id duis faucibus. Diam amet, neque aliquet ullamcorper fermentum urna velit. Nam in vulputate magna blandit amet. Cursus enim adipiscing et, fringilla. Dui venenatis egestas diam pretium scelerisque. Massa neque, morbi vitae nunc. 
      Cras commodo, auctor lacinia donec vestibulum ultricies tortor. Integer pretium neque, amet vitae. Ut enim consectetur egestas id enim sem bibendum quam. A, faucibus lectus felis aliquam ipsum lacus eget id. Sed ultrices non dui, mauris.`,
    },
  ]
},
]

export default function Index() {
  const [index, setIndex] = useState<number>(0)
  const classes = useStyles()
  const handleIndexChange = (i) => {
    setIndex(i)
  }
  
  return (
    <div className={classes.container}>
        <Breadcrumbs page='Jurídico' className={classes.history}/>
        <div className={classes.divider}/>
        <div className={classes.root}>
          <SelectionMenu index={index} setIndex={handleIndexChange} texts={texts} />
          <div className={classes.textContainer}>
              <Typography className={classes.title}>{texts[index].title}</Typography>
              <Typography className={classes.infoText}>
                {texts[index].text.split("\n").map((i, key) => {
                  return <p key={key}>{i}</p>;
                })}
              </Typography>
              {texts[index].subtexts.map((t, i) => (
                <div key={i}> 
                  <Typography className={classes.subtitle}>{t.subtitle}</Typography>
                  <Typography className={classes.infoText}>
                      {t.text.split("\n").map((i, key) => {
                        return <p key={key}>{i}</p>;
                      })}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
    </div>
  )
}
