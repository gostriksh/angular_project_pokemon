import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoundComponent} from './views/round/round.component';
import {PokemonComponent} from './views/pokemon/pokemon.component';
import {PokemonService} from './core/services/pokemon.service';
import {HttpClientModule} from '@angular/common/http';
import {SelectionComponent} from './views/selection/selection.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AttackColorDirective } from './core/directive/attack-color.directive';
import { ScrollFocusBottomDirective } from './core/directive/scroll-focus-bottom.directive';
import {AttackSelectionComponent} from './views/attackSelection/attackSelection.component';
import { HealthBarDirective } from './core/directive/health-bar.directive';

@NgModule({
    declarations: [
        AppComponent,
        RoundComponent,
        PokemonComponent,
        AttackSelectionComponent,
        SelectionComponent,
        AttackColorDirective,
        ScrollFocusBottomDirective,
        HealthBarDirective
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
