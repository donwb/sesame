function setDevelopmentConfig(){
    // These are just examples, insert you info here
    DatabaseConfig.port = 31597;
    DatabaseConfig.host = 'ds031597.mongolab.com';
    DatabaseConfig.name = 'sesame';
    DatabaseConfig.user = 'app_sesame';
    DatabaseConfig.pass = '8787122';

    EnvConfig.port = 3000;
};

function setProductionConfig(){
    DatabaseConfig.port = 31597;
    DatabaseConfig.host = 'ds031597.mongolab.com';
    DatabaseConfig.name = 'sesame';
    DatabaseConfig.user = 'app_sesame';
    DatabaseConfig.pass = '8787122';

    EnvConfig.port = 3000;
}

var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

var EnvConfig = {
    port        : Number
};

module.exports.DatabaseConfig = DatabaseConfig;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;