<template>
    <div>
        <transition name="fade">
            <div v-if="isShowing">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet atque consequuntur corporis
                culpa
                eligendi est, explicabo fuga fugit illo inventore iure minus officiis quaerat reprehenderit rerum sequi
                tempora
                ullam!
            </div>
        </transition>
        <teleport v-if="actionSlotAfter" :to="actionSlotAfter">
            <button type="button" @click="isShowing = !isShowing">toggle</button>
        </teleport>
        <div v-else>
            <button type="button" @click="isShowing = !isShowing">toggle in my component</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    type Props = {
        actionSlotAfter?: HTMLElement | null;
    }

    defineProps<Props>();


    const isShowing = ref(true);

</script>

<style lang="scss" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>