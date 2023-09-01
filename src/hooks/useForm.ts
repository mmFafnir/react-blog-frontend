import React, { useState, useEffect } from 'react'
import {omit} from 'lodash'


enum EnumNameInput {
    USERNAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password'
}

interface IState {
    'name': string,
    'email': string,
    'password': string,
    'password-confirm': string,
    'professions': string,
    
}

const initialState = {
    'name': '',
    'email': '',
    'password': '',
    'password-confirm': '',
    'professions': '',
}

const useForm = (callback:any, defaultState?: {[U: string]: string}) => {
    //Form values
    const [values, setValues] = useState<IState>(initialState);
    //Errors
    const [errors, setErrors] = useState<IState>(initialState);

    useEffect(() => {
        if(defaultState) {   
            setValues({
                ...values,
                ...defaultState
            })
        }
    }, [])  

    const validate = (event:InputEvent, name:string, value:string) => {
        //A function to validate each input values
        switch (name) {
            case EnumNameInput.USERNAME:
                if(value.length <= 4){
                    // we will set the error state

                    setErrors({
                        ...errors,
                        name:'Имя должно быть больше 5 символов'
                    })
                }else{
                    // set the error state empty or remove the error for username input
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, EnumNameInput.USERNAME);
                    setErrors(newObj);
                }
                break;

            case EnumNameInput.EMAIL:
                if(
                    !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        email:'Неверный формат почты'
                    })
                }else{
                    let newObj = omit(errors, EnumNameInput.EMAIL);
                    setErrors(newObj);
                }
            break;

            case EnumNameInput.PASSWORD:
                if(
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        password:'Пароль должен содержать не менее 8 символов и содержать прописные, строчные буквы и цифры.'
                    })
                }else{
                    let newObj = omit(errors, EnumNameInput.PASSWORD);
                    setErrors(newObj);
                }
            break;

            default:
                break;

        }
    }

    //A method to handle form inputs
    const handleChange = (event:any) => {
        //To stop default events
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event,name,val);

        //Let's set these values in state
        setValues({
            ...values,
            [name]:val,
        })
    }

    const handleSubmit = (event:any) => {
        if(event) event.preventDefault();
        

        const checkError = Object.values(errors).find(val => val !== ''); 
        const checkValues = Object.values(values).find(val => val !== '');
        console.log(checkError, checkValues)
        if(!checkError && checkValues){
            callback();
        }else{
            alert("Есть ошибка!");
        }
    
    }
    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}

export default useForm