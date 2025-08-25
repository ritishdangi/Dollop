import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CsrDashboardComponent } from './csr-dashboard/csr-dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CsrListComponent } from './csr-list/csr-list.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { NotificationComponent } from './notification/notification.component';

export const routes: Routes = [
        // { path: '', component: NotificationComponent },
        {path: '',component:LoginComponent},
        {path: 'login',component:LoginComponent},
        {path: 'signup', component: SignUpComponent},
        {path: 'admin-dashboard', component: AdminDashboardComponent },
        {path: 'customer-dashboard', component: CustomerDashboardComponent },
        {path: 'csr-dashboard', component: CsrDashboardComponent },
        {path: 'createticket', component: CreateTicketComponent},
        {path: 'my-ticket/:id', component: MyTicketsComponent},
        {path: 'my-ticket', component: MyTicketsComponent },
        {path: 'users/admin', component: UsersListComponent},
        {path: 'assign-csr', component: CsrListComponent},
        {path: 'csr-dashboard', component: CsrDashboardComponent},
        {path: 'tickets', component: AllTicketsComponent}
];
