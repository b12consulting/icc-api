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

export class iccPatientApi {
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

  bulkUpdatePatients(body?: Array<models.PatientDto>): Promise<Array<models.IdWithRevDto> | any> {
    let _body = null
    _body = body

    const _url = this.host + "/patient/bulk" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.IdWithRevDto(it)))
      .catch(err => this.handleError(err))
  }
  countOfPatients(hcPartyId: string): Promise<models.ContentDto | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/hcParty/{hcPartyId}/count".replace("{hcPartyId}", hcPartyId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.ContentDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  createPatient(body?: models.PatientDto): Promise<models.PatientDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/patient" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  deletePatient(patientIds: string): Promise<Array<string> | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/{patientIds}".replace("{patientIds}", patientIds + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("DELETE", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  filterBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    skip?: number,
    sort?: string,
    desc?: boolean,
    body?: models.FilterChain
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/patient/filter" +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "") +
      (skip ? "&skip=" + skip : "") +
      (sort ? "&sort=" + sort : "") +
      (desc ? "&desc=" + desc : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  findByAccessLogUserAfterDate(externalId: string): Promise<models.PatientDto | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/byExternalId/{externalId}".replace("{externalId}", externalId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  findByAccessLogUserAfterDate_1(
    userId: string,
    accessType?: string,
    startDate?: number,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/byAccess/{userId}".replace("{userId}", userId + "") +
      "?ts=" +
      new Date().getTime() +
      (accessType ? "&accessType=" + accessType : "") +
      (startDate ? "&startDate=" + startDate : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  findByNameBirthSsinAuto(
    healthcarePartyId?: string,
    filterValue?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/byNameBirthSsinAuto" +
      "?ts=" +
      new Date().getTime() +
      (healthcarePartyId ? "&healthcarePartyId=" + healthcarePartyId : "") +
      (filterValue ? "&filterValue=" + filterValue : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "") +
      (sortDirection ? "&sortDirection=" + sortDirection : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  fuzzySearch(
    firstName?: string,
    lastName?: string,
    dateOfBirth?: number
  ): Promise<Array<models.PatientDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/fuzzy" +
      "?ts=" +
      new Date().getTime() +
      (firstName ? "&firstName=" + firstName : "") +
      (lastName ? "&lastName=" + lastName : "") +
      (dateOfBirth ? "&dateOfBirth=" + dateOfBirth : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.PatientDto(it)))
      .catch(err => this.handleError(err))
  }
  getPatient(patientId: string): Promise<models.PatientDto | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/{patientId}".replace("{patientId}", patientId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  getPatients(body?: models.ListOfIdsDto): Promise<Array<models.PatientDto> | any> {
    let _body = null
    _body = body

    const _url = this.host + "/patient/byIds" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.PatientDto(it)))
      .catch(err => this.handleError(err))
  }
  listDeletedPatients(
    firstName?: string,
    lastName?: string
  ): Promise<Array<models.PatientPaginatedList> | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/deleted/by_name" +
      "?ts=" +
      new Date().getTime() +
      (firstName ? "&firstName=" + firstName : "") +
      (lastName ? "&lastName=" + lastName : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.PatientPaginatedList(it)))
      .catch(err => this.handleError(err))
  }
  listDeletedPatients_2(
    startDate?: number,
    endDate?: number,
    desc?: boolean,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/deleted/by_date" +
      "?ts=" +
      new Date().getTime() +
      (startDate ? "&startDate=" + startDate : "") +
      (endDate ? "&endDate=" + endDate : "") +
      (desc ? "&desc=" + desc : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listOfMergesAfter(date: number): Promise<Array<models.PatientDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/merges/{date}".replace("{date}", date + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.PatientDto(it)))
      .catch(err => this.handleError(err))
  }
  listOfPatientsModifiedAfter(
    date: number,
    startKey?: number,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/modifiedAfter/{date}".replace("{date}", date + "") +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listPatients(
    hcPartyId?: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (sortField ? "&sortField=" + sortField : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "") +
      (sortDirection ? "&sortDirection=" + sortDirection : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listPatientsByHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/hcParty/{hcPartyId}".replace("{hcPartyId}", hcPartyId + "") +
      "?ts=" +
      new Date().getTime() +
      (sortField ? "&sortField=" + sortField : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "") +
      (sortDirection ? "&sortDirection=" + sortDirection : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listPatientsIds(
    hcPartyId?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/idsPages" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  listPatientsOfHcParty(
    hcPartyId: string,
    sortField?: string,
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    sortDirection?: string
  ): Promise<models.PatientPaginatedList | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/ofHcParty/{hcPartyId}".replace("{hcPartyId}", hcPartyId + "") +
      "?ts=" +
      new Date().getTime() +
      (sortField ? "&sortField=" + sortField : "") +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "") +
      (sortDirection ? "&sortDirection=" + sortDirection : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.PatientPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  matchBy(body?: models.Filter): Promise<Array<string> | any> {
    let _body = null
    _body = body

    const _url = this.host + "/patient/match" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  mergeInto(toId: string, fromIds: string): Promise<models.PatientDto | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/mergeInto/{toId}/from/{fromIds}"
        .replace("{toId}", toId + "")
        .replace("{fromIds}", fromIds + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  modifyPatient(body?: models.PatientDto): Promise<models.PatientDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/patient" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  modifyPatientReferral(
    patientId: string,
    referralId: string,
    start?: number,
    end?: number
  ): Promise<models.PatientDto | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/{patientId}/referral/{referralId}"
        .replace("{patientId}", patientId + "")
        .replace("{referralId}", referralId + "") +
      "?ts=" +
      new Date().getTime() +
      (start ? "&start=" + start : "") +
      (end ? "&end=" + end : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  newDelegations(
    patientId: string,
    body?: Array<models.DelegationDto>
  ): Promise<models.PatientDto | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/patient/{patientId}/delegate".replace("{patientId}", patientId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.PatientDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  undeletePatient(patientIds: string): Promise<Array<string> | any> {
    let _body = null

    const _url =
      this.host +
      "/patient/undelete/{patientIds}".replace("{patientIds}", patientIds + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
}
