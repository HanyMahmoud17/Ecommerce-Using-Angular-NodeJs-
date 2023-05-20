
// to make check when it post in file account.services.ts  and data return it is a type of ApiResult
export interface ApiResult{
        message: string,
        status: number,
        data: any,
        success: boolean,
}