// Create an azure storage table
function createTable(tableSvc, tableName) {
    return new Promise((resolve, reject) => {
        tableSvc.createTableIfNotExists(tableName, (error, result, response) => {
            if (!error) {
		resolve(result);
            } else {
                reject(error);
            }
          });
    });
};

// Insert an entity
function insertEntity(tableSvc, tableName, task){
    return new Promise((resolve, reject) => {
        tableSvc.insertEntity(tableName, task, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Replace an entity
function replaceEntity(tableSvc,tableName, updatedTask) {
    return new Promise((resolve, reject) => {
        tableSvc.replaceEntity(tableName, updatedTask, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Merge an entity
function mergeEntity(tableSvc,tableName, updatedTask) {
    return new Promise((resolve, reject) => {
        tableSvc.mergeEntity(tableName, updatedTask, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Insert or replace an entity
function insertOrReplaceEntity(tableSvc,tableName, updatedTask) {
    return new Promise((resolve, reject) => {
        tableSvc.insertOrReplaceEntity(tableName, updatedTask, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Insert or merge an entity
function insertOrMergeEntity(tableSvc,tableName, updatedTask) {
    return new Promise((resolve, reject) => {
        tableSvc.insertOrMergeEntity(tableName, updatedTask, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Retrieve a single entity
function retrieveEntity(tableSvc, tableName, partitionKey, rowKey) {
    return new Promise((resolve, reject) => {
        tableSvc.retrieveEntity(tableName, partitionKey, rowKey, (error, result, response) => {
            if(!error){
                resolve({
                    result,
                    response
                });
            } else {
                reject(error);
            }
        });
    });
};

// Helper for query entities, to support large requests which have a continuation token
function queryEntitiesSegmented (tableSvc, tableName, tableQuery, continuationToken) {
    return new Promise((resolve, reject) => {
        tableSvc.queryEntities(tableName, tableQuery, continuationToken, (error, results) => {
            if (!error) {
                resolve(results);
            } else {
                reject(error);    
            }
        });
    });
};

// Queries all entities based on table query input
function queryEntities (tableSvc, tableName, tableQuery) {
    return new Promise(async (resolve, reject) => {
        let continuationToken = null;
        let allQueryRecords = [];
        do {
            const results = await queryEntitiesSegmented(tableSvc, tableName, tableQuery, continuationToken);
            continuationToken = results.continuationToken;
            allQueryRecords.push.apply(allQueryRecords, results.entries);
        }
        while (continuationToken != null);
        resolve(allQueryRecords);
    })
    
};

// Deletes table entities
function deleteEntity(tableSvc, tableName, task) {
    return new Promise((resolve, reject) => {
        tableSvc.deleteEntity(tableName, task, (error, result, response) => {
            if(!error) {
              resolve({
                  result,
                  response
              });
            } else {
                reject(error);
            }
        });
    });
};

// Deletes azure tables
function deleteTable(tableSvc, tableName) {
    return new Promise((resolve, reject) => {
        tableSvc.deleteTable(tableName, (error, result, response) => {
            if(!error) {
              resolve({
                  result,
                  response
              });
            } else {
                reject(error);
            }
        });
    });
};

// Clean entities returned from queryEntities
// Removes .metadata and _
function cleanEntities(entities) {
    return entities.map(row => {
      let cleanRow = {};
      const keyArray = Object.keys(row);
      keyArray.forEach(key => {
        if (!(key.startsWith("."))) {
          cleanRow[`${key}`] = row[key]["_"];
        }
      });
      return(cleanRow);
    });
};

// Exports
module.exports = {
  createTable,
  replaceEntity,
  mergeEntity,
  retrieveEntity,
  queryEntities,
  deleteEntity,
  deleteTable,
  cleanEntities,
  insertOrMergeEntity,
  insertOrReplaceEntity
};
