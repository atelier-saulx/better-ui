import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import {
  IconSmallChevronDown,
  IconSmallChevronTop,
  Stack,
  Text,
} from '../../index.js'

type AccordionProps = {
  style?: Style
}

export const Accordion = ({ style }: AccordionProps) => {
  const [open, setOpen] = useState(0)

  return (
    <styled.div style={{ ...style }}>
      <Stack>
        <Text>Accordion item</Text>
        <IconSmallChevronTop /> <IconSmallChevronDown />
      </Stack>
    </styled.div>
  )
}
