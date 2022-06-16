import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  // creates popup for place on map 
  makePlacePopup(data: any): string {
    return `` +
    `<div> <h6>${data.name.fi}</h6> 
    <a target="_blank" href="${ data.info_url }"> Linkki paikan kotisivulle</a>
    <p>Osoite:<br>${data.location.address.street_address} 
    <br> ${data.location.address.postal_code} 
    <br> ${data.location.address.locality}</p>
    </div>`
    // <div>Nimi: ${data.name.fi}</div>
    // `<div><a routerLink="${'/places-detail/' + data.id }>Nimi: ${data.name.fi}</a></div>`
  }

  // creates popup for current location on map
  makeCurrentLocPopup(): string {
    return `` +
    `<div>Olet Tässä!</div>`
  }

  // creates popup for event on map 
  makeEventPopup(data: any): string {
    if(data.info_url == null || data.info_url == undefined) {
      data.info_url = "";
    }
    const aika_alkaa = new Date(data.event_dates.starting_day).toLocaleString('en-GB');
    const aika_loppuu = new Date(data.event_dates.ending_day).toLocaleString('en-GB');
    return `` +
    `<div>
    <h6>${data.name.fi} </h6><p>${data.description.intro}</p>
    <a class="mb-0 opacity-75 link-info" target="_blank" href="${ data.info_url }" onclick="window.open(this.href,'_blank');
    "rel="noopener noreferrer">Linkki tapahtuman kotisivulle </a>
    <p>Alkaa: ${aika_alkaa}<br>
    Loppuu: ${aika_loppuu}</p>
    <p>Osoite:<br> 
    ${data.location.address.street_address} <br>${data.location.address.postal_code} <br>${data.location.address.locality}</p>
    </div>`
    // `<div><a routerLink="${'/places-detail/' + data.id }>Nimi: ${data.name.fi}</a></div>`
  }

   // Creates popup for activities
   makeActivitiesPopup(data:any): string {
    if(data.name.fi == undefined){
    return `` +
    `<div> 
    <h6>${data.name.en}</h6>
    <a target="_blank" href="${ data.info_url }"> Linkki järjestäjän kotisivulle </a>
    <p>Osoite:<br> ${ data.location.address.street_address }
    <br>${ data.location.address.postal_code }
    <br>${ data.location.address.locality }</p>
    </div>`
    }else if(data.location.address.postal_code == null) {
      return `` +
      `<div> 
      <h6>${data.name.fi}</h6>
      <a target="_blank" href="${ data.info_url }"> Linkki järjestäjän kotisivulle </a>
      <p>Osoite:<br> ${ data.location.address.street_address }
      <br> -
      <br>${ data.location.address.locality }</p>
      </div>`
    }else{
    return `` +
    `<div> 
    <h6>${data.name.fi}</h6>
    <a target="_blank" href="${ data.info_url }">  Linkki järjestäjän kotisivulle  </a>
    <p>Osoite:<br> ${ data.location.address.street_address }
    <br>${ data.location.address.postal_code }
    <br>${ data.location.address.locality }</p>
    </div>`
  }
  }
}
