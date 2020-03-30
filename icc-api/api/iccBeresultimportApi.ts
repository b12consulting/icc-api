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
import { XHR } from "./XHR"
import { ContactDto } from "../model/ContactDto"
import { ResultInfoDto } from "../model/ResultInfoDto"

export class iccBeresultimportApi {
  host: string
  headers: Array<XHR.Header>
  fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>

  constructor(
    host: string,
    headers: any,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  ) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
    this.fetchImpl = fetchImpl
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.Data) {
    if (e.status == 401) throw Error("auth-failed")
    else throw Error("api-error" + e.status)
  }

  /**
   *
   * @summary Can we handle this document
   * @param id
   * @param enckeys
   */
  canHandle(id: string, enckeys: string): Promise<boolean | any> {
    let _body = null

    const _url =
      this.host +
      `/be_result_import/canhandle/${encodeURIComponent(String(id))}` +
      "?ts=" +
      new Date().getTime() +
      (enckeys ? "&enckeys=" + encodeURIComponent(String(enckeys)) : "")
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => JSON.parse(JSON.stringify(doc.body)))
      .catch(err => this.handleError(err))
  }

  /**
   *
   * @summary import document
   * @param documentId
   * @param hcpId
   * @param language
   * @param protocolIds
   * @param formIds
   * @param planOfActionId
   * @param enckeys
   * @param ctc
   */
  doImport(
    documentId: string,
    hcpId: string,
    language: string,
    protocolIds: string,
    formIds: string,
    planOfActionId: string,
    enckeys: string,
    ctc: ContactDto
  ): Promise<ContactDto | any> {
    let _body = null

    const _url =
      this.host +
      `/be_result_import/import/${encodeURIComponent(String(documentId))}/${encodeURIComponent(
        String(hcpId)
      )}/${encodeURIComponent(String(language))}` +
      "?ts=" +
      new Date().getTime() +
      (protocolIds ? "&protocolIds=" + encodeURIComponent(String(protocolIds)) : "") +
      (formIds ? "&formIds=" + encodeURIComponent(String(formIds)) : "") +
      (planOfActionId ? "&planOfActionId=" + encodeURIComponent(String(planOfActionId)) : "") +
      (enckeys ? "&enckeys=" + encodeURIComponent(String(enckeys)) : "") +
      (ctc ? "&ctc=" + encodeURIComponent(String(ctc)) : "")
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => new ContactDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }

  /**
   *
   * @summary Extract general infos from document
   * @param id
   * @param language
   * @param enckeys
   * @param full
   */
  getInfos(
    id: string,
    language: string,
    enckeys: string,
    full?: boolean
  ): Promise<Array<ResultInfoDto> | any> {
    let _body = null

    const _url =
      this.host +
      `/be_result_import/infos/${encodeURIComponent(String(id))}` +
      "?ts=" +
      new Date().getTime() +
      (language ? "&language=" + encodeURIComponent(String(language)) : "") +
      (enckeys ? "&enckeys=" + encodeURIComponent(String(enckeys)) : "") +
      (full ? "&full=" + encodeURIComponent(String(full)) : "")
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => (doc.body as Array<JSON>).map(it => new ResultInfoDto(it)))
      .catch(err => this.handleError(err))
  }
}
