
import { HistoryMenu, HistoryResource } from './views/history.tsx';
import { UsersMenu, UsersResource } from './views/users.tsx';
import { DocumentTemplatesMenu, DocumentTemplatesResource } from './views/document_templates.tsx';
import { DigitalSignaturesResource } from './views/digital_signatures.tsx';
import { isHistoryModuleActive, isDocumentGenerationModuleActive, AutoLayoutMenu, NestedMenu } from '@mahaswami/vc-frontend';
import GearIcon from '@mui/icons-material/Settings';
import { PropertiesResource, PropertiesMenu, UnitsResource, UnitsMenu} from './views/properties.tsx';
import { CustomersResource, CustomersMenu } from './views/customers.tsx';
import { RentalAgreementsResource, RentalAgreementsMenu } from './views/rental_agreements.tsx';
import { LeadsResource, LeadsMenu } from './views/leads.tsx';
import { InvoicesResource, InvoicesMenu } from './views/invoices.tsx';
import { PaymentsResource, PaymentsMenu } from './views/payments.tsx';
import { ContractorsResource, ContractorsMenu } from './views/contractors.tsx';
import { ServiceRequestsResource, ServiceRequestsMenu } from './views/service_requests.tsx';
import { WorkOrdersResource, WorkOrdersMenu } from './views/work_orders.tsx';


export const configureResources = (_permissions: any) => {
    let result = [
        HistoryResource,
        UsersResource,
        DocumentTemplatesResource,
        DigitalSignaturesResource,
        PropertiesResource,
        UnitsResource,
        CustomersResource,
        RentalAgreementsResource,
        LeadsResource,
        InvoicesResource,
        PaymentsResource,
        ContractorsResource,
        ServiceRequestsResource,
        WorkOrdersResource,

    ]

    return result;
}

export const configureMenus = (permissions: any) => {

    //TODO: This could be done in a less verbose way by having a hash and use React.createElement style

        const superAdminMenus =
        <>
        </>

        const adminMenusAll =
        <>
            <AutoLayoutMenu>

                <PropertiesMenu />
                <UnitsMenu />
                <CustomersMenu />
                <RentalAgreementsMenu />
                <LeadsMenu />
                <InvoicesMenu />
                <PaymentsMenu />
                <ContractorsMenu />
                <ServiceRequestsMenu />
                <WorkOrdersMenu />
                <NestedMenu label="Settings" icon={<GearIcon />} defaultOpen={false}>
                    {isDocumentGenerationModuleActive() && <DocumentTemplatesMenu />}
                    {isHistoryModuleActive() && <HistoryMenu />}
                    <UsersMenu />
                </NestedMenu>

            </AutoLayoutMenu>
        </>

        if ('super_admin' === permissions) {
            return superAdminMenus;
        }
        if ('admin' === permissions) {
            return adminMenusAll;
        }
        return adminMenusAll;

}

export const configureLandingPage = (_permissions: any) => {
    return {
        "super_admin": "/tenants"
    }
}