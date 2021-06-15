import { Component, OnInit } from '@angular/core';
import { ApiService } from  './services/api.service';
import { Item } from  './services/api.service';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Sunburst Graph Covid19';
  items:  Array<Item>;
  constructor(private  apiService: ApiService){
  }
  ngOnInit(){
      this.getData();
  }

  getCountryColour (CountryCode:any){
    let colour = '';
    if(CountryCode === "IN"){
        colour = "#0000ff"
    }else if(CountryCode === "NP"){
        colour = "#93aab9"
    }else if(CountryCode === "BD"){
        colour = "#006a4e"
    }else if(CountryCode === "PK"){
        colour = "#008000"
    }else if(CountryCode === "BT"){
        colour = "#FFCC33"
    }else if(CountryCode === "LK"){
        colour = "#00534E"
    }else if(CountryCode === "MV"){
        colour = "#D21034"
    }else{
        colour = "#000000"
    }
    return colour
  } 

  getData(){
      this.apiService.get().subscribe((data:  Array<Item>)=>{
      this.items = data;
      let chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst); 
      chart.data = this.items.map( el => {
            return {
                name:el.countryInfo.iso3,
                color:this.getCountryColour(el.countryInfo.iso2),
                children:[
                    {name:"Recovered", value:el.recovered},
                    {name:"Active", value:el.active},
                    {name:"Deaths", value:el.deaths}
                ]
            } 
        });
          // Define data fields
        chart.dataFields.value = "value";
        chart.dataFields.name = "name";
        chart.dataFields.children = "children";
        chart.dataFields.color = "color";
        let level0 = chart.seriesTemplates.create("0");
        level0.labels.template.text = "{category}\n{value.value}"; 
        level0.slices.template.fillOpacity = 0.75;
        let level1 = chart.seriesTemplates.create("1");
        level1.hiddenInLegend = true;
        level1.labels.template.text = "{category}\n{value.value}"; 

        level1.slices.template.fillOpacity = 0.75;
        
        // chart.innerRadius  = am4core.percent(1);
        chart.legend = new am4charts.Legend();
  }, (err)=>{
          console.log(err);
      });
  }
}
