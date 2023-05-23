<template>
    <!--    <VxdaTabs v-model:active-tab-id="activeTabId2">-->
    <!--        <VxdaTabsItem id="test1" title="pierszsy item">qrwa mac</VxdaTabsItem>-->
    <!--        <VxdaTabsItem title="drugi item" id="test">qrwa mac 2</VxdaTabsItem>-->
    <!--    </VxdaTabs>-->

<!--    <div style="height: 2000px"></div>-->

    <VxdaTabs animation="fadeDown" class="my-tabs" is-post-slot-active :breakpoints="breakpoints">
        <VxdaTabsItem title="slot 1sadfasdfadsfasdfasdfasdfasf" v-slot="{ actionSlotAfter }" class="qrwamac asdas">
            <TestComp :action-slot-after="actionSlotAfter" class="qrwa"/>
        </VxdaTabsItem>

        <VxdaTabsItem title=" tab number 2 asdfasf asdf asd fasd " costam="asd" id="super">
            <div>qrwa ,ac</div>
            <div>qrwa ,ac</div>
        </VxdaTabsItem>

        <div>qrwa</div>

        <VxdaTabsItem title="slot 3dsaf asdf asd f" class="qrwa">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                aliquam aliquid architecto assumenda autem consectetur dolorem dolorum, id
                impedit magni maxime, nemo officia quaerat quasi qui repellat, soluta
                temporibus voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusamus aliquam aliquid architecto assumenda autem consectetur
                dolorem dolorum, id impedit magni maxime, nemo officia quaerat quasi qui
                repellat, soluta temporibus voluptatem. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Accusamus aliquam aliquid architecto
                assumenda autem consectetur dolorem dolorum, id impedit magni maxime, nemo
                officia quaerat quasi qui repellat, soluta temporibus voluptatem. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam
                aliquid architecto assumenda autem consectetur dolorem dolorum, id impedit
                magni maxime, nemo officia quaerat quasi qui repellat, soluta temporibus
                voluptatem.
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                aliquam aliquid architecto assumenda autem consectetur dolorem dolorum, id
                impedit magni maxime, nemo officia quaerat quasi qui repellat, soluta
                temporibus voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusamus aliquam aliquid architecto assumenda autem consectetur
                dolorem dolorum, id impedit magni maxime, nemo officia quaerat quasi qui
                repellat, soluta temporibus voluptatem. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Accusamus aliquam aliquid architecto
                assumenda autem consectetur dolorem dolorum, id impedit magni maxime, nemo
                officia quaerat quasi qui repellat, soluta temporibus voluptatem. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam
                aliquid architecto assumenda autem consectetur dolorem dolorum, id impedit
                magni maxime, nemo officia quaerat quasi qui repellat, soluta temporibus
                voluptatem.
            </div>
        </VxdaTabsItem>
        <VxdaTabsItem title="slot 4 asdfadsfasdfasdfasdfasfasdfasdfas"> content4</VxdaTabsItem>
    </VxdaTabs>

    <div style="height: 2000px"></div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { VxdaTabs, VxdaTabsItem } from '@/components';
    import TestComp from '@/components/TestComp/TestComp.vue';
    import type { BreakpointsType } from '@/components/Tabs/Tabs.vue';

    const activeTabId = ref('asd');
    const activeTabId2 = ref('test');

    const breakpoints: BreakpointsType = {
        0: 'accordion',
        560: 'vertical',
        900: 'horizontal'
    };
</script>


<style>
    body {
    //background-color: black;
    }

    .my-tabs {
    //height: 800px;
    }
</style>