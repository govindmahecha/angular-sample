import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectNewComponent } from './project-new.component';
import { ProjectKpisComponent } from './project-kpis.component';
import { NeedAreaGuard } from '../_guards/need-area.guard';
import { NeedBeyondJourneyPartnerGuard } from '../_guards/need-beyond-journey-partner.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'projects', component: ProjectsComponent, canActivate: [NeedAreaGuard, NeedBeyondJourneyPartnerGuard] },
      { path: 'projects/new', component: ProjectNewComponent, canActivate: [NeedAreaGuard, NeedBeyondJourneyPartnerGuard] },
      { path: 'projects/new/:areaId', component: ProjectNewComponent, canActivate: [NeedBeyondJourneyPartnerGuard] },
      { path: 'projects/:areaId', component: ProjectsComponent, canActivate: [NeedBeyondJourneyPartnerGuard] },
      { path: 'project/:areaId/:id', component: ProjectDetailComponent, canActivate: [NeedBeyondJourneyPartnerGuard] },
      { path: 'project/kpis/:areaId/:id', component: ProjectKpisComponent, canActivate: [NeedBeyondJourneyPartnerGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
