/*
export const someAction = (state) => {
}
*/

export const getSchema = (state, args) => {
	if(args){
		if(args.schema && typeof args.schema == 'string'){
			this.$fl.schemas.get(args.schema)
			.then(schema=>{
				console.log(`schema: ${schema}`)
			})
		}
	}
}