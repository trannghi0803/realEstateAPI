import { Status } from "../../constants/Enums";

export interface IRequest {
}

export interface IActionResourceCode {
    listView?: string,
    actionCreate?: string,
    actionDetail?: string,
    actionUpdate?: string,
    actionDelete?: string,
    actionDisable?: string,
    actionActive?: string,
    actionLock?: string,
    actionApprove?: string,
    actionReject?: string,
    actionCancel?: string,
    actionExport?: string,
}

export interface IResponseBody {
    version: string,
    statusCode: number,
    message: string,
    result?: any,
    responseException?: {
        isError: boolean,
        exceptionMessage: string,
        details: string,
        referenceErrorCode: any,
        referenceDocumentLink: any,
        validationErrors: any
    }
}

export interface IResult {
    response: any;
    data: any;
}

export interface IError {
    code: string;
    message?: {
        message?: string,
        responseException?: {
            details?: any
            exceptionMessage?: string
            isError?: boolean
            referenceDocumentLink?: any
            referenceErrorCode?: any
            validationErrors?: any
        },
        result?: any,
        statusCode?: number
    };
    extras?: any;
}

export interface IMenuItem {
    id: string;
    tilte: string;
    iconName?: string;
    iconSvg?: any;
    iconSvgActive?: any;
    controller?: string;
    callback?: () => void;
    subMenu?: IMenuItem[];
    resourceCode?: string;
}

export interface ICodename {
    id?: string | number;
    group?: string;
    code: string | number;
    name: string;
}

export interface IAutocompleteOption {
    label: string;
    value: string;
}
export interface IInput {
    value?: any;
    error?: string
}

export interface IRoleModule {
    id?: string;
    status?: Status,
    moduleCode?: string;
    roleCode?: string;
}

export interface IRole {
    id: string
    roleCode?: string
    roleLevel?: number
    roleName?: string
    status?: number
    type?: number
    amendBy?: string
    amendDate?: number
    inputBy?: string
    inputDate?: number
}
export type TEnvironment = "development" | "production";
export type TLanguage = "en" | "vi";

export interface IStaff {
    id?: string,
    staffId?: number,
    staffType?: number,
    regionCodes?: any,
    //   firstName?: string,
    //   lastName?: string,
    zoneNames?: any;
    userName?: string,
    zoneCodes?: any,
    dateOfBirth?: any,
    gender?: number,
    employmentDate?: any,
    addressLine?: string,
    cityCode?: string,
    districtCode?: string,
    wardCode?: string,
    title?: string,
    idCardNo?: string,
    idCardIssuedDate?: any,
    idCardIssuedPlace?: string,
    regionName?: string,
    reportingToName?: string,
    workingAreaName?: string,
    homeAddress?: string,
    phoneNumber?: string,
    bankAccountNo?: string,
    bankCode?: string,
    bankBranch?: string,
    education?: string,
    uniform?: string,
    terminated?: number,
    terminationtDate?: any,
    note?: string,
    reportingTo?: string,
    uniformName?: string,
    email?: string,
    roleName?: string,
    status?: string
    avatarId?: string,
    // roleId?: string,
    avatarUrl?: string,
    qrCodeUrl?: string,
    manualEntryKey?: string;
    educationName?: string;
    workingArea?: string;
    role?: {
        amendBy?: string
        amendDate?: string
        id?: string
        roleCode?: string
        roleLevel?: number
        roleName?: string
        status?: number
        type?: number
    }
    address?: {
        addressLine?: string;
        addressLine2?: string;
        cityCode?: string;
        districtCode?: string;
        wardCode?: string;
        latitude?: any;
        longitude?: any;
        wardName?: string;
        districtName?: string;
        cityName?: string;
    };
    roleLevel?: number;
    roleCode?: string;
}
export interface IResource {
    id?: string;
    resourceCode?: string;
    description?: string;
    status?: Status;
    controller?: string;
    action?: string;
    method?: string;
    isPublic?: string;
}

export interface IModule {
    id?: string;
    status?: Status;
    moduleType?: number;
    moduleName?: string;
    moduleParent?: string;
    moduleCode?: string;
    description?: string;
    modulePath?: string;
    moduleParentName?: string;
    resources?: IResource[];
}

export interface IPhotoRequest {
    id?: string,
    photoId?: string;
    projectId?: string,
    attributeValueId?: string,
    base64Photo?: string,
    displayOrder?: number,
    // action?: IActionRequest,
    fileType?: string
    alt?: string;
    url?: string;
    file?: any;
    photo?: any
    altText?: any;
    action?: number;
}

export interface IRegion {
    id: string;
    parentRegion?: string;
    regionCode: string;
    regionId?: string;
    regionName?: string;
    regionPath?: string;
    type?: number

}
export interface IListRegion {
    id: string;
    parentRegion?: string;
    regionCode: string;
    regionId?: string;
    regionName?: string;
    regionPath?: string;
    type?: number
    regionChild?: IRegion[]
}
export interface IRegionStaffAmount {
    amendBy?: string
    amendDate?: number
    currentAmount?: number
    id?: string
    limitAmount?: number
    parentRegion?: string
    regionCode?: string
    zoneCode?: string
    regionId?: string
    regionName?: string
    roleCode?: string
    roleName?: string
    status?: number
}
export interface IResult {
    message?: string,
    responseException?: any,
    result: object,
    statusCode: string,
    version?: string
}

