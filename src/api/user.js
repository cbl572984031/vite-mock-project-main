import { request } from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}


export function userUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}


export function Delete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
