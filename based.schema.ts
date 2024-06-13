export default {
  types: {
    room: {
      prefix: 'rm',
      fields: {
        fps: {
          type: 'number',
        },
        users: {
          type: 'references',
          allowedTypes: ['user'],
          bidirectional: { fromField: 'room' },
        },
        trackingArea: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
            width: { type: 'number' },
            height: { type: 'number' }
          }
        },
      }
    },
    user: {
      prefix: 'us',
      fields: {
        name: {
          type: 'string'
        },
        room: {
          type: 'reference',
          allowedTypes: ['room'],
          bidirectional: { fromField: 'users' },
        },
        mousePosition: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          }
        },
        clickEvent: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
            timestamp: { type: 'number' },
          }
        },
        color: {
          type: 'string',
        },
        tracking: {
          type: 'boolean',
        }
      }
    }
  },
}
