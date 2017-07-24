<template>
    <div>
        <router-view></router-view>
        <com-message></com-message>
        <com-modal></com-modal>
    </div>
</template>

<script>
import message from './components/message'
import modal from './components/modal'

export default {
    components: {
        comMessage: message,
        comModal: modal
    }
}
</script>
