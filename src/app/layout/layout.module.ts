import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutModule } from './layouts/empty/empty.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    ClassicLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        SharedModule,
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {
}
