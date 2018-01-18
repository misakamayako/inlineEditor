# inlineEditor
>depends on  iview + Vue

**input**

***props***

| value | description | type | default   | is required |
| --------- | ---------- | ------ | ----- | ---- |
| value     | value,able to use 'v-model'                    | String、Number | -     | yes    |
| type      | component type,`input`、`select` are acceptable value            | String        | input | no    |
| inputType | typeof input, `text`、`password`、`textarea`、`url`、`email`、`date` are acceptable value | String  | text  | no    |
| icon      | icon after input, only works in `inputType = text `  | String        | -     | no    |
| blurClose | set value to true to close when blur                           | Boolean       | false | no    |
| showSwitch | show confirms, choose X will cancel operation | Boolean | false | true |

 ***event***

| event name      |        description        |  returned value   |
| -------- | :--------------: | ----- |
| on-close |    fired when close     | value |
| on-click | fired when click the icon | -     |

 ***methods***

| name    | description | payload   |  returned value |
| ------ | -------------: | ---- | ---- |
| finish | close inlineEditor(must use this function to close while multiple is true ) | -    | -    |

 **selectType**

 ***props***

| value | description | type | default   | is required |
| ---------- | ------- | ------------------- | ----- | ---- |
| value      | select  | Number、String、Array | 无     | no    |
| filterable | is filterable  | boolean             | false | no    |
| multiple   | is multiple  | boolean             | false | no    |
| loading    | is show loading | boolean             | false | no    |

   ***event***

| event name      |        description        |  returned value   |
| -------- | -------- | ----- |
| on-query | fired when query-string is changed | query |

   **slot**

| name     | description      |
| ------ | ------- |
| default      | text to display |
| option | options  |

  ***methods***

  refers input part
​     
  ##example
   [comprehensive](./dist/example.html)
