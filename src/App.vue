<template>
    <div>
        <router-view></router-view>
        <com-message></com-message>
        <com-backtotop img="/static/images/icon_top.png" visibleOffset="600"></com-backtotop>
    </div>
</template>

<script>
import message from './components/message';
import backtotop from './components/backToTop';

export default {
    components: {
        comMessage: message,
        comBacktotop: backtotop
    }
};
</script>
