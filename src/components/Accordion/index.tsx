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
  multiExpand?: boolean
  startOpen?: number
  style?: Style
}

export const Accordion = ({
  data,
  multiExpand,
  startOpen,
  style,
}: AccordionProps) => {
  const [open, setOpen] = useState([startOpen])

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
                  if (multiExpand) {
                    let arr = open.filter((x) => x !== idx)
                    setOpen([...arr])
                  } else {
                    setOpen([])
                  }
                } else {
                  if (multiExpand) {
                    let arr = [...open, idx]
                    setOpen([...arr])
                  } else {
                    setOpen([idx])
                  }
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
