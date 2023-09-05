import React, { forwardRef } from 'react'
import MaskedInput from 'react-text-mask'

const mask = [/\d/, /\d/,  /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

const CpfMask = forwardRef((props: any, ref) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={mask}
      ref={ref}
      placeholderChar={'\u2000'}
    />
  )
})

export default CpfMask