import {
    Component,
    ContentChildren,
    Directive,
    forwardRef,
    HostBinding,
    Input,
    NgModule,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
    Optional,
    Inject,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxDropDownModule, IgxDropDownComponent } from '../drop-down/index';
import { IgxIconModule } from '../icon/index';
import { IgxToggleModule } from '../directives/toggle/toggle.directive';
import { IgxGridPinningActionsComponent } from './grid-actions/grid-pinning-actions.component';
import { IgxGridEditingActionsComponent } from './grid-actions/grid-editing-actions.component';
import { IgxGridActionsBaseDirective } from './grid-actions/grid-actions-base.directive';
import { IgxButtonModule } from '../directives/button/button.directive';
import { IgxRippleModule } from '../directives/ripple/ripple.directive';
import { DisplayDensityBase, DisplayDensityToken, IDisplayDensityOptions } from '../core/density';

@Directive({
    selector: '[igxActionStripMenuItem]'
})
export class IgxActionStripMenuItemDirective {
    constructor(
        public templateRef: TemplateRef<any>
    ) { }
}

/**
 * Action Strip provides templatable area for one or more actions.
 *
 * @igxModule IgxActionStripModule
 *
 * @igxTheme igx-action-strip-theme
 *
 * @igxKeywords action, strip, actionStrip, pinning, editing
 *
 * @igxGroup Data Entry & Display
 *
 * @remarks
 * The Ignite UI Action Strip is a container, overlaying its parent container,
 * and displaying action buttons with action applicable to the parent component the strip is instantiated or shown for.
 *
 * @example
 * ```html
 * <igx-action-strip #actionStrip>
 *     <igx-icon (click)="doSomeAction()"></igx-icon>
 * </igx-action-strip>
 */
@Component({
    selector: 'igx-action-strip',
    templateUrl: 'action-strip.component.html'
})

export class IgxActionStripComponent extends DisplayDensityBase {
    constructor(
        private _viewContainer: ViewContainerRef,
        private renderer: Renderer2,
        @Optional() @Inject(DisplayDensityToken) protected _displayDensityOptions: IDisplayDensityOptions) {
        super(_displayDensityOptions);
    }

    /**
     * Sets/gets the 'display' property of the current `IgxActionStrip`
     * @hidden
     * @internal
     */
    @HostBinding('style.display')
    public display = 'flex';

    private _hidden = false;

    /**
     * An @Input property that set the visibility of the Action Strip.
     * Could be used to set if the Action Strip will be initially hidden.
     * @example
     * ```html
     *  <igx-action-strip [hidden]="false">
     * ```
     */
    @Input()
    public set hidden(value) {
        this._hidden = value;
        this.display = this._hidden ? 'none' : 'flex';
    }

    public get hidden() {
        return this._hidden;
    }

    /**
     * Host `class.igx-action-strip` binding.
     * @hidden
     * @internal
     */
    @HostBinding('class.igx-action-strip')
    public cssClass = 'igx-action-strip';

    /**
     * Host `attr.class` binding.
     * @hidden
     * @internal
     */
    @HostBinding('attr.class')
    get hostClass(): string {
        const classes = [this.getComponentDensityClass('igx-action-strip')];
        // The custom classes should be at the end.
        classes.push(this.cssClass);
        return classes.join(' ');
    }

    /**
     * Sets the context of an action strip.
     * The context should be an instance of a @Component, that has element property.
     * This element will be the placeholder of the action strip.
     * @example
     * ```html
     * <igx-action-strip [context]="cell"></igx-action-strip>
     * ```
     */
    public context;

    /**
     *  Grid Action ContentChildren inside the Action Strip
     * @hidden
     * @internal
     */
    @ContentChildren(forwardRef(() => IgxGridActionsBaseDirective), { descendants: true })
    public gridActions: QueryList<IgxGridActionsBaseDirective>;

    /**
     * Menu Items ContentChildren inside the Action Strip
     * @hidden
     * @internal
     */
    @ContentChildren(IgxActionStripMenuItemDirective)
    public menuItems: QueryList<IgxActionStripMenuItemDirective>;

    /**
     * Reference to the menu
     * @hidden
     * @internal
     */
    @ViewChild('dropdown')
    public menu: IgxDropDownComponent;

    /**
     * Showing the Action Strip and appending it the specified context element.
     * @param context
     * @example
     * ```typescript
     * this.actionStrip.show(row);
     * ```
     */
    public show(context): void {
        this.context = context;
        this.hidden = false;
        this.closeMenu();
        if (this.context && this.context.element) {
            this.renderer.appendChild(context.element.nativeElement, this._viewContainer.element.nativeElement);
            this.sendContext();
        }
    }

    /**
     * Hiding the Action Strip and removing it from its current context element.
     * @example
     * ```typescript
     * this.actionStrip.hide();
     * ```
     */
    public hide(): void {
        this.hidden = true;
        this.closeMenu();
        if (this.context && this.context.element) {
            this.renderer.removeChild(this.context.element.nativeElement, this._viewContainer.element.nativeElement);
        }
    }

    private closeMenu() {
        if (this.menu && !this.menu.collapsed) {
            this.menu.close();
        }
    }

    private sendContext() {
        if (this.gridActions) {
            this.gridActions.forEach(action => action.context = this.context);
        }
    }
}

/**
 * @hidden
 */
@NgModule({
    declarations: [
        IgxActionStripComponent,
        IgxActionStripMenuItemDirective,
        IgxGridPinningActionsComponent,
        IgxGridEditingActionsComponent,
        IgxGridActionsBaseDirective
    ],
    exports: [
        IgxActionStripComponent,
        IgxActionStripMenuItemDirective,
        IgxGridPinningActionsComponent,
        IgxGridEditingActionsComponent,
        IgxGridActionsBaseDirective
    ],
    imports: [CommonModule, IgxDropDownModule, IgxToggleModule, IgxButtonModule, IgxIconModule, IgxRippleModule]
})
export class IgxActionStripModule { }
