<template>
    <div class="vxda-tabs" ref="$rootElement">
        <div>{{ activeTabIdComputed }}</div>
        <div v-if="mySlotItems?.length" class="vxda-tabs__wrapper">
            <nav class="vxda-tabs__nav">

                <div class="vxda-tabs__slot-before" ref="teleportSlotBefore" :key="`before-${activeTabIdComputed}`"/>

                <div class="vxda-tabs__buttons">
                    <button v-for="(button, index) in mySlotItems" :key="button.id"
                            :class="{'vxda-tabs__buttons--active' : button.id === activeTabIdComputed}"
                            class="vxda-tabs__button"
                            type="button"
                            @click="setActiveTab(button.id)">
                        {{ button?.props?.title || index }}
                    </button>
                </div>

                <div class="vxda-tabs__slot-after" ref="teleportSlotAfter" :key="`after-${activeTabIdComputed}`"
                     :id="`after-${activeTabIdComputed}`"/>

            </nav>

            <div class="vxda-tabs__content">
                <div class="vxda-tabs__content-inner" ref="tabsContentInner">

                    <transition :name="animation">
                        <div v-if="activeTab" :key="activeTab.id" class="transition-container">
                            <keep-alive>
                                <component
                                    :is="activeTab"
                                    :id="activeTab.id"
                                    :slot-id="activeTab.id"
                                    :action-slot-before="teleportSlotBefore"
                                    :action-slot-after="teleportSlotAfter"/>
                            </keep-alive>
                        </div>

                    </transition>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useSlots, computed, ref, onMounted, onBeforeUnmount } from 'vue';
    import { useGetUniqueId } from '../../composables/useGetUniqueId';
    import './index.scss';

    type Props = {
        tabsAlignment?: 'center' | 'start' | 'end';
        activeTabId?: string;
        animation?: 'fade' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'fadeUp' | 'none'
    }

    defineOptions({
        name: 'VxdaTabs'
    });

    const props = withDefaults(defineProps<Props>(), {
        tabsAlignment: 'center',
        animation: 'fade'
    });
    const contentHeight = ref('0px');
    const tabsContentInner = ref<null | HTMLElement>(null);
    const slots = useSlots();
    const { getId } = useGetUniqueId();
    const teleportSlotBefore = ref<HTMLElement | null>(null);
    const teleportSlotAfter = ref<HTMLElement | null>(null);
    const $rootElement = ref<HTMLElement | null>(null);
    const emit = defineEmits<{
        'update:activeTabId': [tabId: string]
    }>();
    const activeTabIdFallback = ref<string>('');

    const mySlotItems = computed(() => {
        const mySlots = slots.default?.().map((item) => ({
            ...item,
            id: item?.props?.id || getId()
        }));

        // @ts-ignore:next-line
        return mySlots?.filter(({ type }) => type.hasOwnProperty('name') && type?.name === 'VxdaTabsItem') || [];
    });

    console.log('mySlotItems', mySlotItems.value);
    console.log(slots.default?.(), slots.default?.());

    const activeTabIdComputed = computed(() => props.activeTabId || activeTabIdFallback.value);
    const activeTab = computed(() => mySlotItems.value?.find(({ id }) => id === activeTabIdComputed.value));


    function setActiveTab(tabId: string) {
        emit('update:activeTabId', tabId);
        activeTabIdFallback.value = tabId;
    }

    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        contentHeight.value = `${entry?.contentRect.height}px`;
    });


    onMounted(() => {
        if (!mySlotItems.value?.length && slots.default?.().length) {
            window.console.warn('Please use VxdaTabsItem component as Tabs children', $rootElement.value);
        }

        if (tabsContentInner.value) {
            resizeObserver.observe(tabsContentInner.value);
        }

        window.setTimeout(() => {
            if (!props.activeTabId) {
                activeTabIdFallback.value = mySlotItems.value?.[0].id;
            }
        }, 0);
    });

    onBeforeUnmount(() => {
        if (tabsContentInner.value) {
            resizeObserver.unobserve(tabsContentInner.value);
        }
    });


</script>

<style lang="scss" scoped>
    .vxda-tabs {
        background-color: var(--vxda-tabs-backgound-color);
        width: 100%;
    }

    .vxda-tabs__nav {
        display: grid;
        grid-auto-flow: column;
        grid-template-areas: 'pre tabs post';
        grid-template-columns: 1fr 2fr 1fr;
        border-bottom: 1px solid var(--vxda-tabs-border-color);
        position: relative;
        margin: 0;
        padding: 0;
    }

    .vxda-tabs__buttons {
        grid-area: tabs;
        display: flex;
        justify-content: v-bind(tabsAlignment);
    }

    .vxda-tabs__button {
        border: 1px solid var(--vxda-tabs-border-color);
        border-bottom-color: transparent;
        cursor: pointer;
        padding: 5px 10px;
        background-color: inherit;
        border-left: 0;
        margin-bottom: -1px;

        &:first-child {
            border-left: 1px solid var(--vxda-tabs-border-color);
        }
    }

    .vxda-tabs__buttons--active {
        position: relative;
        z-index: 1;
        border-bottom-color: var(--vxda-tabs-backgound-color);
    }

    .vxda-tabs__content {
        border: 1px solid var(--vxda-tabs-border-color);
        border-top: 0;
        height: v-bind(contentHeight);
        transition: height .3s;
        overflow: hidden;
        position: relative;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-leave-active,
    .fadeLeft-leave-active,
    .fadeRight-leave-active,
    .fadeDown-leave-active,
    .fadeUp-leave-active {
        position: absolute;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }


    .fadeLeft-enter-active,
    .fadeLeft-leave-active,
    .fadeRight-enter-active,
    .fadeRight-leave-active,
    .fadeDown-enter-active,
    .fadeDown-leave-active,
    .fadeUp-enter-active,
    .fadeUp-leave-active {
        transition: opacity 0.5s ease, transform .5s;
    }

    .fadeLeft-enter-from {
        opacity: 0;
        transform: translateX(50px);
    }

    .fadeLeft-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }


    .fadeRight-enter-from {
        opacity: 0;
        transform: translateX(-50px);
    }

    .fadeRight-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }

    .fadeUp-enter-from {
        opacity: 0;
        transform: translateY(50px);
    }

    .fadeUp-leave-to {
        opacity: 0;
        transform: translateY(-50px);
    }

    .fadeDown-enter-from {
        opacity: 0;
        transform: translateY(-50px);
    }

    .fadeDown-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }


</style>