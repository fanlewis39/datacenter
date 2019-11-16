import Axios from './request'

export function queryInspectionData ({ project }) {
  return Axios.post('inspectionData', {
    project
  })
}
