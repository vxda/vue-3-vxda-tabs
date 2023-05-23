<template>
    <div class="vxda-tabs__item">
        <slot :action-slot-before="actionSlotBefore" :action-slot-after="actionSlotAfter"/>
    </div>
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

    defineProps<Props>();


</script>

<style lang="scss" scoped>

</style>