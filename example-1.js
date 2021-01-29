const {
    createTableService,
    TableUtilities
} = require('azure-storage');

const {
    createTable,
    insertEntity,
    replaceEntity,
    deleteEntity,
    deleteTable
} = require('./index');

const entGen = TableUtilities.entityGenerator;

// https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs#create-an-azure-service-account
const tableSvc = createTableService();

// Example to create, read, update and delete one entity
const exampleFunction = async (table) => {
    // Create table
    await createTable(tableSvc, table);

    const partitionKey = 'Test';
    const rowKey = 'Test';

    // Create task
    const task = {
        PartitionKey: entGen.String(partitionKey),
        RowKey: entGen.String(rowKey),
    };

    // Insert entity
    await insertEntity(tableSvc, table, task);

    // Retrieve one entity
    const response = await retrieveEntity(tableSvc, table, partitionKey, rowKey);
    console.log(response);

    // Replace one entity
    await replaceEntity(tableSvc, table, {
        ...task,
        testkey: entGen.String('testValue')
    });

    // Retrieve updated entity
    const responseAfterReplace = await retrieveEntity(tableSvc, table, partitionKey, rowKey);
    console.log(responseAfterReplace);

    // Delete entity
    await deleteEntity(tableSvc, table, {
        ...task,
        testkey: entGen.String('testValue')
    });

    // Delete Table
    await deleteTable(tableSvc, table);
};

exampleFunction('someTableName');