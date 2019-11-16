import Mockjs from 'mockjs'
import { baseUrl } from '../service/request'

import tasks from './tasks'
import historyProgress from './historyProgress'
import inspectionData from './inspectionData'
import changeData from './changeData'
import equipmentData from './equipmentData'

Mockjs.mock(baseUrl + 'queryProject', {
  number: '',
  address: '',
  author: '系统管理员',
  name: '深圳市北线引水工程安全隐患整改项目',
  start: '2019-10-15 00:00:00.0',
  state: 'success',
  plan: 'c86390a9-7ffe-438d-9707-8343c3f48e20'
})

Mockjs.mock(baseUrl + 'queryAllTasks', tasks)

Mockjs.mock(baseUrl + 'historyProgress', historyProgress)

Mockjs.mock(baseUrl + 'equipmentData', Mockjs.mock(equipmentData).data)

Mockjs.mock(baseUrl + 'inspectionData', Mockjs.mock(inspectionData).data)

Mockjs.mock(baseUrl + 'changeData', Mockjs.mock(changeData).data)
