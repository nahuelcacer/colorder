import axios from 'axios'

const refreshlist = (str) =>{
    axios
        .get(`/api/${str}`)
        .then((res)=>{ return(res.data)})
        .catch((err)=>{console.log(err)})
    }


