import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

import { queryProject } from '../service/project'
import { queryAllTasks } from '../service/tasks'
import { queryHistoryProgress } from '../service/progress'
import { queryInspectionData } from '../service/quality'
import { queryChangeData } from '../service/change'
import { queryEquipmentData } from '../service/equpiment'

import {
  fillObject,
  transformTree,
  deepClone,
  deepTreeCount,
  groupByProps
} from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      height: window.innerHeight,
      project: '11e9-ef3a-a8fe721e-a428-b5aaf2433b04',
      plan: '',
      name: '',
      tasks: [],
      historyProgress: [],
      inspectionData: [],
      changeData: [],
      equipmentData: []
    }
  },
  getters: {
    treeTasks (state) {
      const treeTasks = transformTree(deepClone(state.tasks), {
        keyField: 'UID',
        parentField: 'ParentTaskUID',
        format (item) {
          item.title = item.Name

          if (item.ParentTaskUID === '-1') {
            item.ParentTaskUID = ''
          }
        }
      })

      treeTasks.sort((prev, next) => prev.WBS - next.WBS)

      return treeTasks
    },
    partsProgress (state, getters) {
      const treeTasks = getters.treeTasks
      const progress = {}

      for (let i = 0, len = treeTasks.length; i < len; i++) {
        const partTask = treeTasks[i]
        const name = partTask.Name.slice(0, 2)

        progress[name] = deepTreeCount(partTask, {
          containSelf: false
        })
      }

      return progress
    },
    problemType (state) {
      const inspectionData = state.inspectionData
      const map = {
        质量: { done: 0, undone: 0 },
        安全: { done: 0, undone: 0 },
        进度: { done: 0, undone: 0 },
        人员: { done: 0, undone: 0 }
      }

      for (let item of inspectionData) {
        const { type, complete } = item
        if (!map[type]) continue

        if (complete === 1) {
          map[type].done++
        } else {
          map[type].undone++
        }
      }
      return map
    },
    problemLevel (state) {
      const inspectionData = state.inspectionData
      const map = {
        '1': { done: 0, undone: 0 },
        '2': { done: 0, undone: 0 },
        '3': { done: 0, undone: 0 },
        '4': { done: 0, undone: 0 }
      }

      for (let item of inspectionData) {
        const { level, complete } = item
        if (!map[level]) continue

        if (complete === 1) {
          map[level].done++
        } else {
          map[level].undone++
        }
      }
      return map
    },
    problemPercent (state) {
      const inspectionData = state.inspectionData
      const map = {
        A段: 0,
        B段: 0,
        C段: 0,
        D段: 0,
        E段: 0,
        F段: 0,
        G段: 0,
        H段: 0,
        I段: 0,
        J段: 0,
        K段: 0,
        L段: 0
      }

      for (let item of inspectionData) {
        const { part } = item
        if (map[part] === undefined) continue

        map[part]++
      }
      return map
    },
    valueChangeData (state) {
      const types = ['外观', '尺寸', '型号', '数量']
      const zipData = groupByProps(state.changeData, 'type')

      fillObject(zipData, types, () => [])

      return zipData
    },
    sourceChangeData (state) {
      const sources = ['施工', '设计', '监理', '业主']
      const zipData = groupByProps(state.changeData, 'source')

      fillObject(zipData, sources, () => [])

      return zipData
    },
    partChangeData (state) {
      const data = {}
      const zipData = groupByProps(state.changeData, 'part')
      const parts = Object.keys(zipData)

      parts.sort()

      for (let part of parts) {
        data[part] = zipData[part]
      }

      return data
    },
    equipmentName (state) {
      const map = {}
      const equipmentData = state.equipmentData

      for (let item of equipmentData) {
        const { name } = item
        if (!map[name]) {
          map[name] = 0
        }
        map[name]++
      }

      return map
    },
    equipmentType (state) {
      const map = {
        大: 0,
        中: 0,
        小: 0
      }
      const equipmentData = state.equipmentData

      for (let item of equipmentData) {
        const { type } = item
        if (map[type] === undefined) continue

        map[type]++
      }

      return map
    }
  },
  mutations: {
    [types.RESIZE_WINDOW] (state) {
      state.height = window.innerHeight
    },
    [types.SET_TASK_LIST] (state, tasks) {
      state.tasks = tasks
    },
    [types.INIT_PROJECT] (state, project) {
      state.plan = project.plan
      state.name = project.name
    },
    [types.SET_HISTORY_PROGRESS] (state, history) {
      state.historyProgress = history
    },
    [types.SET_INSPECTION_DATA] (state, data) {
      state.inspectionData = data
    },
    [types.SET_CHANGE_DATA] (state, data) {
      state.changeData = data
    },
    [types.SET_EQUIPMENT_DATA] (state, data) {
      state.equipmentData = data
    }
  },
  actions: {
    async [types.QUERY_PROJECT] ({ commit, state }) {
      const { project } = state

      let isSuccess = false

      const result = await queryProject({ project })

      if (result.state === 'success') {
        commit(types.INIT_PROJECT, result)
        isSuccess = true
      }

      return isSuccess
    },
    async [types.QUERY_ALL_TASKS] ({ commit, state }) {
      const { plan } = state

      let isSuccess = false

      const tasks = await queryAllTasks({ plan })

      if (tasks && tasks.length) {
        commit(types.SET_TASK_LIST, tasks)
        isSuccess = true
      }

      return isSuccess
    },
    async [types.QUERY_HISTORY_PROGRESS] ({ commit, state }) {
      const { project } = state

      let isSuccess = false

      const history = await queryHistoryProgress({ project })

      if (history && history.length) {
        history.sort((prev, next) => {
          if (prev.year === next.year) {
            return prev.month - next.month
          }

          return prev.year - next.year
        })

        commit(types.SET_HISTORY_PROGRESS, history)
        isSuccess = true
      }

      return isSuccess
    },
    async [types.QUERY_INSPECTION_DATA] ({ commit, state }) {
      const { project } = state

      let isSuccess = false

      const data = await queryInspectionData({ project })

      if (data && data.length) {
        commit(types.SET_INSPECTION_DATA, data)
        isSuccess = true
      }

      return isSuccess
    },
    async [types.QUERY_CHANGE_DATA] ({ commit, state }) {
      const { project } = state

      let isSuccess = false

      const data = await queryChangeData({ project })

      if (data && data.length) {
        commit(types.SET_CHANGE_DATA, data)
        isSuccess = true
      }

      return isSuccess
    },
    async [types.QUERY_EQUIPMENT_DATA] ({ commit, state }) {
      const { project } = state

      let isSuccess = false

      const data = await queryEquipmentData({ project })

      if (data && data.length) {
        commit(types.SET_EQUIPMENT_DATA, data)
        isSuccess = true
      }

      return isSuccess
    }
  }
})
