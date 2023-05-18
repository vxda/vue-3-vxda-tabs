<template>
    <!--    <VxdaTabs v-model:active-tab-id="activeTabId2">-->
    <!--        <VxdaTabsItem id="test1" title="pierszsy item">qrwa mac</VxdaTabsItem>-->
    <!--        <VxdaTabsItem title="drugi item" id="test">qrwa mac 2</VxdaTabsItem>-->
    <!--    </VxdaTabs>-->

    <VxdaTabs animation="fadeDown">
        <VxdaTabsItem title="slot 1" v-slot="{ actionSlotAfter }">
            <TestComp :action-slot-after="actionSlotAfter" class="qrwa"/>
        </VxdaTabsItem>

        <VxdaTabsItem title=" tab number 2" costam="asd">
            <div>qrwa ,ac</div>
        </VxdaTabsItem>

        <div>qrwa</div>

        <VxdaTabsItem title="slot 3" class="qrwa">
            <div >
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
        <VxdaTabsItem title="slot 4"> content4</VxdaTabsItem>
    </VxdaTabs>

</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { VxdaTabs, VxdaTabsItem } from '@/components';
    import TestComp from '@/components/TestComp/TestComp.vue';

    const activeTabId = ref('asd');
    const activeTabId2 = ref('test');
</script>
