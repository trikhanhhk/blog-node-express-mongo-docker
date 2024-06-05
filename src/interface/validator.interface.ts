export default interface IValidator {
  handlerName: string | symbol
  type: any
  skipMissingProperties: boolean
}
