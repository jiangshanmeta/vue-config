# vue-config

In the template of vue component, the context for the value we access is the instance of vue component. In general, we use data option for those value.For value in data option,it will be proxyed by the vue instance, so we can access through ```this``` , and it will be observable . In some cases, make value observable is uesless because we will never change it, those value only need to be proxyed by vue instance so we can access in template.

In the template of vue component, we sometimes use function.Generally,thoes functions are in methods option,like the data option above.functions in methods will be proxyed by vue instance, and also bind this.In some cases,bind this is useless, we will never access this in those functions.

In orde to handle this problem,we can use vue-config plugin.

## Install

```sh
npm install --save vue-configs
```

```js
import Vue from 'vue'
import vueConfig from 'vue-config'

Vue.use(vueConfig)
```

## Usage example

In our vue component：

```js
export default{
    config:{
        monthList:[
            {label:"January",value:1},
            {label:"February",value:2},
            {label:"March",value:3},
        ],
        get totalMonth(){
            return this.monthList.length;
        },
    },
    data(){
        return {
            selectedMonth:[],
        };
    },
}
```

and we can access the ```monthList``` and ```totalMonth``` in the template

```html
<template>
    <div>
        <ul>
            <li
                v-for="item in monthList"
                :key="item.value"
            >
                {{item.label}}
            </li>
        </ul>
        {{totalMonth}}
    </div>
</template>
```

the example above shows it also supports getter mode.

the default option we use is **config** , we can use different keys:

```js
Vue.use(VueConfig,{
    optionKeys:['config','staticMethod']
})
```

In the vue component:

```js
export default{
    config:{
    },
    staticMethod:{
        echo(data){
            return data;
        },
    },
}
```