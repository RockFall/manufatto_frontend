import React from 'react'
import MaskedInput from 'react-text-mask'

const mask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

const CepMask = (props: any) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={mask}
      ref={(ref: any)=> {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholderChar={'\u2000'}
    />
  )
}

export default CepMask