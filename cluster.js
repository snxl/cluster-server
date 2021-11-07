const cluster = require("cluster")
const os = require('os')

if (cluster.isMaster) {
    const number_of_cpus = os.cpus().length;
   
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking Server for ${number_of_cpus} CPUs\n`);

    for (let index = 0; index < number_of_cpus; index++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        }
    });

} else {
    require("./app");
}