/*
export const someGetter = (state) => {
}
*/
const smarts = require('smarts')()

export const getUsername = (state) => {
	return smarts.getsmart(state, 'entity.username', undefined)
}

export const latestCached = (state) => {
	if(state.cached.length){
			let ret = state.cached[state.cached.length-1]
			if(ret && ret.constructor == Array){
					return ret
			} else {
					return []
			}
	} else {
			state.cached.push([])
			return state.cached[state.cached.length-1]
	}
}