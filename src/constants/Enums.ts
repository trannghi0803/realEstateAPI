export enum Status {
    Deleted = -9,
    Cancel = -3,
    Reject = -2,
    Draft = -1,
    Inactive = 0,
    Active = 1,
    Locked = 2,
    Terminated = 3,
    PcUpdated = 4,
    SsApprove = 10,
    SpaApprove = 100
}

export enum RealEstateType {
    Create = 1,
    Crawl = 2
}

export enum CategoryType {
    Sell = 0,
    Rent = 1
}

export enum NewsType {
    Create = 1,
    Crawl = 2
}

export enum IsHighLight {
    False = 0,
    True = 1
}

export enum UserType {
    User = 0,
    Admin = 1
}