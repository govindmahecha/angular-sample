import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaturityComponent } from './maturity.component';
import { MaturityItemViewComponent } from './maturity-action-view.component';
import { TraccItemRoutingGuard } from '../_guards/tracc-item-routing.guard';
import { MaturitySubscriptionGuard } from '../_guards/maturity-subscription.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { // we use the current area to load the current assessment
        path: 'maturity/:areaId',
        component: MaturityComponent,
        children: [
          // { // based on the tracc we can show the tracc detail cards (on the left hand side (if no TRACC, then we can show the TRACC summary card (from the main dash)
          //   path: '',
          //   pathMatch: 'prefix',
          //   component: MaturityDetailsComponent,
          //   outlet: 'left-side'
          // },
          { // based on the tracc we can show the tracc detail cards (on the left hand side (if no TRACC, then we can show the TRACC summary card (from the main dash)
            path: 'tracc/:traccId/:realTraccId',
            component: MaturityItemViewComponent
          },
          {
            path: 'tracc/:traccId/:realTraccId/stage/:stage/assessment/:assessment',
            component: MaturityItemViewComponent,
            canActivate: [MaturitySubscriptionGuard]
          },
          { // based on the tracc we can show the tracc detail cards (on the left hand side (if no TRACC, then we can show the TRACC summary card (from the main dash)
            path: 'tracc/:traccId/:realTraccId/stage/:stage/assessment/:assessment/theme/:theme',
            component: MaturityItemViewComponent,
            canActivate: [MaturitySubscriptionGuard]
          },
          // { // based on the tracc we can show the tracc detail cards (on the left hand side (if no TRACC, then we can show the TRACC summary card (from the main dash)
          //   path: 'tracc/:tracc',
          //   // pathMatch: 'prefix',
          //   component: MaturityItemViewComponent,
          //   // outlet: 'right-side'
          // },
          { // based on the tracc we can show the tracc detail cards (on the left hand side (if no TRACC, then we can show the TRACC summary card (from the main dash)
            path: '',
            pathMatch: 'full',
            component: MaturityItemViewComponent,
            // outlet: 'right-side'
          },
        ]
      },
      { path: 'maturity', component: MaturityComponent, canActivate: [TraccItemRoutingGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class MaturityRoutingModule {
}
