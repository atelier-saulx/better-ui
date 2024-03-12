import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import {
  IconSmallChevronDown,
  IconSmallChevronTop,
  Stack,
  Text,
  border,
} from '../../index.js'

type AccordionDataProps = {
  title?: string
  description?: string
  children?: React.ReactNode
}

type AccordionProps = {
  data: AccordionDataProps[]
  style?: Style
}

export const Accordion = ({ data, style }: AccordionProps) => {
  const [open, setOpen] = useState([0])

  return (
    <styled.div style={{ ...style }}>
      {data?.map((item, idx) => {
        return (
          <styled.div
            key={idx}
            style={{
              borderBottom: border(),
              paddingBottom: '24px',
              paddingTop: '20px',
              userSelect: 'none',
            }}
          >
            <Stack
              onClick={() => {
                if (open.includes(idx)) {
                  let arr = open.filter((x) => x !== idx)
                  setOpen([...arr])
                } else {
                  let arr = [...open, idx]
                  setOpen([...arr])
                }
              }}
            >
              <Text
                variant="body-strong"
                style={{ fontSize: '24px', lineHeight: '36px' }}
              >
                {item.title}
              </Text>
              {open.includes(idx) ? (
                <IconSmallChevronDown />
              ) : (
                <IconSmallChevronTop />
              )}
            </Stack>
            {open.includes(idx) && (
              <styled.div style={{ paddingTop: '18px' }}>
                {item.description && (
                  <Text variant="body" style={{ fontWeight: 400 }}>
                    {item.description}
                  </Text>
                )}
                {item.children && item.children}
              </styled.div>
            )}
          </styled.div>
        )
      })}
    </styled.div>
  )
}
