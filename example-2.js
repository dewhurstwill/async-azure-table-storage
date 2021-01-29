const {
    createTableService,
    TableUtilities,
    TableQuery
} = require('azure-storage');

const {
    queryEntities,
    cleanEntities
} = require('./index');

// https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs#create-an-azure-service-account
const tableSvc = createTableService();

// Example function to query multiple entities
const exampleFunction = async (table) => {
    // Create Query
    const query = new TableQuery().top(1).where('RowKey eq ?', '12345');

    // Make request
    const response = await queryEntities(tableSvc, table, query);


    // Clean response
    const cleanResponse = cleanEntities(response);
    
    console.log(cleanResponse);
};

exampleFunction('someTableName');