import {
    post
} from '../request'

// 首页接口
export const queryShareData = p => post('/api/index.do', p)