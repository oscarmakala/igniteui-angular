import {
    Component,
    ChangeDetectorRef,
    EventEmitter,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    Inject,
    Output,
    ViewChild,
    OnInit,
    AfterContentInit,
    AfterViewInit,
    Renderer2,
    Directive,
    TemplateRef,
    ContentChild
} from '@angular/core';
import { IgxRippleModule } from '../directives/ripple/ripple.directive';
import { AnimationBuilder, AnimationReferenceMetadata, AnimationMetadataType, AnimationAnimateRefMetadata } from '@angular/animations';
import { IAnimationParams } from './../animations/main';

let NEXT_ID = 0;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'igx-collapsible-title'
})
export class IgxCollapsibleTitleDirective {

    constructor( template: ElementRef<any>) { }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'igx-collapsible-description'
})
export class IgxCollapsibleDescriptionDirective {

    constructor( template: ElementRef<any>) { }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'igx-collapsible-body'
})
export class IgxCollapsibleBodyDirective {

    constructor( template: ElementRef<any>) { }
}

@Component({
    selector: 'igx-collapsible',
    templateUrl: 'collapsible.component.html'
})
export class IgxCollapsibleComponent {
    /**
     * Sets/gets the `id` of the collapsible component.
     * If not set, `id` will have value `"igx-collapsible-0"`;
     * ```html
     * <igx-collapsible id = "my-first-collapsible"></igx-collapsible>
     * ```
     * ```typescript
     * let collapsibleId =  this.collapsible.id;
     * ```
     * @memberof IgxCollapsibleComponent
     */

    @HostBinding('attr.id')
    @Input()
    public id = `igx-collapsible-${NEXT_ID++}`;

    @HostBinding('class.igx-collapsible')
    public cssClass = 'igx-collapsible';

    @ContentChild(IgxCollapsibleBodyDirective, { read: IgxCollapsibleBodyDirective })
    public textArea: IgxCollapsibleBodyDirective;

    @ViewChild('toggleBtn', { read: ElementRef })
    public toggleBtn: ElementRef;

    /**
     * An @Input property that set aria-labelledby attribute
     * ```html
     *<igx-combo [ariaLabelledBy]="'label1'">
     * ```
     */
    @HostBinding('attr.aria-labelledby')
    @Input()
    public ariaLabelledBy: string;

    @Input()
    public collapsed;

    @HostBinding('attr.aria-expanded')
    private get HostState () {
        return !this.collapsed;
    }

    @Input()
    public disabled;

    @Input()
    public headerButtons;

    @Output()
    public onCollapsed = new EventEmitter<any>();

    // @Output()
    // public onCollapsing = new EventEmitter<any>();

    // @Output()
    // public onExpanding = new EventEmitter<any>();

    @Output()
    public onExpanded = new EventEmitter<any>();

    constructor(public cdr: ChangeDetectorRef, public elementRef: ElementRef, private renderer: Renderer2) { }

    collapse () {
        this.onCollapsed.emit();
        this.collapsed = true;
    }

    expand () {
        this.onExpanded.emit();
        this.collapsed = false;
    }

    toggle () {
        if (this.collapsed) {
            this.expand();
        } else  {
            this.collapse();
        }
    }
}

