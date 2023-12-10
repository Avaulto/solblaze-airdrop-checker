import { Component, NgModule, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
inject({ mode: "auto" });
import va from '@vercel/analytics';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'solblaze-airdrops';
  airdrop = signal(null) as any;
  loading = false;
  inputVal = ''
  airdropRatio = signal(0);
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const blzeAirdrop = (await (await fetch(`https://rewards.solblaze.org/api/v1/daily_rewards?score=1`)).json()).amount * 7;
    this.airdropRatio.set(blzeAirdrop)
  }
  async calcAirdrop(address: string) {
    this.loading = true
    const score = (await (await fetch('https://rewards.solblaze.org/api/v1/data')).json()).scores[address];
    const blzeAirdrop = (await (await fetch(`https://rewards.solblaze.org/api/v1/daily_rewards?score=${score}`)).json()).amount * 7;
    this.loading = false
    va.track('fetch airdrop info');
    this.airdrop.set(blzeAirdrop);
  }
}
