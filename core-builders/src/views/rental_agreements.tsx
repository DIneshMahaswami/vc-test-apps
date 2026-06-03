import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, MoneyField, MoneyInput, SimpleFileField, SimpleFileInput, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Assignment } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, DateField, DateInput, SelectField, SelectInput, AutocompleteInput, required} from "react-admin";
import { UnitsReferenceField, UnitsReferenceInput } from './properties.js';
import { CustomersReferenceField, CustomersReferenceInput } from './customers.js';

export const RESOURCE = "rental_agreements"
export const ICON = Assignment
export const PREFETCH: string[] = ["units", "customers"]

export const RentalAgreementsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const RentalAgreementsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const rentalAgreementsActionDefs: ResourceActionDefs = {};

export const statusChoices = [{ id: 'draft', name: 'Draft' }, { id: 'active', name: 'Active' }, { id: 'terminated', name: 'Terminated' }, { id: 'expired', name: 'Expired' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;

export const RentAmountMoneyField = (props: any) => <MoneyField {...props} currency="USD" />;
export const SecurityDepositAmountMoneyField = (props: any) => <MoneyField {...props} currency="USD" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="unit_id" reference="units" label="Unit" />,
    <ReferenceLiveFilter source="customer_id" reference="customers" label="Customer" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />,
    <DateLiveFilter source="rental_start_date" label="Rental Start" />,
    <DateLiveFilter source="rental_end_date" label="Rental End" />,
    <DateLiveFilter source="agreement_date" label="Agreement" />,
    <MoneyLiveFilter source="rent_amount" label="Rent" currency="USD" />,
    <MoneyLiveFilter source="security_deposit_amount" label="Security Deposit" currency="USD" />
]

export const RentalAgreementsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['agreement_date', 'rent_amount', 'security_deposit_amount']} >
                <DataTable.Col source="unit_id" field={UnitsReferenceField}/>
                <DataTable.Col source="customer_id" field={CustomersReferenceField}/>
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="rental_start_date" field={DateField}/>
                <DataTable.Col source="rental_end_date" field={DateField}/>
                <DataTable.Col source="agreement_date" field={DateField}/>
                <DataTable.Col source="rent_amount" field={RentAmountMoneyField}/>
                <DataTable.Col source="security_deposit_amount" field={SecurityDepositAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const RentalAgreementsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<UnitsReferenceField source="unit_id" variant='h6' link={false} />}>
                <CustomersReferenceField source="customer_id" />
                <SelectField source="status" choices={statusChoices} />
            </CardGrid>
        </List>
    )
}

const RentalAgreementForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <UnitsReferenceInput source="unit_id">
                <AutocompleteInput validate={required()} />
            </UnitsReferenceInput>
            <CustomersReferenceInput source="customer_id">
                <AutocompleteInput validate={required()} />
            </CustomersReferenceInput>
            <SelectInput source="status" choices={statusChoices} validate={required()} />
            <DateInput source="rental_start_date" validate={required()} />
            <DateInput source="rental_end_date" />
            <DateInput source="agreement_date" />
            <MoneyInput source="rent_amount" currency="USD" validate={required()} />
            <MoneyInput source="security_deposit_amount" currency="USD" />
            <SimpleFileInput source="rental_agreement_attachment_file_id" />
            <SimpleFileField source="rental_agreement_attachment_file_id" title="rental_agreement_attachment_file_name" />
        </SimpleForm>
    )
}

const RentalAgreementEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <RentalAgreementForm />
        </Edit>
    )
}

const RentalAgreementCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <RentalAgreementForm />
        </Create>
    )
}

const RentalAgreementShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <UnitsReferenceField source="unit_id" />
                <CustomersReferenceField source="customer_id" />
                <SelectField source="status" choices={statusChoices} />
                <DateField source="rental_start_date" />
                <DateField source="rental_end_date" />
                <DateField source="agreement_date" />
                <MoneyField source="rent_amount" currency="USD" />
                <MoneyField source="security_deposit_amount" currency="USD" />
                <SimpleFileField source="rental_agreement_attachment_file_id" title="rental_agreement_attachment_file_name" />
            </SimpleShowLayout>
        </Show>
    )
}

const rentalAgreementsFieldSchema: FieldSchema = {
    unit_id: { required: true, resource: 'units' },
    customer_id: { required: true, resource: 'customers' },
    status: { ui: 'select', required: true, choices: statusChoices },
    rental_start_date: { required: true },
    rental_end_date: {},
    agreement_date: {},
    rent_amount: { type: 'money', currency: 'USD', required: true },
    security_deposit_amount: { type: 'money', currency: 'USD' },
    rental_agreement_attachment_file_id: {}
};
const rentalAgreementsSearchableFields: string[] = [
    'unit.name',
    'customer.business_name',
    'customer.primary_contact_name',
    'customer.secondary_contact_name',
    'customer.registered_building_name',
    'status'
];

export const RentalAgreementsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('units', record.unit)}
        fieldSchema={ rentalAgreementsFieldSchema}
        actionDefs={ rentalAgreementsActionDefs}
        searchableFields={ rentalAgreementsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<RentalAgreementsList/>}
        create={<RentalAgreementCreate/>}
        edit={<RentalAgreementEdit/>}
        show={<RentalAgreementShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<RentalAgreementsCardList/>}
        hasColumnChooser
        sort={{ field: 'unit.name', order: 'ASC' }}
    />
)
export const RentalAgreementsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Rental Agreements" leftIcon={<ICON />} />
)
