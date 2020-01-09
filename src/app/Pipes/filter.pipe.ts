import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable({
  providedIn: 'root'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], fields: any[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!fields || !value) {
      return items;
    }

    var filteredItems = [];
    items.filter(singleItem =>
       fields.map(field => {
        if((typeof(field) === "string" && singleItem[field].toLowerCase().includes(value.toLowerCase()))
          || (typeof(field) === "object" && singleItem[field.KEY][field.VALUE].toLowerCase().includes(value.toLowerCase()))){
            if(!filteredItems.includes(singleItem)){
              filteredItems.push(singleItem);
            }
        }
      })
    );

    return filteredItems;
  }  

}
