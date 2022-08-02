import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';

import { createApp, reactive } from 'vue';
import router from './router';
import AppWrapper from './AppWrapper.vue';
import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

import Tooltip from 'primevue/tooltip';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import Menu from 'primevue/menu/';

import CodeHighlight from './AppCodeHighlight';
import BlockViewer from './BlockViewer';
import G2 from '@antv/g2plot';
import naive from 'naive-ui';

router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});

const app = createApp(AppWrapper);

//全局配置
app.config.globalProperties.$refresh_time = reactive(5000)				//刷新时间
app.config.globalProperties.$global_api = "http://192.168.158.17:30346/api/Alarm"
app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(G2);
app.use(naive);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('code', CodeHighlight);
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);

app.component('Button', Button);
app.component('Card', Card);
app.component('Carousel', Carousel);
app.component('Checkbox', Checkbox);
app.component('Column', Column);
app.component('Panel', Panel);
app.component('Menu', Menu);
app.component('InputText',InputText);
app.component('Password', Password);

app.component('BlockViewer', BlockViewer);
    
app.mount('#app');

document.title="Appeon服务监控";
//路由动态修改
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})