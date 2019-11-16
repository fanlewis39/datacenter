export function isNull (any) {
  return typeof any === 'undefined' || any === null
}

export function broadcast (componentName, eventName, ...params) {
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

export function dispatch (componentName, eventName, ...params) {
  let parent = this.$parent || this.$root
  let name = parent.$options.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent

    if (parent) {
      name = parent.$options.name
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params))
  }
}

export function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || !componentNames.includes(name))) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }

  return parent
}

export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child

        break
      } else {
        children = findComponentDownward(child, componentName)

        if (children) {
          break
        }
      }
    }
  }

  return children
}

export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }

    const foundChilds = findComponentsDownward(child, componentName)

    return components.concat(foundChilds)
  }, [])
}

export function transformTree (list, options = {}) {
  const {
    keyField = 'id',
    childField = 'children',
    parentField = 'parent'
  } = options

  const format = typeof options.format === 'function' ? options.format : null

  const tree = []
  const record = {}

  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]

    if (format) format(item, i)

    const id = item[keyField]

    if (!id) continue

    if (record[id]) {
      item[childField] = record[id]
    } else {
      item[childField] = record[id] = []
    }

    if (item[parentField]) {
      const parentId = item[parentField]

      if (!record[parentId]) {
        record[parentId] = []
      }

      record[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

/**
 * 深度拷贝对象或数组 (避免一层死循环)
 * @param {Object|Array} obj 需要拷贝的对象或数组
 * @returns {Object|Array} 克隆后的对象或数组
 */
export function deepClone (obj) {
  const type = getType(obj)

  // 类型校验
  let _root

  switch (type) {
    case 'object':
      _root = {}
      break
    case 'array':
      _root = []
      break
    default:
      return obj
  }

  // 循环数组栈
  const loopList = [
    {
      parent: _root,
      key: undefined,
      data: obj
    }
  ]

  while (loopList.length) {
    // 先入后出，深度优先
    const node = loopList.pop()
    const { parent, key, data } = node
    const type = getType(data)

    // 初始化克隆对象_root
    let res = parent

    if (getType(key) !== 'undefined') {
      res = parent[key] = type === 'array' ? [] : {}
    }

    for (let i in data) {
      let _data = data[i]
      let _type = getType(_data)

      if (
        type === 'array' ||
        (type === 'object' && Object.prototype.hasOwnProperty.call(data, i))
      ) {
        // 避免一层死循环
        if (_data === data) {
          res[i] = res
        } else if (_type === 'object' || _type === 'array') {
          loopList.push({
            parent: res,
            key: i,
            data: _data
          })
        } else {
          res[i] = _data
        }
      }
    }
  }

  return _root
}

/**
 * 获取变量类型
 * @param {any} any 任意变量
 * @returns {String} 小写的类型名字
 */
export function getType (any) {
  return Object.prototype.toString
    .call(any)
    .slice(8, -1)
    .toLowerCase()
}

export function formatTasks (tasks) {
  for (let i = 0, len = tasks.length; i < len; i++) {
    const task = tasks[i]

    task.Start = task.Start && new Date(task.Start)
    task.Finish = task.Finish && new Date(task.Finish)
    task.ActualStart = task.ActualStart && new Date(task.ActualStart)
    task.ActualFinish = task.ActualFinish && new Date(task.ActualFinish)
    task.BaseStart = task.BaseStart && new Date(task.BaseStart)
    task.BaseFinish = task.BaseFinish && new Date(task.BaseFinish)

    /* eslint-disable */
    if (task.PredecessorLink) {
      try {
        task.PredecessorLink = JSON.parse(task.PredecessorLink)
      } catch (err) {
        console.warn(err)
      }
    }

    if (task.AllBaselines) {
      try {
        task.AllBaselines = JSON.parse(task.AllBaselines)
      } catch (err) {
        console.warn(err)
      }
    }
    /* eslint-disable */
  }

  return tasks
}

/**
 * 将数字格式化为三位阶
 * @param {Number} number 需要格式化的数字
 */
export function formatNumber(number) {
  if (getType(number) !== 'number') {
    return 0
  }

  let [integer, decimal] = String.prototype.split.call(number, '.')

  const formatRegExp = /(\d+)(\d{3})/

  while (formatRegExp.test(integer)) {
    integer = integer.replace(formatRegExp, '$1,$2')
  }

  decimal = decimal ? `.${decimal}` : ''

  return `${integer}${decimal}`
}

export function deepTreeCount(obj, options = {}) {
  const { childrenField = 'children', containSelf = true } = options

  const loopList = [obj]

  let count = containSelf ? 0 : -1

  while (loopList.length) {
    count++

    const item = loopList.shift()
    const children = item[childrenField]

    if (children && children.length) {
      loopList.push(...children)
    }
  }

  return count
}

export function groupByProps(list, props = []) {
  if (typeof props === 'string') {
    props = [props]
  }

  const propCount = props.length
  const zipData = {}

  for (let item of list) {
    let data

    for (let i = 0; i < propCount; i++) {
      const isLast = i === propCount - 1
      const prop = props[i]
      const value = item[prop]

      if (!data) {
        if (!zipData[value]) {
          zipData[value] = isLast ? [] : {}
        }

        data = zipData[value]
      } else {
        if (!data[value]) {
          data[value] = isLast ? [] : {}
        }

        data = data[value]
      }
    }

    data.push(item)
  }

  return zipData
}

export function fillObject(obj, props = [], defaultValue = undefined) {
  const useFn = typeof defaultValue === 'function'

  for (let prop of props) {
    if (!(prop in obj)) {
      obj[prop] = useFn ? defaultValue(prop) : defaultValue
    }
  }

  return obj
}
