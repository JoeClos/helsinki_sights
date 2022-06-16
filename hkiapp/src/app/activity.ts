export interface Activities {
  meta: Meta;
  data: Activity[];
  tags: TagsEntity[];
}

export interface Activity {
  distance: number;
  id: string;
  name: Name;
  sourceType: LatOrLonOrLicenseTypeOrSourceType;
  infoUrl: string;
  modifiedAt: string;
  location: Location;
  description: Description;
  tags?: (TagsEntity)[] | null;
  whereWhenDuration: WhereWhenDuration;
}
export interface Name {
  fi: string;
  en: string;
  sv: string;
  zh: string;
}
export interface LatOrLonOrLicenseTypeOrSourceType {
}
export interface Location {
  lat: number;
  lon: number;
  address: Address;
}
export interface Address {
  street_address: string;
  postal_code: string;
  locality: string;
  neighbourhood: string;
}
export interface Description {
  intro: string;
  body: string;
  images?: (ImagesEntity)[] | null;
}
export interface ImagesEntity {
  url: string;
  copyrightHolder: string;
  licenseType: LatOrLonOrLicenseTypeOrSourceType;
  media_id: string;
}
export interface TagsEntity {
  id: string;
  name: string;
}
export interface WhereWhenDuration {
  whereAndWhen: string;
  duration: string;
}

export interface Meta {
  count: string;
}
