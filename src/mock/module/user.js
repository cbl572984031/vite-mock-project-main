import BaseMock from '../baseMock'

Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['159', '182', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})

export default class Role extends BaseMock {
  constructor() {
    const listApi = '/api/user/list'
    const detailApi = '/api/user/detail'
    const deleteApi = '/api/user/delete'
    const updateApi = '/api/user/update'
    const total = 50
    const itemStruct = {
      // 单item数据结构
      id: '@increment',
      name: '@cname()',
      age: '@integer(10, 40)',
      sex: '@integer(0, 1)',
      phone: Mock.Random.phone(),
      email: '@email',
      "hobby": '@shuffle(["足球","篮球","乒乓球","排球","网球"], 1, 5)',
      createDate: '@date(yyyy-MM-dd)',
      'status|1': [true, false],
    }
    const headers = {
      id: {
        "label": "id",
        "type": "lock"
      },
      name: {
        "label": "姓名",
        "type": "input",
        "required": true,
      },
      age: {
        "label": "年龄",
        "type": "number",
        "required": true,
      },
      sex: {
        "label": "性别",
        "type": "select",
        "options": [
          { value: 0, label: "女" },
          { value: 1, label: "男" },
        ],
        "required": true,
      },
      phone: {
        "label": "联系电话",
        "type": "phone",
        "required": true,
      },
      email: {
        "label": "电子邮件",
        "type": "email",
        "required": true,
      },
      createDate: {
        "label": "创建时间",
        "type": "date",
        "required": false,
      },
      hobby: {
        "label": "爱好",
        "type": "checkbox",
        "options": [
          { value: "football", label: "足球" },
          { value: "basketball", label: "篮球" },
          { value: "tableTennis", label: "乒乓球" },
          { value: "volleyball", label: "排球" },
          { value: "tennis", label: "网球" },
        ],
        "required": false,
      },
      status: {
        "label": "状态",
        "type": "switch",
        "options": [
          { value: true, label: "启用" },
          { value: false, label: "禁用" },
        ],
        "required": false,
      }
    };

    super({ total, itemStruct, listApi, headers, detailApi, deleteApi, updateApi })
  }
}
