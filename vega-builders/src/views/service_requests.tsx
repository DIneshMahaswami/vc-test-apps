import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { RequestQuote } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, DateField, DateInput, SelectField, SelectInput, AutocompleteInput, required} from "react-admin";
import { RentalAgreementsReferenceField, RentalAgreementsReferenceInput } from './rental_agreements.js';
import { CustomersReferenceField, CustomersReferenceInput } from './customers.js';

export const RESOURCE = "service_requests"
export const ICON = RequestQuote
export const PREFETCH: string[] = ["rental_agreements", "customers"]

export const ServiceRequestsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const ServiceRequestsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const serviceRequestsActionDefs: ResourceActionDefs = {};

export const requestTypeChoices = [{ id: 'plumbing', name: 'Plumbing' }, { id: 'electrical', name: 'Electrical' }, { id: 'hvac', name: 'HVAC' }, { id: 'cleaning', name: 'Cleaning' }, { id: 'pest_control', name: 'Pest Control' }, { id: 'structural', name: 'Structural' }, { id: 'general', name: 'General' }];
export const RequestTypeChoiceField = (props: any) => <SelectField {...props} choices={requestTypeChoices} />;
export const statusChoices = [{ id: 'open', name: 'Open' }, { id: 'in_progress', name: 'In Progress' }, { id: 'cancelled', name: 'Cancelled' }, { id: 'completed', name: 'Completed' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="rental_agreement_id" reference="rental_agreements" label="Rental Agreement" />,
    <ReferenceLiveFilter source="customer_id" reference="customers" label="Customer" />,
    <ChoicesLiveFilter source="request_type" label="Request Type" choiceLabels={requestTypeChoices} show />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />,
    <DateLiveFilter source="request_date" label="Request" />,
    <DateLiveFilter source="completed_date" label="Completed" />
]

export const ServiceRequestsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['completed_date']} >
                <DataTable.Col source="rental_agreement_id" field={RentalAgreementsReferenceField}/>
                <DataTable.Col source="customer_id" field={CustomersReferenceField}/>
                <DataTable.Col source="request_type" field={RequestTypeChoiceField} />
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="request_date" field={DateField}/>
                <DataTable.Col source="completed_date" field={DateField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const ServiceRequestsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<RentalAgreementsReferenceField source="rental_agreement_id" variant='h6' link={false} />}>
                <CustomersReferenceField source="customer_id" />
                <SelectField source="request_type" choices={requestTypeChoices} />
            </CardGrid>
        </List>
    )
}

const ServiceRequestForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <RentalAgreementsReferenceInput source="rental_agreement_id">
                <AutocompleteInput validate={required()} />
            </RentalAgreementsReferenceInput>
            <CustomersReferenceInput source="customer_id" />
            <SelectInput source="request_type" choices={requestTypeChoices} validate={required()} />
            <SelectInput source="status" choices={statusChoices} validate={required()} />
            <DateInput source="request_date" validate={required()} />
            <DateInput source="completed_date" />
        </SimpleForm>
    )
}

const ServiceRequestEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <ServiceRequestForm />
        </Edit>
    )
}

const ServiceRequestCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <ServiceRequestForm />
        </Create>
    )
}

const ServiceRequestShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <RentalAgreementsReferenceField source="rental_agreement_id" />
                <CustomersReferenceField source="customer_id" />
                <SelectField source="request_type" choices={requestTypeChoices} />
                <SelectField source="status" choices={statusChoices} />
                <DateField source="request_date" />
                <DateField source="completed_date" />
            </SimpleShowLayout>
        </Show>
    )
}

const serviceRequestsFieldSchema: FieldSchema = {
    rental_agreement_id: { required: true, resource: 'rental_agreements' },
    customer_id: { resource: 'customers' },
    request_type: { ui: 'select', required: true, choices: requestTypeChoices },
    status: { ui: 'select', required: true, choices: statusChoices },
    request_date: { required: true },
    completed_date: {}
};
const serviceRequestsSearchableFields: string[] = [
    'rental_agreement.unit.name',
    'rental_agreement.customer.business_name',
    'rental_agreement.customer.primary_contact_name',
    'rental_agreement.customer.secondary_contact_name',
    'rental_agreement.customer.registered_building_name',
    'customer.business_name',
    'customer.primary_contact_name',
    'customer.secondary_contact_name',
    'customer.registered_building_name',
    'request_type',
    'status'
];

export const ServiceRequestsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('rental_agreements', record.rental_agreement)}
        fieldSchema={ serviceRequestsFieldSchema}
        actionDefs={ serviceRequestsActionDefs}
        searchableFields={ serviceRequestsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<ServiceRequestsList/>}
        create={<ServiceRequestCreate/>}
        edit={<ServiceRequestEdit/>}
        show={<ServiceRequestShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<ServiceRequestsCardList/>}
        hasColumnChooser
        sort={{ field: 'rental_agreement.unit.name', order: 'ASC' }}
    />
)
export const ServiceRequestsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Service Requests" leftIcon={<ICON />} />
)
