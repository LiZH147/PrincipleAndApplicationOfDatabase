import { createSlice } from '@reduxjs/toolkit';

const userinfoSlice = createSlice({
    name: 'userinfo',
    initialState: {
        username: 'aaa',
        userAvatar: 'aaa'
    },
    reducers: {
        // 此处创建变量的action修改函数
        // changeMessageAction(state, { payload }) {
        //   state.message = payload
        // }
        initalUserinfoAction(state, { payload }) {
            state.userAvatar = payload.userAvatar;
            state.username = payload.username;
            console.log('aaa' + payload)
        }
    }
});

// 使用userinfoSlice.actions对修改函数进行暴露
export const { initalUserinfoAction } = userinfoSlice.actions
export default userinfoSlice.reducer;
