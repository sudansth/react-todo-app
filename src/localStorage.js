import React from 'react';

//Loading the state from the local storage
export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state');
        if( serializedState === null ){
            return undefined;
        }
        return JSON.parse( serializedState );
    }catch(e){
        return undefined;
    }
};

//Saving the state to the localStorage
export const saveState = ( state ) => {
    try{
        const serializedState = JSON.stringify(state); //state should be serializable
        localStorage.setItem('state', serializedState); // saved state in the 'state' key
    } catch(e){
        //Error
    }
};