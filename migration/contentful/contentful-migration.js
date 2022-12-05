const inquirer = require('inquirer');
const schema = require('./cli-prompt-schema');
const fileManager = require('./migration-file-manager');
const contentfulExport = require('./contentful-export');
const contentfulImport = require('./contentful-import');

/**
 * Corra CLI for contentful migation b/w environments
 */
const run = async () => {
    //create directory to store the data
    fileManager.createDirectory();

    //export
    await inquirer.prompt(schema.export).then(
        async (answers) => await contentfulExport(answers)
    );
    //import
    await inquirer.prompt(schema.import).then(
        async (answers) => await contentfulImport(answers)
    );
}
//start migration
run();