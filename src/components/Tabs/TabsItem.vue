<template>
    <slot :action-slot-before="actionSlotBefore" :action-slot-after="actionSlotAfter"/>
</template>

<script setup lang="ts">
    type Props = {
        title: string,
        actionSlotBefore?: HTMLElement | null,
        actionSlotAfter?: HTMLElement | null,
        id?: string;
    };

    defineOptions({
        name: 'VxdaTabsItem'
    });

    const props = defineProps<Props>();


</script>

<style lang="scss" scoped>

</style>