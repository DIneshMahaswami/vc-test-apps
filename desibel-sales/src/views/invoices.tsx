import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, MoneyField, MoneyInput, AutoReferenceNumberInput, CardGrid, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Receipt } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { SalesOrdersReferenceField, SalesOrdersReferenceInput } from './sales_orders.js';

export const RESOURCE = "invoices"
export const ICON = Receipt
export const PREFETCH: string[] = ["sales_orders"]

export const InvoicesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const InvoicesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const invoicesActionDefs: ResourceActionDefs = {};

export const paymentStatusChoices = [{ id: 'pending', name: 'Pending' }, { id: 'partially_paid', name: 'Partially Paid' }, { id: 'paid', name: 'Paid' }, { id: 'overdue', name: 'Overdue' }];
export const PaymentStatusChoiceField = (props: any) => <SelectField {...props} choices={paymentStatusChoices} />;

export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <DateLiveFilter source="invoice_date" label="Invoice" />,
    <ReferenceLiveFilter source="sales_order_id" reference="sales_orders" label="Sales Order" />,
    <ChoicesLiveFilter source="payment_status" label="Payment Status" choiceLabels={paymentStatusChoices} show />,
    <DateLiveFilter source="due_date" label="Due" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

export const InvoicesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['total_amount']} >
                <DataTable.Col source="invoice_no" />
                <DataTable.Col source="invoice_date" field={DateField}/>
                <DataTable.Col source="sales_order_id" field={SalesOrdersReferenceField}/>
                <DataTable.Col source="payment_status" field={PaymentStatusChoiceField} />
                <DataTable.Col source="due_date" field={DateField}/>
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const InvoicesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="invoice_no" variant='h6' />}>
                <DateField source="invoice_date" />
                <SalesOrdersReferenceField source="sales_order_id" />
            </CardGrid>
        </List>
    )
}

const InvoiceForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <AutoReferenceNumberInput source="invoice_no" format="INV-NNNN" />
            <DateInput source="invoice_date" validate={required()} />
            <SalesOrdersReferenceInput source="sales_order_id">
                <AutocompleteInput validate={required()} />
            </SalesOrdersReferenceInput>
            <SelectInput source="payment_status" choices={paymentStatusChoices} validate={required()} />
            <DateInput source="due_date" />
            <MoneyInput source="total_amount" currency="INR" />
        </SimpleForm>
    )
}

const InvoiceEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <InvoiceForm />
        </Edit>
    )
}

const InvoiceCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <InvoiceForm />
        </Create>
    )
}

const InvoiceShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="invoice_no" />
                <DateField source="invoice_date" />
                <SalesOrdersReferenceField source="sales_order_id" />
                <SelectField source="payment_status" choices={paymentStatusChoices} />
                <DateField source="due_date" />
                <MoneyField source="total_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

const invoicesFieldSchema: FieldSchema = {
    invoice_no: { required: true, autoAssign: { format: 'INV-NNNN' } },
    invoice_date: { required: true },
    sales_order_id: { required: true, resource: 'sales_orders' },
    payment_status: { ui: 'select', required: true, choices: paymentStatusChoices },
    due_date: {},
    total_amount: { type: 'money', currency: 'INR' }
};
const invoicesSearchableFields: string[] = [
    'invoice_no',
    'sales_order.order_no',
    'sales_order.customer.customer_name',
    'sales_order.quotation.quotation_no',
    'sales_order.quotation.customer.customer_name',
    'payment_status'
];

export const InvoicesResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.invoice_no}
        fieldSchema={ invoicesFieldSchema}
        actionDefs={ invoicesActionDefs}
        searchableFields={ invoicesSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<InvoicesList/>}
        create={<InvoiceCreate/>}
        edit={<InvoiceEdit/>}
        show={<InvoiceShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<InvoicesCardList/>}
        hasColumnChooser
        sort={{ field: 'invoice_no', order: 'ASC' }}
    />
)
export const InvoicesMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Invoices" leftIcon={<ICON />} />
)