export interface IStaffDocument {
    id?: string;
    idStaff?: string,
    type?: number,
    photoId?: string,
    sequence?: number;
    imageUrl?: string;
    action?: number; // 1 create -1 delete
}
export interface IRoleResource {
    id?: string;
    ResourceCode?: string,
    RoleCode?: number,
    amendBy?: string
    amendDate?: number
    inputBy?: string
    inputDate?: number,
}

export interface IUserInfo {
    address?: {
        addressLine?: string
        addressLine2?: string
        amendBy?: string
        amendDate?: number
        cityCode?: string
        districtCode?: string
        id?: string
        inputBy?: string
        inputDate?: string
        latitude?: number
        longitude?: number
        status?: number
        wardCode?: string
    }
    amendBy?: string
    amendDate?: number
    avatarId?: string
    avatarUrl?: string
    bankAccountNo?: string
    bankBranch?: string
    bankCode?: string
    dateOfBirth?: string
    education?: string
    educationName?: string
    email?: string
    employmentDate?: string
    name?: string
    gender?: number
    homeAddress?: string
    id?: string
    idCardIssuedDate?: string
    idCardIssuedPlace?: string
    idCardNo?: string
    inputBy?: string
    inputDate?: number
    // lastName?: string
    note?: string
    phoneNumber?: string
    qrCodeUrl?: string
    regionCode?: string
    regionName?: string
    reportingTo?: string
    reportingToName?: string
    resources?: IRoleResource[],
    role?: IRole,
    roleName?: string,
    roleCode?: string,
    roleLevel?: number,
    sourceId?: string
    staffId?: string
    staffType?: number
    status?: number
    terminated?: number
    terminationtDate?: any
    title?: string
    uniform?: string
    uniformName?: string
    workingArea?: string
    workingAreaName?: string,
    rolePermision?: any
}

export interface IJourneyPlane {
    name?: string
    startTime: number
    endTime: number
    id?: string
    journeyPlanChangeRequest?: any
    journeyPlanDetails?: any
    pcInCharge?: string
    roleName?: string
    status?: number
    pcName?: string
    outletId?: string
    outletName?: string
    listSP?: any[]
    groupName?: string
    journeyLog?: any
    journeyLogId?: string
    groupInCharge?: string

}
export interface IJourneyPlaneDetail {
    id?: string
    pcInCharge?: string
    pcName?: string
    outletId?: string
    outletName?: string
    journeyPlanId?: string
    journeyPlanChangeRequest?: string
    groupName?: string
    groupInCharge?: string
    startTime: number
    endTime: number
    listSP?: any[]
    status?: number
}
export interface IReportingTo {
    name?: string
    id?: string
    // lastName?: string
    reportingPath?: string
    reportingTo?: string
    role?: string
    roleLevel?: string
    staffId?: string
    staffType?: number
    startTime?: number
    endTime?: number
    status?: number
    roleName?: string
    workingAreaName?: string
}

export interface IOutlet {
    id?: string;
    status?: Status;
    outletId?: string;
    areaId?: string;
    territoryId?: string;
    name?: string;
    legalName?: string;
    addressLine1?: string;
    addressLine2?: string;
    districtId?: string;
    districtName?: string;
    provinceId?: string;
    provinceName?: string;
    phone?: string;
    outletEmail?: string;
    taxId?: string;
    closeDate?: number;
    createDate?: number;
    personId?: string;
    note?: string;
    longitude?: number;
    latitude?: number;
    leadBrandId?: string;
    tier?: string;
    persona?: string;
    areaName?: string;
    zoneName?: string;
    srStaffId?: string;
    srName?: string;
    ssStaffId?: string;
    ssName?: string;
    listSP?: IStaff[];
    outletTypeName?: string;
    leadBrandName?: string;
}


export interface IColorText {
    color?: string,
    text?: string,
}

export interface IGroup {
    description?: string;
    id?: string;
    name?: string;
    parentGroup?: string;
    parentPath?: string;
    status?: number;
    type?: number;
}

export interface IGroupInput {
    id?: IInput;
    type?: IInput;
    name?: IInput;
    description?: IInput;
    parentGroup?: IInput;
    startTime?: IInput;
    endTime?: IInput;
    groupUser?: {
        id?: IInput;
        groupId?: IInput;
        roleLevel?: IInput;
        staffId?: IInput;
        staffTitle?: IInput;
        action?: IInput
    }[]

}

export interface ISaleVolume {
    id?: string;
    month?: string
    outletId?: string
    outletName?: string
    pcName?: string
    pcStaffId?: string
    pcStaffIdAndName?: string
    regionCode?: string
    regionName?: string
    reportDate?: number
    spSaleVolumeDetail?: ISaleVolumeDetail[]
    spSaleVolumeTotal?: number
    staffId?: string
    staffIdAndName?: string
    staffName?: string
    leadBrandName?: string
    tier?: string

}

