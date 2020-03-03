import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-competitions-tab',
  templateUrl: './competitions-tab.component.html',
  styleUrls: ['./competitions-tab.component.sass']
})
export class CompetitionsTabComponent implements OnInit {
  compsObs$ : Observer<any>;
  competitions : [];
  constructor(
    private api: ApiService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.compsObs$ = {
      next : data => {
        console.log("Fetched Competitons",data);
        this.competitions = data["comps"];
      },
      error : err => this.toastr.error(err),
      complete : () => this.toastr.success("Request To Fetch Competions Completed") 
    }
    this.api.getCompetitionsForUser().subscribe(this.compsObs$);
  }
  categories =[
    {title : 'Technology', image: 'assets/tech.jpg'},
    {title : 'Sports & Fitness', image: 'assets/sports.jpg'},
    {title : 'Coding', image: 'assets/coding.png'},
    {title : 'Technology', image: 'assets/tech.jpg'},
    {title : 'Sports & Fitness', image: 'assets/sports.jpg'},
    {title : 'Coding', image: 'assets/coding.png'},
  ]
}
