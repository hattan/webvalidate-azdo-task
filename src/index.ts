import tl = require('azure-pipelines-task-lib/task');
import { ToolRunner, IExecSyncOptions, IExecSyncResult, IExecOptions } from "azure-pipelines-task-lib/toolrunner";
import path = require('path');

async function run() {
    try {
        const server: string | undefined = tl.getInput('server', true);
        const filePath: string | undefined = tl.getInput('files', true);
        const fileName = path.basename(filePath);
        const folder = path.dirname(filePath);

        console.log('server', server);
        console.log('fileName', fileName);
        console.log('folder', folder);    

        if (server == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }


        const docker = tl.tool(tl.which("docker"))
               .arg("run")
               .arg("-v")
               .arg(`${folder}:/app/TestFiles`)
               .arg("retaildevcrew/webvalidate:beta")
               .arg("--server")
               .arg(server)
               .arg("--files")
               .arg(fileName)        
   
        await docker.exec();

    }
    catch (err) {
       // tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();