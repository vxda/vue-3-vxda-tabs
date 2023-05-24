# Vue 3 vxdaTabs

Simple yet smart tabs

[Documentation here](https://vxda.github.io/vue-3-vxda-tabs/)

## Instalation

<CodeGroup>
    <CodeGroupItem title="NPM" active>

```bash:no-line-numbers:copy
npm install vxda-tabs
```

  </CodeGroupItem>

<CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add vxda-tabs
```

</CodeGroupItem>
</CodeGroup>

## simple example


```vue:v-pre
<script setup lang="ts">
import { vxdaTabs, vxdaTabsItem } from 'vxda-tabs';
// add some basic styling
import 'vxda-tabs/dist/vxda-tabs-ts.css';
</script>

<template>
    <VxdaTabs>
        <VxdaTabItem title='my tab name'>
          ... some content goes here
        </VxdaTabItem>
    </VxdaTabs>
</template>
```