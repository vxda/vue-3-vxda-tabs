<template>
    <div class="vxda-tabs__content"
         :class="`vxda-tabs__content--${orientation}`">
        <div class="vxda-tabs__content-inner" ref="tabsContentInner">
            <slot/>

        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OrientationTypes, AnimationTypes } from './Tabs.vue';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';


    type Props = {
        orientation: OrientationTypes;
    }
    defineProps<Props>();

    const tabsContentInner = ref<null | HTMLElement>(null);
    const contentHeight = ref<number | string>('0');
    const contentPadding = computed(() => contentHeight.value ? 'var(--vxda-tabs-content-padding)' : 0);

    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        contentHeight.value = entry?.contentRect.height ? `${entry?.contentRect.height}px` : 0;
    });

    onMounted(() => {
        if (tabsContentInner.value) {
            // @ts-ignore:next-line
            resizeObserver.observe(tabsContentInner.value);
        }
    });

    onBeforeUnmount(() => {
        if (tabsContentInner.value) {
            // @ts-ignore:next-line
            resizeObserver.unobserve(tabsContentInner.value);
        }
    });

</script>

<style lang="scss" scoped>
    .vxda-tabs__content {
        border-top: 0;
        min-height: v-bind(contentHeight);
        transition: min-height .3s, padding-top .3s, padding-bottom .3s;
        overflow: hidden;
        position: relative;
        z-index: 2;
        padding: v-bind(contentPadding);
    }

    .vxda-tabs__content--horizontal {
        border: var(--vxda-tabs-border-width) solid var(--vxda-tabs-border-color);
        border-top: 0;
    }

    .vxda-tabs__content--vertical {
        border-right: var(--vxda-tabs-border-width) solid var(--vxda-tabs-border-color);
        border-bottom: var(--vxda-tabs-border-width) solid var(--vxda-tabs-border-color);
        border-left: 0;
    }
</style>