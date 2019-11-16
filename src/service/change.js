import Axios from './request'

export function queryChangeData ({ project }) {
  return Axios.post('changeData', {
    project
  })
}
