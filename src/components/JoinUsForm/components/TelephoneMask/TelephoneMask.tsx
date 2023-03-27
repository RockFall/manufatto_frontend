import React, { useState, useEffect } from 'react'
import MaskedInput from 'react-text-mask'


const mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]

const TelephoneMask = (props: any) => {
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

export default TelephoneMask