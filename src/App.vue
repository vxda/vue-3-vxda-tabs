<script setup lang="ts">
    import { DSTabs, DSTabsItem } from './components/Tabs';
    import TestComp from './components/TestComp/TestComp.vue';
</script>

<template>
    <DSTabs>
        <DSTabsItem name="slot 1" v-slot="{ actionSlotAfter }">
            <TestComp :action-slot-after="actionSlotAfter"/>
        </DSTabsItem>

        <DSTabsItem name="slot 2">
            <div>qrwa ,ac</div>
        </DSTabsItem>

        <DSTabsItem name="slot 3">
            content3
        </DSTabsItem>
        <DSTabsItem name="slot 4">
            content4
        </DSTabsItem>
    </DSTabs>
</template>
