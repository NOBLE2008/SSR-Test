const React = require("react")


const Hello = (props) => {
    if(props.status === "success"){
        return(
            <h1>{props.message}</h1>
            )
    }   
     if(props.status === "failure"){
        return(
            <h1>Failed</h1>
            )
    }

}




export default Hello;