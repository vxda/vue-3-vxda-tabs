<template>
    <div class="vxda-tabs" ref="$rootElement">
        <div
            v-if="currentOrientation === 'vertical' && (isPreSlotActive || isPostSlotActive)"
            class="vxda-tabs__teleport-slots-vertical">
            <div v-if="isPreSlotActive" class="vxda-tabs__slot-before"
                 ref="teleportSlotBefore"
                 :key="`before-${activeTabIdComputed}`"/>

            <div v-if="isPostSlotActive" class="vxda-tabs__slot-after"
                 ref="teleportSlotAfter"
                 :key="`after-${activeTabIdComputed}`"
                 :id="`after-${activeTabIdComputed}`"/>
        </div>

        <div v-if="mySlotItems?.length" class="vxda-tabs__wrapper" :class="`vxda-tabs__wrapper--${currentOrientation}`">
            <nav class="vxda-tabs__nav" :class="[gridStylesClassNames, `vxda-tabs__nav--${currentOrientation}`]">

                <div v-if="isPreSlotActive && currentOrientation === 'horizontal'" class="vxda-tabs__slot-before"
                     ref="teleportSlotBefore"
                     :key="`before-${activeTabIdComputed}`"/>

                <div class="vxda-tabs__buttons" :class="`vxda-tabs__buttons--${currentOrientation}`">
                    <button v-for="(button, index) in mySlotItems" :key="button.id"
                            :class="[{'vxda-tabs__button--active' : button.id === activeTabIdComputed}, `vxda-tabs__button--${currentOrientation}`]"
                            class="vxda-tabs__button"
                            type="button"
                            @click="setActiveTab(button.id)">
                        {{ button?.props?.title || index }}
                        <span v-if="button.id === activeTabIdComputed"
                              :class="`vxda-tabs__active-button-mask--${currentOrientation}`"
                              class="vxda-tabs__active-button-mask"></span>
                    </button>
                </div>

                <div v-if="isPostSlotActive && currentOrientation === 'horizontal'" class="vxda-tabs__slot-after"
                     ref="teleportSlotAfter"
                     :key="`after-${activeTabIdComputed}`"
                     :id="`after-${activeTabIdComputed}`"/>

            </nav>

            <div class="vxda-tabs__content" :class="`vxda-tabs__content--${currentOrientation}`">
                <div class="vxda-tabs__content-inner" ref="tabsContentInner">

                    <transition :name="animation">
                        <div v-if="activeTab" :key="activeTab.id" class="transition-container">
                            <keep-alive>
                                <component
                                    :is="activeTab"
                                    :id="activeTab.id"
                                    :?slot-id="activeTab.id"
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

    //todo add accordion
    type OrientationTypes = 'vertical' | 'horizontal';
    export type BreakpointsType = {
        [key: number]: OrientationTypes
    }

    type Props = {
        tabsAlignment?: 'center' | 'start' | 'end';
        activeTabId?: string;
        animation?: 'fade' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'fadeUp' | 'none';
        isPreSlotActive?: boolean;
        isPostSlotActive?: boolean;
        orientation: OrientationTypes;
        breakpoints?: BreakpointsType
    }

    defineOptions({
        name: 'VxdaTabs'
    });

    const props = withDefaults(defineProps<Props>(), {
        tabsAlignment: 'center',
        animation: 'fade',
        isPreSlotActive: false,
        isPostSlotActive: false,
        orientation: 'horizontal'
    });
    const contentHeight = ref<number | string>('0');
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
    const currentOrientation = ref(props.orientation);

    const mySlotItems = computed(() => {
        const mySlots = slots.default?.().map((item) => ({
            ...item,
            id: item?.props?.id || getId()
        }));

        // @ts-ignore:next-line
        return mySlots?.filter(({ type }) => type.hasOwnProperty('name') && type?.name === 'VxdaTabsItem') || [];
    });

    const activeTabIdComputed = computed(() => props.activeTabId || activeTabIdFallback.value);
    const activeTab = computed(() => mySlotItems.value?.find(({ id }) => id === activeTabIdComputed.value));
    const gridStylesClassNames = computed(() => {
        if (props.isPreSlotActive && !props.isPostSlotActive) {
            return 'vxda-tabs--is-pre-slot';
        } else if (!props.isPreSlotActive && props.isPostSlotActive) {
            return 'vxda-tabs--is-post-slot';
        } else if (props.isPreSlotActive && props.isPostSlotActive) {
            return 'vxda-tabs--is-pre-and-post-slot';
        }

        return 'vxda-tabs--is-no-slots';
    });

    const contentPadding = computed(() => contentHeight.value ? 'var(--vxda-tabs-content-padding)' : 0);
    const breakpointsSorted = computed(() => {
        if (props.breakpoints) {
            const sortedKeys = Object.keys(props.breakpoints).sort((a, b) => a - b);

            //todo move creating of media queries here so it can be fired on component load.
            return sortedKeys.map((key) => ({ screenWidth: key, orientation: props.breakpoints?.[key] }));
        }
    });

    function setActiveTab(tabId: string) {
        emit('update:activeTabId', tabId);
        activeTabIdFallback.value = tabId;
    }

    function attachMediaQueryEvents({ screenWidth, orientation }, index) {
        const nextBreakpoint = breakpointsSorted.value[index + 1];
        const min = `screen and (min-width: ${screenWidth}px)`;
        const max = nextBreakpoint ? ` and (max-width: ${nextBreakpoint.screenWidth -1}px)` : '';


        const mq = window.matchMedia(`${min}${max}`);

        if (mq?.addEventListener) {
            mq.addEventListener('change', (media) => {
                if (media.matches) {
                    currentOrientation.value = orientation;
                }
            });
        } else {
            mq.addListener(() => {
                console.log('orientationqrwa', screenWidth, orientation);
                currentOrientation.value = orientation;
            });
        }
    }

    function handleBreakpoints() {


        breakpointsSorted.value.forEach(attachMediaQueryEvents);
    }

    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        contentHeight.value = entry?.contentRect.height ? `${entry?.contentRect.height}px` : 0;
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

        handleBreakpoints();

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

    .vxda-tabs__wrapper {
        display: grid;
        height: 100%;
    }

    .vxda-tabs__wrapper--horizontal {
        grid-auto-rows: auto 1fr;
    }

    .vxda-tabs__wrapper--vertical {
        grid-template-columns: min-content auto;
        border-top: 1px solid var(--vxda-tabs-border-color);
    }


    .vxda-tabs__nav {
        display: grid;
        grid-auto-flow: column;
        border-bottom: 1px solid var(--vxda-tabs-border-color);
        position: relative;
        margin: 0;
        padding: 0;

        &.vxda-tabs__nav--vertical {
            border-left: 1px solid var(--vxda-tabs-border-color);
        }

    }

    .vxda-tabs--is-no-slots {
        grid-template-areas: 'tabs';

        &.vxda-tabs__nav--horizontal {
            grid-template-columns: 1fr;
        }

        &.vxda-tabs__nav--vertical {
            grid-template-rows: 1fr;
        }
    }

    .vxda-tabs--is-pre-slot {
        grid-template-areas: 'pre tabs';

        &.vxda-tabs__nav--horizontal {
            grid-template-columns: 1fr 2fr;
        }

        &.vxda-tabs__nav--vertical {
            grid-template-rows: 1fr 2fr;
        }
    }

    .vxda-tabs--is-post-slot {
        grid-template-areas: 'tabs post';

        &.vxda-tabs__nav--horizontal {
            grid-template-columns: 2fr 1fr;
        }

        &.vxda-tabs__nav--vertical {
            grid-template-rows: 2fr min-content;
        }
    }

    .vxda-tabs--is-pre-and-post-slot {
        grid-template-areas: 'pre tabs post';

        &.vxda-tabs__nav--horizontal {
            grid-template-columns: 1fr 2fr 1fr;
        }

        &.vxda-tabs__nav--vertical {
            grid-template-rows: 1fr 2fr 1fr;
        }
    }

    .vxda-tabs__buttons {
        grid-area: tabs;
    }

    .vxda-tabs__buttons--horizontal {
        display: flex;
        justify-content: v-bind(tabsAlignment);
    }

    .vxda-tabs__buttons--vertical {
        display: grid;
        grid-auto-rows: 1fr;
        //grid-template-rows: repeat(auto-fit, 1fr);
    }

    .vxda-tabs__button {
        border: 0;
        cursor: pointer;
        padding: 5px 10px;
        background-color: inherit;
        margin-bottom: -1px;
        color: var(--vxda-tabs-nav-color);
    }

    .vxda-tabs__button--horizontal {
        border: 1px solid var(--vxda-tabs-border-color);
        border-bottom-color: transparent;
        border-left: 0;

        &:first-child {
            border-left: 1px solid var(--vxda-tabs-border-color);
        }
    }

    .vxda-tabs__button--vertical {
        border-top: 1px solid var(--vxda-tabs-border-color);
        border-right: 1px solid var(--vxda-tabs-border-color);

        &:first-child {
            border-top: 0;
        }

        &:last-child {
            border-bottom: 0;
        }
    }

    .vxda-tabs__button--active {
        position: relative;
    }

    .vxda-tabs__active-button-mask {
        display: block;
        position: absolute;
        backdrop-filter: contrast(100);
        backface-visibility: hidden;
    }


    .vxda-tabs__active-button-mask--horizontal {
        width: 100%;
        height: 10px;
        bottom: -2px;
        left: 0;
    }

    .vxda-tabs__active-button-mask--vertical {
        height: 100%;
        width: 1px;
        right: -1px;
        top: 0;
        z-index: 10;
        backdrop-filter: contrast(100);
    }

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
        border: 1px solid var(--vxda-tabs-border-color);
        border-top: 0;
    }

    .vxda-tabs__content--vertical {
        border-right: 1px solid var(--vxda-tabs-border-color);
        border-bottom: 1px solid var(--vxda-tabs-border-color);
        border-left: 0;
    }

    .vxda-tabs__teleport-slots-vertical {
        display: flex;

        .vxda-tabs__slot-before {
            margin-right: auto;
        }

        .vxda-tabs__slot-after {
            margin-left: auto;
        }
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

    //.vxda-tabs__slot-before:empty {
    //    display: none;
    //}


</style>