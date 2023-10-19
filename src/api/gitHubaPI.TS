import axios from "axios";


export const gitHubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers:{
        Authorization:'Bearer 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'
    },
})