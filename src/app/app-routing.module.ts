import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoundComponent} from './views/round/round.component';
import {SelectionComponent} from './views/selection/selection.component';
import {RoundPageGuard} from './core/guards/-round-page.guard';

const routes: Routes = [
    {
        path: '',
        component: SelectionComponent
    },
    {
        path: 'round/:choice',
        component: RoundComponent,
        canActivate: [RoundPageGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
