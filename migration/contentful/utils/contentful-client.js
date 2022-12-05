const contentful = require("contentful");
const config = require('../cli-constants');

module.exports = (environment) => {
    return contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: config.contentfulConfig.spaceId,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: config.contentfulConfig.accessToken,
        environment,
        include: 10
    });
}