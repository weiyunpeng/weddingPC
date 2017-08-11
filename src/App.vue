<template>
    <div>
        <router-view></router-view>
        <com-message></com-message>
        <com-modal></com-modal>
        <com-backtotop img="/static/images/icon_top.png" visibleOffset="600"></com-backtotop>
    </div>
</template>

<script>
import message from './components/message'
import modal from './components/modal'
import backtotop from './components/backToTop'

export default {
    components: {
        comMessage: message,
        comModal: modal,
        comBacktotop:backtotop
    }
}
</script>
