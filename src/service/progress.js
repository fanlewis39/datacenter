import Axios from './request'

export function queryHistoryProgress ({ project }) {
  return Axios.post('historyProgress', {
    project
  })
}
