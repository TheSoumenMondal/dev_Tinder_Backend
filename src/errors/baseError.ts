export class BaseError extends Error {
  public statusCode?: number;
  constructor(message: string, statusCode?: number, name?: string) {
    super(message);
    this.name = name || new.target.name;
    this.statusCode = statusCode;
  }
}
