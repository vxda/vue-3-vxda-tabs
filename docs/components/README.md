# Components

## VxdaTabs

```vue:v-pre
  <script setup lang="ts">
    
    import { VxdaTabs, VxdaTabsItem } from 'vxda-tabs';
  
    const activeTab = ref('myId');
    const breakpoints = {
      0: 'accordion',
      600: 'vertical',
      1200: 'horizontal'
    }
  </script>
  
  <template>
      <VxdaTabs
        v-model:active-tab-id="activeTab"
        animation="fade" 
        :breakpoints="breakpoints"
        tabs-alignemnt="center">
        
          <VxdaTabsItem id="myId" title="my button text">
            <div>lorem ipsum</div> 
          </VxdaTabsItem>
          
      </VxdaTabs>
  </template>
```

### VxdaTabs Props

| name                  | type                                             | default    | notes                                                                                                                                               |
|-----------------------|--------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| tabs-alignment        | center, start, end                               | center     |                                                                                                                                                     |
| v-model:active-tab-id | string                                           | null       | you can provide "*id*" prop for "*VxdaTabsItem*" components. By default first item is active. There is also option to choose open tab with # in url |
| animation             | fade, fadeLeft, fadeRight, fadeDown,FadeUp, none | fade       |                                                                                                                                                     |
| orientation           | vertical, horizontal, accordion                  | horizontal | you can change the way buttons are positioned - top / left / like accordion                                                                         |
| breakpoints           | object                                           | null       | you can change orientation base on screen width. key = min-width, value = orientation                                                               |

## VxdaTabsItem

```vue:v-pre
  <script setup lang="ts">
    import { VxdaTabs, VxdaTabsItem } from 'vxda-tabs';
  </script>  
  
  <template>
      <VxdaTabs>
        
          <VxdaTabsItem id="myId" title='my button text'>
            lorem ipsum
          </VxdaTabsItem>
          
      </VxdaTabs>
  </template>
```

### VxdaTabsItem Props

| name  | type   | default   | notes                                                   |
|-------|--------|-----------|---------------------------------------------------------|
| id    | string | automatic | works with v-model that is set on VxdaTabs component    |
| title | string |           | this is required and is used to set text in tab buttons |