/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'menu',
        title: 'Opciones',
        subtitle: 'Opciones del sistema',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'venta',
                title: 'Venta',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: '/venta'
            },
        ]
    },

];

