const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: 'Dokumentacja API - MojSamochod',
        description: 'API do zarządzania samochodami i warsztatami',
    },
    baseDir: __dirname,
    filesPattern: './routes/**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
};

const setupSwagger = (app) => {
    expressJSDocSwagger(app)(options);
};

module.exports = setupSwagger;
