import tl = require('azure-pipelines-task-lib/task');
import { ToolRunner, IExecSyncOptions, IExecSyncResult, IExecOptions } from "azure-pipelines-task-lib/toolrunner";


async function run() {
    try {
        const inputString: string | undefined = tl.getInput('samplestring', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const docker = tl.tool(tl.which("docker"))
               .arg("run")
               .arg("retaildevcrew/webvalidate")
               .arg("--host")
               .arg("https://www.microsoft.com")
               .arg("--files")
               .arg("msft.json")
               .arg("--version");               

   
        await docker.exec();
        console.log('Hello', inputString);
    }
    catch (err) {
        //tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();