<template>
    <slot :action-slot-before="actionSlotBefore" :action-slot-after="actionSlotAfter"/>
</template>

<script setup lang="ts">
    type Props = {
        name: string;
        actionSlotBefore?: HTMLElement | null;
        actionSlotAfter?: HTMLElement | null;
    };

    defineOptions({
        name: 'TabsItem'
    });

    const props = defineProps<Props>();


</script>

<style lang="scss" scoped>

</style>