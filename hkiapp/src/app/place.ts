export interface Places {
    meta: Meta;
    data: Place[];
    tags: Tags[];
}


export interface Place {
    distance: number;
    id: string;
    name: Name;
    sourceType: SourceType;
    info_url: string;
    modifiedAt: Date;
    location: Location;
    description: Description;
    tags: Tag[];
    opening_hours: OpeningHours;
    extra_searchwords: string[];
}

export interface Name {
    fi: string;
    en: string;
    sv: string;
    zh: string;
}

export interface SourceType {
}

export interface Lat {

}

export interface Lon {
}

export interface Address {
    street_address: string;
    postal_code: string;
    locality: string;
    neighbourhood: string;
}

export interface Location {
    lat: number;
    lon: number;
    address: Address;
}

export interface LicenseType {
}

export interface Image {
    url: string;
    copyrightHolder: string;
    licenseType: LicenseType;
    media_id: string;
}

export interface Description {
    intro: string;
    body: string;
    images: Image[];
}

export interface Tag {
    id: string;
    name: string;
}

export interface Opens {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface Closes {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface Hour {
    weekdayId: number;
    opens: Opens;
    closes: Closes;
    open24h: boolean;
}

export interface OpeningHours {
    hours: Hour[];
    openinghoursException: string;
}
export interface Meta {
    count: string;
}

export interface Tags {
    id: string;
    name: string; 

}