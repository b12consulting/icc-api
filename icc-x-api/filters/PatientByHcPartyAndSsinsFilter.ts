/*
 * Copyright (c) 2020. Taktik SA, All rights reserved.
 */
import { AbstractFilterPatient } from '../../icc-api/model/AbstractFilterPatient'

export class PatientByHcPartyAndSsinsFilter extends AbstractFilterPatient {
  constructor(json: JSON | any) {
    super(json)
  }

  healthcarePartyId?: string
  ssins?: string[]

  $type = 'PatientByHcPartyAndSsinsFilter'
}