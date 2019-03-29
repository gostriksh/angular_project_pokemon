import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoundComponent} from './views/round/round.component';
import {PokemonService} from './core/services/pokemon.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AttackColorDirective } from './core/directive/attack-color.directive';
import { ScrollFocusBottomDirective } from './core/directive/scroll-focus-bottom.directive';
import {SelectionComponent} from './views/selection/selection.component';
import { HealthBarDirective } from './core/directive/health-bar.directive';
import { DisplayDamageDirective } from './core/directive/display-damage.directive';

@NgModule({
    declarations: [
        AppComponent,
        RoundComponent,
        SelectionComponent,
        AttackColorDirective,
        ScrollFocusBottomDirective,
        HealthBarDirective,
        DisplayDamageDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [PokemonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
