# async azure table storage
An async wrapper for azure table storage based on the [Microsoft Azure Storage SDK](https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs#create-an-azure-service-account)

## Install 📦

```bash
npm install async-azure-table-storage
````

## Optional Environment Variables: 
- AZURE_STORAGE_ACCOUNT
- AZURE_STORAGE_ACCOUNT_KEY

## Examples

> [Example 1](https://github.com/dewhurstwill/async-azure-table-storage/blob/main/example-1.js)

> [Example 2](https://github.com/dewhurstwill/async-azure-table-storage/blob/main/example-2.js)

## Functions

| Name | Example import | Required parameters |
|-|-|-|
| createTable | `const { createTable } = require('async-azure-table-storage');` | tableSvc, tableName |
| insertEntity | `const { insertEntity } = require('async-azure-table-storage');` | tableSvc, tableName, task |
| replaceEntity | `const { replaceEntity } = require('async-azure-table-storage');` | tableSvc, tableName, task |
| insertOrMergeEntity | `const { insertOrMergeEntity } = require('async-azure-table-storage');` | tableSvc, tableName, task |
| insertOrReplaceEntity | `const { insertOrReplaceEntity } = require('async-azure-table-storage');` | tableSvc, tableName, task |
| retrieveEntity | `const { retrieveEntity } = require('async-azure-table-storage');` | tableSvc, tableName, partitionKey, rowKey |
| queryEntities | `const { queryEntities } = require('async-azure-table-storage');` | tableSvc, tableName, query |
| deleteEntity | `const { deleteEntity } = require('async-azure-table-storage');` | tableSvc, tableName, task |
| deleteTable | `const { deleteTable } = require('async-azure-table-storage');` | tableSvc, tableName |
| cleanEntities | `const { cleanEntities } = require('async-azure-table-storage');` | entities |
