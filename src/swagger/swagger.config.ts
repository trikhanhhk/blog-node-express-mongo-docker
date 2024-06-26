import { ParamIn } from '~/constants/enum'
import generateExampleFromDto from '~/decorator/controllerDecorator/generateProperties'
import { MetadataKeys } from '~/decorator/meta.keys'
import { IRouter } from '~/interface/router.interface'
import { IParameter } from '~/type/Parameter'

export const swaggerAutogen = (pathInfo: Record<string, any>) => {
  const swaggerDoc = {
    openapi: '3.0.0',
    info: {
      version: 'v1.0.0',
      title: 'Swagger Demo Project',
      description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
      {
        url: process.env.URI_APP,
        description: ''
      }
    ],
    paths: pathInfo,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  }
  return swaggerDoc
}

export const pathInfoAutogen = (
  pathInfo: Record<string, any>,
  basePath: string,
  path: string,
  parameters: IParameter[],
  method: string,
  handlerName: string | symbol,
  controllerClass: any
) => {
  if (!pathInfo[`${basePath}${path}`]) {
    pathInfo[`${basePath}${path}`] = {}
  }

  const requestBodyParam = parameters.find((param) => param.source === ParamIn.BODY)

  const router = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass).find(
    (router: IRouter) => router.handlerName === handlerName
  )

  console.log(`Router: [${handlerName as string}]`, router)

  const param1 = parameters
    .filter((param) => param.source !== ParamIn.BODY)
    .map((param) => ({
      name: param.type.name,
      in: param.source,
      required: param.required,
      schema: { type: param.type?.name.toLowerCase() || 'string' }
    }))

  const paramPathArr = router.path.split('/').filter((str: string) => str.startsWith(':'))

  const paramPath = paramPathArr.map((str: string) => ({
    name: str.replace(':', '')
  }))

  console.log(`paramPath: [${handlerName as string}]`, paramPathArr)
  pathInfo[`${basePath}${path}`][method] = {
    tags: [controllerClass.name],
    summary: `${method.toUpperCase()} ${path}`,
    operationId: handlerName,
    parameters: parameters
      .filter((param) => param.source !== ParamIn.BODY)
      .map((param) => ({
        name: param.type.name,
        in: param.source,
        required: param.required,
        schema: { type: param.type?.name.toLowerCase() || 'string' }
      })),
    requestBody: requestBodyParam
      ? {
          content: {
            'application/json': {
              example: generateExampleFromDto(requestBodyParam.type)
            }
          }
        }
      : undefined,
    responses: {}
  }
}
