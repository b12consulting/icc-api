/**
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { XHR } from "./XHR"
import * as models from "../model/models"

export class iccGenericApi {
  host: string
  headers: Array<XHR.Header>
  constructor(host: string, headers: any) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.Data) {
    if (e.status == 401) throw Error("auth-failed")
    else throw Error("api-error" + e.status)
  }

  deleteDoc(className: string, ids: string): Promise<any | Boolean> {
    let _body = null

    const _url =
      this.host +
      "/generic/doc/{className}/{ids}"
        .replace("{className}", className + "")
        .replace("{ids}", ids + "") +
      "?ts=" +
      new Date().getTime()

    return XHR.sendCommand("DELETE", _url, this.headers, _body)
      .then(doc => (doc.contentType.startsWith("application/octet-stream") ? doc.body : true))
      .catch(err => this.handleError(err))
  }
  getDoc(className: string, id: string): Promise<models.StoredDto | any> {
    let _body = null

    const _url =
      this.host +
      "/generic/doc/{className}/{id}"
        .replace("{className}", className + "")
        .replace("{id}", id + "") +
      "?ts=" +
      new Date().getTime()

    return XHR.sendCommand("GET", _url, this.headers, _body)
      .then(doc => new models.StoredDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listDocs(className: string): Promise<Array<any> | any> {
    let _body = null

    const _url =
      this.host +
      "/generic/doc/{className}".replace("{className}", className + "") +
      "?ts=" +
      new Date().getTime()

    return XHR.sendCommand("GET", _url, this.headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  listEnum(className: string): Promise<Array<string> | any> {
    let _body = null

    const _url =
      this.host +
      "/generic/enum/{className}".replace("{className}", className + "") +
      "?ts=" +
      new Date().getTime()

    return XHR.sendCommand("GET", _url, this.headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
}
