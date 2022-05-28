import { createDockerDesktopClient } from '@docker/extension-api-client';
import { DockerDesktopClient, ExecResult } from '@docker/extension-api-client-types/dist/v1';


export class DockerData {
  public canConstruct: boolean = false;
  ddClient: DockerDesktopClient | null = null;
  constructor() {

    try {
      this.ddClient = createDockerDesktopClient();

    }
    catch (e) {
      console.log("in dockerdata constructor", e);
      return;
    }

    (window as any).ANDREITEST = this.ddClient;
    this.canConstruct = true;
    // const result = ddClient.docker.cli.exec('info', [
    //   '--format',
    //   '"{{json .}}"',
    // ]).then(result => {
    //   console.log('!!!!!!obtained0'); 
    //   console.log('obtained1' ,result);
    //   console.log('obtained2' ,result.parseJsonObject());
    // });
    // ddClient.docker.listContainers().then(result => {
    //   console.log('!!!!!!containers');
    //   console.log(result);
    // });
    // ddClient.docker.listImages().then(result => {
    //   console.log('!!!!!!images');
    //   var r=result as Array<any>;
    //   ddClient.desktopUI.toast.success("images" + (r?.length||0));
    //   console.log(result);
    // });
    //ddClient.desktopUI.toast.success("DockerData");
  }
  public execCli(cmd: string, args: string[]): Promise<ExecResult> {
    console.log('executing command ', cmd);
    console.log('executing args', args);
    return this.ddClient!.docker.cli.exec(cmd, args);
  }
  }
