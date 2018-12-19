import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { FuseSearchBarComponent } from './search-bar.component';
import { SearchBarService } from './search-bar.service';

@NgModule({
    declarations: [
        FuseSearchBarComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FuseSearchBarComponent
    ],
    providers: [ SearchBarService ]
})
export class FuseSearchBarModule
{
}
