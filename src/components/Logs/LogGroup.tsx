import React, { useState } from 'react'
import { styled } from 'inlines'
import {
  Text,
  Stack,
  color,
  Badge,
  Thumbnail,
  IconSmallAlertFull,
  IconSmallInfo,
  IconChevronDownSmall,
} from '../../index.js'
import { format } from 'date-fns'
import { SingleLog } from './SingleLog.js'

export const LogGroup = ({ group }) => {
  const [expanded, setExpanded] = useState(false)

  //   console.log(group)

  const LVL_MAP = {
    info: {
      color: 'blue-soft',
      icon: <IconSmallInfo />,
    },
    error: {
      color: 'red-soft',
      icon: <IconSmallAlertFull />,
    },
  }

  return group.length > 0 ? (
    <styled.div style={{ paddingBottom: 16 }}>
      <styled.div onClick={() => setExpanded(!expanded)}>
        <Stack justify="start" gap={16} align="end">
          <Thumbnail
            icon={LVL_MAP[group[0]?.lvl]?.icon}
            color={LVL_MAP[group[0]?.lvl]?.color}
            shape="circle"
            size="extra-small"
            style={{ minWidth: '24px !important' }}
            //     count={group.length}
          />
          {/* first group item/ or last? */}
          <div style={{ width: '100%' }}>
            <Stack gap={16} justify="start" style={{ marginBottom: '-4px' }}>
              <Text
                style={{
                  color: color('content', 'secondary'),
                  fontSize: '12px',
                }}
              >
                {format(group[0].ts, 'HH:mm:ss')}
              </Text>
              <Text
                style={{
                  color: color('content', 'secondary'),
                  fontSize: '12px',
                }}
              >
                {format(group[0].ts, 'dd/MM/yyyy')}
              </Text>
            </Stack>
            <Stack>
              <Text variant="body-bold">{group[0].msg.substring(0, 74)}</Text>
            </Stack>
          </div>
        </Stack>
        {!expanded && (
          <Stack gap={4} justify="start" style={{ paddingLeft: 40 }}>
            <IconChevronDownSmall
              style={{ color: color('interactive', 'primary') }}
            />
            <Text
              variant="body-bold"
              style={{ color: color('interactive', 'primary') }}
            >
              Show all {group.length} logs
            </Text>
          </Stack>
        )}
      </styled.div>

      {expanded && (
        <styled.div style={{ paddingLeft: '40px', paddingTop: 8 }}>
          {group.map((item, idx) => (
            <SingleLog key={idx} msg={item.msg} srvc={item.srvc} ts={item.ts} />
          ))}
        </styled.div>
      )}
    </styled.div>
  ) : null
}
