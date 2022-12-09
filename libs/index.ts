const HTTP_RESPONSES = require('./http-responses');
const saltDifficult = require('./salt');
const { URL, authUrl } = require('./url');
const { pigLangDefaultCategories, enLangDefaultCategories } = require('./categoriesMock')

module.exports = {
    HTTP_RESPONSES,
    saltDifficult,
    URL,
    authUrl,
    pigLangDefaultCategories,
    enLangDefaultCategories
};
