export class Error{
  Message:string;
  ErrorCode:number;

  constructor(Message: string, ErrorCode: number) {
    this.Message = Message;
    this.ErrorCode = ErrorCode;
  }
}
