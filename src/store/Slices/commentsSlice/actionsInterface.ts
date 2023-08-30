export interface IParamsFetchComments {
    id: string,
    limit: string,
    page: string
}

export interface IParamsUpdateComment {
    id: string,
    comment: {
        text: string
    }
}

export interface IParamsPostComment {
    id: string,
    comment: {
        text: string,
    }
}

export interface IParamsPostAnswer {
    id: string,
    answer: {
        text: string,
        userAnswer: string
    }
}
