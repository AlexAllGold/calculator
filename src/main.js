import { CalcStore } from './store/calcStore.js';
import { ServiceActions } from './services/serviceActions.js';
import { ResultComponent } from './components/resultComponent.js';
import { CommonComponent } from './components/commonComponent.js';

const store = new CalcStore();
const service = new ServiceActions(store);
const resultComponent = new ResultComponent(store, service);

new CommonComponent('.ac').setClick(resultComponent.clearAll.bind(resultComponent));
new CommonComponent('.replace').setClick(resultComponent.replace.bind(resultComponent));
new CommonComponent('.buttons').setClick(resultComponent.calculate.bind(resultComponent));
