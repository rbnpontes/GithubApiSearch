import { } from 'redux';
import { HeaderActionType, HeaderActionData, HeaderSearchAction } from './../../actions/index';
export interface HeaderState {
    visible?: boolean;
    search: string;
}
const initialHeaderState: HeaderState = {
    visible: false,
    search: ''
};
function RootReducer(state: HeaderState = initialHeaderState, action: HeaderActionData) {
    switch (action.type) {
        case HeaderActionType.HeaderAction:
            {
                if (action.payload.search != null)
                    state.search = action.payload.search;
                if (action.payload.visible != null)
                    state.visible = action.payload.visible;
            }
            break;
        case HeaderActionType.HeaderSearchAction:
            {
                if (action.payload != null)
                    state.search = action.payload;
            }
            break;
    }
    return state;
}
export default RootReducer;