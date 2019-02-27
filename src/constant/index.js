export const attrsMap = {
  apiacgrant: 'apiac_id',
  treerolegrant: 'treerole_id',
  usergrant: 'user_id',
  groupgrant: 'group_id',
  rolegrant: 'role_id'
}

export function getAttrsIdByMap(type) {
  return attrsMap[type]
}