export interface ISaleVolumeDetail {
    id?: string,
    saleVolume?: number,
    itemPLI?: string,
    action?: number,
    inventory?: number,
    expiryDate?: number
}

export interface ISaleVolumeRequest {
    id?: string,
    outletId?: string
    regionCode?: string
    reportDate?: number
    saleVolume?: number,
    staffId?: string,
    itemPLI?: string,
    inventory?: number,
    expiryDate?: number
}

export interface IAbsenceRecord {
    AL?: number,
    UL?: number,
    SL?: number,
    ML?: number,
    CL?: number,
    MWL?: number,
}

export interface IBonusSchemeRule {
    id?: string,
    type?: number,
    ruleCode?: string,
    minWorkingDay?: number | null,
    maxWorkingDay?: number | null,
    minTargetVolumn?: number | null,
    maxTargetVolumn?: number | null,
    minActualVolumn?: number | null,
    maxActualVolumn?: number | null,
    minSaleRate?: number | null,
    maxSaleRate?: number | null,
    minKPIScore?: number | null,
    maxKPIScore?: number | null,
    appliedBonus?: number | null,
    ruleDescription?: string,
}

export interface IBonusScheme {
    id?: string,
    type?: number,
    schemeCode?: string,
    name?: IInput,
    regionCode?: any,
    startDate?: number,
    endDate?: number,
    bonusSchemeRules?: IBonusSchemeRule[],
    action?: number
}

export interface IKPI {
    id?: string,
    category?: number,
    code?: string,
    name?: string,
    description?: string,
    skuLabel?: number | string,
    questionCategory?: string,
    weight?: number,
    bonusSchemes?: IBonusScheme[],
}

export interface INotification {
    title?: string
    contentValue?: string
    contentCode?: string
    dataType?: string
    messageId?: string
    readStatus?: number
    sendStatus?: number
    requestId?: string
    requestDate?: number | string
    inputDate?: string | number
}

export interface ISynthesisReport {
    staffId?: string
    staffName?: string
    roleCode?: string
    roleName?: string
    uniform?: string
    uniformName?: string
    actualWorkTotal?: number
    workOnHolidayTotal?: number
    workOnAbsenceTotal?: number
    mainShift?: number
    overTime?: number
    staffAbsenceAL?: number
    staffAbsenceSL?: number
    staffAbsenceML?: number
    staffAbsenceCL?: number
    staffAbsenceUL?: number
    dayOff?: number
    outletId?: string
    outletName?: string
    outletTier?: string
    leadBrandID?: string
    leadBrandName?: string
    srStaffId?: string
    srName?: string
    ssStaffId?: string
    ssName?: string
    sisVolumeHVN?: number
    sisVolumeCompetitor?: number
    sisVolumeAll?: number
    targetList?: IItemReport[]
    targetTotal?: number
    saleVolumeList?: IItemReport[]
    saleVolumeTotal?: number
    targetSKUTotal?: number
    targetSKUTotalByVol?: number
    targetTotalByVol?: number
    saleVolumeSKUTotal?: number
    saleVolumeSKUTotalByVol?: number
    saleVolumeTotalByVol?: number
    skuPercentTotal?: string
    percentTotal?: string
    skuPercentTotalByVol?: number
    percentTotalByVol?: number
    deviantTotal?: number
    deviantTotalByVol?: number
    kpiResults?: any[]
    staffMonthlyBonuses?: IStaffMonthlyBonus[]
    staffMonthlyBonusLabelTotal?: number
    staffMonthlyBonusTotal?: number
    outlets?: IOutletReport[]
    targetLargeUnitTotal?: number
    targetLargeUnitTotalByVol?: number
    saleVolumeLargeUnitTotal?: number
    saleVolumeLargeUnitTotalByVol?: number
    staffMonthlyBonusQuestionTotal?: number
    deviantLargeUnitTotal?: number
    deviantLargeUnitTotalByVol?: number
    ssInfo?: string
    srInfo?: string
}

export interface IKPIResult {
    KPIName?: string
    KPICode?: string
}

export interface IItemReport {
    staffId?: string
    outletId?: string
    itemPLI?: string
    targetSaleVolume?: number
    unitsPerCase?: number
    volume?: number
    um?: string
}

export interface IStaffMonthlyBonus {
    KPIName?: string
    KPICode?: string
    KPICategory?: string
}

export interface IOutletReport {
    staffId?: string
    outletId?: string
    areaId?: string
    areaCode?: string
    areaName?: string
    territoryId?: string
    territoryName?: string
    name?: string
    legalName?: string
    addressLine1?: string
    addressLine2?: string
    districtId?: string
    districtName?: string
    provinceId?: string
    provinceName?: string
    phone?: string
    outletEmail?: string
    taxId?: string
    personID?: string
    note?: string
    longitude?: number
    latitude?: number
    leadBrandId?: string
    leadBrandName?: string
    tier?: string
    persona?: number
    zoneName?: string
    zoneCode?: string
    oTypeId?: string
    srName?: string
    srStaffId?: string
    ssName?: string
    ssStaffId?: string
}
