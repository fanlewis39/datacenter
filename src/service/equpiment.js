import Axios from './request'

export function queryEquipmentData ({ project }) {
  return Axios.post('equipmentData', {
    project
  })
}
