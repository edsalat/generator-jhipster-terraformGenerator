const chalk = require('chalk');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const fsbase = require('fs');
module.exports = class extends BaseGenerator {
    get initializing() {

        return {
            //copy_config_from_gen(){
              //this.log('source ======' + this.templatePath('.yo-rc.json'));
             // this.log('destination ======' +  this.destinationPath('.yo-rc.json'));
             // this.log("========" + this.fs.copyTpl)
             // fsbase.copyFileSync(
             //   this.templatePath('.yo-rc.json'),
             //   this.destinationPath('.yo-rc.json')
             // ); 
            //},
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            
            copyYorc() {
                
                fsbase.copyFileSync(
                  this.templatePath('.yo-rc.json'),
                  this.destinationPath('.yo-rc.json')
                ); 
                 fsbase.copyFileSync(
                  this.templatePath('package.json'),
                  this.destinationPath('package.json')
                ); 
               
                this.log('copied yo ======') 
                //this.templateCp = function (source, destination) {
                 //    this.log('copy yo ======2222')
                 //   this.fs.copyTpl(
                 //       this.templatePath(source),
                 //       this.destinationPath(destination),
                 //       this
                 //   );
               // };
               // this.templateCp('.yo-rc.json', '.yo-rc.json');

            },
            
            readConfig() {
                 this.log('reading yo ======') 
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
          
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster terraformGenerator')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'Please provide application name',
                default: 'myApp'
            }
        ];
        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;
            const prompts2 = [
              {
                type: 'input',
                name: 'secGroupName',
                message: 'Please provide security group name',
                default: 'mid_' + this.props.appName
              }
            ];
            this.prompt(prompts2).then((props) => {
              this.props.secGroupName = props.secGroupName;
              done();
            });
        });
    }

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        //read config from .yo-rc.json
        
        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;
         
        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

        // variable from questions
        this.appName = this.props.appName;
        this.secGroupName = this.props.secGroupName;


        // copying templates
        this.template('datasources.tf', 'datasources.tf');
        this.template('main.tf','main.tf')
        this.template('SEC_GROUP_NAME.tf', this.secGroupName)
        this.template('variables.tf','variables.tf')
              
    }

    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    }

    end() {
        this.log('End of terraformGenerator generator');
    }
};
