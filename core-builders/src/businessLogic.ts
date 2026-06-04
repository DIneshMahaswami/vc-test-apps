import { UsersLogic } from './logic/users.ts';
import { PropertiesLogic, UnitsLogic} from './logic/properties.ts';
import { CustomersLogic } from './logic/customers.ts';
import { RentalAgreementsLogic } from './logic/rental_agreements.ts';
import { LeadsLogic } from './logic/leads.ts';
import { InvoicesLogic } from './logic/invoices.ts';
import { PaymentsLogic } from './logic/payments.ts';
import { ContractorsLogic } from './logic/contractors.ts';
import { ServiceRequestsLogic } from './logic/service_requests.ts';
import { WorkOrdersLogic } from './logic/work_orders.ts';
import { ComplaintsLogic } from './logic/complaints.ts';
import { SitesLogic } from './logic/sites.ts';
import { TrialsLogic } from './logic/trials.ts';
import { TrialSitesLogic } from './logic/trial_sites.ts';
import { ParticipantsLogic } from './logic/participants.ts';


export const businessLogic = () => {
    return [
        UsersLogic,
        PropertiesLogic,
        UnitsLogic,
        CustomersLogic,
        RentalAgreementsLogic,
        LeadsLogic,
        InvoicesLogic,
        PaymentsLogic,
        ContractorsLogic,
        ServiceRequestsLogic,
        WorkOrdersLogic,
        ComplaintsLogic,
        SitesLogic,
        TrialsLogic,
        TrialSitesLogic,
        ParticipantsLogic,

    ];
}    