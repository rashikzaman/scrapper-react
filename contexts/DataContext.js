import constate from "constate"
import React from 'react'

const useData = ({ me }) => {
    const [user, setUser] = React.useState(me)
    return { user, setUser }
}

export const [DataProvider, useDataProviderContext] = constate(useData)