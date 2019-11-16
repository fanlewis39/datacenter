import Axios from './request'

export function queryAllTasks ({ plan }) {
  return Axios.post('queryAllTasks', {
    plan
  })
}
