import { Component, NgModule, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
inject({mode: "auto"});
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
  async calcAirdrop(address:string){
    this.loading = true
    const validatorScore = (await (await fetch('https://rewards.solblaze.org/api/v1/data')).json()).scores[address];
    const blzeAirdrop = (await (await fetch(`https://rewards.solblaze.org/api/v1/daily_rewards?score=${validatorScore}`)).json()).amount * 7;
    this.loading = false
    va.track('fetch airdrop info');
    this.airdrop.set(blzeAirdrop);
  }
}
