<template>

    <nav>
        <div ref="teleportSlotBefore" :key="`before-${activeTabId}`"></div>
        <button v-for="button in mySlotItems" :key="button.id" type="button" @click="setActiveTab(button.id)">
            {{ button.props.name }}
        </button>
        <div ref="teleportSlotAfter" :key="`after-${activeTabId}`" :id="`after-${activeTabId}`"></div>
    </nav>
    <div class="content">
        <keep-alive>
            <component :is="activeTab" :slot-id="activeTab.id" :action-slot-before="teleportSlotBefore"
                       :action-slot-after="teleportSlotAfter" :key="activeTab.id"/>
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
    import { useSlots, computed, ref } from 'vue';
    import { useGetUniqueId } from '@/composables/useGetUniqueId';


    defineOptions({
        name: 'Tabs'
    });


    const slots = useSlots();
    const { getId } = useGetUniqueId();
    const teleportSlotBefore = ref<HTMLElement | null>(null);
    const teleportSlotAfter = ref<HTMLElement | null>(null);


    const mySlotItems = computed(() => slots.default().filter(({ type }) => type.name === 'TabsItem').map((item) => ({
        ...item,
        id: getId()
    })));

    console.log('mySlotItems', mySlotItems.value);

    const activeTabId = ref(mySlotItems.value[0]?.id);
    const activeTab = computed(() => mySlotItems.value.find(({ id }) => id === activeTabId.value));


    function setActiveTab(tabId: string) {
        activeTabId.value = tabId;
    }


</script>

<style lang="scss" scoped>
    nav {
        display: flex;
        justify-content: center;
    }
</style>