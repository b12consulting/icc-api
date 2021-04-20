/**
 * iCure Cloud API Documentation
 * Spring shop sample application
 *
 * OpenAPI spec version: v0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Attachment } from './Attachment'
import { RevisionInfo } from './RevisionInfo'

export class EntityTemplate {
  constructor(json: JSON | any) {
    Object.assign(this as EntityTemplate, json)
  }

  id?: string
  rev?: string
  deleted?: number
  userId?: string
  descr?: string
  keywords?: Array<string>
  entityType?: string
  subType?: string
  isDefaultTemplate?: boolean
  entity?: Array<{ [key: string]: any }>
  attachments?: { [key: string]: Attachment }
  revsInfo?: Array<RevisionInfo>
  conflicts?: Array<string>
  revHistory?: { [key: string]: string }
  javaType?: string
}
