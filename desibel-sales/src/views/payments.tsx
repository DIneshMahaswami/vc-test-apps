import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, MoneyField, MoneyInput, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Payment } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { InvoicesReferenceField, InvoicesReferenceInput } from './invoices.js';

export const RESOURCE = "payments"
export const ICON = Payment
export const PREFETCH: string[] = ["invoices"]

export const PaymentsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const PaymentsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const paymentsActionDefs: ResourceActionDefs = {};

export const paymentMethodChoices = [{ id: 'cash', name: 'Cash' }, { id: 'cheque', name: 'Cheque' }, { id: 'bank_transfer', name: 'Bank Transfer' }, { id: 'upi', name: 'UPI' }, { id: 'credit_card', name: 'Credit Card' }];
export const PaymentMethodChoiceField = (props: any) => <SelectField {...props} choices={paymentMethodChoices} />;

export const PaymentAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="invoice_id" reference="invoices" label="Invoice" />,
    <DateLiveFilter source="payment_date" label="Payment" />,
    <ChoicesLiveFilter source="payment_method" label="Payment Method" choiceLabels={paymentMethodChoices} show />,
    <MoneyLiveFilter source="payment_amount" label="Payment" currency="INR" />
]

export const PaymentsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="invoice_id" field={InvoicesReferenceField}/>
                <DataTable.Col source="payment_date" field={DateField}/>
                <DataTable.Col source="payment_method" field={PaymentMethodChoiceField} />
                <DataTable.Col source="payment_reference" />
                <DataTable.Col source="payment_amount" field={PaymentAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const PaymentsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<InvoicesReferenceField source="invoice_id" variant='h6' link={false} />}>
                <DateField source="payment_date" />
                <SelectField source="payment_method" choices={paymentMethodChoices} />
            </CardGrid>
        </List>
    )
}

const PaymentForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <InvoicesReferenceInput source="invoice_id">
                <AutocompleteInput validate={required()} />
            </InvoicesReferenceInput>
            <DateInput source="payment_date" validate={required()} />
            <SelectInput source="payment_method" choices={paymentMethodChoices} validate={required()} />
            <TextInput source="payment_reference" />
            <MoneyInput source="payment_amount" currency="INR" validate={required()} />
        </SimpleForm>
    )
}

const PaymentEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <PaymentForm />
        </Edit>
    )
}

const PaymentCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <PaymentForm />
        </Create>
    )
}

const PaymentShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <InvoicesReferenceField source="invoice_id" />
                <DateField source="payment_date" />
                <SelectField source="payment_method" choices={paymentMethodChoices} />
                <TextField source="payment_reference" />
                <MoneyField source="payment_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

const paymentsFieldSchema: FieldSchema = {
    invoice_id: { required: true, resource: 'invoices' },
    payment_date: { required: true },
    payment_method: { ui: 'select', required: true, choices: paymentMethodChoices },
    payment_reference: {},
    payment_amount: { type: 'money', currency: 'INR', required: true }
};
const paymentsSearchableFields: string[] = [
    'invoice.invoice_no',
    'invoice.sales_order.order_no',
    'invoice.sales_order.customer.customer_name',
    'invoice.sales_order.quotation.quotation_no',
    'invoice.sales_order.quotation.customer.customer_name',
    'payment_method',
    'payment_reference'
];

export const PaymentsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('invoices', record.invoice)}
        fieldSchema={ paymentsFieldSchema}
        actionDefs={ paymentsActionDefs}
        searchableFields={ paymentsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<PaymentsList/>}
        create={<PaymentCreate/>}
        edit={<PaymentEdit/>}
        show={<PaymentShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<PaymentsCardList/>}
        sort={{ field: 'invoice.invoice_no', order: 'ASC' }}
    />
)
export const PaymentsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Payments" leftIcon={<ICON />} />
)
