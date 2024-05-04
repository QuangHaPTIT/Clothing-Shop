import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UserService } from 'src/app/services/user.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem = 0;
  constructor(private userService: UserService, private tokenService: TokenService, private router: Router, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    debugger
      this.userResponse = this.userService.getUserFromLocalStorage();

  }
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void {

    //alert(`Clicked on "${index}"`);
    if(index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
    }else if(index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      // this.userResponse = this.userService.getUserFromLocalStorage();

      window.location.reload();

    }else if(index === 1) {
      this.router.navigate(['my-order']);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }

  handleNavItemChange(index: number): void {
    this.activeNavItem = index;
    // alert(this.activeNavItem)
    if(index === 3) {
      this.userResponse = this.userService.getUserFromLocalStorage();
      this.router.navigate([`/chat/${this.userResponse?.id}`]);
    }
  }
}
