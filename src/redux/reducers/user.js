import { LIST_POST_SUCCESS } from './../constants/actionTypes';

const initialState = {
    data: [],
    loading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_POST_SUCCESS:
            return {
                ...state,
                data: payload
            };
        
        default:
            return state;
    }
}
