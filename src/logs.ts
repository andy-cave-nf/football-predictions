export interface Logs {
  info(msg: string): void;
}

export class NullLog implements Logs {
  info(_msg: string): void {}
}

export class ConsoleLog implements Logs {
  info(msg: string): void {
    console.log(new Date().toISOString() + ' ' + '(INFO):' + msg);
  }
}
