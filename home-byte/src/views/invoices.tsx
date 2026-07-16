import {
    Resource,
    createDefaults,
    tableDefaults,
    editDefaults,
    formDefaults,
    listDefaults,
    showDefaults,
    RowActions,
    DataTable,
    SimpleShowLayout,
    SimpleForm,
    type ResourceActionDefs,
    type FieldSchema,
    SelectField,
    SelectInput,
    MoneyField,
    MoneyInput,
    SimpleFileField,
    SimpleFileInput,
    AutoReferenceNumberInput,
    CardGrid,
    createReferenceField,
    createReferenceInput,
    ReferenceLiveFilter,
    ChoicesLiveFilter,
    DateLiveFilter,
    MoneyLiveFilter,
    TextLiveFilter,
    RuleInput
} from '@mahaswami/vc-frontend';;
import { Receipt } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show, type ListProps, TextField, DateField, DateInput, AutocompleteInput, required } from "react-admin";
import { RentalAgreementsReferenceField, RentalAgreementsReferenceInput } from './rental_agreements.js';

export const RESOURCE = "invoices"
export const ICON = Receipt
export const PREFETCH: string[] = ["rental_agreements"]

export const InvoicesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const InvoicesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const invoicesActionDefs: ResourceActionDefs = {};

export const invoiceTypeChoices = [{ id: 'rent', name: 'Rent' }, { id: 'maintenance', name: 'Maintenance' }, { id: 'security_deposit', name: 'Security Deposit' }, { id: 'late_fee', name: 'Late Fee' }];
export const InvoiceTypeChoiceField = (props: any) => <SelectField {...props} choices={invoiceTypeChoices} />;
export const paymentStatusChoices = [{ id: 'pending', name: 'Pending' }, { id: 'partially_paid', name: 'Partially Paid' }, { id: 'overdue', name: 'Overdue' }, { id: 'paid', name: 'Paid' }];
export const PaymentStatusChoiceField = (props: any) => <SelectField {...props} choices={paymentStatusChoices} />;

export const BaseAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const GstAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <DateLiveFilter source="invoice_date" label="Invoice" />,
    <ChoicesLiveFilter source="invoice_type" label="Invoice Type" choiceLabels={invoiceTypeChoices} show />,
    <ReferenceLiveFilter source="rental_agreement_id" reference="rental_agreements" label="Rental Agreement" />,
    <ChoicesLiveFilter source="payment_status" label="Payment Status" choiceLabels={paymentStatusChoices} show />,
    <DateLiveFilter source="due_date" label="Due" />,
    <MoneyLiveFilter source="base_amount" label="Base" currency="INR" />,
    <MoneyLiveFilter source="gst_amount" label="Gst" currency="INR" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

export const InvoicesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['due_date', 'base_amount', 'gst_amount', 'total_amount']} >
                <DataTable.Col source="invoice_no" />
                <DataTable.Col source="invoice_date" field={DateField}/>
                <DataTable.Col source="invoice_type" field={InvoiceTypeChoiceField} />
                <DataTable.Col source="rental_agreement_id" field={RentalAgreementsReferenceField}/>
                <DataTable.Col source="payment_status" field={PaymentStatusChoiceField} />
                <DataTable.Col source="due_date" field={DateField}/>
                <DataTable.Col source="base_amount" field={BaseAmountMoneyField}/>
                <DataTable.Col source="gst_amount" field={GstAmountMoneyField}/>
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
                <SelectField source="invoice_type" choices={invoiceTypeChoices} />
            </CardGrid>
        </List>
    )
}

const InvoiceForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <AutoReferenceNumberInput source="invoice_no" format="INV-NNNN" />
            <DateInput source="invoice_date" validate={required()} />
            <SelectInput source="invoice_type" choices={invoiceTypeChoices} validate={required()} />
            <RentalAgreementsReferenceInput source="rental_agreement_id">
                <AutocompleteInput validate={required()} />
            </RentalAgreementsReferenceInput>
            <SelectInput source="payment_status" choices={paymentStatusChoices} validate={required()} />
            <RuleInput source="due_date" />
            <RuleInput source="base_amount" />
            <RuleInput source="gst_amount" />
            <RuleInput source="total_amount" />
            <SimpleFileInput source="invoice_attachment_file_id" />
            <SimpleFileField source="invoice_attachment_file_id" title="invoice_attachment_file_name" />
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
                <SelectField source="invoice_type" choices={invoiceTypeChoices} />
                <RentalAgreementsReferenceField source="rental_agreement_id" />
                <SelectField source="payment_status" choices={paymentStatusChoices} />
                <DateField source="due_date" />
                <MoneyField source="base_amount" currency="INR" />
                <MoneyField source="gst_amount" currency="INR" />
                <MoneyField source="total_amount" currency="INR" />
                <SimpleFileField source="invoice_attachment_file_id" title="invoice_attachment_file_name" />
            </SimpleShowLayout>
        </Show>
    )
}

const invoicesFieldSchema: FieldSchema = {
    invoice_no: { required: true, autoAssign: { format: 'INV-NNNN' } },
    invoice_date: { required: true,
        rule: { left: 'today', right: 0, operation: 'default' }
    },
    invoice_type: { ui: 'select', required: true, choices: invoiceTypeChoices,
        rule: { left: 'rent', leftMode: 'value', right: 0, operation: 'default' }
    },
    rental_agreement_id: { required: true, resource: 'rental_agreements' },
    payment_status: { ui: 'select', required: true, choices: paymentStatusChoices,
        rule: { left: 'pending', leftMode: 'value', right: 0, operation: 'default' }
    },
    due_date: { required: true,
    rule: { left: 'invoice_date', right: 15, operation: 'date_add' }
},
    base_amount: { type: 'money', currency: 'INR',
    rule: { left: 'rental_agreement.rent_amount', right: 0, operation: 'assign' }
},
    gst_amount: { type: 'money', currency: 'INR',
    rule: { left: 'rental_agreement.rent_amount', right: 0.18, operation: 'multiply' }
},
    total_amount: { type: 'money', currency: 'INR', required: true,
        rule: { left: 'base_amount', right: 'gst_amount', operation: 'add' }
    },
    invoice_attachment_file_id: {}
};
const invoicesSearchableFields: string[] = [
    'invoice_no',
    'rental_agreement.unit.name',
    'rental_agreement.customer.business_name',
    'rental_agreement.customer.primary_contact_name',
    'rental_agreement.customer.secondary_contact_name',
    'rental_agreement.customer.registered_building_name',
    'invoice_type',
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
