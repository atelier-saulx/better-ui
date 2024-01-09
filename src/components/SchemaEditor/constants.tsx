import * as React from 'react'
import {
  IconDns,
  IconFormatBold,
  IconFunction,
  IconHelpFill,
  IconKey,
  IconLink,
  IconQuote,
  IconText,
  IconTimeClock,
  IconTurnOff,
} from '../Icons/index.js'

export const SCHEMA_FIELDS = [
  {
    label: 'String',
    description: 'Non internationalized string',
    icon: <IconQuote />,
    color: 'informative-muted',
  },
  {
    label: 'Text',
    description: 'Text with formatting',
    icon: <IconText />,
    color: 'informative-muted',
  },
  {
    label: 'Rich Text',
    description: 'Texteditor with styling controls',
    icon: <IconFormatBold />,
    color: 'informative-muted',
  },
  {
    label: 'Number',
    description: 'A Float',
    icon: <IconHelpFill />,
    color: 'positive-muted',
  },
  {
    label: 'Int',
    description: 'Whole numbers',
    icon: <IconHelpFill />,
    color: 'positive-muted',
  },
  {
    label: 'Timestamp',
    description: 'Timestamp',
    icon: <IconTimeClock />,
    color: 'positive-muted',
  },
  {
    label: 'Boolean',
    description: 'True or False',
    icon: <IconTurnOff />,
    color: 'error-muted',
  },
  {
    label: 'Enum',
    description: 'Set of named constants',
    icon: <IconDns />,
    color: 'warning-muted',
  },
  {
    label: 'Array',
    description: 'A collection of similar types',
    icon: <IconDns />,
    color: 'warning-muted',
  },
  {
    label: 'Object',
    description: 'Multiple types',
    icon: <IconKey />,
    color: 'warning-muted',
  },
  {
    label: 'Record',
    description: 'Fixed collection',
    icon: <IconDns />,
    color: 'warning-muted',
  },
  {
    label: 'Set',
    description: 'Collection of unique values',
    icon: <IconDns />,
    color: 'warning-muted',
  },
  {
    label: 'JSON',
    description: 'A JSON object',
    icon: <IconHelpFill />,
    color: 'warning-muted',
  },
  {
    label: 'Cardinality',
    description: 'From math',
    icon: <IconFunction />,
    color: 'warning-muted',
  },
  {
    label: 'Reference',
    description: 'Single Ref',
    icon: <IconLink />,
    color: 'neutral-muted',
  },
  {
    label: 'References',
    description: 'Multiple Refs',
    icon: <IconLink />,
    color: 'neutral-muted',
  },
]
