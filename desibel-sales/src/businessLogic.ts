import { UsersLogic } from './logic/users.ts';
import { EmployeesLogic } from './logic/employees.ts';
import { CustomersLogic } from './logic/customers.ts';
import { ProductsLogic, InventoriesLogic} from './logic/products.ts';
import { LeadsLogic } from './logic/leads.ts';
import { QuotationsLogic, QuotationItemsLogic} from './logic/quotations.ts';
import { SalesOrdersLogic, SalesOrderItemsLogic} from './logic/sales_orders.ts';
import { InvoicesLogic } from './logic/invoices.ts';
import { PaymentsLogic } from './logic/payments.ts';
import { PurchaseOrdersLogic, PurchaseOrderItemsLogic} from './logic/purchase_orders.ts';
import { StockMovementsLogic } from './logic/stock_movements.ts';
import { SalesTargetsLogic } from './logic/sales_targets.ts';


export const businessLogic = () => {
    return [
        UsersLogic,
        EmployeesLogic,
        CustomersLogic,
        ProductsLogic,
        InventoriesLogic,
        LeadsLogic,
        QuotationsLogic,
        QuotationItemsLogic,
        SalesOrdersLogic,
        SalesOrderItemsLogic,
        InvoicesLogic,
        PaymentsLogic,
        PurchaseOrdersLogic,
        PurchaseOrderItemsLogic,
        StockMovementsLogic,
        SalesTargetsLogic,

    ];
}    