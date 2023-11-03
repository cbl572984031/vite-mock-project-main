
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


### 组件思路



### 添加模块思路

```sh
    首先在mock中配置好需要的接口，
```