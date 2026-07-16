
import { HistoryMenu, HistoryResource } from './views/history.tsx';
import { UsersMenu, UsersResource } from './views/users.tsx';
import { DocumentTemplatesMenu, DocumentTemplatesResource } from './views/document_templates.tsx';
import { DigitalSignaturesResource } from './views/digital_signatures.tsx';
import { isHistoryModuleActive, isDocumentGenerationModuleActive, AutoLayoutMenu, NestedMenu } from '@mahaswami/vc-frontend';
import GearIcon from '@mui/icons-material/Settings';
import { EmployeesResource, EmployeesMenu } from './views/employees.tsx';
import { CustomersResource, CustomersMenu } from './views/customers.tsx';
import { ProductsResource, ProductsMenu, InventoriesResource, InventoriesMenu} from './views/products.tsx';
import { LeadsResource, LeadsMenu } from './views/leads.tsx';
import { QuotationsResource, QuotationsMenu, QuotationItemsResource, QuotationItemsMenu} from './views/quotations.tsx';
import { SalesOrdersResource, SalesOrdersMenu, SalesOrderItemsResource, SalesOrderItemsMenu} from './views/sales_orders.tsx';
import { InvoicesResource, InvoicesMenu } from './views/invoices.tsx';
import { PaymentsResource, PaymentsMenu } from './views/payments.tsx';
import { PurchaseOrdersResource, PurchaseOrdersMenu, PurchaseOrderItemsResource, PurchaseOrderItemsMenu} from './views/purchase_orders.tsx';
import { StockMovementsResource, StockMovementsMenu } from './views/stock_movements.tsx';
import { SalesTargetsResource, SalesTargetsMenu } from './views/sales_targets.tsx';


export const configureResources = (_permissions: any) => {
    let result = [
        HistoryResource,
        UsersResource,
        DocumentTemplatesResource,
        DigitalSignaturesResource,
        EmployeesResource,
        CustomersResource,
        ProductsResource,
        InventoriesResource,
        LeadsResource,
        QuotationsResource,
        QuotationItemsResource,
        SalesOrdersResource,
        SalesOrderItemsResource,
        InvoicesResource,
        PaymentsResource,
        PurchaseOrdersResource,
        PurchaseOrderItemsResource,
        StockMovementsResource,
        SalesTargetsResource,

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

                <EmployeesMenu />
                <CustomersMenu />
                <ProductsMenu />
                <InventoriesMenu />
                <LeadsMenu />
                <QuotationsMenu />
                <QuotationItemsMenu />
                <SalesOrdersMenu />
                <SalesOrderItemsMenu />
                <InvoicesMenu />
                <PaymentsMenu />
                <PurchaseOrdersMenu />
                <PurchaseOrderItemsMenu />
                <StockMovementsMenu />
                <SalesTargetsMenu />
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