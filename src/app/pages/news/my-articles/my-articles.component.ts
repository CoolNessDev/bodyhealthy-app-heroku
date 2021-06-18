import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bh-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {
  publications: Publication[]=[];
  constructor(private publicationService: PublicationService,private userService: UserService) { }

  ngOnInit(): void {
    const id = this.userService.getUserId();
    this.fetchPublications(parseInt(id));
  }
  fetchPublications(id:number) {
    this.publicationService.getPublicationsByUser(id).subscribe(data=>{
      this.publications=data;
    },err=>{
      console.log("Error: ",err);
    })
  }

}
