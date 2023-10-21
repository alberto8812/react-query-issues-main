import axios from "axios";


export const gitHubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers:{
       Authorization:'Bearer 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'
    },
})