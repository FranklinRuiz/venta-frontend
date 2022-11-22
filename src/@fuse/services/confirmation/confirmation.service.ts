import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';

@Injectable()
export class FuseConfirmationService {
    private _defaultConfig: FuseConfirmationConfig = {
        "title": "ERROR INESPERADO",
        "message": 'Lo sentimos, algo salió mal. Puedes volver a intentarlo o comunicarte con el administrador.',
        "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warning"
        },
        "actions": {
            "confirm": {
                "show": false,
                "label": "Aceptar",
                "color": "primary"
            },
            "cancel": {
                "show": false,
                "label": "Cancel"
            }
        },
        "dismissible": true
    };

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: FuseConfirmationConfig = {}): MatDialogRef<FuseConfirmationDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel'
        });
    }

    delete(): MatDialogRef<FuseConfirmationDialogComponent> {
        // Merge the user config with the default config
        let userConfig: FuseConfirmationConfig = {
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de que quieres eliminar este registro?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirmar',
                    color: 'warn'
                },
                cancel: {
                    show: true,
                    label: 'Cancelar'
                }
            },
            dismissible: false
        };

        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel'
        });
    }
}
