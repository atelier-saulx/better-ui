import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import { IconSmallChevronTop, Stack, Text, border } from '../../index.js'

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
              maxHeight: open.includes(idx) ? '1200px' : '80px',
              height: open.includes(idx) ? 'auto' : 80,
              transition: 'max-height 1s ease-in',
              overflow: 'hidden',
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
              <IconSmallChevronTop
                style={{
                  transform: open.includes(idx)
                    ? 'rotate(-180deg)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.24s',
                }}
              />
            </Stack>

            <styled.div
              style={{
                paddingTop: '18px',
                opacity: open.includes(idx) ? 1 : 0,
                transition: 'opacity 0.44s ease-in',
              }}
            >
              {item.description && (
                <Text variant="body" style={{ fontWeight: 400 }}>
                  {item.description}
                </Text>
              )}
              {item.children && item.children}
            </styled.div>
          </styled.div>
        )
      })}
    </styled.div>
  )
}
