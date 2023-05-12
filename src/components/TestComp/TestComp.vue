<template>
    <div>
        <div v-if="isShowing">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet atque consequuntur corporis culpa
            eligendi est, explicabo fuga fugit illo inventore iure minus officiis quaerat reprehenderit rerum sequi
            tempora
            ullam!
        </div>

        <teleport v-if="actionSlotAfter" :to="actionSlotAfter">
            <button type="button" @click="isShowing = !isShowing">toggle</button>
        </teleport>
        <div v-else>
            <button type="button" @click="isShowing = !isShowing">toggle</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    type Props = {
        actionSlotAfter?: HTMLElement | null;
    }

    const props = defineProps<Props>();


    const isShowing = ref(true);

</script>

<style lang="scss" scoped>

</style>