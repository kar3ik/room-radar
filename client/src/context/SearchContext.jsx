import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city:undefined,
    date:[],
    options:{
        adult:undefined,
        childern:undefined,
        room:undefined
    }
}

export const SearchContext=createContext(INITIAL_STATE)

const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE   
        default:
            return state     
    }
}


export const SearchContextProvider=({childern})=>{
    const [state,dispatch] = useReducer(SearchReducer, INITIAL_STATE)
    return(
        <SearchContextProvider value={{city:state.city, dates:state.dates, options:state.options, dispatch}}>
            {childern}
        </SearchContextProvider>
    )
}