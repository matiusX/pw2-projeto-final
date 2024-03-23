import {cleanEnv, str, port, num} from "envalid";

function validadeEnv(){
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str(),
        SALT_ROUNDS: num()
    })
}



export default validadeEnv;