import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'solblaze-airdrops';
  airdrop = signal(null) as any;
  loading = false;
  async calcAirdrop(address:string){
    this.loading = true
    const validatorScore = (await (await fetch('https://rewards.solblaze.org/api/v1/data')).json()).scores[address];
    const blzeAirdrop = (await (await fetch(`https://rewards.solblaze.org/api/v1/daily_rewards?score=${validatorScore}`)).json()).amount * 7;
    this.loading = false
    this.airdrop.set(blzeAirdrop);
  }
}
