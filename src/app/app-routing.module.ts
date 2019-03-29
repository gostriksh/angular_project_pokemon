import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SelectionComponent} from './views/selection/selection.component';
import {RoundComponent} from './views/round/round.component';
import {AttackSelectionComponent} from './views/attackSelection/attackSelection.component';

const routes: Routes = [
    {
        path: 'selection',
        component: SelectionComponent
    },
    {
        path: 'attacks/pokemonFront/:pokemonFront/pokemonBack/:pokemonBack',
        component: AttackSelectionComponent
    },
    {
        path: 'round',
        component: RoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
