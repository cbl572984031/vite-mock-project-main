import BaseMock from '../baseMock'

export default class Role extends BaseMock {
  constructor() {
    const listApi = '/api/role/list'
    const detailApi = '/api/role/detail'
    const deleteApi = '/api/role/delete'
    const updateApi = '/api/role/update'
    const searchApi = '/api/role/search'
    const total = 50
    const itemStruct = {
      // 单item数据结构
      id: '@increment',
      name: '@name()',
      performance: '@integer(10, 1000)',
      range: '@integer(0, 2)',
      phone: '@phone',
      email: '@email',
      "business": '@shuffle(["制造业","服务业","建筑","计算机","贸易","设计"], 1, 6)',
      createDate: '@date(yyyy-MM-dd)',
      'status|1': [true, false],
    }
    const headers = {
      id: {
        "label": "id",
        "type": "lock"
      },
      name: {
        "label": "企业名称",
        "type": "input",
        "required": true,
      },
      range: {
        "label": "所属集群/行业",
        "type": "select",
        "options": [
          { value: 0, label: "先进制造业" },
          { value: 1, label: "现代服务业" },
          { value: 2, label: "其他" },
        ],
        "required": true,
      },
      business: {
        "label": "涉及业务",
        "type": "checkbox",
        "options": [
          { value: "football", label: "制造业" },
          { value: "basketball", label: "服务业" },
          { value: "tableTennis", label: "建筑" },
          { value: "volleyball", label: "计算机" },
          { value: "tennis", label: "贸易" },
          { value: "tennis", label: "设计" },
        ],
        "required": false,
      },
      performance: {
        "label": "上年营收",
        "type": "number",
        "required": true,
      },
      phone: {
        "label": "公司电话",
        "type": "phone",
        "required": true,
      },
      email: {
        "label": "邮箱",
        "type": "email",
        "required": false,
      },
      createDate: {
        "label": "创建时间",
        "type": "date",
        "required": true,
      },
      status: {
        "label": "开业状态",
        "type": "switch",
        "options": [
          { value: true, label: "开业" },
          { value: false, label: "停业" },
        ],
        "required": false,
      }
    };

    super({ total, itemStruct, listApi, headers, detailApi, deleteApi, updateApi, searchApi })
  }
}
