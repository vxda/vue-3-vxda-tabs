<template>
    <div class="vxda-tabs" ref="$rootElement">

        <!--        todo im not sure about this-->
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

        <div v-if="mySlotItems?.length" class="vxda-tabs__wrapper"
             :class="`vxda-tabs__wrapper--${currentOrientation}`">
            <nav class="vxda-tabs__nav" :class="[gridStylesClassNames, `vxda-tabs__nav--${currentOrientation}`]">

                <div v-if="isPreSlotActive && currentOrientation === 'horizontal'" class="vxda-tabs__slot-before"
                     ref="teleportSlotBefore"
                     :key="`before-${activeTabIdComputed}`"/>

                <ul class="vxda-tabs__buttons" :class="`vxda-tabs__buttons--${currentOrientation}`">
                    <li class="vxda-tabs__button-wrapper" v-for="(button, index) in mySlotItems" :key="button.id">
                        <button
                            :id="button.id"
                            :class="[{'vxda-tabs__button--active' : button.id === activeTabIdComputed}, `vxda-tabs__button--${currentOrientation}`]"
                            class="vxda-tabs__button"
                            type="button"
                            @click="setActiveTab(button.id)">
                            {{ button?.props?.title || index }}
                            <span v-if="button.id === activeTabIdComputed"
                                  :class="`vxda-tabs__active-button-mask--${currentOrientation}`"
                                  class="vxda-tabs__active-button-mask"></span>
                        </button>
                        <TabsContentContainer
                            v-if="isAccordion"
                            :orientation="currentOrientation">

                            <transition :name="animation">
                                <div v-if="activeTab && button.id === activeTabIdComputed" :key="activeTab.id"
                                     class="transition-container">
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
                        </TabsContentContainer>

                    </li>
                </ul>

                <div v-if="isPostSlotActive && currentOrientation === 'horizontal'" class="vxda-tabs__slot-after"
                     ref="teleportSlotAfter"
                     :key="`after-${activeTabIdComputed}`"
                     :id="`after-${activeTabIdComputed}`"/>
            </nav>

            <TabsContentContainer v-if="!isAccordion" :orientation="currentOrientation">
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
            </TabsContentContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useSlots, computed, ref, onMounted, onBeforeUnmount } from 'vue';
    import { useGetUniqueId } from '../../composables/useGetUniqueId';
    import TabsContentContainer from './TabsContentContainer.vue';
    import './index.scss';

    //todo add accordion
    export type OrientationTypes = 'vertical' | 'horizontal' | 'accordion';
    export type BreakpointsType = {
        [key: number]: OrientationTypes
    }
    export type AnimationTypes = 'fade' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'fadeUp' | 'none';

    type Props = {
        tabsAlignment?: 'center' | 'start' | 'end';
        activeTabId?: string;
        animation?: AnimationTypes;
        isPreSlotActive?: boolean;
        isPostSlotActive?: boolean;
        orientation?: OrientationTypes;
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
    // const contentHeight = ref<number | string>('0');

    const slots = useSlots();
    const { getId } = useGetUniqueId();
    const teleportSlotBefore = ref<HTMLElement | null>(null);
    const teleportSlotAfter = ref<HTMLElement | null>(null);
    const $rootElement = ref<HTMLElement | null>(null);
    const emit = defineEmits<{
        'update:activeTabId': [tabId: string]
    }>();
    const activeTabIdFallback = ref<string>('');
    const currentOrientation = ref<OrientationTypes>(props.orientation);
    const isAccordion = computed(() => currentOrientation.value === 'accordion');

    const mySlotItems = computed(() => {
        const mySlots = slots.default?.().map((item) => ({
            ...item,
            id: item?.props?.id || getId()
        }));

        // @ts-ignore:next-line
        return mySlots?.filter(({ type }) => type.hasOwnProperty('name') && type?.name === 'VxdaTabsItem') || [];
    });

    const activeTabHashId = ref(window.location.hash?.replace('#', ''));
    const activeTabIdComputed = computed(() => activeTabHashId.value || props.activeTabId || activeTabIdFallback.value);
    const activeTab = computed(() => mySlotItems.value?.find(({ id }) => id === activeTabIdComputed.value));
    const gridStylesClassNames = computed(() => {
        if (props.isPreSlotActive && !props.isPostSlotActive && !isAccordion.value) {
            return 'vxda-tabs--is-pre-slot';
        } else if (!props.isPreSlotActive && props.isPostSlotActive && !isAccordion.value) {
            return 'vxda-tabs--is-post-slot';
        } else if (props.isPreSlotActive && props.isPostSlotActive && !isAccordion.value) {
            return 'vxda-tabs--is-pre-and-post-slot';
        }

        return 'vxda-tabs--is-no-slots';
    });

    // const contentPadding = computed(() => contentHeight.value ? 'var(--vxda-tabs-content-padding)' : 0);
    const breakpointsSorted = computed(() => {
        if (props.breakpoints) {
            const sortedKeys = Object.keys(props.breakpoints).sort((a, b) => a - b);

            return sortedKeys.map((key, index) => {
                const nextBreakpoint = sortedKeys[index + 1];
                const min = `screen and (min-width: ${key}px)`;
                const max = nextBreakpoint ? ` and (max-width: ${nextBreakpoint - 1}px)` : '';

                return {
                    mq: window.matchMedia(`${min}${max}`),
                    orientation: props.breakpoints[key]
                };
            });
        }

        return [];
    });

    function setActiveTab(tabId: string) {
        if (isAccordion.value && tabId === activeTabIdComputed.value) {
            emit('update:activeTabId', '');
            activeTabIdFallback.value = '';
            activeTabHashId.value = '';
        } else {
            emit('update:activeTabId', tabId);
            activeTabIdFallback.value = tabId;
            activeTabHashId.value = '';
        }

    }

    function attachMediaQueryEvents({ mq, orientation }) {
        if (mq?.addEventListener) {
            mq.addEventListener('change', (media) => {
                if (media.matches) {
                    currentOrientation.value = orientation;
                }
            });
        }
    }

    function handleBreakpoints() {
        const { orientation } = breakpointsSorted.value?.find(({ mq: { matches } }) => matches);

        currentOrientation.value = orientation;
        breakpointsSorted.value.forEach(attachMediaQueryEvents);


    }

    onMounted(() => {
        if (!mySlotItems.value?.length && slots.default?.().length) {
            window.console.warn('Please use VxdaTabsItem component as Tabs children', $rootElement.value);
        }

        window.setTimeout(() => {
            if (!props.activeTabId) {
                activeTabIdFallback.value = mySlotItems.value?.[0].id;
            }
        }, 0);

        handleBreakpoints();

    });

</script>

<style lang="scss" scoped>
    ul {
        padding: 0;
        margin: 0;

        li {
            list-style: none;
        }
    }

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
            grid-template-columns: 10fr 1fr;
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
        grid-auto-rows: min-content;
        border-right: 1px solid var(--vxda-tabs-border-color);
    }

    .vxda-tabs__button {
        border: 0;
        cursor: pointer;
        padding: 5px 10px;
        background-color: inherit;
        margin-bottom: -1px;
        color: var(--vxda-tabs-nav-color);
        display: block;
    }

    .vxda-tabs__button--horizontal {
        border: 1px solid var(--vxda-tabs-border-color);
        border-bottom-color: transparent;
        border-left: 0;
    }

    .vxda-tabs__button-wrapper:first-child {
        .vxda-tabs__button--horizontal {
            border-left: 1px solid var(--vxda-tabs-border-color);
        }
    }

    .vxda-tabs__button--vertical {
        border-top: 1px solid var(--vxda-tabs-border-color);
        width: 100%;
    }

    .vxda-tabs__button-wrapper {
        &:first-child {
            .vxda-tabs__button--vertical {
                border-top: 0;
            }
        }

        &:last-child {
            .vxda-tabs__button--vertical {
                border-bottom: 0;
            }
        }
    }

    .vxda-tabs__button--accordion {
        border-top: 1px solid var(--vxda-tabs-border-color);
        border-bottom: 1px solid var(--vxda-tabs-border-color);
        width: 100%;

        &.vxda-tabs__button--active {
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
        height: calc(100% - 1px);
        width: 1px;
        right: -1px;
        top: 0;
        z-index: 10;
        backdrop-filter: contrast(100);
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
</style>