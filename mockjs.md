# <p align="center">Mockjs</p>


## 前言
为什么使用mockjs？  
- **前后端分离**（`让前端攻城师独立于后端进行开发`）  
- **增加单元测试的真实性**（`通过随机数据，模拟各种场景`）  
- **开发无侵入**（`不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据`）  
- **用法简单**（`符合直觉的接口`）  
- **数据类型丰富**（`支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等`）  
- **方便扩展**（`支持支持扩展更多数据类型，支持自定义函数和正则`）

## 安装&使用

### 1. 项目前准备


```  javascript
  pnpm create vite
  pnpm i
  pnpm dev
  pnpm i element-plus axios
```
*或clone已有项目:* [*gitee*](https://gitee.com/promiseW/vite-mock-project.git)

### 2. 安装 mockjs 依赖

```  bash
  pnpm i mockjs -D
```

### 3. 使用mockjs  
src目录下建立 mock文件夹 和 index.js 文件，且在 main.js文件 中引入mockjs
``` javascript
  // mock/index.js

  import Mock from 'mockjs'

  Mock.setup({
    timeout: '200-1000' // 指定被拦截的 Ajax 请求的响应时间，单位是毫秒
  })

  // 具体业务
  Mock.mock('/api/user/getList', {
    total: 2,
    records: [
      {
        id: 1,
        name: 'Tom',
        status: '启用',
        content: 'No. 189, Grove St, Los Angeles',
        date: '2016-05-03'
      },
      {
        id: 2,
        name: 'Tom',
        status: '禁用',
        content: 'No. 189, Grove St, Los Angeles',
        date: '2016-05-03'
      }
    ]
  })

```

``` javascript
  // main.js
  import './mock'
```



## 语法规范
### 1. **数据模板定义规范**  
(Data Template Definition，DTD)  
数据模板中的每个属性由 3 部分构成：**属性名、生成规则、属性值**：
``` javascript
  // 属性名   name
  // 生成规则 rule
  // 属性值   value
  'name|rule': value
```
#### 注意事项
- 属性名 和 生成规则 之间用竖线 | 分隔。
- 生成规则 是可选的。
- 生成规则 有 7 种格式：  
> 1. `'name|min-max': value`  
> 1. `'name|count': value`  
> 1. `'name|min-max.dmin-dmax': value`  
> 1. `'name|min-max.dcount': value`  
> 1. `'name|count.dmin-dmax': value`  
> 1. `'name|count.dcount': value`  
> 1. `'name|+step': value`
- ***生成规则 的 含义 需要依赖 属性值的类型 才能确定***。
- 属性值 中可以含有 @占位符。
- 属性值 还指定了最终值的初始值和类型。  

#### 生成规则和示例
- 属性值是字符串 String  
> 1. `'name|min-max': string`  
> 通过重复 string 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。  
> 2. `'name|count': string`  
> 通过重复 string 生成一个字符串，重复次数等于 `count`。  

 - 属性值是数字 Number  
> 1. `'name|+1': number`  
> 属性值自动加 1，初始值为 `number`。  
> 2. `'name|min-max': number`  
> 生成一个大于等于 min、小于等于 max 的整数，属性值 `number` 只是用来确定类型。  
> 3. `'name|min-max.dmin-dmax': number`  
> 生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。  

- 属性值是布尔型 Boolean  
> 1. `'name|1': boolean`  
> 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。  
> 2. `'name|min-max': value`  
> 随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

- 属性值是对象 Object  
> 1. `'name|count': object`  
> 从属性值 `object` 中随机选取 `count` 个属性。  
> 2. `'name|min-max': object`  
> 从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

- 属性值是数组 Array  
> 1. `'name|1': array`  
> 从属性值 `array` 中随机选取 1 个元素，作为最终值。 
> 2. `'name|+1': array`  
> 从属性值 `array` 中顺序选取 1 个元素，作为最终值。  
> 3. `'name|min-max': array`  
> 通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。
> 4. `'name|count': array`  
> 通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。 

- 属性值是函数 Function  
> 1. `'name': function `  
> 执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

- 属性值是正则表达式 RegExp
> 1. `'name': regexp`  
> 根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。  

*示例：请参考* [mockjs示例](http://mockjs.com/examples.html)

### 2. **数据占位符定义规范**  
(Data Placeholder Definition，DPD)  
*占位符* 只是在属性值字符串中占个位置，并不出现在最终的属性值中。  
*占位符* 的格式为：  
```javascript
  @占位符
  @占位符(参数 [, 参数])
```
#### 注意事项
- 用 @ 来标识其后的字符串是 *占位符*
- *占位符* 引用的是 `Mock.Random` 中的方法。
- 通过 `Mock.Random.extend()` 来扩展自定义*占位符*。
- *占位符* 也可以引用 数据模板 中的属性。
- *占位符* 会优先引用 数据模板 中的属性。
- *占位符* 支持 相对路径 和 绝对路径。
```javascript
  Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
  })
  // => 占位符引用数据模板
  {
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
  }
  
  Mock.mock({
    name: 'Mock.js',
    version: '1.0.0',
    author: '@name', // 引用name属性
    createdAt: '@datetime', // 引用datetime属性
  })
  // => 数据模板优先级更高
  {
    name: 'Mock.js',
    version: '1.0.0',
    author: 'Mock.js', // 引用name属性
    createdAt: '1997-02-16 09:46:18', // 引用datetime属性
  }
```  
  
<div style="margin-bottom: 20px"></div>

## 常用方法  
### Mock.setup()  
> **`Mock.setup( settings )`**  
> 配置拦截 Ajax 请求时的行为  
> 参数 **settings** 必选，目前支持的配置项只有：timeout
>
> ``` javascript
>   // 指定被拦截的 Ajax 请求的响应时间，值可以是正整数，也可以用范围表示介于min和max毫秒
>   Mock.setup({
>     timeout: 400
>   })
>
>   Mock.setup({
>     timeout: '200-600'
>   })
> ```

### Mock.mock()  
> **`Mock.mock( rurl?, rtype?, template|function( options ) )`**  
> 根据数据模板生成模拟数据。  
> 参数 **rurl** 可选，表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'  
> 参数 **rtype** 可选，表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等  
> 参数 **template** 可选，表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'  
> 参数 **function(options)** 可选，表示用于生成响应数据的函数（**options**指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性）  
>
> ``` javascript
>   // 根据数据模板生成模拟数据
>   Mock.mock( template )
>
>   // 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回
>   Mock.mock( rurl, template )
>
>   // 记录用于生成响应数据的函数。当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回
>   Mock.mock( rurl, function( options ))
>
>   // 记录数据模板。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回
>   Mock.mock( rurl, rtype, template )
>
>   // 记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回
>   Mock.mock( rurl, rtype, function( options ) )
> ```

### Mock.Random
> Mock.Random 是一个工具类，用于生成各种随机数据。  
> **Mock.Random 的方法在数据模板中称为『占位符』，书写格式为** `@占位符(参数 [, 参数])` 。
> ```javascript
>   var Random = Mock.Random
>   Random.email()
>   // => "n.clark@miller.io"
>   Mock.mock('@email')
>   // => "y.lee@lewis.org"
>   Mock.mock( { email: '@email' } )
>   // => { email: "v.lewis@hall.gov" }
> ```
> #### 方法
> Mock.Random 提供的完整方法（占位符）如下：  
>
>  | Type  | Method  |
>  |:----------|:----------|
>  | Basic    | boolean, natural, integer, float, character, string, range, date, time, datetime, now    |
>  | Image    | image, dataImage    |
>  | Color    | color    |
>  | Text    | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle    |
>  | Name    | first, last, name, cfirst, clast, cname    |
>  | Web    | url, domain, email, ip, tld    |
>  | Address    | area, region   |
>  | Helper    | capitalize, upper, lower, pick, shuffle    |
>  | Miscellaneous    | guid, id    |  
>
>    *每种类型的方法具体详解请参阅* [gitHub.Wiki](https://github.com/nuysoft/Mock/wiki/Basic)
> #### 扩展
> Mock.Random 中的方法与数据模板的 @占位符 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 @扩展方法 引用。例如：  
> ```javascript
>   Random.extend({
>     constellation: function(date) {
>         var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
>         return this.pick(constellations)
>     }
>   })
>   Random.constellation()
>   // => "水瓶座"
>   Mock.mock('@CONSTELLATION')
>   // => "天蝎座"
>   Mock.mock({
>     constellation: '@CONSTELLATION'
>   })
>   // => { constellation: "射手座" }
> ```


### Mock.valid()  
> **`Mock.valid( template, data )`**  
> 校验真实数据 data 是否与数据模板 template 匹配  
> 参数 **template** 必选，表示数据模板，可以是对象或字符串  
> 参数 **data** 必选，表示真实数据
> ``` javascript
>   var template = {
>     name: 'value1'
>   }
>   var data = {
>     name: 'value2'
>   }
>   Mock.valid(template, data)
>   // =>
>   [
>     {
>         "path": [
>             "data",
>             "name"
>         ],
>         "type": "value",
>         "actual": "value2",
>         "expected": "value1",
>         "action": "equal to",
>         "message": "[VALUE] Expect ROOT.name'value is equal to value1, but is value2"
>     }
>   ]
>
>  Mock.valid({'name|1-5': 1}, {name: 2})
>  // => 
>  []
> ```
