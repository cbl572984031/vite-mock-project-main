import { request } from '@/utils/request'

export function getList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}


export function roleUpdate(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}


export function Delete(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}
