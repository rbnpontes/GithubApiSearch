import {createStore} from 'redux';
import HeaderReducer from '../components/reducers';
export const HeaderStore = createStore(HeaderReducer);