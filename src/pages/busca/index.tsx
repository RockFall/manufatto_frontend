import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Hidden, Typography, Input, Chip, IconButton, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: theme.spacing(60),
    height: '70vh',
    background: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '18px 188px',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
    },
  },
  container: {
    marginTop: '16vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chipGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chip: {
    marginRight: theme.spacing(1),
    background: '#F3F3F3',
    border: '1px solid #C1BBA7',
    borderRadius: '22px',
  }, 
  input: {
    marginTop: theme.spacing(7),
    width: theme.spacing(75),
    height: theme.spacing(6),
    fontSize: theme.spacing(5),
    fontWeight: 400,
  },
  main: {
    fontSize: theme.spacing(3),
    fontWeight: 600,
    color: '#1D1D1F'
  },
  filter: {
    marginTop: theme.spacing(7),
    fontSize: theme.spacing(2),
    fontWeight: 500,
    color: '#6F6C6B'
  }
}))

export default function Index() {
  const classes = useStyles()
  const router = useRouter()
  const [searchText, setSearchText] = useState<string>('')
  const [categoriesChips, setCategoriesChips] = useState<boolean[]>([false, false, false, false])

  const toggleChip = (index) => {
    let newChips = categoriesChips
    newChips[index] = !newChips[index]
    setCategoriesChips([...newChips])
  }

  const getCategoriesNames = () => {
    const categoriesNames = ['Roupas', 'Calçados', 'Bolsas', 'Acessórios']
    return categoriesNames.filter((value, i) => categoriesChips[i] )
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.main}>O que você procura?</Typography>
        <Typography className={classes.filter}>Filtre primeiro</Typography>
        <div className={classes.chipGroup}>
          <Chip
            label={'Roupas'}
            clickable
            className={classes.chip}
            variant= "outlined"
            deleteIcon={<DoneIcon /> }
            onDelete={categoriesChips[0] ? ()=> toggleChip(0) : null}
            onClick={()=> toggleChip(0)}
          />
          <Chip
            label={'Calçados'}
            clickable
            className={classes.chip}
            variant= "outlined"
            deleteIcon={<DoneIcon />}
            onDelete={categoriesChips[1] ? ()=> toggleChip(1) : null}
            onClick={()=> toggleChip(1)}
          />
          <Chip
            label={'Bolsas'}
            clickable
            className={classes.chip}
            variant= "outlined"
            deleteIcon={<DoneIcon />}
            onDelete={categoriesChips[2] ? ()=> toggleChip(2) : null}
            onClick={()=> toggleChip(2)}
          />
          <Chip
            label={'Acessórios'}
            clickable
            className={classes.chip}
            variant= "outlined"
            deleteIcon={<DoneIcon />}
            onDelete={categoriesChips[3] ? ()=> toggleChip(3) : null}
            onClick={()=> toggleChip(3)}
          />
        </div>
        <Input
          className={classes.input}
          id="standard-adornment"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value as string)}
          placeholder='Palavra chave + enter'
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => router.push({pathname: `/produtos`, query: {search: searchText, CategoriesNames: getCategoriesNames()}})}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </div>
  )
}
