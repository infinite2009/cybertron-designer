import { createStore } from 'vuex';
import WidgetSchema from '@/interface/schema/widget/widget.schema';
import DynamicObject from '@/interface/dynamic-object';

interface StoreState {
  selectedSchema: WidgetSchema;
  schemaDict: DynamicObject;
  schema: WidgetSchema;
}

const store = createStore({
  state: {
    selectedSchema: {},
    schemaDict: {},
    schema: {}
  } as StoreState,
  mutations: {
    initPage(state, payload: WidgetSchema) {
      const { schemaDict } = state;
      let q = [payload];
      while (q.length) {
        const item = q.shift();
        schemaDict[item.id] = item;
        if (item?.children?.length) {
          q = q.concat(item.children);
        }
      }
    },
    cacheWidget(state, payload: WidgetSchema) {
      const { schemaDict } = state;
      schemaDict[payload.id] = payload;
    },
    insertWidget(state, payload: WidgetSchema) {},
    updateWidget(state) {},
    deleteWidget(state) {},
    moveWidget(state) {
      this.deleteWidget(state);
      this.insertWidget(state);
    },
    selectWidget(state, payload: WidgetSchema) {
      // TODO need implementation
      state.selectedSchema = payload;
    }
  }
});

export default store;
