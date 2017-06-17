const fs = require('fs');
const yaml = require('js-yaml');

const promiseVarsByUuid = new Promise(resVarsByUuid => {
    fs.readFile("vars_by_uuid.yml","utf8", (err,file)=> {
        resVarsByUuid(yaml.load(file))
    })
})
const promiseTasks = new Promise((resTasks, rej) => {
    var tasks = {}
    fs.readdir("./tasks", (err, files) => {
        const promisedFiles = files.map(filename => {
            return new Promise((resFile, rejFile) => {
                fs.readFile(`tasks/${filename}`, 'utf8', (err, file) => {
                    let message = yaml.load(file);
                    tasks[message.task] = message
                    resFile();
                })
            });
        });
        Promise.all(promisedFiles).then(() => {
            resTasks(tasks);
        })
    })
})
const pipeline = {}
const promiseResources = new Promise((resResources, rej) => {
    var resources = []
    fs.readdir("./resources", (err, files) => {
        const promisedFiles = files.map(filename => {
            return new Promise((resFile, rejFile) => {
                fs.readFile(`resources/${filename}`, 'utf8', (err, file) => {
                    let message = yaml.load(file,"DEFAULT_FULL_SCHEMA");
                    resources.push(message)
                    resFile();
                })
            });
        });
        Promise.all(promisedFiles).then(() => {
            pipeline.resources = resources
            resResources(resources);
        })
    })
})
const promiseResourceTypes = new Promise((resResourcesTypes, rej) => {
    var resourceTypes = []
    fs.readdir("./resource_types", (err, files) => {
        const promisedFiles = files.map(filename => {
            return new Promise((resFile, rejFile) => {
                fs.readFile(`resource_types/${filename}`, 'utf8', (err, file) => {
                    let message = yaml.load(file);
                    resourceTypes.push(message)
                    resFile();
                })
            });
        });
        Promise.all(promisedFiles).then(() => {
            pipeline.resource_types = resourceTypes
            resResourcesTypes(resourceTypes);
        })
    })
})
const promiseJobs = new Promise((resJobs, rej) => {
    var jobs = []
    fs.readdir("./jobs", (err, files) => {
        const promisedFiles = files.map(filename => {
            return new Promise((resFile, rejFile) => {
                fs.readFile(`jobs/${filename}`, 'utf8', (err, file) => {
                    let message = yaml.load(file);
                    jobs.push(message)
                    resFile();
                })
            });
        });
        Promise.all(promisedFiles).then(() => {
            resJobs(jobs);
        })
    })
}).then(jobs => {

    return promiseTasks.then(tasks => {
        pipeline.jobs = jobs.map(job => {
            job.plan = job.plan.map(step => {
                if (undefined != step.task) {
                    return tasks[step.task]
                }
                return step
            })
            return job
        })

    })
})
Promise.all([promiseJobs, promiseResources, promiseResourceTypes]).then(() => {
    promiseVarsByUuid.then(varsByUuid=> {
        let message = yaml.safeDump(pipeline,"DEFAULT_FULL_SCHEMA");
        Object.keys(varsByUuid).map(key => {
            message = message.replace(new RegExp(key, "g"),`{{${varsByUuid[key]}}}`)
        })
        console.log(message)
        fs.writeFile("pipeline.yml",message,()=>{})
    })


})


