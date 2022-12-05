const config = require('./cli-constants')
/**
 * Prompt command to get user input for migration
 * https://www.npmjs.com/package/inquirer
 */
const schema = {
    export: [{
        name: 'exportEnvironmentId',
        message: 'Choose an environment for export content',
        type: 'list',
        choices: ['dev', 'staging', 'master']
    }, {
        name: 'queryEntries',
        message: 'Enter the Entry ID (eg: 5yzHdn4QWiY5TEbkeeKxxx)',
        validate: function (input) {
            const done = this.async();
            if (!input.trim() && !input.trim().match(' ')) {
                done('Enter a valid Entry ID (eg: 5yzHdn4QWiY5TEbkeeKpxxx)', false)
                return;
            }
            done(null, true)
        }
    }, {
        name: 'exportAssets',
        message: 'Do you want to export assets?',
        type: 'list',
        choices: ['Yes', 'No']
    }],
    import: [{
        name: 'shouldImport',
        message: `Continue import the content?`,
        type: 'list',
        choices: ['Yes', 'No']
    }, {
        name: 'importEnvironmentId',
        message: 'Choose an environment for import content',
        type: 'list',
        choices: (answer) => {
            //filter out the export env to prevent pushing the data to same env
            return ['dev', 'staging', 'master'].filter(env => env !== config.exportEnv);
        },
        when: (answer) => {
            return answer.shouldImport === 'Yes';
        }
    }]
}
module.exports = schema