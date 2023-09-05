import React, { useState, useEffect, forwardRef } from 'react'
import MaskedInput from 'react-text-mask'


const mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]

const TelephoneMask = forwardRef((props: any, ref) => {
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

export default TelephoneMask