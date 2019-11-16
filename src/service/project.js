import Axios from './request'

export function queryProject ({ project }) {
  return Axios.post('queryProject', {
    project
  })
}
