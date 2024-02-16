import codegen from '@cosmwasm/ts-codegen'
import path from 'path'
import fs from 'fs'
// const path = require("path");
// const fs = require("fs");

const contractsDir = path.join(__dirname, '..', 'contracts')
const schemaDir = path.join(contractsDir, 'schema')
const outputDir = path.join(contractsDir, 'generated')

const contracts = fs
  .readdirSync(schemaDir, { withFileTypes: true })
  .filter((c) => c.isDirectory())
  .map((c) => ({
    name: c.name,
    dir: path.join(schemaDir, c.name),
  }))

contracts.forEach((contract) => {
  const outPath = path.join(outputDir, contract.name)
  codegen({
    contracts: [contract],
    outPath,
    options: {
      bundle: {
        bundleFile: 'index.ts',
        scope: 'contracts',
      },
      messageComposer: {
        enabled: true,
      },
      msgBuilder: {
        enabled: true,
      },
      reactQuery: {
        enabled: true,
        optionalClient: true,
        version: 'v4',
        mutations: true,
        queryKeys: true,
        queryFactory: true,
      },
      types: {
        aliasExecuteMsg: true,
        // aliasQueryMsg: true,
      },
    },
  }).then(() => {
    console.log('✨ Typescript code is generated successfully!')
  })
})
