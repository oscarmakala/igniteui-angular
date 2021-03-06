import { Directive, Inject } from '@angular/core';
import { IgxColumnActionsBaseDirective } from './column-actions-base.directive';
import { IgxColumnComponent } from '../columns/column.component';
import { IgxColumnActionsComponent } from './column-actions.component';

@Directive({
    selector: '[igxColumnHiding]'
})
export class IgxColumnHidingDirective extends IgxColumnActionsBaseDirective {

    constructor(
        @Inject(IgxColumnActionsComponent) protected columnActions: IgxColumnActionsComponent
    ) {
        super();
        columnActions.actionsDirective = this;
    }

    /**
     * @hidden @internal
     */
    public checkAllLabel = this.columnActions.grid?.resourceStrings.igx_grid_hiding_check_all_label ?? 'Hide All';

    /**
     * @hidden @internal
     */
    public uncheckAllLabel = this.columnActions.grid?.resourceStrings.igx_grid_hiding_uncheck_all_label ?? 'Show All';

    /**
     * @hidden @internal
     */
    public checkAll() {
        this.columnActions.filteredColumns.forEach(c => c.hidden = true);
    }

    /**
     * @hidden @internal
     */
    public uncheckAll() {
        this.columnActions.filteredColumns.forEach(c => c.hidden = false);
    }

    /**
     * @hidden @internal
     */
    public actionEnabledColumnsFilter = c => !c.disableHiding;

    /**
     * @hidden @internal
     */
    public columnChecked(column: IgxColumnComponent): boolean {
        return column.hidden;
    }

    /**
     * @hidden @internal
     */
    public toggleColumn(column: IgxColumnComponent) {
        column.hidden = !column.hidden;
    }
}
