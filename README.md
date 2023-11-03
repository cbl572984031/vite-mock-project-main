
## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 组件说明

```sh
表格组件：
    /src/components/MyTable
    
    传入参数：
    tableData,          //表格数据
    tableHeaderList，   //表头数据
    
    传入事件：
    edit                //组件内编辑按钮点击触发，传入参数：触发编辑的数据
    delete              //组件内删除按钮点击触发，传入参数：删除数据的id
```

```sh
交互组件：
    /src/components/EditRow
    
    传入参数：
    value,              //初始化的值
    keyValue,           //对应表头数据的键
    type,               //该数据对应的数据类型，在接口中配置headers获取，表现为数据格式为数字，字符串，下拉，多选，单选，电话，邮箱等。
    options,            //如果type值为下拉，单选，多选，滑块等选项，则在接口配置headers属性，传入组件提供选项的内容。
    
    传入事件：
    change              //当组件内数据修改时，传递修改后的值和当前组件的keyValue给父组件
```

```sh
搜索组件：
    /src/components/MySearch
    
    传入事件：
    handleSearch              //当组件内数据修改时，传递修改后的值和当前组件的keyValue给父组件

    slot:                     //传入元素到组件尾部
```


### 组件开发思路

```sh
MyTable：
    通过后台接口返回的headers配置作为为所有数据的解析模版。headers为一个对象，每个键值对为一个字段的描述，键与返回数据的键匹配。

    label：     数据的中文名称。
    type：      数据的类型描述，有input,select,checkbox,number,phone,email等格式，用于前端校验数据格式。lock类型为不可修改。
    options：   可选的类型，为用户提供可选择的数据。value为值，label为中文描述。
    required：  是否必传。

    MyTable组件内通过ElTable组件绑定数据集，遍历headers渲染出表头。添加或删除headers的字段，可以控制表格列的显示隐藏。表格内根据headers的type字段分成不同渲染格式。可对数组类型，布尔类型，或字段名称判断做不同渲染。操作列可以将触发的数据传递给父组件做不同操作逻辑处理。

EditRow：
    通过传入的type类型展示不同的交互组件，输入框，日期框，选项，下拉等。修改后传值给父组件触发表单字段校验。

MySearch：
    默认包含日期选择搜索框，将传入的slot放在后面。
```


### 添加模块

```sh
    首先在mock中配置好需要的返回的数据格式与对应的headers，前端页面导入MyTable，传入接口返回数据records与headers，通过headers控制返回数据字段的显示隐藏，在headers中的字段会显示，不在的不会显示。编辑页面通过 ElForm 与 EditRow 组合表单，/src/utils/validate.js中的getValidate获取数据校验的格式,ElForm提供数据校验，EditRow根据type提供交互组件，将数据传给后台实现数据编辑。
```