import Mock from 'mockjs'
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['159', '182', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
export default class BaseMock {
  listApi = /\/*\/getList/
  detailApi = /\/*\/getItem/
  deleteApi = /\/*\/deleteItem/
  updateApi = /\/*\/updateItem/

  itemStruct = {
    // 单item数据结构
    id: '@increment',
    name: '@cname()',
    content: '@csentence(30)',
  }
  listData = null // 总数据
  userData = null // 总数据

  constructor({
    total = 15,
    itemStruct = null,
    listApi = null,
    headers = null,
    detailApi = null,
    deleteApi = null,
    updateApi = null,
  }) {
    this.total = total // 总数
    this.itemStruct = itemStruct ?? this.itemStruct
    this.listApi = listApi ?? this.listApi
    this.detailApi = detailApi ?? this.detailApi
    this.deleteApi = deleteApi ?? this.deleteApi
    this.updateApi = updateApi ?? this.updateApi
    this.headers = headers ?? []

    this.init()
  }

  init() {
    this.initData()
    this.mockApiList()
    this.mockApiDetail()
    this.mockApiEdit()
    this.mockApiDelete()
  }

  initData() {
    if (this.listApi.includes("role")) {
      this.listData = Mock.mock({
        total: this.total,
        [`records|${this.total}`]: [this.itemStruct],
      });
    } else if (this.listApi.includes("user")) {
      this.userData = Mock.mock({
        total: this.total,
        [`records|${this.total}`]: [this.itemStruct],
      });
    }

    console.log('mock-data -> this.listData', this.listData)
  }

  mockApiList() {
    Mock.mock(this.listApi, 'post', params => {
      // console.log('params', params)
      const paramsObj = JSON.parse(params.body)
      const { pageIndex, pageSize } = paramsObj
      let result
      if (this.listApi.includes("role")) {
        result = this.listData.records;
      } else if (this.listApi.includes("user")) {
        result = this.userData.records;
      }

      const start = (pageIndex - 1) * pageSize
      const end = pageIndex * pageSize

      if (paramsObj.search && Object.keys(paramsObj.search).length) {

        const search = paramsObj.search;
        result = result.filter(item => {
          for (const key in search) {
            if (Object.hasOwnProperty.call(search, key)) {
              const element = search[key];
              if (['name', 'email', 'phone'].includes(key)) {
                if (!item[key].includes(element)) {
                  return false;
                }
              } else {

                if (item[key] != element) {
                  return false;
                }
              }
            }
          }
          return true;
        })
      }
      return {
        code: 200,
        total: result.length,
        records: result.slice(start, end),
        headers: this.headers
      }
    })
  }

  mockApiDetail() {
    Mock.mock(this.detailApi, 'post', params => {
      const id = this._getUrlParams(params.url, 'id')

      let data = null
      let msg = ''
      let code = 200
      if (id) {
        const index = this.listData.records.findIndex(item => String(item.id) === String(id))
        if (index !== -1) {
          data = this.listData.records[index]
          msg = '修改成功'
        } else {
          msg = '没有发现id'
          code = 400
        }
      } else {
        msg = '缺少id'
        code = 400
      }

      return {
        code,
        data,
        msg
      }
    })
  }

  mockApiEdit() {
    Mock.mock(this.updateApi, 'post', params => {
      const paramsObj = JSON.parse(params.body)
      console.log(this.userData, this.listData)
      debugger
      let result = true
      let msg = ''
      let code = 200;

      let data
      if (this.listApi.includes("role")) {
        data = this.listData.records;
      } else if (this.listApi.includes("user")) {
        data = this.userData.records;
      }

      if (paramsObj.id) {
        // 更新
        const index = data.findIndex(
          item => item.id === paramsObj.id
        )
        if (index !== -1) {
          data[index] = paramsObj
          msg = '修改成功'
        } else {
          result = false
          msg = '没有发现id'
          code = 400
        }
      } else {
        paramsObj.id = Mock.mock('@increment')
        data.unshift(paramsObj)
        msg = '新增成功'
      }

      return {
        code,
        data: result,
        msg
      }
    })
  }

  mockApiDelete() {
    Mock.mock(this.deleteApi, 'post', params => {
      const id = params.body

      let result = true
      let msg = ''
      let data
      if (this.listApi.includes("role")) {
        data = this.listData.records;
      } else if (this.listApi.includes("user")) {
        data = this.userData.records;
      }
      if (id) {
        const index = data.findIndex(item => String(item.id) === String(id))
        if (index !== -1) {
          data.splice(index, 1)
          msg = '操作成功'
        } else {
          result = false
          msg = '没有发现id'
        }
      } else {
        result = false
        msg = '缺少id'
      }

      return {
        code: 200,
        data: result,
        msg
      }
    })
  }


  // 根据url获取query参数
  _getUrlParams(url, name) {
    //获取参数中？的索引位置
    const queryIndex = url.indexOf('?')
    //获取？后面的字符串
    if (queryIndex != -1) {
      const queryStr = url.substr(queryIndex + 1)

      //把pageIndex和pageSize切割成数组
      const queryStrArr = queryStr.split('&')

      //遍历数组,
      for (let i = 0; i < queryStrArr.length; i++) {
        //把pageIndex和pageSize的值分割出来
        const itemArr = queryStrArr[i].split('=')
        //判断
        if (itemArr[0] === name) {
          //返回pageIndex和pageSize的值给getQuery函数
          return itemArr[1]
        }
      }
    }
    //如果没有获取到？的索引就返回空
    return null
  }
}
