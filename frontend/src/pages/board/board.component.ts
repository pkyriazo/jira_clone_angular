import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectI } from 'src/interfaces/project';
import { IssueList, IssuePriorityIcons, IssuePriorityColors, IssueCategoryIcons, IssueCategoryColors } from 'src/interfaces/issue';
import { ProjectQuery } from 'src/state/project/project.query';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NavbarQuery } from 'src/state/navbar/navbar.query';
import { NavbarService } from 'src/state/navbar/navbar.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    host: {
        'class': 'w-full'
    }
})
export class BoardComponent implements OnInit, OnDestroy {
    public issuePriorityIcons = IssuePriorityIcons;
    public issuePriorityColors = IssuePriorityColors;
    public issueCategoryIcons = IssueCategoryIcons;
    public issueCategoryColors = IssueCategoryColors;

    private projectSubscription: Subscription;
    public project: ProjectI;
    public issues$: Observable<any[]>;
    public topBarFilterSearch: string;

    constructor(
        private projectQuery: ProjectQuery,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService
    ) { }

    ngOnInit() {
        this.projectSubscription = this.projectQuery.select().pipe(
                tap(project => {
                    this.project = project;
                })
            ).subscribe();

        this.issues$ = combineLatest(
                of(Object.values(IssueList)),
                this.projectQuery.issues$,
            ).pipe(
                map(([lists, issues]) => {
                    return lists.map(title => ({
                        title,
                        issues: issues.filter(issue => issue.list === title).sort((a, b) => (+a.listPosition) - (+b.listPosition))
                    }));
                })
            );
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }

}
