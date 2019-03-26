import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SelectionComponent} from './views/selection/selection.component';
import {RoundComponent} from './views/round/round.component';

const routes: Routes = [
    {
        path: 'selection',
        component: SelectionComponent
    },
    {
        path: 'round/pokemonFront/:pokemonFront/pokemonBack/:pokemonBack',
        component: RoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
