import * as React from 'react'
import { Logs, IconSmallBolt } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Logs> & { description: string } = {
  title: 'Components/Logs',
  description: "The Captain's log",
  component: Logs,
}

const test = [
  {
    srvc: 'env-hub-poller',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '/home/ec2-user/shared_modules/6c5adf95dcebbe650c257e54ede883a2bbc9d740/dist/index.js\n',
    lvl: 'info',
    ts: 1687803514771,
  },
  {
    srvc: 'env-hub-poller',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Based-server listening on port: 4006\n',
    lvl: 'info',
    ts: 1687803514837,
  },
  {
    srvc: 'env-hub-discovery',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '    Based-server listening on port: 80\n',
    lvl: 'info',
    ts: 1687803515243,
  },
  {
    srvc: 'env-events-hub',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '    Based-server listening on port: 4007\n',
    lvl: 'info',
    ts: 1687803515573,
  },
  {
    srvc: 'env-admin-hub',
    i: '0',
    mid: 'ma2fd399f1',
    url: '18.159.141.108',
    eid: 'enBBBFs9x0',
    msg: 'More then 30 retries to connect to server hard-disconnect 172.33.32.107:4002 registry registry\n',
    lvl: 'error',
    ts: 1687803519831,
  },
  {
    srvc: 'env-hub',
    i: '0',
    mid: 'ma7398cf92',
    url: '3.73.65.108',
    eid: 'enBBBFs9x0',
    msg: 'More then 30 retries to connect to server hard-disconnect 172.33.32.107:4002 registry registry\n',
    lvl: 'error',
    ts: 1687803519885,
  },
  {
    srvc: 'env-jobs',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'More then 30 retries to connect to server hard-disconnect 172.33.32.107:4002 registry registry\n',
    lvl: 'error',
    ts: 1687803522397,
  },
  {
    srvc: 'env-events-hub',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'More then 30 retries to connect to server hard-disconnect 172.33.32.107:4002 registry registry\n',
    lvl: 'error',
    ts: 1687803526112,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '(node:1704) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.\n\nPlease migrate your code to use AWS SDK for JavaScript (v3).\nFor more information, check the migration guide at https://a.co/7PzMCcy\n(Use `node --trace-warnings ...` to show where the warning was created)\n',
    lvl: 'error',
    ts: 1687803528155,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  port: 4003,\n  host: '172.33.32.107',\n  registry: [AsyncFunction (anonymous)],\n  dir: '/home/ec2-user/services/env-db-sub-manager/tmp',\n  modules: [ 'selva' ],\n  name: 'subscriptionManager'\n}\n",
    lvl: 'info',
    ts: 1687803528175,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '(node:1711) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.\n\nPlease migrate your code to use AWS SDK for JavaScript (v3).\nFor more information, check the migration guide at https://a.co/7PzMCcy\n(Use `node --trace-warnings ...` to show where the warning was created)\n',
    lvl: 'error',
    ts: 1687803528193,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Hierarchy initialized and lua scripts loaded\n',
    lvl: 'info',
    ts: 1687803528263,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  port: 4002,\n  host: '172.33.32.107',\n  dir: '/home/ec2-user/services/env-db-registry/tmp',\n  modules: [ 'selva' ],\n  name: 'registry'\n}\n",
    lvl: 'info',
    ts: 1687803528292,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '(node:1714) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.\n\nPlease migrate your code to use AWS SDK for JavaScript (v3).\nFor more information, check the migration guide at https://a.co/7PzMCcy\n(Use `node --trace-warnings ...` to show where the warning was created)\n',
    lvl: 'error',
    ts: 1687803528345,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  port: 4005,\n  default: true,\n  host: '172.33.32.107',\n  save: true,\n  name: 'default',\n  dir: '/home/ec2-user/data/env-db',\n  registry: [AsyncFunction (anonymous)],\n  selvaOptions: [\n    'FIND_INDICES_MAX',\n    '100',\n    'FIND_INDEXING_INTERVAL',\n    '1000',\n    'FIND_INDEXING_ICB_UPDATE_INTERVAL',\n    '500',\n    'FIND_INDEXING_POPULARITY_AVE_PERIOD',\n    '3'\n  ],\n  modules: [ 'selva' ]\n}\n",
    lvl: 'info',
    ts: 1687803528385,
  },
  {
    srvc: 'env-db-sub-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '(node:1725) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.\n\nPlease migrate your code to use AWS SDK for JavaScript (v3).\nFor more information, check the migration guide at https://a.co/7PzMCcy\n(Use `node --trace-warnings ...` to show where the warning was created)\n',
    lvl: 'error',
    ts: 1687803528415,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: '(node:1705) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.\n\nPlease migrate your code to use AWS SDK for JavaScript (v3).\nFor more information, check the migration guide at https://a.co/7PzMCcy\n(Use `node --trace-warnings ...` to show where the warning was created)\n',
    lvl: 'error',
    ts: 1687803528419,
  },
  {
    srvc: 'env-db-sub-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  port: 4001,\n  host: '172.33.32.107',\n  registry: [AsyncFunction (anonymous)],\n  dir: '/home/ec2-user/services/env-db-sub-registry/tmp',\n  modules: [ 'selva' ],\n  name: 'subscriptionRegistry'\n}\n",
    lvl: 'info',
    ts: 1687803528440,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  port: 4004,\n  default: false,\n  host: '172.33.32.107',\n  save: true,\n  name: 'config',\n  dir: '/home/ec2-user/data/env-config-db',\n  registry: [AsyncFunction (anonymous)],\n  selvaOptions: [\n    'FIND_INDICES_MAX',\n    '100',\n    'FIND_INDEXING_INTERVAL',\n    '1000',\n    'FIND_INDEXING_ICB_UPDATE_INTERVAL',\n    '500',\n    'FIND_INDEXING_POPULARITY_AVE_PERIOD',\n    '3'\n  ],\n  modules: [ 'selva' ]\n}\n",
    lvl: 'info',
    ts: 1687803528460,
  },
  {
    srvc: 'env-db-sub-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'ADDING SIGNAL HANDLERS\n',
    lvl: 'info',
    ts: 1687803528487,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'ADDING SIGNAL HANDLERS\n',
    lvl: 'info',
    ts: 1687803528522,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Hierarchy initialized and lua scripts loaded\n',
    lvl: 'info',
    ts: 1687803528525,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "Trying to initialize empty hierarchy { name: 'default', type: 'origin', port: 4005, host: '172.33.32.107' }\n",
    lvl: 'info',
    ts: 1687803528569,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'ADDING SIGNAL HANDLERS\n',
    lvl: 'info',
    ts: 1687803528571,
  },
  {
    srvc: 'env-db-sub-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Hierarchy initialized and lua scripts loaded\n',
    lvl: 'info',
    ts: 1687803528602,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "Trying to initialize empty hierarchy { name: 'config', type: 'origin', port: 4004, host: '172.33.32.107' }\n",
    lvl: 'info',
    ts: 1687803528629,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'ADDING SIGNAL HANDLERS\n',
    lvl: 'info',
    ts: 1687803528648,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Server is added to registry subscriptionManager subscriptionManager 172.33.32.107 4003\n',
    lvl: 'info',
    ts: 1687803529105,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    subType: 'bla',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "Empty hierarchy initialized [ 'root', 'UPDATED' ]\n",
    lvl: 'info',
    ts: 1687803529141,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Server is added to registry subscriptionRegistry subscriptionRegistry 172.33.32.107 4001\n',
    lvl: 'info',
    ts: 1687803529174,
  },
  {
    srvc: 'env-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Hierarchy initialized and lua scripts loaded\n',
    lvl: 'info',
    ts: 1687803529226,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Server is added to registry registry registry 172.33.32.107 4002\n',
    lvl: 'info',
    ts: 1687803529247,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "Empty hierarchy initialized [ 'root', 'UPDATED' ]\n",
    lvl: 'info',
    ts: 1687803529253,
  },
  {
    srvc: 'env-config-db',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Hierarchy initialized and lua scripts loaded\n',
    lvl: 'info',
    ts: 1687803529294,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Server is added to registry default origin 172.33.32.107 4005\n',
    lvl: 'info',
    ts: 1687803529312,
  },
  {
    srvc: 'env-db-registry',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Server is added to registry config origin 172.33.32.107 4004\n',
    lvl: 'info',
    ts: 1687803529368,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'ADDING SIGNAL HANDLERS\n',
    lvl: 'info',
    ts: 1687803529778,
  },
  {
    srvc: 'env-jobs',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'jobs: []\n',
    lvl: 'info',
    ts: 1687803529852,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'Time out (took longer then 15s)35c0b313be9b346e481428ba386d1817e3c07dc3d9b2587020c871287cce85c0\n',
    lvl: 'error',
    ts: 1687803545949,
  },
  {
    srvc: 'env-db-sub-manager',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: "{\n  '$db': 'metrics',\n  '$id': 'root',\n  trackUniqueOrigins: true,\n  '$includeMeta': true,\n  '$subscription': '35c0b313be9b346e481428ba386d1817e3c07dc3d9b2587020c871287cce85c0',\n  '$originDescriptors': {},\n  '$firstEval': true\n}\n",
    lvl: 'info',
    ts: 1687803545954,
  },
  {
    srvc: 'env-jobs',
    i: '0',
    mid: 'ma2c3ce4ad',
    url: '3.127.35.134',
    eid: 'enBBBFs9x0',
    msg: 'jobs: []\n',
    lvl: 'info',
    ts: 1687864333460,
  },
  {
    srvc: 'env-hub',
    i: '0',
    mid: 'ma7398cf92',
    url: '3.73.65.108',
    eid: 'enBBBFs9x0',
    msg: "{ name: 'demo', version: 3501681214638 }\n",
    lvl: 'error',
    ts: 1687864333486,
  },
]

export default meta

export const Default: StoryObj<typeof Logs> = {
  args: {
    data: test,
    groupByTime: 15,
  },
}
