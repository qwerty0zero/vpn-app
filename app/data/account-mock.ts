export interface AccountData {
    userName: string,
    status: boolean,
    expireDate: string,
    usedTraffic: number,
    totalTraffic: number
}

export const accountMock: AccountData = {
    userName: 'r7gf3ok',
    status: true,
    expireDate: '07.12.2025',
    usedTraffic: 0,
    totalTraffic: 10
}
